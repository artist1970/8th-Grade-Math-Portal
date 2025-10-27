// scripts/teacher.js

// --- Modal Controls ---
export function openAdminModal() {
  const modal = document.getElementById('adminModal');
  modal.style.display = 'flex';
  const feedback = modal.querySelector('.feedback');
  if (feedback) feedback.textContent = '';
}

export function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

// --- Passcode Check ---
export function checkPasscode() {
  const input = document.getElementById('passcode').value.trim();
  const stored = localStorage.getItem('teacherPasscode') || '1234';
  const feedback = document.querySelector('#adminModal .feedback');

  if (input === stored) {
    if (feedback) {
      feedback.textContent = '✅ Access granted. Welcome, Teacher!';
      feedback.style.color = '#4aa3ff';
    }
    setTimeout(closeAdminModal, 800);
  } else {
    if (feedback) {
      feedback.textContent = '❌ Incorrect passcode.';
      feedback.style.color = '#ff4a4a';
    }
  }
}

// --- Change Passcode ---
export function changePasscode() {
  const newCode = prompt("Enter new teacher passcode (4–8 digits):");
  const feedback = document.querySelector('#adminModal .feedback');

  if (!newCode) return; // cancel pressed
  if (/^\d{4,8}$/.test(newCode)) {
    localStorage.setItem('teacherPasscode', newCode);
    if (feedback) {
      feedback.textContent = '✅ Passcode updated successfully.';
      feedback.style.color = '#4aa3ff';
    }
  } else {
    if (feedback) {
      feedback.textContent = '❌ Invalid format. Must be 4–8 digits.';
      feedback.style.color = '#ff4a4a';
    }
  }

  // Clear feedback after 3s
  if (feedback) setTimeout(() => feedback.textContent = '', 3000);
}

// --- Optional: Toggle Passcode Visibility ---
export function togglePasscodeVisibility() {
  const input = document.getElementById('passcode');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}
