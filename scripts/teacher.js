// scripts/teacher.js
export function openAdminModal() {
  document.getElementById('adminModal').style.display = 'flex';
}

export function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

export function checkPasscode() {
  const input = document.getElementById('passcode').value;
  const stored = localStorage.getItem('teacherPasscode') || '1234';
  if (input === stored) {
    alert('✅ Access granted. Welcome, Teacher!');
    closeAdminModal();
  } else {
    alert('❌ Incorrect passcode.');
  }
}

export function changePasscode() {
  const newCode = prompt("Enter new teacher passcode (4–8 digits):");
  if (/^\d{4,8}$/.test(newCode)) {
    localStorage.setItem('teacherPasscode', newCode);
    alert('Passcode updated successfully.');
  } else {
    alert('Invalid code format. Must be 4–8 digits.');
  }
}
