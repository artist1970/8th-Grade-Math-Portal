// scripts/dataHandler.js

// Generic JSON save/load
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// --- Student-Specific Data Handlers ---
export function saveStudentProgress(studentName, subject, chapterName, score, total) {
  const allData = loadData('studentsProgress') || {};
  if (!allData[studentName]) allData[studentName] = {};
  if (!allData[studentName][subject]) allData[studentName][subject] = [];

  const chapters = allData[studentName][subject];
  const chapterIndex = chapters.findIndex(c => c.name === chapterName);
  if (chapterIndex > -1) {
    chapters[chapterIndex] = { name: chapterName, score, total };
  } else {
    chapters.push({ name: chapterName, score, total });
  }

  saveData('studentsProgress', allData);
}

// Retrieve all students' progress
export function getAllStudentsProgress() {
  return loadData('studentsProgress') || {};
}

// Retrieve one student's progress
export function getStudentProgress(studentName) {
  const allData = getAllStudentsProgress();
  return allData[studentName] || {};
}

// Clear all saved data
export function clearData() {
  if (confirm("Clear all saved student data?")) {
    localStorage.removeItem('studentsProgress');
    alert("All data cleared.");
    location.reload();
  }
}
