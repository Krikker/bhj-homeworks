document.addEventListener('click', (event) => {
    const defaultLang = event.target.closest('.dropdown__value');

    if (defaultLang) {
        const root = defaultLang.closest('.dropdown');
        const choiceList = root.querySelector('.dropdown__list');
        choiceList.classList.toggle('dropdown__list_active');
    }

    const choiceLang = event.target.closest('.dropdown__link');
    
    if (choiceLang) {
        event.preventDefault();
        const rootLang = choiceLang.closest('.dropdown');
        const choiceListLang = rootLang.querySelector('.dropdown__value');
        const choiceListClose = rootLang.querySelector('.dropdown__list');
        choiceListLang.textContent = choiceLang.textContent;
        choiceListClose.classList.remove('dropdown__list_active');
    }
})