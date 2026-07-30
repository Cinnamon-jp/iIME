// タイピングした生のアルファベットを裏で記憶するバッファ↓
let activeBuffer = "";
let lastVisualLength = 0;
let currentRequestId = 0;
let isEnglishModeActive = false;
let candidateIndex = 0;


// 全角二重入力ブロック
document.addEventListener('input', function (event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA' && !activeElement.isContentEditable)) return;
  if (event.inputType === "insertCompositionText" || event.inputType === "insertText") {
    if (event.data) {
      deleteLeftText(activeElement, event.data.length);
    }
  }
}, true);

// キーボードイベントの監視
document.addEventListener('keydown', function (event) {
  const activeElement = document.activeElement;
  if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA' && !activeElement.isContentEditable)) return;
  // CtrlキーやCommandキーが押されている場合はIME処理をスキップ
  if (event.ctrlKey || event.metaKey) {
    return;
  }
  //event.codeはKeyAのような形式、event.keyはaやA、あのような形式
  let key = "";
  if (event.code && event.code.startsWith("Key")) {
    key = event.code.replace("Key", "").toLowerCase();//Keyを除去してアルファベットのみに
  } else {//アルファベット以外のキーはevent.keyを使う
    key = event.key;
  }

  //Tabキーで候補を切り替える処理
  if (event.key === 'Tab' || event.code === 'Tab') {
    if (activeBuffer.length > 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      clearTimeout(debounceTimer); // 自動変換タイマーを確実に止める

      const currentKana = translateToJapanese(activeBuffer);

      if (typeof window.getKanjiCandidates === 'function') {
        const requestId = ++currentRequestId;
        window.getKanjiCandidates(currentKana).then(candidates => {
          if (requestId !== currentRequestId) return;
          if (candidates && candidates.length > 0) {
            // 画面上に既に出ている文字（直前の変換漢字またはひらがな）を全削除して置き換える
            if (lastVisualLength > 0) {
              deleteLeftText(activeElement, lastVisualLength);
            }

            // 次の候補を取得
            const nextCandidate = candidates[candidateIndex % candidates.length];
            candidateIndex++;

            insertText(activeElement, nextCandidate);
            lastVisualLength = nextCandidate.length;
          }
        });
      }
    }
    return;
  }

  else if (key.match(/^[a-z0-9]$/) || key in jpDictionary) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const isEditable = activeElement.isContentEditable;
    const text = isEditable ? activeElement.textContent : activeElement.value;
    const selStart = isEditable ? (window.getSelection().rangeCount > 0 ? window.getSelection().getRangeAt(0).startOffset : 0) : activeElement.selectionStart;

    // 現在入力中の単語の「開始位置」を探す
    let wordStart = selStart;
    while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
      wordStart--;
    }

    // 現在入力中の単語を切り出す
    const currentWord = text.substring(wordStart, selStart);

    const isEnglishWordMode = (event.shiftKey) || isEnglishModeActive;

    // 英単語モードの場合の処理
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

    else {
      handleCustomIME(activeElement, key);
    }
  }


  else if (event.key === ' ') {
    event.preventDefault(); //ブラウザのスペースキー入力を止める
    event.stopImmediatePropagation(); //イベントの伝播を止める

    clearTimeout(debounceTimer);

    const requestId = ++currentRequestId;

    if (isEnglishModeActive) {
      isEnglishModeActive = false; // フラグを解除（これで通常モードに戻る）
      activeBuffer = "";
      lastVisualLength = 0;
      if (typeof window.triggerGlow === 'function') window.triggerGlow(activeElement);
      return; // 1回目はスペースを入れずに終了
    }
    //バッファが空の場合、スペースを挿入(2回連続でスペースを打つことでスペースが打てる)
    if (activeBuffer.length === 0) {
      insertText(activeElement, " ");
      activeBuffer = "";
      lastVisualLength = 0;
      return;
    }

    // 1. 直前の文字状態を取得（入力中単語の直前がスペースか文頭か）
    const isEditable = activeElement.isContentEditable;
    const currentText = isEditable ? activeElement.textContent : activeElement.value;
    const currentPos = isEditable ? (window.getSelection().rangeCount > 0 ? window.getSelection().getRangeAt(0).startOffset : 0) : activeElement.selectionStart;
    const textBeforeWord = currentText.substring(0, currentPos - lastVisualLength);
    const isPrevSpace = textBeforeWord.length === 0 || textBeforeWord.endsWith(" ") || textBeforeWord.endsWith("\n");
    let foundEngWord = "";
    let jpPartBuffer = "";

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
    const isNotJapanese = activeBuffer.length > 0 && translateToJapanese(activeBuffer) === activeBuffer;
    const isEnglishDict = typeof englishWords !== 'undefined' && englishWords.includes(activeBuffer.toLowerCase());
    const isFirstSpace = activeBuffer.length > 0;

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
      if (typeof window.triggerGlow === 'function') window.triggerGlow(activeElement);
    }

    else if ((isStartWithUpper || (isPrevSpace && isEnglishDict) || isNotJapanese) && activeBuffer.length > 0) {

      deleteLeftText(activeElement, lastVisualLength);

      // 1回目(確定のみ)ならスペースを追加せず、2回目以降ならスペースを追加
      insertText(activeElement, activeBuffer + (isFirstSpace ? "" : " "));

      activeBuffer = "";
      lastVisualLength = 0;
      if (typeof window.triggerGlow === 'function') window.triggerGlow(activeElement);

    } else {
      const targetElement = activeElement;

      // 1回目(確定のみ)ならスペースを追加せず、2回目以降ならスペースを追加
      const appendSpace = isFirstSpace ? "" : " ";


      if (isFirstSpace) {
        // 未確定文字がある場合（1回目：確定処理）
        if (lastVisualLength > 0 && typeof window.triggerGlow === 'function') window.triggerGlow(targetElement);

        activeBuffer = "";
        lastVisualLength = 0;

        if (appendSpace) {
          insertText(targetElement, appendSpace);
        }
      } else {
        // すでに確定済みの場合（2回目以降：スペース入力）
        insertText(targetElement, " ");
        activeBuffer = "";
        lastVisualLength = 0;
      }
    }


  }

  //Enterキーで全ての記憶を消去してリセットする
  else if (event.key === 'Enter') {
    if (activeBuffer.length > 0 && typeof window.triggerGlow === 'function') window.triggerGlow(activeElement);
    clearAllBuffers();
  }

  else if (event.key === 'Backspace') {
    clearTimeout(debounceTimer);
    currentRequestId++;
    activeBuffer = "";
    lastVisualLength = 0;
    isEnglishModeActive = false;
  }
}, true);

// フォーカスアウト時に全ての記憶を消去してリセットする
document.addEventListener('focusout', clearAllBuffers);

// 入力後の自動漢字変換までのウェイト用タイマー
let debounceTimer = null;

// 【メインロジック：タイピングと同時に高確率な漢字へ変換】
function handleCustomIME(activeElement, key) {
  candidateIndex = 0;
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
  if (inputElement.isContentEditable) {
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }

  const start = inputElement.selectionStart;
  const end = inputElement.selectionEnd;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start) + text + value.substring(end);
  inputElement.selectionStart = inputElement.selectionEnd = start + text.length;
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
}

function deleteLeftText(inputElement, count) {
  if (count <= 0) return;
  if (inputElement.isContentEditable) {
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      const endOffset = range.startOffset;
      const startOffset = Math.max(0, endOffset - count);
      range.setStart(range.startContainer, startOffset);
      range.setEnd(range.startContainer, endOffset);
      range.deleteContents();
    }
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  const start = inputElement.selectionStart;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start - count) + value.substring(start);
  inputElement.selectionStart = inputElement.selectionEnd = start - count;
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
}

window.getKanjiCandidates = async function (kana) {
  if (!kana) return [];
  try {
    const response = await fetch(`https://www.google.com/transliterate?langpair=ja-Hira|ja&text=${encodeURIComponent(kana)}`);
    const data = await response.json();
    // Google APIのレスポンス形式: [ [ "入力よみ", [ "候補1", "候補2", "候補3", ... ] ] ]
    if (data && data[0] && data[0][1]) {
      return data[0][1]; // 変換候補の配列（例: ["感じ", "漢字", "幹事", "かんじ"]）
    }
  } catch (error) {
    console.error("Google IME API Error:", error);
  }
  return [kana]; // エラー時はひらがなを返す
};

// すべての記憶をノートから消去してリセットする命令
function clearAllBuffers() {
  clearTimeout(debounceTimer); // 漢字変換のタイマーを止める
  activeBuffer = "";           // ノートを空にする
  lastVisualLength = 0;        // 画面の文字数の記憶も0に
  isEnglishModeActive = false;
  currentRequestId++;          // 変換IDを進めて、遅れてやってくる漢字変換を無視する
}