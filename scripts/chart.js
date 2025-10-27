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
      <canvas id="weeklyChart" width="400" height="220"></canvas>
    </div>
  `;

  // Ensure weeklyHistory exists
  if (!student.weeklyHistory) student.weeklyHistory = [];

  // Prepare Chart.js datasets
  const weeks = student.weeklyHistory.map(w => w.week);

  const datasets = [
    {
      label: 'Pre-Algebra',
      data: student.weeklyHistory.map(w => w.prealgebra ?? null),
      borderColor: '#ff6b6b',
      backgroundColor: 'rgba(255,107,107,0.2)',
      fill: false,
      tension: 0.25
    },
    {
      label: 'Algebra',
      data: student.weeklyHistory.map(w => w.algebra ?? null),
      borderColor: '#4aa3ff',
      backgroundColor: 'rgba(74,163,255,0.2)',
      fill: false,
      tension: 0.25
    },
    {
      label: 'Geometry',
      data: student.weeklyHistory.map(w => w.geometry ?? null),
      borderColor: '#ffd23f',
      backgroundColor: 'rgba(255,210,63,0.2)',
      fill: false,
      tension: 0.25
    },
    {
      label: 'Probability',
      data: student.weeklyHistory.map(w => w.probability ?? null),
      borderColor: '#9b59b6',
      backgroundColor: 'rgba(155,89,182,0.2)',
      fill: false,
      tension: 0.25
    },
    {
      label: 'Problem Solving',
      data: student.weeklyHistory.map(w => w.problemSolving ?? null),
      borderColor: '#7ad77b',
      backgroundColor: 'rgba(122,215,123,0.2)',
      fill: false,
      tension: 0.25
    }
  ];

  // Chart.js instance
  const ctx = document.getElementById('weeklyChart').getContext('2d');
  if (window.currentChart) window.currentChart.destroy();

  window.currentChart = new Chart(ctx, {
    type: 'line',
    data: { labels: weeks, datasets },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#eee', boxWidth: 12 }
        },
        title: {
          display: true,
          text: `${student.name}'s Weekly Mission Progress`,
          color: '#fff'
        },
        tooltip: {
          backgroundColor: '#0f2138',
          borderColor: '#7ad77b',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: '#ddd' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: '#ddd' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
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

// Add a new weekly entry (records all 5 mission scores)
function addWeeklyEntry(studentId) {
  const students = loadStudents();
  const s = students.find(x => x.id === studentId);
  if (!s) return alert('Student not found.');

  const week = prompt('Enter week label (e.g., Week 6):');
  if (!week) return;

  const entry = {
    week,
    prealgebra: Number(s.prealgebraScore) || 0,
    algebra: Number(s.algebraScore) || 0,
    geometry: Number(s.geometryScore) || 0,
    probability: Number(s.probabilityScore) || 0,
    problemSolving: Number(s.problemSolvingScore) || 0,
    timestamp: new Date().toISOString()
  };

  if (!s.weeklyHistory) s.weeklyHistory = [];
  s.weeklyHistory.push(entry);

  saveStudents(students);
  alert(`Week "${week}" added for ${s.name}.`);
  showStudentEditor(s);
}
