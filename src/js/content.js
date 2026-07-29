// タイピングした生のアルファベットを裏で記憶するバッファ
let activeBuffer = "";
let lastVisualLength = 0;
let currentRequestId = 0;
let isEnglishModeActive = false;
let hyphenCount = 0;
let isHyphenStartFullWidth = false; // ハイフン開始時の直前が全角かの判定フラグ
let lastHyphenStrLength = 0;

// 全角二重入力ブロック
document.addEventListener('input', function (event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) return;

  if (event.inputType === "insertCompositionText" || event.inputType === "insertText") {
    if (event.data) {
      const rawChar = event.data;
      deleteLeftText(activeElement, event.data.length);
      const cleanStr = rawChar.replace(/[A-Za-z0-9]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      }).toLowerCase();

      if (/^[a-z]+$/.test(cleanStr)) {
        for (let i = 0; i < cleanStr.length; i++) {
          handleCustomIME(activeElement, cleanStr[i]);
        }
      }
    }
  }
}, true);

// キーボードイベントの監視
document.addEventListener('keydown', function (event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) return;

  if (event.ctrlKey || event.metaKey) {
    return;
  }

  let key = "";
  if (event.code && event.code.startsWith("Key")) {
    key = event.code.replace("Key", "").toLowerCase();
  } else {
    key = event.key.toLowerCase();
  }

 if (key.match(/^[a-z\-]$/)) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const text = activeElement.value;
    const selStart = activeElement.selectionStart;

    // 現在入力中の単語の「開始位置」を探す
    let wordStart = selStart;
    while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
      wordStart--;
    }

    // 現在入力中の単語を切り出す
    const currentWord = text.substring(wordStart, selStart);

    const isEnglishWordMode = event.shiftKey || isEnglishModeActive;

    if (key !== '-') {
      hyphenCount = 0;
      lastHyphenStrLength = 0;
    }

    if (isEnglishWordMode) {
      // Shiftありなら大文字、なしなら小文字にする
      const targetKey = event.shiftKey ? key.toUpperCase() : key.toLowerCase();

      activeElement.spellcheck = false;

      activeElement.value = text.substring(0, selStart) + targetKey + text.substring(activeElement.selectionEnd);

      // カーソル位置を1文字進める
      const newPos = selStart + 1;
      activeElement.setSelectionRange(newPos, newPos);

      lastVisualLength = 0;
      activeBuffer = "";
      isEnglishModeActive = true;
    }
    // Shiftなし ＆ まだ大文字がない通常時
    else if (key === '-') {
      hyphenCount++;
      
      // 初回入力時に、連打開始地点の直前文字が全角か判定して保持
      if (hyphenCount === 1) {
        let baseKana = translateToJapanese(activeBuffer);
        let lastChar = baseKana.length > 0 ? baseKana[baseKana.length - 1] : "";
        if (!lastChar) {
          const textBefore = activeElement.value.substring(0, activeElement.selectionStart - lastVisualLength);
          lastChar = textBefore.length > 0 ? textBefore[textBefore.length - 1] : "";
        }
        isHyphenStartFullWidth = /[^\x01-\x7E\xA1-\xA5]/.test(lastChar);
      }

      // 回数と直前タイプに応じた記号と文字数を決定
      const isOdd = hyphenCount % 2 !== 0;
      const unitChar = isHyphenStartFullWidth ? (isOdd ? "ー" : "-") : (isOdd ? "-" : "ー");
      const charAmount = Math.ceil(hyphenCount / 2);
      const newHyphenStr = unitChar.repeat(charAmount);

      const baseBuffer = activeBuffer.substring(0, activeBuffer.length - lastHyphenStrLength);
      const baseKana = translateToJapanese(baseBuffer);
      
      // 新しいハイフン記号列をバッファにセット
      activeBuffer = baseBuffer + newHyphenStr;
      lastHyphenStrLength = newHyphenStr.length;
      
      const currentKana = baseKana + newHyphenStr;
      // 画面上の未確定描画を削除して新文字列を挿入
      deleteLeftText(activeElement, lastVisualLength);
      insertText(activeElement, currentKana);
      lastVisualLength = currentKana.length;
      // 自動漢字変換タイマーの発動
      let requestId = ++currentRequestId;
      clearTimeout(debounceTimer);
      
      // 末尾がハイフン（-）で終わっている場合は漢字変換APIへ投げずにそのまま確定維持する
      if (!newHyphenStr.endsWith("-")) {
        debounceTimer = setTimeout(async () => {
          if (typeof window.convertKanaToKanji === 'function' && baseKana.length > 0) {
            const kanjiText = await window.convertKanaToKanji(baseKana);
            if (requestId !== currentRequestId) return;
            if (kanjiText && kanjiText !== baseKana) {
              const fullText = kanjiText + newHyphenStr;
              deleteLeftText(activeElement, lastVisualLength);
              insertText(activeElement, fullText);
              lastVisualLength = fullText.length;
            }
          }
        }, 80);
      }
    }
    // 通常の英字入力
    else {
      handleCustomIME(activeElement, key);
    }
  } // 

  else if (event.key === ' ') {
    event.preventDefault();
    event.stopImmediatePropagation();

    clearTimeout(debounceTimer);

    hyphenCount = 0;
    const currentLastHyphenLen = lastHyphenStrLength;
    lastHyphenStrLength = 0;
    
    const requestId = ++currentRequestId;

if (isEnglishModeActive) {
      isEnglishModeActive = false; // フラグを解除（これで通常モードに戻る）
      activeBuffer = "";
      lastVisualLength = 0;
      return; // 1回目はスペースを入れずに終了
    }
 
     if (activeBuffer.length === 0 && lastVisualLength === 0) {
      insertText(activeElement, " ");
      activeBuffer = "";
      lastVisualLength = 0;
      return;
    }

    // 1. 直前の文字状態を取得（入力中単語の直前がスペースか文頭か）
    const currentText = activeElement.value;
    // 画面に出ている文字（lastVisualLength）の直前の文字を確認する
    const textBeforeWord = currentText.substring(0, activeElement.selectionStart - lastVisualLength);
    const isPrevSpace = textBeforeWord.length === 0 || textBeforeWord.endsWith(" ") || textBeforeWord.endsWith("\n");
    let foundEngWord = "";
    let jpPartBuffer = "";

    const baseBuffer = activeBuffer.substring(0, activeBuffer.length - currentLastHyphenLen);
    const hyphenSuffix = activeBuffer.substring(activeBuffer.length - currentLastHyphenLen);

    if (typeof englishWords !== 'undefined') {
      // 後ろから長い順に辞書とマッチするか検索
      for (let i = 0; i < activeBuffer.length; i++) {
        const sub = activeBuffer.substring(i).toLowerCase();
        const minLength = (i === 0) ? 1 : 3;
        if (sub.length >= minLength && englishWords.includes(sub)) {
          foundEngWord = sub;
          jpPartBuffer = activeBuffer.substring(0, i); // 英単語より前の部分
          break;
        }
      }
    }
    // 2. 「最初が大文字」または「前がスペース ＆ 辞書にある英単語」か判定
    const isStartWithUpper = /^[A-Z]/.test(activeBuffer);
    const isNotJapanese = baseBuffer.length > 0 && translateToJapanese(baseBuffer) === baseBuffer;
    const isEnglishDict = typeof englishWords !== 'undefined' && englishWords.includes(activeBuffer.toLowerCase());
    const currentVisualLen = lastVisualLength
    const isFirstSpace = activeBuffer.length > 0 || lastVisualLength > 0;

    // バッファ内に英単語が見つかった場合（直前スペースがなくても判定） ---
    if (foundEngWord.length > 0) {
      // 画面上の未確定テキストを削除
      deleteLeftText(activeElement, lastVisualLength);

      // 前半の日本語部分があれば変換（無ければ空文字）
      const jpConverted = jpPartBuffer ? translateToJapanese(jpPartBuffer) : "";
      
      // 日本語部分 + 検出された英単語 を結合して挿入
      const resultText = jpConverted + foundEngWord;
      insertText(activeElement, resultText + (isFirstSpace ? "" : " "));

      activeBuffer = "";
      lastVisualLength = 0;
    }

   else if ((isStartWithUpper || (isPrevSpace && isEnglishDict) || isNotJapanese) && activeBuffer.length > 0) {

      deleteLeftText(activeElement, lastVisualLength);

            // 1回目(確定のみ)ならスペースを追加せず、2回目以降ならスペースを追加
      insertText(activeElement, activeBuffer + (isFirstSpace ? "" : " "));

      activeBuffer = "";
      lastVisualLength = 0;

    } else {
      const rawHiragana = translateToJapanese(baseBuffer) + hyphenSuffix;
      const targetElement = activeElement;

      // 1回目(確定のみ)ならスペースを追加せず、2回目以降ならスペースを追加
      const appendSpace = isFirstSpace ? "" : " ";
      

      if (isFirstSpace) {
        // 未確定文字がある場合（1回目：確定処理）
        if (lastVisualLength > 0) {
          deleteLeftText(targetElement, lastVisualLength);
        }
        
        activeBuffer = "";
        lastVisualLength=0;

        (async () => {
          let convertedText = rawHiragana;
          // 日本語部分のみを漢字変換へ回し、ハイフン記号列はそのまま保持する
          if (typeof window.convertKanaToKanji === 'function' && baseBuffer.length > 0) {
            const baseKana = translateToJapanese(baseBuffer);
            const kanjiBase = await window.convertKanaToKanji(baseKana);
            convertedText = kanjiBase + hyphenSuffix;
          }
          if (requestId !== currentRequestId) return;
          insertText(targetElement, convertedText + appendSpace);
        })();
      } else {
        // すでに確定済みの場合（2回目以降：スペース入力）
        insertText(targetElement, " ");
        activeBuffer = "";
        lastVisualLength = 0;
      }
    }

   
  }
  else if (event.key === 'Backspace') {
    clearTimeout(debounceTimer);
    currentRequestId++;
    activeBuffer = "";
    lastVisualLength = 0;
    isEnglishModeActive = false;
    hyphenCount = 0;
    lastHyphenStrLength = 0;
  }
}, true);

// 入力後の自動漢字変換までのウェイト用タイマー
let debounceTimer = null;

// 【メインロジック：タイピングと同時に高確率な漢字へ変換】
function handleCustomIME(activeElement, key) {
  deleteLeftText(activeElement, lastVisualLength);

  activeBuffer += key;

  // 1. レスポンス維持のため、まずひらがなを表示
  let currentKana = translateToJapanese(activeBuffer);
  insertText(activeElement, currentKana);
  lastVisualLength = currentKana.length;
  
  let requestId = ++currentRequestId;

  // 2. 入力が一瞬止まったら（80ms後）、最高確率の漢字に置き換える
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (typeof window.convertKanaToKanji === 'function' && currentKana.length > 0) {
      const kanjiText = await window.convertKanaToKanji(currentKana);
      if (requestId !== currentRequestId) return;
      if (kanjiText && kanjiText !== currentKana) {
        deleteLeftText(activeElement, lastVisualLength);
        insertText(activeElement, kanjiText);
        lastVisualLength = kanjiText.length;
      }
    }
  }, 80);
}

// アルファベットをひらがなに変換する関数
function translateToJapanese(bufferText) {
  let convertedText = "";
  let tempBuffer = bufferText;

  while (tempBuffer.length > 0) {
    let found = false;
    if (tempBuffer.length >= 3) {
      const substr3 = tempBuffer.substring(0, 3);
      if (jpDictionary[substr3]) { convertedText += jpDictionary[substr3]; tempBuffer = tempBuffer.substring(3); found = true; }
    }
    if (!found && tempBuffer.length >= 2) {
      const substr2 = tempBuffer.substring(0, 2);
      if (jpDictionary[substr2]) { convertedText += jpDictionary[substr2]; tempBuffer = tempBuffer.substring(2); found = true; }
    }
    if (!found && tempBuffer.length >= 1) {
      const substr1 = tempBuffer.substring(0, 1);
      if (jpDictionary[substr1]) { convertedText += jpDictionary[substr1]; tempBuffer = tempBuffer.substring(1); found = true; }
    }
    if (!found) { convertedText += tempBuffer[0]; tempBuffer = tempBuffer.substring(1); }
  }
  return convertedText;
}

// テキスト挿入・削除補助関数
function insertText(inputElement, text) {
  const start = inputElement.selectionStart;
  const end = inputElement.selectionEnd;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start) + text + value.substring(end);
  inputElement.selectionStart = inputElement.selectionEnd = start + text.length;
}

function deleteLeftText(inputElement, count) {
  if (count <= 0) return;
  const start = inputElement.selectionStart;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start - count) + value.substring(start);
  inputElement.selectionStart = inputElement.selectionEnd = start - count;
}
