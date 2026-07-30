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