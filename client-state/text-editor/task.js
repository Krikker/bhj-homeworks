const editor = document.getElementById('editor');
const resetButton = document.querySelector('.clear');
editor.addEventListener('input', event => {
    localStorage.setItem('letter', editor.value);
});
resetButton.addEventListener('click', event => {
    editor.value = '';
    localStorage.removeItem('letter');
})
editor.value = localStorage.getItem('letter') || '';