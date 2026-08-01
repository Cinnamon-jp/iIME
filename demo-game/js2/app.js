// --- 問題データ設定（ここを自由に書き換えてください） ---
const PROBLEMS = {
  easy: [
    "ねこ",
    "さくら",
    "宇宙人"
  ],
  normal: [
    "我々は宇宙人だ",
    "自作IMEのテストを行う",
    "タイピングゲームで変換精度を確かめる"
  ]
};

// 状態管理
let currentMode = 'free';
let currentIndex = 0;
let startTime = 0;

// UI要素の取得
const screenMenu = document.getElementById('screen-menu');
const screenGame = document.getElementById('screen-game');
const screenResult = document.getElementById('screen-result');

const targetTextEl = document.getElementById('target-text');
const inputEl = document.getElementById('typing-input');
const badgeEl = document.getElementById('game-mode-badge');
const progressEl = document.getElementById('game-progress');
const finalTimeEl = document.getElementById('final-time');

// 画面切替関数
function showScreen(screen) {
  screenMenu.classList.remove('active');
  screenGame.classList.remove('active');
  screenResult.classList.remove('active');
  screen.classList.add('active');
}

function showMenu() {
  showScreen(screenMenu);
}

// ゲーム開始
function startGame(mode) {
  currentMode = mode;
  currentIndex = 0;
  inputEl.value = '';

  if (mode === 'free') {
    badgeEl.textContent = '自由入力';
    progressEl.textContent = '試し打ち';
    targetTextEl.textContent = '好きな文字を入力してキー操作を試せます';
    showScreen(screenGame);
    inputEl.focus();
    return;
  }

  // タイピングモードの設定
  badgeEl.textContent = mode.toUpperCase();
  startTime = performance.now();
  updateProblem();
  showScreen(screenGame);
  inputEl.focus();
}

// お題更新
function updateProblem() {
  const list = PROBLEMS[currentMode];
  progressEl.textContent = `第 ${currentIndex + 1} / ${list.length} 問`;
  targetTextEl.textContent = list[currentIndex];
  inputEl.value = '';
}

// 入力判定処理
inputEl.addEventListener('keydown', (e) => {
  // Enterキーが押されたタイミングで判定（漢字変換完了後の確定Enter）
  if (e.key === 'Enter') {
    if (currentMode === 'free') return;

    const target = PROBLEMS[currentMode][currentIndex];
    const currentInput = inputEl.value.trim();

    // 完全一致判定（漢字・ひらがな含む）
    if (currentInput === target) {
      currentIndex++;
      if (currentIndex < PROBLEMS[currentMode].length) {
        updateProblem();
      } else {
        // 全問クリア時
        const endTime = performance.now();
        const clearTime = ((endTime - startTime) / 1000).toFixed(2);
        finalTimeEl.textContent = clearTime;
        showScreen(screenResult);
      }
    }
  }
});