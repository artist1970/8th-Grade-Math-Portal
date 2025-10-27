// scripts/teacherDashboard.js
// Teacher Dashboard with per-week history + Chart.js graph integration

const STUDENTS_KEY = 'cmm_students_v2';
const MISSION_KEYS = ['prealgebraScore','algebraScore','geometryScore','probabilityScore','problemSolvingScore'];
let chart; // Chart.js instance

function saveRaw(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function loadRaw(key) { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }

function loadStudents() { return loadRaw(STUDENTS_KEY) || []; }
function saveStudents(list) { saveRaw(STUDENTS_KEY, list); }

function uid() { return 's_' + Math.random().toString(36).slice(2,9); }

// --- HISTORY HELPERS ---
function recordWeeklyProgress(student) {
  if (!student.weeklyHistory) student.weeklyHistory = [];
  const currentWeek = getWeekOfYear();
  const avg = computeAverageValue(student);

  const existing = student.weeklyHistory.find(h => h.week === currentWeek);
  if (existing) existing.avg = avg;
  else student.weeklyHistory.push({ week: currentWeek, avg, date: new Date().toISOString() });
}
function getWeekOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start) / (1000 * 60 * 60 * 24);
  return Math.ceil((diff + start.getDay() + 1) / 7);
}

// --- TABLE RENDER ---
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
      <td><button data-id="${s.id}" class="editBtn">Edit</button></td>
    `;
    tbody.appendChild(tr);
  }

  document.querySelectorAll('.editBtn').forEach(b => b.addEventListener('click', onEditStudent));
}

function displayScore(v) { return v == null ? '—' : `${v}%`; }
function computeAverage(s) { return computeAverageValue(s) ? Math.round(computeAverageValue(s)) + '%' : '—'; }
function computeAverageValue(s) {
  const values = MISSION_KEYS.map(k => s[k]).filter(v => v != null);
  return values.length ? values.reduce((a,b)=>a+b,0)/values.length : null;
}

function onEditStudent(e) {
  const id = e.currentTarget.dataset.id;
  const students = loadStudents();
  const s = students.find(x => x.id === id);
  if (!s) return alert('Student not found.');

  showStudentEditor(s);
}

// delete student
function onDeleteStudent(e) {
  const id = e.currentTarget.dataset.id;
  if (!confirm('Delete this student permanently?')) return;
  let students = loadStudents();
  students = students.filter(x => x.id !== id);
  saveStudents(students);
  renderStudentsTable();
  clearSelectedPanel();
}

// ---------- Student Editor (with Weekly Chart) ----------
function showStudentEditor(student) {
  const panel = document.getElementById('selectedPanel');

  // Build the editor interface
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

    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button id="saveStudentBtn" class="primary">Save</button>
      <button id="addWeekBtn">Add Weekly Entry</button>
      <button id="cancelEditBtn">Cancel</button>
    </div>

    <div>
      <canvas id="weeklyChart" width="400" height="200"></canvas>
    </div>
  `;

  // Chart.js integration (create weekly progress chart)
  const ctx = document.getElementById('weeklyChart').getContext('2d');
  const weeks = student.weeklyHistory?.map(w => w.week) || [];
  const averages = student.weeklyHistory?.map(w => w.avg) || [];

  if (window.currentChart) window.currentChart.destroy();

  window.currentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [{
        label: 'Weekly Average (%)',
        data: averages,
        borderColor: '#2ab7f5',
        backgroundColor: 'rgba(42,183,245,0.15)',
        fill: true,
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.1)' } },
        x: { grid: { color: 'rgba(255,255,255,0.05)' } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#0f2138', borderColor: '#7ad77b', borderWidth: 1 }
      }
    }
  });

  // --- Button handlers ---
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

  document.getElementById('addWeekBtn').addEventListener('click', () => {
    addWeeklyEntry(student.id);
  });
}

// ---------- Weekly History Functions ----------
function addWeeklyEntry(studentId) {
  const students = loadStudents();
  const s = students.find(x => x.id === studentId);
  if (!s) return alert('Student not found.');

  const week = prompt('Enter week label (e.g., Week 5):');
  if (!week) return;

  const avg = computeAverage(s);
  if (!s.weeklyHistory) s.weeklyHistory = [];
  s.weeklyHistory.push({
    week,
    avg: Number(avg.replace('%','')) || 0,
    timestamp: new Date().toISOString()
  });

  saveStudents(students);
  alert(`Week "${week}" recorded with average: ${avg}`);
  showStudentEditor(s);
}
