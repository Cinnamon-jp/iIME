// インプット枠の控えめなグローアニメーション用スタイル追加
const glowStyle = document.createElement('style');
glowStyle.textContent = `
  @keyframes subtleGlowEffect {
    0% {
      box-shadow: 0 0 16px rgba(212, 163, 89, 0.55), inset 0 0 6px rgba(212, 163, 89, 0.25);
      border-color: #d4a359;
    }
    100% {
      box-shadow: 0 4px 20px rgba(74, 65, 53, 0.05);
      border-color: #e6dfd5;
    }
  }
  .glow-flash {
    animation: subtleGlowEffect 0.4s ease-out;
  }
`;
document.head.appendChild(glowStyle);

// --- パーティクルキャンバスの初期化と管理 ---
let particleCanvas = null;
let particleCtx = null;
let activeParticles = [];
let animFrameId = null;

function initParticleCanvas() {
  if (particleCanvas) return;
  particleCanvas = document.createElement('canvas');
  particleCanvas.id = 'enter-particles-canvas';
  particleCanvas.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:99999;';
  document.body.appendChild(particleCanvas);
  particleCtx = particleCanvas.getContext('2d');

  const resize = () => {
    if (!particleCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    particleCanvas.width = window.innerWidth * dpr;
    particleCanvas.height = window.innerHeight * dpr;
    particleCtx.scale(dpr, dpr);
  };
  window.addEventListener('resize', resize);
  resize();
}

function spawnParticleExplosion(rect) {
  initParticleCanvas();
  
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const particleCount = 38;
  const colors = [
    '#d4a359', '#8c6d46', '#f5eee4', '#ffffff', 
    '#e5c178', '#b88d55', '#ffd79b'
  ];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    const isStar = Math.random() > 0.5;
    const isRing = Math.random() > 0.8;

    activeParticles.push({
      x: centerX + (Math.random() - 0.5) * (rect.width * 0.7),
      y: centerY + (Math.random() - 0.5) * 10,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (Math.random() * 3.5 + 1.5),
      size: isRing ? 12 : (Math.random() * 6 + 3),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1.0,
      decay: 0.016 + Math.random() * 0.02,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
      gravity: 0.22,
      isStar: isStar,
      isRing: isRing,
      ringRadius: 4,
      maxRingRadius: 24 + Math.random() * 20
    });
  }

  if (!animFrameId) {
    animFrameId = requestAnimationFrame(updateParticles);
  }
}

function updateParticles() {
  if (!particleCtx || !particleCanvas) return;
  
  const dpr = window.devicePixelRatio || 1;
  particleCtx.clearRect(0, 0, particleCanvas.width / dpr, particleCanvas.height / dpr);

  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.alpha -= p.decay;
    p.rotation += p.rotSpeed;

    if (p.isRing) {
      p.ringRadius += (p.maxRingRadius - p.ringRadius) * 0.12;
    }

    if (p.alpha <= 0) {
      activeParticles.splice(i, 1);
      continue;
    }

    particleCtx.save();
    particleCtx.globalAlpha = Math.max(0, p.alpha);
    particleCtx.fillStyle = p.color;
    particleCtx.strokeStyle = p.color;

    if (p.isRing) {
      particleCtx.lineWidth = 2;
      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.ringRadius, 0, Math.PI * 2);
      particleCtx.stroke();
    } else if (p.isStar) {
      particleCtx.translate(p.x, p.y);
      particleCtx.rotate(p.rotation);
      drawStar(particleCtx, 0, 0, 4, p.size, p.size / 2.5);
      particleCtx.fill();
    } else {
      particleCtx.translate(p.x, p.y);
      particleCtx.rotate(p.rotation);
      particleCtx.beginPath();
      particleCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      particleCtx.fill();
    }

    particleCtx.restore();
  }

  if (activeParticles.length > 0) {
    animFrameId = requestAnimationFrame(updateParticles);
  } else {
    animFrameId = null;
  }
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}

// --- 確定テキスト飛翔アニメーション ---
function spawnFlyingText(inputElement, text) {
  if (!text || text.trim().length === 0) return;

  const toast = document.getElementById('committed-toast');
  if (!toast) return;

  const inputRect = inputElement.getBoundingClientRect();
  const toastRect = toast.getBoundingClientRect();

  const flyEl = document.createElement('div');
  flyEl.className = 'flying-committed-text';
  flyEl.textContent = text;

  // 初期位置：入力欄の文字位置あたり
  flyEl.style.left = `${inputRect.left + 24}px`;
  flyEl.style.top = `${inputRect.top + 12}px`;

  document.body.appendChild(flyEl);

  // ブラウザの描画を反映
  void flyEl.offsetWidth;

  // 移動ターゲット計算
  const targetX = (toastRect.left + toastRect.width / 2) - (inputRect.left + 24) - 60;
  const targetY = (toastRect.top + 4) - (inputRect.top + 12);

  flyEl.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.65)`;
  flyEl.style.opacity = '0.1';
  flyEl.style.filter = 'blur(3px)';

  setTimeout(() => {
    if (flyEl.parentNode) {
      flyEl.parentNode.removeChild(flyEl);
    }
    // トースト側の弾むアニメーション発動
    toast.classList.remove('toast-pop');
    void toast.offsetWidth;
    toast.classList.add('toast-pop');
  }, 580);
}

// --- Space押下時等の控えめな枠発光エフェクト ---
window.triggerSubtleGlow = function(element) {
  if (!element) return;

  element.classList.remove('glow-flash');
  void element.offsetWidth;
  element.classList.add('glow-flash');

  const card = element.closest('.input-card');
  if (card) {
    const kbdItems = card.querySelectorAll('kbd');
    kbdItems.forEach(kbd => {
      if (kbd.textContent.includes('Space')) {
        kbd.classList.remove('kbd-active-flash');
        void kbd.offsetWidth;
        kbd.classList.add('kbd-active-flash');
        setTimeout(() => kbd.classList.remove('kbd-active-flash'), 250);
      }
    });
  }
};

// --- Enter確定時等の派手なフルエフェクト ---
window.triggerEnterEffect = function(element, text = "") {
  if (!element) return;

  // 1. 入力欄自体の枠発光
  window.triggerSubtleGlow(element);

  const wrapper = element.closest('.input-wrapper');
  if (wrapper) {
    // 2. 衝撃波リング（Shockwave Aura）
    const existingShockwave = wrapper.querySelector('.glow-shockwave');
    if (existingShockwave) existingShockwave.remove();
    
    const shockwave = document.createElement('div');
    shockwave.className = 'glow-shockwave';
    wrapper.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 600);
  }

  // 3. 入力カード全体の躍動インパクト（Elastic Bounce）
  const card = element.closest('.input-card');
  if (card) {
    card.classList.remove('card-enter-impact');
    void card.offsetWidth;
    card.classList.add('card-enter-impact');

    const kbdItems = card.querySelectorAll('kbd');
    kbdItems.forEach(kbd => {
      if (kbd.textContent.includes('Enter')) {
        kbd.classList.remove('kbd-active-flash');
        void kbd.offsetWidth;
        kbd.classList.add('kbd-active-flash');
        setTimeout(() => kbd.classList.remove('kbd-active-flash'), 350);
      }
    });
  }

  // 4. パーティクル爆発 & 確定テキスト飛翔
  const rect = element.getBoundingClientRect();
  spawnParticleExplosion(rect);

  if (text && text.trim().length > 0) {
    spawnFlyingText(element, text);
  }
};

// 互換性のためのエイリアス関数
window.triggerGlow = function(element, text) {
  if (text !== undefined) {
    window.triggerEnterEffect(element, text);
  } else {
    window.triggerSubtleGlow(element);
  }
};

let toastTimer = null;
window.showCommittedMessage = function(text) {
  const toast = document.getElementById('committed-toast');
  if (!toast) return;

  toast.innerHTML = `<span class="toast-label">確定</span><span class="toast-text">「${escapeHtml(text)}」</span>`;
  toast.classList.add('visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 4500);
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}