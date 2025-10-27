// scripts/modules/prealgebra.js
import { updateProgress } from '../tracker.js';
import { saveData, loadData } from '../dataHandler.js';

export function initModule() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🪐 Pre-Algebra Mission</h2>
    <p>Welcome, Cadet! Warm up your thrusters — solve each problem to power your ship.</p>

    <div id="questionBox" class="question-box"></div>
    <input id="answer" type="number" placeholder="Enter your answer" />
    <button id="submitAnswer">Submit</button>

    <div id="feedback" class="feedback"></div>
    <div id="scoreBoard" class="score-board">Score: <span id="score">0</span>/10</div>
  `;

  const problems = generateProblems();
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

    if (Math.abs(userAns - correct) < 0.001) {
      feedback.textContent = "✅ Correct! Energy levels rising!";
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

// --- Problem Generator ---
function generateProblems() {
  const list = [];
  for (let i = 0; i < 10; i++) {
    const type = i < 3 ? "add" : i < 6 ? "multi" : i < 8 ? "divide" : "paren";
    let text = "", answer = 0;

    switch (type) {
      case "add":
        const a1 = rand(1, 20), b1 = rand(1, 20);
        text = `${a1} + ${b1}`;
        answer = a1 + b1;
        break;

      case "multi":
        const a2 = rand(2, 10), b2 = rand(2, 10);
        text = `${a2} × ${b2}`;
        answer = a2 * b2;
        break;

      case "divide":
        const b3 = rand(2, 10);
        const a3 = b3 * rand(2, 10);
        text = `${a3} ÷ ${b3}`;
        answer = a3 / b3;
        break;

      case "paren":
        const a4 = rand(1, 10), b4 = rand(1, 10), c4 = rand(1, 5);
        text = `(${a4} + ${b4}) × ${c4}`;
        answer = (a4 + b4) * c4;
        break;
    }

    list.push({ text, answer });
  }
  return list;
}

function finishMission(score) {
  const grade = Math.round((score / 10) * 100);
  const week = parseInt(localStorage.getItem('week') || '1');
  const missions = parseInt(localStorage.getItem('missions') || '0') + 1;

  saveData('prealgebraScore', grade);
  updateProgress({ week, missions, grade: grade + "%" });

  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🎖️ Mission Complete!</h2>
    <p>Your Pre-Algebra mission score: <strong>${grade}%</strong></p>
    <button onclick="location.reload()">Return to Base</button>
  `;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
