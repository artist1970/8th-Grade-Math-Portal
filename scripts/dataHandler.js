// scripts/dataHandler.js
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearData() {
  if (confirm("Clear all saved student data?")) {
    localStorage.clear();
    alert("All data cleared.");
    location.reload();
  }
}
