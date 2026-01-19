document.addEventListener('scroll', (event) => {
    const hiddenEl = document.querySelectorAll('.reveal');
    hiddenEl.forEach((item) => {
        const visible = item.getBoundingClientRect();
        if (visible.top < window.innerHeight && visible.bottom > 0) {
            item.classList.add('reveal_active');
        } else {
            item.classList.remove('reveal_active');
        }
    })
})