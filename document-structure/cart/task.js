const cart = document.querySelector('.cart__products');
const visible = cart.closest('.cart');

function saveToLocal() {
    const tasks = Array.from(cart.querySelectorAll('.cart__product')).map(product => {
        return [product.dataset.id, product.querySelector('.cart__product-image').src,
        Number(product.querySelector('.cart__product-count').textContent)];
    }).filter(item => item[2] > 0);
    localStorage.setItem('product', JSON.stringify(tasks));
}

function loadCart() {
    const saved = localStorage.getItem('product');
    const product = saved ? JSON.parse(saved) : [];
    cart.innerHTML = '';
    if (product.length > 0) {
        visible.style.display = 'block';
        product.forEach(info => {
            cart.insertAdjacentHTML('beforeend', `
            <div class="cart__product" data-id="${info[0]}">
                <img class="cart__product-image" src="${info[1]}">
                <div class="cart__product-count">${info[2]}</div>
                <div class="element_remove">-</div>
            </div>
            `);
        });
    } else {
        visible.style.display = 'none';
    }
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('product__quantity-control_dec')) {
        let count = Number(event.target.nextElementSibling.textContent);
        if (count > 1) {
            event.target.nextElementSibling.textContent = count - 1;
        }
    };

    if (event.target.classList.contains('product__quantity-control_inc')) {
        let countPrev = Number(event.target.previousElementSibling.textContent);
        event.target.previousElementSibling.textContent = countPrev + 1;
    };

    if (event.target.classList.contains('product__add')) {
        const parent = event.target.closest('.product');
        const countCurrent = parent.querySelector('.product__quantity-value').textContent;
        const exist = cart.querySelector(`.cart__product[data-id='${parent.dataset.id}']`);

        visible.style.display = 'block';

        let targetImg;
        if (exist) {
            targetImg = exist.querySelector('.cart__product-image');
        } else {
            targetImg = visible;
        }

        const img = parent.querySelector('.product__image')
        const imgRect = img.getBoundingClientRect();
        const cartRect = targetImg.getBoundingClientRect();
        const flyImg = img.cloneNode();
        flyImg.style.cssText = `
        position: absolute;
        left: ${imgRect.left}px;
        top: ${imgRect.top}px; 
        `;
        document.body.appendChild(flyImg);

        const steps = 30;
        const time = 500 / steps;
        const dx = (cartRect.left - imgRect.left) / steps;
        const dy = (cartRect.top - imgRect.top) / steps;
        let i = 0;
        const interval = setInterval(() => {
            i++;
            flyImg.style.left = (imgRect.left + dx * i) + 'px'
            flyImg.style.top = (imgRect.top + dy * i) + 'px'
            if (i >= steps) {
                clearInterval(interval);
                flyImg.remove();
                if (exist) {
                    const newCount = exist.querySelector('.cart__product-count');
                    newCount.textContent = Number(newCount.textContent) + Number(countCurrent);
                    saveToLocal()
                } else {
                    cart.insertAdjacentHTML('beforeend', `
                    <div class="cart__product" data-id="${parent.dataset.id}">
                        <img class="cart__product-image" src="${parent.querySelector('.product__image').src}">
                        <div class="cart__product-count">${countCurrent}</div>
                        <div class="element_remove">-</div>
                    </div>
                    `);
                    saveToLocal()
                }
            }
        }, time);
    };

    if (event.target.classList.contains('element_remove')) {
        const parentCart = event.target.closest('.cart__product');
        let countPrevCart = Number(event.target.previousElementSibling.textContent);
        event.target.previousElementSibling.textContent = countPrevCart - 1;
        saveToLocal();
        if (Number(event.target.previousElementSibling.textContent) === 0) {
            parentCart.remove();
            if (cart.children.length === 0) {
                visible.style.display = 'none';
            }
        }
    };
})
loadCart();