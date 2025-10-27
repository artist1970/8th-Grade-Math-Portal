import { preAlgebra } from './preAlgebra.js';
import { algebra } from './algebra.js';
import { geometry } from './geometry.js';
import { probability } from './probability.js';
import { problemSolving } from './problemSolving.js';

const missions = [
  { name: "Pre-Algebra", questions: preAlgebra },
  { name: "Algebra", questions: algebra },
  { name: "Geometry", questions: geometry },
  { name: "Probability & Stats", questions: probability },
  { name: "Problem Solving", questions: problemSolving }
];

let currentStudent = null;
let currentMissionIndex = 0;
let currentQuestionIndex = 0;

// Local Storage Wrapper
function loadData() {
  return JSON.parse(localStorage.getItem("students") || "[]");
}
function saveData(data) {
  localStorage.setItem("students", JSON.stringify(data));
}

// UI Elements
const startBtn = document.getElementById("startBtn");
const studentNameInput = document.getElementById("studentName");
const missionPanel = document.getElementById("missionPanel");
const missionTitle = document.getElementById("missionTitle");
const questionContainer = document.getElementById("questionContainer");
const prevBtn = document.getElementById("prevQuestionBtn");
const nextBtn = document.getElementById("nextQuestionBtn");
const submitBtn = document.getElementById("submitMissionBtn");
const chartPanel = document.getElementById("chartPanel");
const exportBtn = document.getElementById("exportBtn");

// Start Portal
startBtn.addEventListener("click", () => {
  const name = studentNameInput.value.trim();
  if (!name) return alert("Please enter your name.");
  const students = loadData();
  let student = students.find(s => s.name === name);
  if (!student) {
    student = { name, weeklyHistory: [] };
    students.push(student);
    saveData(students);
  }
  currentStudent = student;
  studentNameInput.parentElement.style.display = "none";
  missionPanel.style.display = "block";
  loadMission(0);
});

// Load Mission
function loadMission(index) {
  currentMissionIndex = index;
  currentQuestionIndex = 0;
  const mission = missions[index];
  missionTitle.textContent = mission.name;
  renderQuestion();
}

// Render Current Question
function renderQuestion() {
  const mission = missions[currentMissionIndex];
  const q = mission.questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p><strong>Q${currentQuestionIndex + 1}:</strong> ${q.question}</p>
    <input id="answerInput" type="text" placeholder="Your answer" value="${q.userAnswer || ''}" />
  `;
}

// Navigation
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) currentQuestionIndex--;
  renderQuestion();
});
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < missions[currentMissionIndex].questions.length - 1) currentQuestionIndex++;
  renderQuestion();
});

// Submit Mission
submitBtn.addEventListener("click", () => {
  const answerInput = document.getElementById("answerInput");
  missions[currentMissionIndex].questions[currentQuestionIndex].userAnswer = answerInput.value;
  
  const correctCount = missions[currentMissionIndex].questions.filter(q => String(q.answer) === String(q.userAnswer)).length;
  const score = Math.round((correctCount / missions[currentMissionIndex].questions.length) * 100);
  currentStudent.weeklyHistory.push({ mission: missions[currentMissionIndex].name, score });
  
  saveData(loadData());
  alert(`${missions[currentMissionIndex].name} completed! Score: ${score}%`);

  if (currentMissionIndex < missions.length - 1) loadMission(currentMissionIndex + 1);
  else {
    missionPanel.style.display = "none";
    renderChart();
  }
});

// Render Chart
function renderChart() {
  chartPanel.style.display = "block";
  const ctx = document.getElementById("progressChart").getContext("2d");

  const labels = currentStudent.weeklyHistory.map((h,i) => `Mission ${i+1}: ${h.mission}`);
  const data = currentStudent.weeklyHistory.map(h => h.score);

  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Score (%)', data, backgroundColor: '#4aa3ff' }] },
    options: { scales: { y: { beginAtZero: true, max: 100 } } }
  });
}

// Export CSV
exportBtn.addEventListener("click", () => {
  const csv = currentStudent.weeklyHistory.map(h => `${h.mission},${h.score}`).join("\n");
  const blob = new Blob([`Mission,Score\n${csv}`], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentStudent.name}_progress.csv`;
  a.click();
  URL.revokeObjectURL(url);
});
