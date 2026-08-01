const glowStyle = document.createElement('style');
glowStyle.textContent = `
  @keyframes glowEffect {
    0% {
      box-shadow: 0 0 18px rgba(212, 163, 89, 0.6), inset 0 0 8px rgba(212, 163, 89, 0.3);
      border-color: #d4a359;
    }
    100% {
      box-shadow: 0 4px 20px rgba(74, 65, 53, 0.05);
      border-color: #e6dfd5;
    }
  }
  .glow-flash {
    animation: glowEffect 0.4s ease-out;
  }
`;
document.head.appendChild(glowStyle);

window.triggerGlow = function(element) {
  if (!element) return;
  element.classList.remove('glow-flash');
  void element.offsetWidth;
  element.classList.add('glow-flash');
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