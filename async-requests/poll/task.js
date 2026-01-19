const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

const poll = document.querySelector('.poll');
const pollTitle = poll.querySelector('.poll__title');
const pollAnswers = poll.querySelector('.poll__answers');
let pollFiles;

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
                pollFiles = JSON.parse(xhr.responseText);
                pollTitle.insertAdjacentHTML('beforeend', pollFiles.data.title);
                pollFiles.data.answers.forEach(answer => {
                    pollAnswers.insertAdjacentHTML('beforeend', `
                        <button class="poll__answer">${answer}</button>
                    `);
                });
            } catch (e) {
                console.error('Ошибка парсинга JSON:', e);
            }
        } else {
            console.error('Ошибка запроса', xhr.status)
        }
    }
}
xhr.send();

pollAnswers.addEventListener('click', event => {
    alert('Спасибо, ваш голос засчитан!');
    const xhrAnswer = new XMLHttpRequest();
    xhrAnswer.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhrAnswer.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );

    const index = Array.from(pollAnswers.querySelectorAll('.poll__answer')).indexOf(event.target);

    xhrAnswer.onreadystatechange = function () {
        if (xhrAnswer.readyState === 4) {
            if (xhrAnswer.status >= 200 && xhrAnswer.status < 300) {
                try {
                    const pollProcent = JSON.parse(xhrAnswer.responseText);
                    pollAnswers.innerHTML = '';
                    const total = pollProcent.stat.reduce((sum, item) => sum + item.votes, 0);
                    pollFiles.data.answers.forEach((item, id) => {
                        const procent = total ? Math.round((pollProcent.stat[id].votes / total) * 10000) / 100 : 0;
                        pollAnswers.insertAdjacentHTML('beforeend', `
                        <div class="poll__result">
                        ${item}: ${procent}%
                        </div>
                        `)
                    });
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e);
                }
            } else {
                console.error('Ошибка запроса', xhrAnswer.status)
            }
        }
    };
    xhrAnswer.send(`vote=${pollFiles.id}&answer=${index}`);
})