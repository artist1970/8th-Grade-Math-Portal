// scripts/teacherDashboard.js
// Teacher Dashboard module
// Author: Cosmic Math Mission (adapted for your project)

const STUDENTS_KEY = 'cmm_students_v1'; // single storage key for all students

// mission keys used per student object
const MISSION_KEYS = ['prealgebraScore','algebraScore','geometryScore','probabilityScore','problemSolvingScore'];

// safe localStorage helpers (fall back)
function saveRaw(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadRaw(key) {
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) : null;
}

// CRUD for students
function loadStudents() {
  return loadRaw(STUDENTS_KEY) || [];
}
function saveStudents(list) {
  saveRaw(STUDENTS_KEY, list);
}
function addStudent(student) {
  const list = loadStudents();
  list.push(student);
  saveStudents(list);
}

function uid() {
  return 's_' + Math.random().toString(36).slice(2,9);
}

// render table
function renderStudentsTable() {
  const tbody = document.getElementById('studentsTbody');
  tbody.innerHTML = '';
  const students = loadStudents();
  if (!students.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="muted">No students yet. Click "Add Student" to begin.</td></tr>`;
    return;
  }

  for (const s of students) {
    const avg = computeAverage(s);
    const tr = document.createElement('tr');
    tr.classList.add('student-row');
    tr.innerHTML = `
      <td><strong>${escapeHtml(s.name)}</strong><div class="small muted">${s.id}</div></td>
      <td>${displayScore(s.prealgebraScore)}</td>
      <td>${displayScore(s.algebraScore)}</td>
      <td>${displayScore(s.geometryScore)}</td>
      <td>${displayScore(s.probabilityScore)}</td>
      <td>${displayScore(s.problemSolvingScore)}</td>
      <td>${avg}</td>
      <td>
        <button data-id="${s.id}" class="editBtn">Edit</button>
        <button data-id="${s.id}" class="delBtn">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  }

  // attach events
  document.querySelectorAll('.editBtn').forEach(b => b.addEventListener('click', onEditStudent));
  document.querySelectorAll('.delBtn').forEach(b => b.addEventListener('click', onDeleteStudent));
}

function displayScore(v) { return (v === null || v === undefined) ? '—' : `${v}%`; }
function computeAverage(s) {
  let sum = 0, count = 0;
  for (const k of MISSION_KEYS) {
    if (s[k] !== undefined && s[k] !== null) {
      sum += Number(s[k]);
      count++;
    }
  }
  return count ? Math.round(sum / count) + '%' : '—';
}

function onEditStudent(e) {
  const id = e.currentTarget.dataset.id;
  const students = loadStudents();
  const s = students.find(x => x.id === id);
  if (!s) return alert('Student not found.');

  showStudentEditor(s);
}

function onDeleteStudent(e) {
  const id = e.currentTarget.dataset.id;
  if (!confirm('Delete this student permanently?')) return;
  let students = loadStudents();
  students = students.filter(x => x.id !== id);
  saveStudents(students);
  renderStudentsTable();
  clearSelectedPanel();
}

// selected panel UI
function showStudentEditor(student) {
  const panel = document.getElementById('selectedPanel');
  panel.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:8px">
      <input id="stuName" placeholder="Full name" value="${escapeHtml(student.name || '')}" />
      <input id="stuId" placeholder="ID" value="${escapeHtml(student.id || '')}" disabled />
    </div>

    <div style="margin-bottom:8px">
      <label class="small muted">Mission Scores (0–100)</label>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:6px">
        <input id="score_pre" placeholder="Pre-Algebra" value="${valOrEmpty(student.prealgebraScore)}" />
        <input id="score_alg" placeholder="Algebra" value="${valOrEmpty(student.algebraScore)}" />
        <input id="score_geo" placeholder="Geometry" value="${valOrEmpty(student.geometryScore)}" />
        <input id="score_prob" placeholder="Probability" value="${valOrEmpty(student.probabilityScore)}" />
        <input id="score_ps" placeholder="Problem Solving" value="${valOrEmpty(student.problemSolvingScore)}" />
      </div>
    </div>

    <div style="display:flex;gap:8px">
      <button id="saveStudentBtn" class="primary">Save</button>
      <button id="cancelEditBtn">Cancel</button>
    </div>
  `;

  document.getElementById('saveStudentBtn').addEventListener('click', () => {
    const students = loadStudents();
    const idx = students.findIndex(x => x.id === student.id);
    if (idx === -1) return alert('Student not found.');

    students[idx].name = document.getElementById('stuName').value.trim() || students[idx].name;
    students[idx].prealgebraScore = parseScore(document.getElementById('score_pre').value);
    students[idx].algebraScore = parseScore(document.getElementById('score_alg').value);
    students[idx].geometryScore = parseScore(document.getElementById('score_geo').value);
    students[idx].probabilityScore = parseScore(document.getElementById('score_prob').value);
    students[idx].problemSolvingScore = parseScore(document.getElementById('score_ps').value);

    saveStudents(students);
    renderStudentsTable();
    showStudentEditor(students[idx]);
  });

  document.getElementById('cancelEditBtn').addEventListener('click', clearSelectedPanel);
}

function clearSelectedPanel() {
  const panel = document.getElementById('selectedPanel');
  panel.innerHTML = `<div class="muted">No student selected</div>`;
}

function valOrEmpty(v) { return (v === null || v === undefined) ? '' : v; }
function parseScore(v) {
  if (v === '') return null;
  const n = Number(v);
  if (isNaN(n) || n < 0 || n > 100) { alert('Scores must be numbers between 0 and 100.'); return null; }
  return Math.round(n);
}

// Add Student flow
function onAddStudent() {
  const name = prompt('Enter student full name:');
  if (!name) return;
  const s = {
    id: uid(),
    name: name.trim(),
    prealgebraScore: null,
    algebraScore: null,
    geometryScore: null,
    probabilityScore: null,
    problemSolvingScore: null,
    createdAt: new Date().toISOString()
  };
  addStudent(s);
  renderStudentsTable();
  showStudentEditor(s);
}

// Export CSV
function exportCSV() {
  const students = loadStudents();
  if (!students.length) return alert('No students to export.');

  const headers = ['id','name','prealgebraScore','algebraScore','geometryScore','probabilityScore','problemSolvingScore','avg'];
  const rows = [headers.join(',')];

  for (const s of students) {
    const avg = computeAverage(s);
    const row = [
      csvSafe(s.id),
      csvSafe(s.name),
      csvSafe(s.prealgebraScore),
      csvSafe(s.algebraScore),
      csvSafe(s.geometryScore),
      csvSafe(s.probabilityScore),
      csvSafe(s.problemSolvingScore),
      csvSafe(avg)
    ].join(',');
    rows.push(row);
  }

  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cosmic_math_mission_grades_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function csvSafe(v) {
  if (v === null || v === undefined) return '';
  return `"${String(v).replace(/"/g,'""')}"`;
}

// Import JSON
function importJSONFromArea() {
  const text = document.getElementById('jsonImportArea').value.trim();
  if (!text) return alert('Paste JSON into the text area first.');
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    return alert('Invalid JSON: ' + err.message);
  }

  if (!Array.isArray(parsed)) {
    return alert('Expected an array of student objects. Example: [{id:"s_xxxx", name:"Jane", prealgebraScore:82, ...}]');
  }

  // Basic validation & merge
  const existing = loadStudents();
  const merged = [...existing];

  for (const s of parsed) {
    if (!s.id) s.id = uid();
    const idx = merged.findIndex(x => x.id === s.id);
    if (idx === -1) merged.push(s);
    else merged[idx] = { ...merged[idx], ...s }; // merge updates
  }

  saveStudents(merged);
  renderStudentsTable();
  alert('Import complete. Records merged/added.');
}

// Download JSON backup
function downloadJSON() {
  const students = loadStudents();
  const blob = new Blob([JSON.stringify(students, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cmm_students_backup_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

// Clear all data
function clearAllData() {
  if (!confirm('This will permanently delete all student records stored in this browser. Proceed?')) return;
  saveStudents([]);
  renderStudentsTable();
  clearSelectedPanel();
  alert('All student data removed.');
}

// change passcode (stored in teacherPasscode)
function changePasscodeFlow() {
  const code = prompt('Enter new passcode (4–8 digits):');
  if (!code) return;
  if (!/^\d{4,8}$/.test(code)) return alert('Passcode must be 4–8 digits.');
  localStorage.setItem('teacherPasscode', code);
  alert('Passcode updated.');
}

// helpers
function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// attach UI
function attachUI() {
  document.getElementById('addStudentBtn').addEventListener('click', onAddStudent);
  document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
  document.getElementById('downloadJsonBtn').addEventListener('click', downloadJSON);
  document.getElementById('importJsonBtn').addEventListener('click', () => {
    document.getElementById('jsonImportArea').focus();
    alert('Paste JSON into the box on the right and click "Import JSON" to merge.');
  });
  document.getElementById('doImportBtn').addEventListener('click', importJSONFromArea);
  document.getElementById('clearJsonBtn').addEventListener('click', () => document.getElementById('jsonImportArea').value = '');
  document.getElementById('clearAllBtn').addEventListener('click', clearAllData);
  document.getElementById('changePassBtn').addEventListener('click', changePasscodeFlow);
  document.getElementById('backHome').addEventListener('click', () => window.location.href = 'index.html');
}

// initial seed demo data (only if no students exist)
function seedDemoIfEmpty() {
  const arr = loadStudents();
  if (arr && arr.length) return;
  const demo = [
    { id: uid(), name: 'Ava T.', prealgebraScore: 88, algebraScore: 90, geometryScore: 85, probabilityScore:78, problemSolvingScore:92 },
    { id: uid(), name: 'Miles R.', prealgebraScore: 74, algebraScore: 79, geometryScore: 72, probabilityScore:70, problemSolvingScore:68 },
    { id: uid(), name: 'Sofia K.', prealgebraScore: 95, algebraScore: 96, geometryScore: 94, probabilityScore:92, problemSolvingScore:98 }
  ];
  saveStudents(demo);
}

// bootstrap
function initDashboard() {
  seedDemoIfEmpty();
  attachUI();
  renderStudentsTable();
  clearSelectedPanel();
}

document.addEventListener('DOMContentLoaded', initDashboard);
