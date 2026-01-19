const phrases = document.querySelectorAll('.rotator__case');
let i = 0;
function nextPhrase() {
    phrases[i].classList.remove('rotator__case_active');
    i = (i + 1) % phrases.length;
    phrases[i].classList.add('rotator__case_active');
    phrases[i].style.color = phrases[i].dataset.color;
    const delay = phrases[i].dataset.speed;
    setTimeout(nextPhrase, delay);
}
nextPhrase();
