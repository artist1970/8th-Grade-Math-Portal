// scripts/modules/geometry.js
import { updateProgress } from '../tracker.js';
import { saveData } from '../dataHandler.js';

export function initModule() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🌌 Geometry Mission</h2>
    <p>Cadet, prepare for spatial exploration! Solve each <strong>geometry challenge</strong> to chart your path through the cosmos.</p>

    <div id="questionBox" class="question-box"></div>
    <input id="answer" type="number" placeholder="Enter your answer" />
    <button id="submitAnswer">Submit</button>

    <div id="feedback" class="feedback"></div>
    <div id="scoreBoard" class="score-board">Score: <span id="score">0</span>/10</div>
  `;

  const problems = generateGeometryProblems();
  let current = 0;
  let score = 0;

  showQuestion(problems[current]);

  document.getElementById('submitAnswer').onclick = () => {
    const userAns = parseFloat(document.getElementById('answer').value);
    const correct = problems[current].answer;
    const feedback = document.getElementById('feedback');

    if (isNaN(userAns)) {
      feedback.textContent = "Please enter a number, Cadet!";
      feedback.style.color = "#ffd23f";
      return;
    }

    if (Math.abs(userAns - correct) < 0.01) {
      feedback.textContent = "✅ Stellar work! Geometry stabilized.";
      feedback.style.color = "#7ad77b";
      score++;
    } else {
      feedback.textContent = `❌ Incorrect. The correct answer was ${correct}.`;
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

// --- Geometry Problem Generator ---
function generateGeometryProblems() {
  const list = [];

  for (let i = 0; i < 10; i++) {
    let text = "", answer = 0;
    const type =
      i < 3 ? "angles" :
      i < 6 ? "area" :
      i < 8 ? "perimeter" : "transform";

    switch (type) {
      // Angles: find missing angle in triangle or straight line
      case "angles": {
        const known1 = rand(30, 100);
        const known2 = rand(20, 120 - known1);
        text = `Find the missing angle in a triangle if the other two are ${known1}° and ${known2}°.`;
        answer = 180 - (known1 + known2);
        break;
      }

      // Area: rectangle, triangle, or circle
      case "area": {
        const shapeType = rand(1, 3);
        if (shapeType === 1) {
          const l = rand(4, 12);
          const w = rand(3, 10);
          text = `Find the area of a rectangle with length ${l} cm and width ${w} cm.`;
          answer = l * w;
        } else if (shapeType === 2) {
          const b = rand(4, 10);
          const h = rand(3, 8);
          text = `Find the area o
