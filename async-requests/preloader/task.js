let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

const card = document.querySelector('.card');
const loader = card.querySelector('.loader');
const itemChange = document.getElementById('items');

function saveResult() {
    const course = Array.from(itemChange.querySelectorAll('.item')).map(item => {
        return [item.querySelector('.item__code').textContent, item.querySelector('.item__value').textContent]
    });
    localStorage.setItem('course', JSON.stringify(course));
}

function loadResult() {
    const exist = localStorage.getItem('course');
    const saved = exist ? JSON.parse(exist) : [];
    saved.forEach(text => {
        itemChange.insertAdjacentHTML('beforeend', `
        <div class="item">
            <div class="item__code">
                ${text[0]}
            </div>
            <div class="item__value">
                ${text[1]}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
        `);
    })
}

xhr.onreadystatechange = function () {
    if (xhr.readyState === 1) {
        loader.classList.add('loader_active');
    } 
    if (xhr.readyState === 4) {
        loader.classList.remove('loader_active');
        if (xhr.status === 200) {
            try {
                const main = JSON.parse(xhr.responseText);
                itemChange.innerHTML = '';
                for (const code in main.response.Valute) {
                    const item = main.response.Valute[code];
                    itemChange.insertAdjacentHTML('beforeend', `
                    <div class="item">
                        <div class="item__code">
                            ${item.CharCode}
                        </div>
                        <div class="item__value">
                            ${item.Value}
                        </div>
                        <div class="item__currency">
                            руб.
                        </div>
                    </div>
                    `);
                }
                saveResult();
            } catch (e) {
                console.error('Ошибка парсинга JSON:', e);
            }
        } else {
            console.error('Ошибка запроса', xhr.status);
        }
    }
}
loadResult();
xhr.send();