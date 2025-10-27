// scripts/tracker.js

const STORAGE_KEY = 'studentsProgress';

// --- Load all students ---
export function getAllStudents() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

// --- Save all students ---
export function saveAllStudents(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --- Update per-chapter or mission score ---
export function updateStudentProgress(studentName, subject, chapterName, score, total) {
  const allStudents = getAllStudents();
  if (!allStudents[studentName]) allStudents[studentName] = { weeklyHistory: [] };
  if (!allStudents[studentName][subject]) allStudents[studentName][subject] = [];

  const chapters = allStudents[studentName][subject];
  const chapterIndex = chapters.findIndex(c => c.name === chapterName);
  if (chapterIndex > -1) {
    chapters[chapterIndex] = { name: chapterName, score, total };
  } else {
    chapters.push({ name: chapterName, score, total });
  }

  saveAllStudents(allStudents);
}

// --- Record a mission or chapter test into weekly history ---
export function recordWeeklyHistory(studentName, missionName, score) {
  const allStudents = getAllStudents();
  if (!allStudents[studentName]) allStudents[studentName] = { weeklyHistory: [] };
  if (!allStudents[studentName].weeklyHistory) allStudents[studentName].weeklyHistory = [];

  allStudents[studentName].weeklyHistory.push({
    mission: missionName,
    score,
    date: new Date().toISOString()
  });

  saveAllStudents(allStudents);
}

// --- Retrieve student's progress ---
export function getStudentProgress(studentName) {
  const allStudents = getAllStudents();
  return allStudents[studentName] || { weeklyHistory: [] };
}

// --- Calculate subject average ---
export function calculateSubjectAverage(studentName, subject) {
  const progress = getStudentProgress(studentName)[subject] || [];
  if (!progress.length) return 0;
  const totalScore = progress.reduce((sum, c) => sum + c.score, 0);
  const totalPossible = progress.reduce((sum, c) => sum + c.total, 0);
  return totalPossible ? Math.round((totalScore / totalPossible) * 100) : 0;
}

// --- Generate summary for parent portal ---
export function getAllStudentsSummary() {
  const allStudents = getAllStudents();
  const summary = [];
  for (const [name, subjects] of Object.entries(allStudents)) {
    const progressSummary = {};
    for (const [subject, chapters] of Object.entries(subjects)) {
      if (subject === "weeklyHistory") continue;
      progressSummary[subject] = chapters.map(c => ({
        name: c.name,
        score: c.score,
        percentage: Math.round((c.score / c.total) * 100)
      }));
    }
    summary.push({ name, progress: progressSummary, weeklyHistory: subjects.weeklyHistory || [] });
  }
  return summary;
}
