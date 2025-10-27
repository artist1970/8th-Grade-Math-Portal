// scripts/tracker.js
export function loadProgress() {
  const week = localStorage.getItem('week') || 1;
  const missions = localStorage.getItem('missions') || 0;
  const grade = localStorage.getItem('grade') || '–';
  
  document.getElementById('week').textContent = week;
  document.getElementById('missions').textContent = missions;
  document.getElementById('grade').textContent = grade;
}

export function updateProgress({ week, missions, grade }) {
  if (week) localStorage.setItem('week', week);
  if (missions) localStorage.setItem('missions', missions);
  if (grade) localStorage.setItem('grade', grade);
  loadProgress();
}
