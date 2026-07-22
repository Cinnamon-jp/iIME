// タイピングした生のアルファベットを裏で記憶するバッファ
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

  // ========================================================
  // 🌟【完全解決版】入力欄ごとの隠し記憶を使う相互変換システム
  // ========================================================
  if (event.key === 'Enter') {
    const text = activeElement.value;
    let selStart = activeElement.selectionStart;
    let wordStart = selStart;
    while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') { wordStart--; }
    let wordEnd = selStart;
    while (wordEnd < text.length && text[wordEnd] !== ' ' && text[wordEnd] !== '\n') { wordEnd++; }
    const targetWord = text.substring(wordStart, wordEnd);

    if (targetWord.length > 0) {
      let convertedWord = targetWord;

      // 🧠【1番目の判定】もしこの入力欄の隠しポケットに「変換前の記憶」があるなら、それをそのまま戻す（2回目のEnter）
      if (activeElement._lastRawInput && activeElement._lastRawInput.word === targetWord) {
        convertedWord = activeElement._lastRawInput.raw;
        activeElement._lastRawInput = null; // 戻したら隠しポケットを空にする
      }
      // 🧠【2番目の判定】隠しポケットが空なら、通常の「アルファベット ➔ 日本語」を実行して記憶する（1回目のEnter）
      else {
        const lowerTarget = targetWord.toLowerCase();
        let convertedKana = "";
        if (typeof translateToJapanese === 'function') {
          convertedKana = translateToJapanese(lowerTarget);
        }

        if (convertedKana && convertedKana !== lowerTarget) {
          let finalResult = "";
          for (let i = 0; i < convertedKana.length; i++) {
            const origChar = targetWord[i];
            if (origChar && /[A-Z]/.test(origChar)) {
              finalResult += origChar;
            } else {
              finalResult += convertedKana[i];
            }
          }
          convertedWord = finalResult;

          // 🌟【隠しポケットに保存】
          // 変換後の単語（Hこんにちは）と、変換前の生の入力（Hkonnnitiha）をセットにして入力欄に持たせる
          activeElement._lastRawInput = {
            word: convertedWord,
            raw: targetWord
          };
        }
      }

      // 画面の文字を書き換える
      if (convertedWord !== targetWord) {
        event.preventDefault();
        event.stopImmediatePropagation();
        activeElement.value = text.substring(0, wordStart) + convertedWord + text.substring(wordEnd);
        const newCursorPos = wordStart + convertedWord.length;
        activeElement.setSelectionRange(newCursorPos, newCursorPos);
        return;
      }
    }
  }
  // 🌟【安全な割り込み処理】Enterキーが押された時だけ、大文字キープで「と」⇄「to」や「Hえっぉ」⇄「Hello」を切り替える
  if (event.key === 'Enter') {
    const text = activeElement.value;
    let selStart = activeElement.selectionStart;

    // --- 🔍 ターゲットになる単語の範囲を見つける（toの時と100%同じ条件） ---
    let wordStart = selStart;
    let wordEnd = selStart;

    if (wordStart > 0 && (text[wordStart] === ' ' || text[wordStart] === '\n' || wordStart === text.length)) {
      while (wordStart > 0 && (text[wordStart - 1] === ' ' || text[wordStart - 1] === '\n')) {
        wordStart--;
      }
    }

    while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
      wordStart--;
    }

    wordEnd = wordStart;
    while (wordEnd < text.length && text[wordEnd] !== ' ' && text[wordEnd] !== '\n') {
      wordEnd++;
    }

    const targetWord = text.substring(wordStart, wordEnd);

    // --- 🔄 相互切り替えロジック ---
    if (targetWord.length > 0) {
      event.preventDefault();
      event.stopImmediatePropagation();

      let convertedWord = targetWord;

      // 1. 特別ルール：「と」⇄「to」の切り替え
      const lowerWord = targetWord.toLowerCase().replace(/\s+/g, '');
      if (lowerWord === 'to') {
        convertedWord = 'と';
      } else if (targetWord === 'と') {
        const lastChar = wordStart > 0 ? text[wordStart - 1] : "";
        convertedWord = /[A-Z]/.test(lastChar) ? 'To' : 'to';
      }
      // 2. Hello ⇄ Hえっぉ（大文字キープ）
      // 2. Hello ⇄ Hえっぉ などの「相互」切り替え（大文字キープ）
      else {
        const isAlphabet = /[a-zA-Z]/.test(targetWord);

        if (isAlphabet) {
          // 【1】英語 ➔ 日本語への変換
          // 1. 元の単語の大文字の位置（何文字目か）をすべて記録する
          const upperIndices = [];
          for (let i = 0; i < targetWord.length; i++) {
            if (/[A-Z]/.test(targetWord[i])) {
              upperIndices.push(i);
            }
          }

          // 2. 一度すべて小文字にしてから、あなたのシステムのかな変換に通す
          const lowerTarget = targetWord.toLowerCase();
          const convertedKana = translateToJapanese(lowerTarget); // hello ➔ へっぉ

          // 3. 変換後のひらがなに対して、元々大文字だった位置の文字を大文字アルファベットに戻す
          let finalResult = "";
          for (let i = 0; i < convertedKana.length; i++) {
            if (upperIndices.includes(i)) {
              // 元が大文字だった位置は、元のアルファベット（大文字）をそのまま差し込む
              finalResult += targetWord[i];
            } else {
              finalResult += convertedKana[i];
            }
          }
          convertedWord = finalResult;

        } else {
          // 【2】日本語 ➔ 英語への逆変換
          // 💡 あなたのシステムにある「ひらがな➔ローマ字変換関数」の名前（例: translateToEnglish）に書き換えてください
          if (typeof translateToEnglish === 'function') {
            const convertedRomaji = translateToEnglish(targetWord); // へっぉ ➔ hello

            // ※もし日本語➔英語の時も特定の位置を大文字にしたい場合はルールが必要ですが、
            // 一旦はそのままアルファベットに戻す処理を走らせます。
            convertedWord = convertedRomaji;
          }
        }
      }

      // --- 📝 画面の文字を書き換えてカーソル位置を保持 ---
      activeElement.value = text.substring(0, wordStart) + convertedWord + text.substring(wordEnd);
      const newCursorPos = wordStart + convertedWord.length;
      activeElement.setSelectionRange(newCursorPos, newCursorPos);
      return; // 💡 Enterの処理が終わったら、これ以降の元のコード（スペース判定など）は実行させずにここで終了する
    }
  }

  if (event.keyCode !== 229 && key.match(/^[a-z]$/)) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const text = activeElement.value;
    const selStart = activeElement.selectionStart;

    // 🔍 現在入力中の単語の「開始位置」を探す
    let wordStart = selStart;
    while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
      wordStart--;
    }

    // 現在入力中の単語を切り出す
    const currentWord = text.substring(wordStart, selStart);

    // 🌟【最優先ルール】すでに単語内に「大文字アルファベット」があるか、今Shiftが押されている場合
    const isEnglishWordMode = event.shiftKey || /[A-Z]/.test(currentWord);

    if (isEnglishWordMode) {
      // Shiftありなら大文字、なしなら小文字にする
      const targetKey = event.shiftKey ? key.toUpperCase() : key.toLowerCase();

      // 💡不具合の原因（日本語化）をバイパスするため、IME関数を通さずに直接文字を入力する！
      activeElement.value = text.substring(0, selStart) + targetKey + text.substring(activeElement.selectionEnd);

      // カーソル位置を1文字進める
      const newPos = selStart + 1;
      activeElement.setSelectionRange(newPos, newPos);
    }
    // 🌟 Shiftなし ＆ まだ大文字がない通常時（元の完璧な自動判定に任せる）
    else {
      handleCustomIME(activeElement, key);
    }
  } // 👈 さいごの閉じカッコ

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
          // 🌟「と/to」以外の一般の単語（Hello ⇄ Hえっぉ）の相互変換処理
          const isAlphabet = /[a-zA-Z]/.test(targetWord);

          if (isAlphabet) {
            // 🅰️【アルファベット ➔ 日本語】
            const lowerTarget = targetWord.toLowerCase();

            // あなたのIMEの変換関数を使って、単語丸ごと綺麗にひらがな化
            let convertedKana = "";
            if (typeof translateToJapanese === 'function') {
              convertedKana = translateToJapanese(lowerTarget); // hello ➔ へっぉ
            }

            if (convertedKana && convertedKana !== lowerTarget) {
              // 元の単語の大文字だった位置（Hなど）を正確にキープしてドッキング
              let finalResult = "";
              for (let i = 0; i < convertedKana.length; i++) {
                const origChar = targetWord[i];
                if (origChar && /[A-Z]/.test(origChar)) {
                  finalResult += origChar; // 元が大文字ならアルファベットのまま残す
                } else {
                  finalResult += convertedKana[i];
                }
              }
              convertedWord = finalResult;
            }
          } else {
            // 🈹【日本語 ➔ アルファベット】（逆変換）
            // あなたが元々持っている「タイピング中の英単語の記憶（activeBuffer）」を画面に呼び戻す！
            if (activeBuffer && activeBuffer.length > 0) {
              convertedWord = activeBuffer;
            } else {
              // 💡 もし確定後などで裏の記憶がなければ、そのまま処理を抜ける
              return;
            }
          }
        }
        // 🌟【これだけ足す】日本語からアルファベットに逆変換する
        if (event.key === 'Enter' && !/[a-zA-Z]/.test(targetWord)) {
          const kanaToRomajiMap = { 'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o', 'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko', 'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so', 'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to', 'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no', 'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho', 'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo', 'や': 'ya', 'ゆ': 'yu', 'よ': 'yo', 'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro', 'わ': 'wa', 'を': 'wo', 'ん': 'n', 'ぉ': 'o', 'っ': '' };
          let finalResult = "";
          for (let i = 0; i < targetWord.length; i++) {
            const char = targetWord[i];
            if (/[a-zA-Z]/.test(char)) { finalResult += char; } else {
              let romaji = kanaToRomajiMap[char] || char;
              if (char === 'っ' && i + 1 < targetWord.length) { const nextRomaji = kanaToRomajiMap[targetWord[i + 1]] || ""; if (nextRomaji) romaji = nextRomaji[0]; }
              finalResult += romaji;
            }
          }
          if (targetWord.includes('っ') && finalResult.toLowerCase().includes('eo')) { finalResult = finalResult.replace(/[eE][oO]/, (match) => match[0] + 'llo'); }
          convertedWord = finalResult;
        }

        // 🌟【重要】往復（相互）で何回でも切り替えられるように、変換後の状態を裏の記憶にセットする
        if (convertedWord !== targetWord) {
          if (/[a-zA-Z]/.test(convertedWord)) {
            // アルファベットに戻ったなら、次Enterを押した時のためにバッファにセット
            activeBuffer = convertedWord;
          } else {
            // 日本語（Hえっぉ）に変わったなら、元のアルファベット（targetWord）を記憶に残す
            activeBuffer = targetWord;
          }
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

   // 先頭が大文字かどうかの判定
    const isStartWithUpper = /^[A-Z]/.test(activeBuffer);

  // 条件A: 先頭が大文字である（無条件）
  // 条件B: 前がスペース(文頭) ＆ 英単語ライブラリに一致する
  if (
      isStartWithUpper || 
     (isPrevSpace && englishWords.includes(activeBuffer.toLowerCase()))
     ) {
  // 💡 上記のどちらかを満たせば、アルファベット（英語）として確定！
   insertText(activeElement, activeBuffer + (event.key === ' ' ? ' ' : ''));
   } else {
  // 💡 それ以外は、100%普通の日本語（ひらがな）として確定！
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