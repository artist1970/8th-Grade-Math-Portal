// scripts/modules/algebra.js
import { updateProgress } from '../tracker.js';
import { saveData } from '../dataHandler.js';

export function initModule() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🧮 Algebra Mission</h2>
    <p>Welcome back, Cadet! Time to decode the secrets of <strong>linear equations</strong>.</p>

    <div id="questionBox" class="question-box"></div>
    <input id="answer" type="number" placeholder="Enter your answer" />
    <button id="submitAnswer">Submit</button>

    <div id="feedback" class="feedback"></div>
    <div id="scoreBoard" class="score-board">Score: <span id="score">0</span>/10</div>
  `;

  const problems = generateAlgebraProblems();
  let current = 0;
  let score = 0;

  showQuestion(problems[current]);

  document.getElementById('submitAnswer').onclick = () => {
    const userAns = parseFloat(document.getElementById('answer').value);
    const correct = problems[current].answer;
    const feedback = document.getElementById('feedback');

    if (isNaN(userAns)) {
      feedback.textContent = "Enter a number, Cadet!";
      feedback.style.color = "#ffd23f";
      return;
    }

    if (Math.abs(userAns - correct) < 0.01) {
      feedback.textContent = "✅ Correct! Equation stabilized.";
      feedback.style.color = "#7ad77b";
      score++;
    } else {
      feedback.textContent = `❌ Incorrect. Correct answer was ${correct}.`;
      feedback.style.color = "#ff6b6b";
    }

    document.getElementById('score').textContent = score;
    current++;

    if (current < problems.length) {
      setTimeout(() => showQuestion(problems[current]), 1200);
    } else {
      setTimeout(() => finishMission(score), 1500);
    }
  };
}

function showQuestion(q) {
  document.getElementById('feedback').textContent = "";
  document.getElementById('answer').value = "";
  document.getElementById('questionBox').innerHTML = `<h3>${q.text}</h3>`;
}

// --- Algebra Problem Generator ---
function generateAlgebraProblems() {
  const list = [];

  for (let i = 0; i < 10; i++) {
    let text = "", answer = 0;
    const type = i < 3 ? "substitution" : i < 6 ? "oneStep" : i < 9 ? "twoStep" : "balanced";

    switch (type) {
      // Simple substitution: e.g., If x = 5, what is 3x + 2?
      case "substitution": {
        const x = rand(1, 10);
        const a = rand(2, 6);
        const b = rand(1, 10);
        text = `If x = ${x}, solve: ${a}x + ${b}`;
        answer = a * x + b;
        break;
      }

      // One-step equation: e.g., x + 6 = 11
      case "oneStep": {
        const x = rand(2, 15);
        const add = rand(1, 10);
        const side = x + add;
        text = `Solve for x: x + ${add} = ${side}`;
        answer = x;
        break;
      }

      // Two-step equation: e.g., 2x + 3 = 11
      case "twoStep": {
        const x = rand(2, 10);
        const a = rand(2, 5);
        const b = rand(1, 6);
        const rhs = a * x + b;
        text = `Solve for x: ${a}x + ${b} = ${rhs}`;
        answer = x;
        break;
      }

      // Balanced equation: e.g., 3x - 2 = x + 6
      case "balanced": {
        const x = rand(1, 10);
        const a = rand(2, 5);
        const b = rand(1, 8);
        const c = rand(1, 3);
        const rhs = a * x - b;
        text = `Solve for x: ${a}x - ${b} = x + ${rhs - x}`;
        answer = x;
        break;
      }
    }
    list.push({ text, answer });
  }

  return list;
}

function finishMission(score) {
  const grade = Math.round((score / 10) * 100);
  const week = parseInt(localStorage.getItem('week') || '1');
  const missions = parseInt(localStorage.getItem('missions') || '0') + 1;

  saveData('algebraScore', grade);
  updateProgress({ week, missions, grade: grade + "%" });

  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🎖️ Algebra Mission Complete!</h2>
    <p>Your Algebra mission score: <strong>${grade}%</strong></p>
    <button onclick="location.reload()">Return to Base</button>
  `;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
