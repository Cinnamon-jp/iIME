// タイピングした生のアルファベットを裏で記憶するバッファ
let activeBuffer = "";
let lastVisualLength = 0;

// 全角二重入力ブロック
document.addEventListener('input', function (event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) return;

  if (event.inputType === "insertCompositionText" || event.inputType === "insertText") {
    let rawChar = event.data;
    if (!rawChar) return;

    let key = rawChar.replace(/[A-Za-z0-9]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).toLowerCase();

    if (key.match(/^[a-z]$/)) {
      deleteLeftText(activeElement, rawChar.length);
      handleCustomIME(activeElement, key);
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

  let key = event.key.toLowerCase();

  
  if (event.keyCode !== 229 && key.match(/^[a-z]$/)) {
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

    // すでに単語内に「大文字アルファベット」があるか、今Shiftが押されている場合
    const isEnglishWordMode = event.shiftKey || /[A-Z]/.test(currentWord);

    if (isEnglishWordMode) {
      // Shiftありなら大文字、なしなら小文字にする
      const targetKey = event.shiftKey ? key.toUpperCase() : key.toLowerCase();

      activeElement.value = text.substring(0, selStart) + targetKey + text.substring(activeElement.selectionEnd);

      // カーソル位置を1文字進める
      const newPos = selStart + 1;
      activeElement.setSelectionRange(newPos, newPos);
    }
    // Shiftなし ＆ まだ大文字がない通常時（元の完璧な自動判定に任せる）
    else {
      handleCustomIME(activeElement, key);
    }
  } // 

  else if (event.key === ' ') {
    event.preventDefault();
    event.stopImmediatePropagation();

    clearTimeout(debounceTimer);

    if (activeBuffer.length === 0 && lastVisualLength === 0) {
      insertText(activeElement, " ");
      return;
    }

    // 1. 直前の文字状態を取得（入力中単語の直前がスペースか文頭か）
    const currentText = activeElement.value;
    // 画面に出ている文字（lastVisualLength）の直前の文字を確認する
    const textBeforeWord = currentText.substring(0, activeElement.selectionStart - lastVisualLength);
    const isPrevSpace = textBeforeWord.length === 0 || textBeforeWord.endsWith(" ") || textBeforeWord.endsWith("\n");

    // 2. 「最初が大文字」または「前がスペース ＆ 辞書にある英単語」か判定
    const isStartWithUpper = /^[A-Z]/.test(activeBuffer);
    const isEnglishDict = typeof englishWords !== 'undefined' && englishWords.includes(activeBuffer.toLowerCase());

    const isNotJapanese = translateToJapanese(activeBuffer) === activeBuffer;

    const isEnglish = isStartWithUpper || (isPrevSpace && isEnglishDict) || isNotJapanese;

    const isFirstSpace = activeBuffer.length > 0 || lastVisualLength > 0;

    if (isEnglish && activeBuffer.length > 0) {

      deleteLeftText(activeElement, lastVisualLength);

      const shouldAddSpace = !isFirstSpace || isNotJapanese;
      // 1回目(確定のみ)ならスペースを追加せず、2回目以降ならスペースを追加
      insertText(activeElement, activeBuffer + (isFirstSpace ? "" : " "));

      activeBuffer = "";
      lastVisualLength = 0;

    } else {
      const rawHiragana = translateToJapanese(activeBuffer);
      const targetElement = activeElement;

      // 1回目(確定のみ)ならスペースを追加せず、2回目以降ならスペースを追加
      const appendSpace = isFirstSpace ? "" : " ";

      if (isFirstSpace) {
        // 未確定文字がある場合（1回目：確定処理）
        if (lastVisualLength > 0) {
          deleteLeftText(targetElement, lastVisualLength);
        }

        //りせつと!!
        activeBuffer = "";
        lastVisualLength = 0;

        (async () => {
          let convertedText = rawHiragana;
          if (typeof window.convertKanaToKanji === 'function') {
            convertedText = await window.convertKanaToKanji(rawHiragana);
          }
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
    activeBuffer = "";
    lastVisualLength = 0;
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

  // 2. 入力が一瞬止まったら（80ms後）、最高確率の漢字に置き換える
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (typeof window.convertKanaToKanji === 'function' && currentKana.length > 0) {
      const kanjiText = await window.convertKanaToKanji(currentKana);
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
