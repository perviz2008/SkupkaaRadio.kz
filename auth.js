
// auth.js — Улучшенная логика входа, регистрации и восстановления

document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    const formReset = document.getElementById("form-reset");
    const errorMsg = document.getElementById("error-msg");
    const successMsg = document.getElementById("success-msg");

    function showError(message) {
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.style.display = "block";
        }
    }

    function showSuccess(message) {
        if (successMsg) {
            successMsg.textContent = message;
            successMsg.style.display = "block";
        }
    }

    function hideMessages() {
        if (errorMsg) errorMsg.style.display = "none";
        if (successMsg) successMsg.style.display = "none";
    }

    function saveUserSession(email) {
        localStorage.setItem("currentUser", email);
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem("users") || "{}");
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            hideMessages();
            const email = formLogin.email.value.trim();
            const password = formLogin.password.value;

            if (!email || !password) {
                showError("Заполните все поля");
                return;
            }

            const users = getUsers();
            if (!users[email] || users[email].password !== password) {
                showError("Неверный email или пароль");
                return;
            }

            saveUserSession(email);
            showSuccess("Успешный вход...");
            setTimeout(() => window.location.href = "index.html", 1000);
        });
    }

    if (formRegister) {
        formRegister.addEventListener("submit", function (e) {
            e.preventDefault();
            hideMessages();
            const email = formRegister.email.value.trim();
            const password = formRegister.password.value;
            const confirm = formRegister.confirm.value;

            if (!email || !password || !confirm) {
                showError("Заполните все поля");
                return;
            }

            if (password.length < 6) {
                showError("Пароль должен быть минимум 6 символов");
                return;
            }

            if (password !== confirm) {
                showError("Пароли не совпадают");
                return;
            }

            const users = getUsers();
            if (users[email]) {
                showError("Пользователь уже существует");
                return;
            }

            users[email] = { password };
            saveUsers(users);
            showSuccess("Регистрация успешна! Войдите.");
            setTimeout(() => window.location.href = "login.html", 1500);
        });
    }

    if (formReset) {
        formReset.addEventListener("submit", function (e) {
            e.preventDefault();
            hideMessages();
            const email = formReset.email.value.trim();
            const code = formReset.code.value.trim();
            const newPass = formReset.newPassword.value;

            const users = getUsers();
            if (!users[email]) {
                showError("Email не найден");
                return;
            }

            if (code !== "123456") {
                showError("Неверный код восстановления (используй 123456)");
                return;
            }

            if (newPass.length < 6) {
                showError("Пароль должен быть минимум 6 символов");
                return;
            }

            users[email].password = newPass;
            saveUsers(users);
            showSuccess("Пароль обновлён. Войдите.");
            setTimeout(() => window.location.href = "login.html", 1500);
        });
    }
});
