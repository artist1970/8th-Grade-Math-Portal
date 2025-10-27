// scripts/modules/problemSolving.js
import { updateProgress } from '../tracker.js';
import { saveData } from '../dataHandler.js';

export function initModule() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>🚀 Advanced Problem Solving Mission</h2>
    <p>Cadet, you’ve reached the final challenge! Use everything you’ve learned — Pre-Algebra, Algebra, Geometry, and Probability — to complete these <strong>multi-step cosmic missions</strong>.</p>

    <div id="questionBox" class="question-box"></div>
    <input id="answer" type="number" placeholder="Enter your answer" />
    <button id="submitAnswer">Submit</button>

    <div id="feedback" class="feedback"></div>
    <div id="scoreBoard" class="score-board">Score: <span id="score">0</span>/10</div>
  `;

  const problems = generateProblemSolvingMissions();
  let current = 0;
  let score = 0;

  showQuestion(problems[current]);

  document.getElementById("submitAnswer").onclick = () => {
    const userAns = parseFloat(document.getElementById("answer").value);
    const correct = problems[current].answer;
    const feedback = document.getElementById("feedback");

    if (isNaN(userAns)) {
      feedback.textContent = "Enter your numeric solution, Cadet!";
      feedback.style.color = "#ffd23f";
      return;
    }

    if (Math.abs(userAns - correct) < 0.01) {
      feedback.textContent = "✅ Brilliant deduction! The mission proceeds!";
      feedback.style.color = "#7ad77b";
      score++;
    } else {
      feedback.textContent = `❌ Incorrect. The correct solution was ${correct}.`;
      feedback.style.color = "#ff6b6b";
    }

    document.getElementById("score").textContent = score;
    current++;

    if (current < problems.length) {
      setTimeout(() => showQuestion(problems[current]), 1200);
    } else {
      setTimeout(() => finishMission(score), 1500);
    }
  };
}

function showQuestion(q) {
  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").value = "";
  document.getElementById("questionBox").innerHTML = `<h3>${q.text}</h3>`;
}

// --- Advanced Problem Solving Generator ---
function generateProblemSolvingMissions() {
  const list = [];

  for (let i = 0; i < 10; i++) {
    let text = "", answer = 0;
    const type =
      i < 2 ? "multiStep" :
      i < 5 ? "algebraWord" :
      i < 7 ? "geometryWord" :
      i < 9 ? "probabilityWord" : "integrated";

    switch (type) {
      // --- Multi-step arithmetic reasoning ---
      case "multiStep": {
        const a = rand(5, 20);
        const b = rand(2, 10);
        const c = rand(1, 5);
        text = `A spaceship collects ${a} data pods, each containing ${b} energy cells. After using ${c * b} cells for repairs, how many cells remain?`;
        answer = a * b - (c * b);
        break;
      }

      // --- Algebraic word problem ---
      case "algebraWord": {
        const x = rand(3, 8);
        const total = 3 * x + 12;
        text = `Captain Zora has 12 crystal modules and 3 times as many as Commander Kai. Together they have ${total} modules. How many does Kai have?`;
        answer = x;
        break;
      }

      // --- Geometry word problem ---
      case "geometryWord": {
        const r = rand(3, 6);
        text = `A circular landing pad has a radius of ${r} meters. Find its area using π ≈ 3.14.`;
        answer = +(3.14 * r * r).toFixed(2);
        break;
      }

      // --- Probability-based word problem ---
      case "probabilityWord": {
        const red = rand(2, 5);
        const blue = rand(3, 8);
        const total = red + blue;
        text = `Out of ${total} communication beacons, ${red} are red. If one is activated at random, what is the probability it’s red? (Decimal)`;
        answer = +(red / total).toFixed(2);
        break;
      }

      // --- Integrated reasoning (multi-domain) ---
      case "integrated": {
        const base = rand(4, 10);
        const height = rand(3, 8);
        const x = rand(2, 5);
        const area = 0.5 * base * height;
        text = `A triangular solar sail with base ${base} m and height ${height} m collects ${x} energy units per square meter. How many total energy units are collected?`;
        answer = +(area * x).toFixed(2);
        break;
      }
    }

    list.push({ text, answer });
  }

  return list;
}

function finishMission(score) {
  const grade = Math.round((score / 10) * 100);
  const week = parseInt(localStorage.getItem("week") || "1");
  const missions = parseInt(localStorage.getItem("missions") || "0") + 1;

  saveData("problemSolvingScore", grade);
  updateProgress({ week, missions, grade: grade + "%" });

  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>🏅 Mission Accomplished: Advanced Problem Solving</h2>
    <p>Your final analytical rating: <strong>${grade}%</strong></p>
    <button onclick="location.reload()">Return to Base</button>
  `;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
