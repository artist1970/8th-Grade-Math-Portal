// scripts/teacherDashboard.js
import { getAllStudentsProgress, saveStudentProgress } from './dataHandler.js';

// DOM Elements
const studentsTbody = document.getElementById('studentsTbody');
const selectedPanel = document.getElementById('selectedPanel');
const exportContainer = document.getElementById('exportContainer');
let currentChart;

// --- Load all students ---
function loadStudentsList() {
  const allProgress = getAllStudentsProgress();
  return Object.keys(allProgress).map(name => ({ name, progress: allProgress[name] }));
}

// --- Render Students Table ---
export function renderStudentsTable() {
  const students = loadStudentsList();
  studentsTbody.innerHTML = '';

  if (!students.length) {
    studentsTbody.innerHTML = `<tr><td colspan="8" class="muted">No students yet.</td></tr>`;
    return;
  }

  students.forEach(student => {
    const avg = computeOverallAverage(student.progress);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${student.name}</strong></td>
      <td>${displayScore(student.progress['Pre-Algebra'])}</td>
      <td>${displayScore(student.progress['Algebra'])}</td>
      <td>${displayScore(student.progress['Geometry'])}</td>
      <td>${displayScore(student.progress['Probability'])}</td>
      <td>${displayScore(student.progress['Problem Solving'])}</td>
      <td>${avg}%</td>
      <td><button class="editBtn" data-name="${student.name}">Edit</button></td>
    `;
    studentsTbody.appendChild(tr);
  });

  // Attach edit buttons
  document.querySelectorAll('.editBtn').forEach(btn => btn.addEventListener('click', onEditStudent));
}

// --- Display Helpers ---
function displayScore(subjectProgress) {
  if (!subjectProgress) return '—';
  const latest = subjectProgress[subjectProgress.length - 1];
  if (!latest) return '—';
  return `${latest.score ?? 0}`;
}

function computeOverallAverage(progress) {
  let total = 0, count = 0;
  Object.values(progress).forEach(chapters => {
    if (!chapters || !chapters.length) return;
    chapters.forEach(c => {
      total += c.score ?? 0;
      count++;
    });
  });
  return count ? Math.round(total / count) : 0;
}

// --- Edit Student ---
function onEditStudent(e) {
  const studentName = e.currentTarget.dataset.name;
  const students = loadStudentsList();
  const student = students.find(s => s.name === studentName);
  if (!student) return;

  showStudentEditor(student);
}

// --- Student Editor Panel ---
function showStudentEditor(student) {
  selectedPanel.innerHTML = `
    <h3>Edit ${student.name}</h3>
    <div style="margin-bottom:8px;">
      <label>Subject Scores (0–100)</label>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1fr; gap:8px; margin-top:4px;">
        <input id="score_pre" placeholder="Pre-Algebra" value="${getLatestScore(student.progress['Pre-Algebra'])}">
        <input id="score_alg" placeholder="Algebra" value="${getLatestScore(student.progress['Algebra'])}">
        <input id="score_geo" placeholder="Geometry" value="${getLatestScore(student.progress['Geometry'])}">
        <input id="score_prob" placeholder="Probability" value="${getLatestScore(student.progress['Probability'])}">
        <input id="score_ps" placeholder="Problem Solving" value="${getLatestScore(student.progress['Problem Solving'])}">
      </div>
    </div>
    <div style="margin-bottom:8px;">
      <button id="saveStudentBtn" class="primary">Save</button>
      <button id="addWeekBtn">Add Weekly Entry</button>
      <button id="cancelEditBtn">Cancel</button>
    </div>
    <canvas id="weeklyChart" width="400" height="200"></canvas>
  `;

  // Event listeners
  document.getElementById('cancelEditBtn').addEventListener('click', () => selectedPanel.innerHTML = '');
  document.getElementById('saveStudentBtn').addEventListener('click', () => saveStudentEdits(student.name));
  document.getElementById('addWeekBtn').addEventListener('click', () => addWeeklyEntry(student.name));

  renderStudentChart(student.progress);
}

// --- Get Latest Score Helper ---
function getLatestScore(subjectProgress) {
  if (!subjectProgress || !subjectProgress.length) return '';
  return subjectProgress[subjectProgress.length - 1].score ?? '';
}

// --- Save Student Edits ---
function saveStudentEdits(studentName) {
  const subjects = ['Pre-Algebra','Algebra','Geometry','Probability','Problem Solving'];
  subjects.forEach(subject => {
    const inputId = `score_${subject.slice(0,3).toLowerCase()}`;
    const score = parseInt(document.getElementById(inputId).value) || 0;
    saveStudentProgress(studentName, subject, `Manual Entry`, score, 100);
  });

  alert(`Saved scores for ${studentName}`);
  renderStudentsTable();
}

// --- Add Weekly Entry ---
function addWeeklyEntry(studentName) {
  const weekLabel = prompt("Enter week label (e.g., Week 5)");
  if (!weekLabel) return;

  const subjects = ['Pre-Algebra','Algebra','Geometry','Probability','Problem Solving'];
  subjects.forEach(subject => {
    const latestScore = getLatestScore(getAllStudentsProgress()[studentName][subject]) || 0;
    saveStudentProgress(studentName, subject, weekLabel, latestScore, 100);
  });

  alert(`Weekly entry "${weekLabel}" recorded for ${studentName}`);
  renderStudentsTable();
}

// --- Chart Rendering ---
function renderStudentChart(progress) {
  const subjects = Object.keys(progress);
  const weeksSet = new Set();
  // Gather all weeks
  subjects.forEach(sub => progress[sub].forEach(c => weeksSet.add(c.name)));
  const weeks = Array.from(weeksSet).sort();

  const datasets = subjects.map(sub => ({
    label: sub,
    data: weeks.map(week => {
      const entry = progress[sub].find(c => c.name === week);
      return entry ? entry.score : 0;
    }),
    fill: false,
    borderColor: randomColor(),
    tension: 0.2
  }));

  const ctx = document.getElementById('weeklyChart').getContext('2d');
  if (currentChart) currentChart.destroy();

  currentChart = new Chart(ctx, {
    type: 'line',
    data: { labels: weeks, datasets },
    options: { scales: { y: { beginAtZero:true, max:100 } } }
  });
}

// --- Random Color Helper ---
function randomColor() {
  return `hsl(${Math.floor(Math.random()*360)},70%,50%)`;
}

// --- Export Controls ---
export function renderExportControls() {
  if (!exportContainer) return;
  exportContainer.innerHTML = `
    <h3>📦 Export Data</h3>
    <button id="exportSummaryBtn">Export Current Grades (CSV)</button>
    <button id="exportWeeklyBtn">Export Weekly Progress (CSV)</button>
  `;

  document.getElementById('exportSummaryBtn').addEventListener('click', exportSummaryCSV);
  document.getElementById('exportWeeklyBtn').addEventListener('click', exportWeeklyCSV);
}

function exportSummaryCSV() {
  const students = loadStudentsList();
  if (!students.length) return alert('No students found.');

  const headers = ["Student","Pre-Algebra","Algebra","Geometry","Probability","Problem Solving"];
  const rows = students.map(s => {
    return [
      s.name,
      getLatestScore(s.progress['Pre-Algebra']),
      getLatestScore(s.progress['Algebra']),
      getLatestScore(s.progress['Geometry']),
      getLatestScore(s.progress['Probability']),
      getLatestScore(s.progress['Problem Solving'])
    ];
  });

  downloadCSV([headers, ...rows], "Student_Grades_Summary.csv");
}

function exportWeeklyCSV() {
  const students = loadStudentsList();
  if (!students.length) return alert('No students found.');

  const headers = ["Student","Subject","Week","Score"];
  const rows = [];

  students.forEach(s => {
    Object.entries(s.progress).forEach(([subject, entries]) => {
      entries.forEach(entry => {
        rows.push([s.name, subject, entry.name, entry.score]);
      });
    });
  });

  downloadCSV([headers, ...rows], "Student_Weekly_Progress.csv");
}

// --- CSV Download Helper ---
function downloadCSV(dataArray, filename) {
  const csv = dataArray.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// --- Initialize ---
export function initTeacherDashboard() {
  renderStudentsTable();
  renderExportControls();
}
