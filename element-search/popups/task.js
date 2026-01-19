function initId(modal) {
    const popup = document.getElementById(modal);
    if (popup) popup.classList.add('modal_active');
}

function closePopup(modal) {
    modal.classList.remove('modal_active');
}

document.addEventListener('DOMContentLoaded', initId('modal_main'));
document.addEventListener('click', (item) => {
    if (item.target.classList.contains('modal__close')) {
        const closeText = item.target.closest('.modal');
        closePopup(closeText);
    };
    if (item.target.classList.contains('show-success')) {
        initId('modal_success');
    };
})