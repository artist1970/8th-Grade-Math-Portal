// scripts/tracker.js

// Example structure stored in localStorage per student:
// {
//   "John Doe": {
//     "prealgebra": [{ name: "Lesson 1", score: 8, total: 10 }, ...],
//     "algebra": [{ name: "Chapter 1", score: 7, total: 10 }, ...],
//     "geometry": [...],
//     "probability": [...],
//     "problemSolving": [...]
//   },
//   "Jane Doe": { ... }
// }

const STORAGE_KEY = 'studentsProgress';

// --- Load all students data ---
export function getAllStudents() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

// --- Save all students data ---
export function saveAllStudents(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --- Add or update a student's progress for a subject/chapter ---
export function updateStudentProgress(studentName, subject, chapterName, score, total) {
  const allStudents = getAllStudents();
  if (!allStudents[studentName]) allStudents[studentName] = {};
  if (!allStudents[studentName][subject]) allStudents[studentName][subject] = [];

  // Check if chapter already exists
  const chapters = allStudents[studentName][subject];
  const chapterIndex = chapters.findIndex(c => c.name === chapterName);
  if (chapterIndex > -1) {
    chapters[chapterIndex] = { name: chapterName, score, total };
  } else {
    chapters.push({ name: chapterName, score, total });
  }

  saveAllStudents(allStudents);
}

// --- Retrieve a student's progress ---
export function getStudentProgress(studentName) {
  const allStudents = getAllStudents();
  return allStudents[studentName] || {};
}

// --- Calculate student's overall grade per subject ---
export function calculateSubjectAverage(studentName, subject) {
  const progress = getStudentProgress(studentName)[subject] || [];
  if (!progress.length) return 0;
  const totalScore = progress.reduce((sum, c) => sum + c.score, 0);
  const totalPossible = progress.reduce((sum, c) => sum + c.total, 0);
  return totalPossible ? Math.round((totalScore / totalPossible) * 100) : 0;
}

// --- Get all students for parent portal ---
export function getAllStudentsSummary() {
  const allStudents = getAllStudents();
  const summary = [];
  for (const [name, subjects] of Object.entries(allStudents)) {
    const progressSummary = {};
    for (const [subject, chapters] of Object.entries(subjects)) {
      progressSummary[subject] = chapters.map(c => ({
        name: c.name,
        score: c.score,
        percentage: Math.round((c.score / c.total) * 100)
      }));
    }
    summary.push({ name, progress: progressSummary });
  }
  return summary;
}
