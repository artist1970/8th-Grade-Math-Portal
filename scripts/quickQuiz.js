// scripts/quickQuiz.js
import { saveData, loadData } from './dataHandler.js';
import { updateProgress } from './tracker.js';

export function startQuickQuiz(student, subject, questions) {
  let currentIndex = 0;
  let score = 0;

  // Build overlay container
  const overlay = document.createElement('div');
  overlay.id = 'quickQuizOverlay';
  overlay.style = `
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.85);
    color: #fff;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 9999;
  `;
  overlay.innerHTML = `
    <div style="background:#142847; padding:20px; border-radius:12px; width:90%; max-width:500px; text-align:center;">
      <h2>${subject} Quick Quiz</h2>
      <div id="quizQuestion" style="margin:20px 0;"></div>
      <input type="text" id="quizAnswer" placeholder="Your answer" style="padding:8px; width:150px;">
      <div style="margin-top:15px;">
        <button id="quizNext">Next</button>
        <button id="quizCancel" style="background:red;">Cancel</button>
      </div>
      <div id="quizFeedback" style="margin-top:10px; font-weight:bold;"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const questionEl = document.getElementById('quizQuestion');
  const answerInput = document.getElementById('quizAnswer');
  const feedbackEl = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('quizNext');
  const cancelBtn = document.getElementById('quizCancel');

  function showQuestion() {
    const q = questions[currentIndex];
    questionEl.textContent = `Q${currentIndex + 1}: ${q.question}`;
    answerInput.value = '';
    feedbackEl.textContent = '';
  }

  function handleNext() {
    const userAnswer = answerInput.value.trim();
    const correct = questions[currentIndex].answer;
    if (String(userAnswer) === String(correct)) score++;

    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    alert(`${subject} Quick Quiz Completed! Score: ${score}/${questions.length}`);
    
    // Save to student history
    const students = loadData() || [];
    const idx = students.findIndex(s => s.name === student.name);
    if (idx !== -1) {
      students[idx].weeklyHistory.push({
        mission: `${subject} Quick Quiz`,
        score: Math.round((score/questions.length)*100),
        date: new Date().toISOString()
      });
      saveData(students);
      updateProgress({ missions: students[idx].weeklyHistory.length, grade: Math.round((score/questions.length)*100) });
    }

    document.body.removeChild(overlay);
  }

  nextBtn.addEventListener('click', handleNext);
  cancelBtn.addEventListener('click', () => document.body.removeChild(overlay));

  showQuestion();
}
