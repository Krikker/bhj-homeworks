const linkClass = document.querySelectorAll('.menu__link');
for (let i = 0; i < linkClass.length; i++) {
    linkClass[i].addEventListener('click', function(event) {
        const menuInLi = this.closest('.menu__item');
        const menuInUl = menuInLi ? menuInLi.querySelector('.menu_sub') : null;
        if (menuInUl) {
            document.querySelectorAll('.menu_active').forEach((elem) => {
                elem.classList.remove('menu_active');
            });
            menuInUl.classList.toggle('menu_active');
            event.preventDefault();
        }
    });
}