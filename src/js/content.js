// タイピングした生のアルファベットを裏で記憶するバッファでーーーーーーーーーす。
let activeBuffer = "";
let lastVisualLength = 0;

const searchInput = document.querySelector('input[name="q"], textarea[name="q"]');
if (searchInput) {
  searchInput.style.backgroundColor = 'transparent';
  searchInput.style.borderColor = '#8ab4f8';
  searchInput.style.borderWidth = '2px';
  searchInput.style.boxShadow = '0 0 8px rgba(138, 180, 248, 0.5)';
}

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
    handleCustomIME(activeElement, key);
  }
  else if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    event.stopImmediatePropagation();

    // 画面に表示されていた未確定文字（ひらがな）を一旦消去
    deleteLeftText(activeElement, lastVisualLength);

    // 🌟 追加：Enterキーが押されたら、カーソル位置・直前の単語を「と」⇄「to」で相互変換する
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopImmediatePropagation();

      const text = activeElement.value;
      let selStart = activeElement.selectionStart;

      // --- 🔍 ターゲットになる単語の範囲（開始位置と終了位置）を見つける ---
      let wordStart = selStart;
      let wordEnd = selStart;

      // 1. カーソルがスペースや改行、または文末にある場合（＝単語の直後や、次の単語の直前にいる場合）
      // 基準点を1文字左にずらして、前の単語を探しにいく
      if (wordStart > 0 && (text[wordStart] === ' ' || text[wordStart] === '\n' || wordStart === text.length)) {
        // スペースが連続している場合は、文字があるところまで左に戻る
        while (wordStart > 0 && (text[wordStart - 1] === ' ' || text[wordStart - 1] === '\n')) {
          wordStart--;
        }
      }

      // 2. 単語の開始位置（左端）を探す
      while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
        wordStart--;
      }

      // 3. 単語の終了位置（右端）を探す
      wordEnd = wordStart;
      while (wordEnd < text.length && text[wordEnd] !== ' ' && text[wordEnd] !== '\n') {
        wordEnd++;
      }

      // 切り出し対象の単語
      const targetWord = text.substring(wordStart, wordEnd);

      // --- 🔄 「と」⇄「to」のシンプル変換処理 ---
      if (targetWord.length > 0) {
        let convertedWord = targetWord;

        // 小文字・大文字・スペース入りなど、色々なパターンの「と」と「to」に対応
        const lowerWord = targetWord.toLowerCase().replace(/\s+/g, ''); // 空白を詰めて小文字化

        if (lowerWord === 'to') {
          // to, TO, t o, T O だったら「と」にする
          convertedWord = 'と';
        } else if (targetWord === 'と') {
          // 「と」だったら「to」にする
          convertedWord = 'to';
        } else {
          // 「と/to」以外の単語（例: appleなど）だった場合は、何もせず処理を抜ける
          return;
        }

        // --- 📝 テキストの置換とカーソル位置の保持 ---
        activeElement.value = text.substring(0, wordStart) + convertedWord + text.substring(wordEnd);

        // カーソル位置を、変換した単語のすぐ後ろにピタッと合わせる
        const newCursorPos = wordStart + convertedWord.length;
        activeElement.setSelectionRange(newCursorPos, newCursorPos);
      }
    }

    // 🛠️ 【条件チェック】直前の文字の状態（前方にスペースがあるか、または文頭か）
    let currentText = activeElement.value;
    let isPrevSpace = currentText.length === 0 || currentText.endsWith(" ");

    // 条件1: 前がスペース（または文頭）である
    // 条件2: 今のバッファが英単語ライブラリに完全一致している
    if (isPrevSpace && englishWords.includes(activeBuffer)) {
      // 💡 条件をすべて満たした時のみ、アルファベット（英語）として確定！
      insertText(activeElement, activeBuffer + (event.key === ' ' ? ' ' : ''));
    } else {
      // 💡 そうでなければ、100%普通の日本語（ひらがな）として確定！
      insertText(activeElement, translateToJapanese(activeBuffer) + (event.key === ' ' ? ' ' : ''));
    }

    // 次の入力のためにリセット
    activeBuffer = "";
    lastVisualLength = 0;
  }
  else if (event.key === 'Backspace') {
    activeBuffer = "";
    lastVisualLength = 0;
  }
}, true);

// 【メインロジック：タイピング中は100%ひらがな表示】
function handleCustomIME(activeElement, key) {
  deleteLeftText(activeElement, lastVisualLength);

  // 裏のバッファには生のアルファベット（helloやdayo）をしっかり記憶
  activeBuffer += key;

  // 💡 タイピング中の画面表示は、常に100%日本語（ひらがな）に翻訳して出す！（デフォはひらがな）
  let currentVisualText = translateToJapanese(activeBuffer);
  insertText(activeElement, currentVisualText);
  lastVisualLength = currentVisualText.length;
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