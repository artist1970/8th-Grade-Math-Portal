// scripts/main.js
import { setTheme } from './theme.js';
import { loadProgress } from './tracker.js';
import { openAdminModal } from './teacher.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 Cosmic Math Mission initialized.");

  // Default theme
  setTheme('deepspace');

  // Load student progress
  loadProgress();

  // Attach event listeners
  document.querySelectorAll('.nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const subject = btn.textContent.toLowerCase().replace(/ /g, '');
      loadModule(subject);
    });
  });

  document.querySelector('.teacher-access').addEventListener('click', openAdminModal);
});

function loadModule(subject) {
  const content = document.getElementById('content');
  content.innerHTML = `<h2>${subject}</h2><p>Loading ${subject} module...</p>`;
  import(`./modules/${subject}.js`)
    .then(module => module.initModule())
    .catch(() => content.innerHTML = `<p>Module under construction.</p>`);
}
