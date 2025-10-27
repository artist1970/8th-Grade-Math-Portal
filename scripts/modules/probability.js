// scripts/modules/probability.js
import { updateProgress } from '../tracker.js';
import { saveData } from '../dataHandler.js';

export function initModule() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>🎲 Probability & Statistics Mission</h2>
    <p>Cadet, analyze cosmic data streams and predict outcomes across the galaxy. Apply your skills in <strong>mean, median, range, and probability</strong>.</p>

    <div id="questionBox" class="question-box"></div>
    <input id="answer" type="number" placeholder="Enter your answer" />
    <button id="submitAnswer">Submit</button>

    <div id="feedback" class="feedback"></div>
    <div id="scoreBoard" class="score-board">Score: <span id="score">0</span>/10</div>
  `;

  const problems = generateProbabilityProblems();
  let current = 0;
  let score = 0;

  showQuestion(problems[current]);

  document.getElementById("submitAnswer").onclick = () => {
    const userAns = parseFloat(document.getElementById("answer").value);
    const correct = problems[current].answer;
    const feedback = document.getElementById("feedback");

    if (isNaN(userAns)) {
      feedback.textContent = "Enter a numeric answer, Cadet!";
      feedback.style.color = "#ffd23f";
      return;
    }

    if (Math.abs(userAns - correct) < 0.01) {
      feedback.textContent = "✅ Excellent analysis! Data confirmed.";
      feedback.style.color = "#7ad77b";
      score++;
    } else {
      feedback.textContent = `❌ Not quite. The correct answer was ${correct}.`;
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

// --- Probability & Statistics Problem Generator ---
function generateProbabilityProblems() {
  const list = [];

  for (let i = 0; i < 10; i++) {
    let text = "", answer = 0;
    const type =
      i < 3 ? "mean" :
      i < 6 ? "median" :
      i < 8 ? "range" : "prob";

    switch (type) {
      // Mean
      case "mean": {
        const nums = randomArray(4, 10, 2, 20);
        const mean = +(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
        text = `Find the mean of these values: ${nums.join(", ")}`;
        answer = mean;
        break;
      }

      // Median
      case "median": {
        const nums = randomArray(5, 7, 1, 20).sort((a, b) => a - b);
        const mid = Math.floor(nums.length / 2);
        const median = nums[mid];
        text = `Find the median of these values: ${nums.join(", ")}`;
        answer = median;
        break;
      }

      // Range
      case "range": {
        const nums = randomArray(4, 8, 5, 25);
        const range = Math.max(...nums) - Math.min(...nums);
        text = `Find the range of these values: ${nums.join(", ")}`;
        answer = range;
        break;
      }

      // Probability (dice, coins, marbles)
      case "prob": {
        const event = rand(1, 3);
        if (event === 1) {
          text = "If you roll a fair 6-sided die, what is the probability of rolling a 4? (Express as decimal)";
          answer = 1 / 6;
        } else if (event === 2) {
          text = "If you flip a coin twice, what is the probability of getting two heads? (Decimal form)";
          answer = 0.25;
        } else {
          const red = rand(2, 5);
          const blue = rand(3, 7);
          const total = red + blue;
          text = `A bag contains ${red} red marbles and ${blue} blue marbles. What is the probability of drawing a red one? (Decimal)`;
          answer = +(red / total).toFixed(2);
        }
        break;
      }
    }

    list.push({ text, answer: +answer.toFixed(2) });
  }

  return list;
}

function finishMission(score) {
  const grade = Math.round((score / 10) * 100);
  const week = parseInt(localStorage.getItem("week") || "1");
  const missions = parseInt(localStorage.getItem("missions") || "0") + 1;

  saveData("probabilityScore", grade);
  updateProgress({ week, missions, grade: grade + "%" });

  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>📊 Probability & Statistics Mission Complete!</h2>
    <p>Your analytical precision: <strong>${grade}%</strong></p>
    <button onclick="location.reload()">Return to Base</button>
  `;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(minLen, maxLen, minVal, maxVal) {
  const len = rand(minLen, maxLen);
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(rand(minVal, maxVal));
  return arr;
}
