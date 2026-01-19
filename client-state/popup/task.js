const modal = document.querySelector('.modal');
const closeEl = modal.querySelector('.modal__close');
function hasClosedModal() {
    return document.cookie.split(';').some(c => c.startsWith('isremove='));
}
if (!hasClosedModal()) {
    modal.classList.add('modal_active');
}
closeEl.addEventListener('click', event => {
    modal.classList.remove('modal_active');
    document.cookie = 'isremove=yes; max-age=10';
})