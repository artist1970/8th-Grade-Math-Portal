// scripts/quizModule.js
import { updateStudentProgress } from './tracker.js';

// --- Quiz State ---
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let currentStudent = '';
let currentSubject = '';
let chapterName = 'Quick Quiz';

// --- Create modal dynamically ---
export function createQuizModal() {
  if (document.getElementById('quizModal')) return; // already exists

  const modal = document.createElement('div');
  modal.id = 'quizModal';
  modal.style.display = 'none';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span id="closeQuiz" class="close">&times;</span>
      <h2 id="quizTitle">Quick Quiz</h2>
      <div id="quizQuestion"></div>
      <div id="quizOptions"></div>
      <div id="quizFeedback" style="margin-top:10px; font-weight:bold;"></div>
      <div id="quizScoreDisplay" style="margin-top:10px;">Score: 0/0</div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('closeQuiz').onclick = () => {
    modal.style.display = 'none';
  };

  // Close modal on outside click
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}

// --- Start Quiz ---
export function startQuiz(studentName, subject, questionsArray) {
  currentStudent = studentName;
  currentSubject = subject;
  quizQuestions = shuffleArray(questionsArray).slice(0, 10);
  quizIndex = 0;
  quizScore = 0;

  document.getElementById('quizModal').style.display = 'flex';
  document.getElementById('quizScoreDisplay').textContent = `Score: 0/${quizQuestions.length}`;
  showQuizQuestion();
}

// --- Display current question ---
function showQuizQuestion() {
  const q = quizQuestions[quizIndex];
  const questionDiv = document.getElementById('quizQuestion');
  const optionsDiv = document.getElementById('quizOptions');
  const feedbackDiv = document.getElementById('quizFeedback');

  questionDiv.textContent = `${quizIndex + 1}. ${q.question}`;
  optionsDiv.innerHTML = '';
  feedbackDiv.textContent = '';

  for (const [key, val] of Object.entries(q.options)) {
    const btn = document.createElement('button');
    btn.textContent = `${key}: ${val}`;
    btn.style.margin = '6px';
    btn.onclick = () => checkQuizAnswer(key);
    optionsDiv.appendChild(btn);
  }
}

// --- Check answer and move to next ---
function checkQuizAnswer(answer) {
  const correct = quizQuestions[quizIndex].answer;
  const feedbackDiv = document.getElementById('quizFeedback');
  if (answer === correct) {
    quizScore++;
    feedbackDiv.textContent = '✅ Correct!';
    feedbackDiv.style.color = 'green';
  } else {
    feedbackDiv.textContent = `❌ Incorrect! Correct: ${correct}`;
    feedbackDiv.style.color = 'red';
  }

  document.getElementById('quizScoreDisplay').textContent = `Score: ${quizScore}/${quizQuestions.length}`;

  quizIndex++;
  if (quizIndex < quizQuestions.length) {
    setTimeout(showQuizQuestion, 1000);
  } else {
    setTimeout(endQuiz, 1000);
  }
}

// --- End Quiz & Record Score ---
function endQuiz() {
  alert(`Quiz Complete! Score: ${quizScore}/${quizQuestions.length}`);

  // Record in tracker.js
  updateStudentProgress({
    week: null, // optional if tracking week separately
    missions: null,
    grade: null
  });

  // Store subject-specific score
  updateStudentProgress({
    studentName: currentStudent,
    subject: currentSubject,
    chapterName,
    score: quizScore,
    total: quizQuestions.length
  });

  document.getElementById('quizModal').style.display = 'none';

  // Optional: trigger chart update if using Chart.js
  const event = new Event('quizCompleted');
  document.dispatchEvent(event);
}

// --- Utility: Shuffle Array ---
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
