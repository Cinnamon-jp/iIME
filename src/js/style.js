const searchInput = document.querySelector('input[name="q"], textarea[name="q"]');
if (searchInput) {
    searchInput.style.backgroundColor = 'transparent';
    searchInput.style.borderColor = '#8ab4f8';
    searchInput.style.borderWidth = '2px';
    searchInput.style.boxShadow = '0 0 8px rgba(138, 180, 248, 0.5)';
}