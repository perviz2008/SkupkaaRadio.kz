function showTab(tab) {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("register").classList.add("hidden");
  document.getElementById(tab).classList.remove("hidden");
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  if (email === "test@example.com" && password === "1234") {
    alert("Вход выполнен");
    window.location.href = "menu.html";
  } else {
    alert("Неверный логин или пароль");
  }
}

function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  alert("Регистрация прошла успешно");
  showTab("login");
}
