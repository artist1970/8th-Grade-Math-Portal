// scripts/main.js
import { setTheme } from './theme.js';
import { getAllStudents, getStudentProgress, calculateSubjectAverage } from './tracker.js';
import { openAdminModal } from './teacher.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 Cosmic Math Mission initialized.");

  // Set default theme
  setTheme('deepspace');

  // Populate student selector
  initStudentSelector();

  // Teacher access button
  const teacherBtn = document.querySelector('.teacher-access');
  if (teacherBtn) teacherBtn.addEventListener('click', openAdminModal);

  // Subject navigation
  document.querySelectorAll('.nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const subject = btn.textContent.toLowerCase().replace(/ /g, '');
      loadModule(subject);
    });
  });
});

// --- Student Selector ---
function initStudentSelector() {
  const selector = document.getElementById('studentName') || document.getElementById('studentList');
  if (!selector) return;

  const allStudents = getAllStudents();
  selector.innerHTML = '';
  for (const student of Object.keys(allStudents)) {
    const option = document.createElement('option');
    option.value = student;
    option.textContent = student;
    selector.appendChild(option);
  }
}

// --- Load a subject module dynamically ---
function loadModule(subject) {
  const content = document.getElementById('content');
  if (!content) return;

  content.innerHTML = `<h2>${capitalize(subject)}</h2><p>Loading ${subject} module...</p>`;

  import(`./modules/${subject}.js`)
    .then(module => {
      if (module.initModule) module.initModule();
    })
    .catch(err => {
      console.error(err);
      content.innerHTML = `<p>Module under construction.</p>`;
    });
}

// --- Utility ---
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- Optional: Update weekly history / charts after quiz/test ---
export function updateStudentProgressUI(studentName) {
  const progress = getStudentProgress(studentName);
  // Example: update chart, averages, etc.
  for (const subject of Object.keys(progress)) {
    const avg = calculateSubjectAverage(studentName, subject);
    const el = document.getElementById(`${subject}Average`);
    if (el) el.textContent = avg + '%';
  }
}
