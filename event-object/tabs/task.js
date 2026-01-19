document.addEventListener('click', (event) => {
    const tabChoice = event.target.closest('.tabs');
    const mainList = Array.from(tabChoice.querySelectorAll('.tab'));
    const secondList = Array.from(tabChoice.querySelectorAll('.tab__content'));
    const mainTab = tabChoice.querySelector('.tab_active');
    const secondTab = tabChoice.querySelector('.tab__content_active');

    if (event.target !== mainTab) {
        mainTab.classList.remove('tab_active');
        secondTab.classList.remove('tab__content_active');
        event.target.classList.add('tab_active');
        secondList[mainList.indexOf(event.target)].classList.add('tab__content_active');
    }
})