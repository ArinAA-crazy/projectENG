// Регистрация
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    alert(`Registered:\nUsername: ${username}\nEmail: ${email}`);
    // Здесь будет Firebase или API-запрос
    window.location.href = 'login.html';
  });
}

// Вход
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    alert(`Logged in as: ${email}`);
    // Здесь будет проверка через Firebase
    window.location.href = 'index.html';
  });
}