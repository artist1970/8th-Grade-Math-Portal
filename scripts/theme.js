// scripts/theme.js
export function setTheme(theme) {
  const themes = {
    deepspace: "radial-gradient(circle at 20% 20%, #0b1a3c, #000)",
    aurora: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
    nebula: "linear-gradient(135deg, #33001b, #ff0084)",
    comet: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    darkmatter: "linear-gradient(135deg, #000000, #434343)"
  };

  document.body.style.background = themes[theme] || themes.deepspace;
  localStorage.setItem('theme', theme);
}

export function getTheme() {
  return localStorage.getItem('theme') || 'deepspace';
}
