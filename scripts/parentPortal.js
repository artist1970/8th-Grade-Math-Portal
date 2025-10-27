// scripts/parentPortal.js

// --- Utility: Load student data ---
function loadStudents() {
  try {
    return JSON.parse(localStorage.getItem('students') || "[]");
  } catch {
    return [];
  }
}

// --- DOM Ready ---
window.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("studentList");
  const students = loadStudents();

  if (!students.length) {
    studentList.innerHTML = `<option>No student data found</option>`;
    return;
  }

  // Populate dropdown
  studentList.innerHTML = students
    .map(s => `<option value="${s.id}">${s.name}</option>`)
    .join("");

  // Display first student by default
  showStudent(students[0].id);

  studentList.addEventListener("change", (e) => {
    showStudent(e.target.value);
  });
});

let parentChart = null;

// --- Display student data ---
function showStudent(id) {
  const students = loadStudents();
  const student = students.find(s => s.id === id);
  if (!student) return;

  // Render summary
  renderSummary(student);

  // Render weekly chart
  renderChart(student);

  // Generate AI insights
  renderInsights(student);
}

// --- Summary Table ---
function renderSummary(s) {
  const el = document.getElementById("summaryTable");
  el.innerHTML = `
    <table class="summary">
      <tr><th>Mission</th><th>Score</th></tr>
      <tr><td>Pre-Algebra</td><td>${s.prealgebraScore ?? "--"}%</td></tr>
      <tr><td>Algebra</td><td>${s.algebraScore ?? "--"}%</td></tr>
      <tr><td>Geometry</td><td>${s.geometryScore ?? "--"}%</td></tr>
      <tr><td>Probability</td><td>${s.probabilityScore ?? "--"}%</td></tr>
      <tr><td>Problem Solving</td><td>${s.problemSolvingScore ?? "--"}%</td></tr>
    </table>
  `;
}

// --- Chart.js Graph ---
function renderChart(s) {
  const ctx = document.getElementById("parentChart").getContext("2d");
  if (parentChart) parentChart.destroy();

  if (!s.weeklyHistory?.length) {
    parentChart = null;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    return;
  }

  const weeks = s.weeklyHistory.map(w => w.week);
  const datasets = [
    { label: 'Pre-Algebra', data: s.weeklyHistory.map(w => w.prealgebra), borderColor: '#ff6b6b', tension: 0.3 },
    { label: 'Algebra', data: s.weeklyHistory.map(w => w.algebra), borderColor: '#4aa3ff', tension: 0.3 },
    { label: 'Geometry', data: s.weeklyHistory.map(w => w.geometry), borderColor: '#ffd23f', tension: 0.3 },
    { label: 'Probability', data: s.weeklyHistory.map(w => w.probability), borderColor: '#9b59b6', tension: 0.3 },
    { label: 'Problem Solving', data: s.weeklyHistory.map(w => w.problemSolving), borderColor: '#7ad77b', tension: 0.3 }
  ];

  parentChart = new Chart(ctx, {
    type: 'line',
    data: { labels: weeks, datasets },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { color: '#eee' } },
        title: { display: true, text: `${s.name}'s Weekly Progress`, color: '#fff' }
      },
      scales: {
        x: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { beginAtZero: true, max: 100, ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// --- AI-Style Progress Insights ---
function renderInsights(s) {
  const insight = document.getElementById("insightText");

  if (!s.weeklyHistory?.length) {
    insight.innerHTML = "No weekly history yet. The AI will analyze once data is available.";
    return;
  }

  const last = s.weeklyHistory[s.weeklyHistory.length - 1];
  const avg = average([
    last.prealgebra, last.algebra, last.geometry, last.probability, last.problemSolving
  ]);

  const growth = compareGrowth(s.weeklyHistory);
  const mood = avg >= 85 ? "🌟 Stellar" : avg >= 70 ? "🪐 Stable" : "🚀 Developing";

  insight.innerHTML = `
    <strong>Overall AI Assessment:</strong><br>
    - Current performance level: <strong>${mood}</strong> (${avg.toFixed(1)}%)<br>
    - Notable trend: ${growth}<br>
    - Recommendation: ${avg >= 85
      ? "Maintain challenge level; introduce creative problem solving."
      : avg >= 70
      ? "Encourage review of Geometry and Probability to boost confidence."
      : "Provide guided AI support in foundational Algebra and multi-step reasoning."}
  `;
}

function average(arr) {
  const valid = arr.filter(v => typeof v === 'number' && !isNaN(v));
  return valid.length ? valid.reduce((a,b)=>a+b,0)/valid.length : 0;
}

function compareGrowth(history) {
  if (history.length < 2) return "Insufficient data for growth analysis.";

  const firstAvg = average(Object.values(history[0]).slice(1,6));
  const lastAvg = average(Object.values(history[history.length - 1]).slice(1,6));
  const diff = lastAvg - firstAvg;

  if (diff > 5) return `Improving (+${diff.toFixed(1)}%) since ${history[0].week}.`;
  if (diff < -5) return `Declined (-${Math.abs(diff).toFixed(1)}%) since ${history[0].week}.`;
  return "Steady performance across all missions.";
}
