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
          text = `Find the area of a triangle with base ${b} cm and height ${h} cm.`;
          answer = 0.5 * b * h;
        } else {
          const r = rand(2, 6);
          text = `Find the area of a circle with radius ${r} cm. (Use π ≈ 3.14)`;
          answer = 3.14 * r * r;
        }
        break;
      }

      // Perimeter: square or rectangle
      case "perimeter": {
        const shapeType = rand(1, 2);
        if (shapeType === 1) {
          const side = rand(3, 12);
          text = `Find the perimeter of a square with side length ${side} cm.`;
          answer = 4 * side;
        } else {
          const l = rand(5, 15);
          const w = rand(3, 12);
          text = `Find the perimeter of a rectangle with length ${l} cm and width ${w} cm.`;
          answer = 2 * (l + w);
        }
        break;
      }

      // Transformations: coordinate translation or reflection
      case "transform": {
        const x = rand(1, 5);
        const y = rand(1, 5);
        const moveX = rand(-3, 3);
        const moveY = rand(-3, 3);
        const reflected = rand(0, 1) === 1;

        if (!reflected) {
          text = `Translate point (${x}, ${y}) by (${moveX}, ${moveY}). What are the new coordinates? (Enter x + y, e.g. for (4,5) type 9)`;
          answer = (x + moveX) + (y + moveY);
        } else {
          text = `Reflect point (${x}, ${y}) over the x-axis. What is x + y of the new coordinates?`;
          answer = x + (-y);
        }
        break;
      }
    }

    list.push({ text, answer: Math.round(answer * 100) / 100 });
  }

  return list;
}

function finishMission(score) {
  const grade = Math.round((score / 10) * 100);
  const week = parseInt(localStorage.getItem('week') || '1');
  const missions = parseInt(localStorage.getItem('missions') || '0') + 1;

  saveData('geometryScore', grade);
  updateProgress({ week, missions, grade: grade + "%" });

  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🏆 Geometry Mission Complete!</h2>
    <p>Your geometry accuracy: <strong>${grade}%</strong></p>
    <button onclick="location.reload()">Return to Base</button>
  `;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
