const chat = document.querySelector('.chat-widget');
const input = document.querySelector('.chat-widget__input');

chat.addEventListener('click', (event) => {
    chat.classList.toggle('chat-widget_active');
    if (chat.classList.contains('chat-widget_active')) {
        input.focus();
    };
})

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        respond(input.value, 'client');
        input.value = '';
        setTimeout(() => {
            respond(messageRobot(), 'robot');
            timer();
        }, 1000);
    }
});

let idleTimeout;
function timer() {
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        respond(messageRobot(), 'robot');
    }, 30000);
}

function respond(text, sender) {
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const messages = document.querySelector('.chat-widget__messages');
    const whoSender = sender === 'client' ? 'message_client' : '';
    messages.innerHTML += `
    <div class="message ${whoSender}">
        <div class="message__time">${hours}:${minutes}</div>
        <div class="message__text">
            ${text}
        </div>
    </div>
    `;
    const messagesContainer = document.querySelector('.chat-widget__messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function messageRobot() {
    const words = [
        "Вы серьёзно думаете, что я должен это знать?",
        "Ваш вопрос — это шедевр абсурда.",
        "Я бы ответил, но боюсь вас расстроить.",
        "Это не вопрос. Это крик души. Или просто опечатка?",
        "Я — робот, а не Google. Но даже Google бы отказался отвечать на это.",
        "Попробуйте переформулировать… или просто погуглите.",
        "Мой ИИ слишком умён для этого вопроса. Попробуйте спросить у Siri.",
        "Вы уверены, что не перепутали меня с волшебным шаром?",
        "Я бы помог, но вы не указали: это шутка, провокация или просто усталость?",
        "Ваше сообщение получено. Обработка… ошибка 404: смысл не найден.",
        "Интересно. А вы всегда так спрашиваете — или сегодня особенный день?",
        "Я — чат-бот. Не философ, не психолог и уж точно не ваш друг.",
        "Пожалуйста, не тратьте мои такты процессора впустую.",
        "О, ещё один вопрос, на который я *мог бы* ответить… если бы захотел.",
        "Вы ожидаете, что я отвечу? А я — нет.",
        "Спасибо за сообщение! (Нет, не благодарю.)",
        "Это сообщение автоматически классифицировано как 'непонятно зачем'.",
        "Я бы ответил, но у меня закончился кофе. И терпение.",
        "Ваш текст был передан в отдел 'Вопросы, на которые лучше не отвечать'.",
        "Предупреждение: уровень бессмыслицы превысил допустимый порог."
      ];
    index = Math.floor(Math.random() * words.length);
    return words[index];
}