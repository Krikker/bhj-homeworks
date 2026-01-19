const card = document.querySelector('.card');
const signPage = card.querySelector('.signin');
const signButton = signPage.querySelector('.btn');
const welcomeText = card.querySelector('.welcome');
const signOutButton = welcomeText.querySelector('.signout_button');
const userId = document.getElementById('user_id');

function clearInputs() {
    signPage.querySelectorAll('.control').forEach(el => el.value = '');
}

signButton.addEventListener('click', event => {
    event.preventDefault();
    const logPasButtons = Array.from(signPage.querySelectorAll('.control'));
    const [login, password] = logPasButtons.map(elem => elem.value);
    if (!login || !password) {
        alert('Заполните логин и пароль');
        return;
    };
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            clearInputs();
            const serverAnswer = JSON.parse(xhr.responseText);
            if (serverAnswer.success) {
                localStorage.setItem('id', serverAnswer.user_id);
                signPage.classList.remove('signin_active');
                welcomeText.classList.add('welcome_active');
                userId.textContent = serverAnswer.user_id;
            } else {
                alert('Неверный логин/пароль');
            }
        }
    };
    xhr.send(`login=${login}&password=${password}`);
});
const memoryId = localStorage.getItem('id')
if (memoryId) {
    signPage.classList.remove('signin_active');
    welcomeText.classList.add('welcome_active');
    userId.textContent = memoryId;
} else {
    signPage.classList.add('signin_active');
    welcomeText.classList.remove('welcome_active');
}

signOutButton.addEventListener('click', event => {
    localStorage.removeItem('id');
    welcomeText.classList.remove('welcome_active');
    signPage.classList.add('signin_active');

})