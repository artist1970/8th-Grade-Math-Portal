// scripts/dataHandler.js

// --- Generic JSON save/load ---
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// --- Delete any key (used for full reset) ---
export function clearData(key = 'studentsProgress') {
  if (confirm("Clear all saved student data?")) {
    localStorage.removeItem(key);
    alert("All data cleared.");
    location.reload();
  }
}
