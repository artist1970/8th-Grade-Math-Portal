// scripts/chapterTest.js
import { saveData, loadData } from './dataHandler.js';
import { updateProgress } from './tracker.js';

export function startChapterTest(student, subject, questions, testName = "Chapter Test") {
  let currentIndex = 0;
  let score = 0;

  const overlay = document.createElement('div');
  overlay.id = 'chapterTestOverlay';
  overlay.style = `
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.9);
    color: #fff;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 9999;
  `;
  overlay.innerHTML = `
    <div style="background:#1f305f; padding:25px; border-radius:12px; width:90%; max-width:600px; text-align:center;">
      <h2>${subject} ${testName}</h2>
      <div id="testQuestion" style="margin:20px 0;"></div>
      <input type="text" id="testAnswer" placeholder="Your answer" style="padding:8px; width:150px;">
      <div style="margin-top:15px;">
        <button id="testNext">Next</button>
        <button id="testCancel" style="background:red;">Cancel</button>
      </div>
      <div id="testFeedback" style="margin-top:10px; font-weight:bold;"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const questionEl = document.getElementById('testQuestion');
  const answerInput = document.getElementById('testAnswer');
  const feedbackEl = document.getElementById('testFeedback');
  const nextBtn = document.getElementById('testNext');
  const cancelBtn = document.getElementById('testCancel');

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
    if (currentIndex < questions.length) showQuestion();
    else endTest();
  }

  function endTest() {
    const percentage = Math.round((score/questions.length)*100);
    alert(`${subject} ${testName} Completed! Score: ${score}/${questions.length} (${percentage}%)`);

    const students = loadData() || [];
    const idx = students.findIndex(s => s.name === student.name);
    if (idx !== -1) {
      students[idx].weeklyHistory.push({
        mission: `${subject} ${testName}`,
        score: percentage,
        date: new Date().toISOString()
      });
      saveData(students);
      updateProgress({ missions: students[idx].weeklyHistory.length, grade: percentage });
    }

    document.body.removeChild(overlay);
  }

  nextBtn.addEventListener('click', handleNext);
  cancelBtn.addEventListener('click', () => document.body.removeChild(overlay));

  showQuestion();
}
