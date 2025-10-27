// scripts/portal.js
import { preAlgebra } from './preAlgebra.js';
import { algebra } from './algebra.js';
import { geometry } from './geometry.js';
import { probability } from './probability.js';
import { problemSolving } from './problemSolving.js';
import { saveData, loadData } from './dataHandler.js';

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
let quizMode = null; // "quickQuiz" or "chapterTest"

// --- UI Elements ---
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
const quickQuizPanel = document.getElementById("quickQuizPanel");

// --- Student Login ---
startBtn.addEventListener("click", () => {
  const name = studentNameInput.value.trim();
  if (!name) return alert("Please enter your name.");
  const students = loadData("students") || [];
  let student = students.find(s => s.name === name);
  if (!student) {
    student = { name, weeklyHistory: [] };
    students.push(student);
    saveData("students", students);
  }
  currentStudent = student;
  studentNameInput.parentElement.style.display = "none";
  quickQuizPanel.style.display = "block";
  missionPanel.style.display = "block";
  loadMission(0);
});

// --- Load Mission ---
function loadMission(index) {
  currentMissionIndex = index;
  currentQuestionIndex = 0;
  quizMode = null; // reset mode
  const mission = missions[index];
  missionTitle.textContent = mission.name;
  renderQuestion();
}

// --- Render Question ---
function renderQuestion() {
  const mission = missions[currentMissionIndex];
  const q = mission.questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p><strong>Q${currentQuestionIndex + 1}:</strong> ${q.question}</p>
    <input id="answerInput" type="text" placeholder="Your answer" value="${q.userAnswer || ''}" />
  `;
}

// --- Navigation ---
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) currentQuestionIndex--;
  renderQuestion();
});
nextBtn.addEventListener("click", () => {
  const mission = missions[currentMissionIndex];
  if (currentQuestionIndex < mission.questions.length - 1) currentQuestionIndex++;
  renderQuestion();
});

// --- Submit Mission / Quiz ---
submitBtn.addEventListener("click", () => {
  const answerInput = document.getElementById("answerInput");
  const mission = missions[currentMissionIndex];

  mission.questions[currentQuestionIndex].userAnswer = answerInput.value;

  const correctCount = mission.questions.filter(q => String(q.answer) === String(q.userAnswer)).length;
  const score = Math.round((correctCount / mission.questions.length) * 100);

  // Update weekly history
  if (!currentStudent.weeklyHistory) currentStudent.weeklyHistory = [];
  const entry = { mission: mission.name, score, date: new Date().toISOString() };
  currentStudent.weeklyHistory.push(entry);

  // Save student
  const students = loadData("students") || [];
  const idx = students.findIndex(s => s.name === currentStudent.name);
  students[idx] = currentStudent;
  saveData("students", students);

  alert(`${mission.name} completed! Score: ${score}%`);

  if (!quizMode) {
    if (currentMissionIndex < missions.length - 1) loadMission(currentMissionIndex + 1);
    else renderChart();
  } else {
    closeQuizPopup();
  }
});

// --- Quick Quiz & Chapter Test Functions ---
window.launchQuickQuiz = function(subject) {
  startQuiz(subject, "quickQuiz");
};

window.launchChapterTest = function(subject) {
  startQuiz(subject, "chapterTest");
};

function startQuiz(subject, mode) {
  quizMode = mode;
  const mission = missions.find(m => m.name === subject);
  if (!mission) return alert("Subject not found.");
  currentMissionIndex = missions.indexOf(mission);
  currentQuestionIndex = 0;
  missionTitle.textContent = `${subject} ${mode === "quickQuiz" ? "Quick Quiz" : "Chapter Test"}`;
  renderQuestion();
  missionPanel.style.display = "block";
}

// --- Close Quiz Popup ---
function closeQuizPopup() {
  quizMode = null;
  currentQuestionIndex = 0;
  missionPanel.style.display = "none";
  renderChart();
}

// --- Chart ---
function renderChart() {
  chartPanel.style.display = "block";
  const ctx = document.getElementById("progressChart").getContext("2d");
  const labels = currentStudent.weeklyHistory.map((h,i) => `Mission ${i+1}: ${h.mission}`);
  const data = currentStudent.weeklyHistory.map(h => h.score);

  if (window.progressChart) window.progressChart.destroy();

  window.progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Score (%)',
        data,
        backgroundColor: '#4aa3ff'
      }]
    },
    options: {
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  document.getElementById("exportPanel").style.display = "block";
}

// --- CSV Export ---
exportBtn.addEventListener("click", () => {
  if (!currentStudent || !currentStudent.weeklyHistory) return alert("No data to export.");
  const csv = currentStudent.weeklyHistory.map(h => `${h.mission},${h.score},${h.date}`).join("\n");
  const blob = new Blob([`Mission,Score,Date\n${csv}`], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentStudent.name}_progress.csv`;
  a.click();
  URL.revokeObjectURL(url);
});
