document.addEventListener('click', function(event) {
    const arrows = event.target.closest('.slider__arrow');
    const dotClicked = event.target.closest('.slider__dot');

    const slider = (arrows || dotClicked).closest('.slider');

    const image = Array.from(slider.querySelectorAll('.slider__item'));
    const imageCurrent = slider.querySelector('.slider__item_active');

    const indexCurrent = image.indexOf(imageCurrent);
    const dot = Array.from(slider.querySelectorAll('.slider__dot'));
    const dotCurrent = slider.querySelector('.slider__dot_active');
    
    let next;

    if (arrows) {
        if (arrows.classList.contains('slider__arrow_next')) {
            next = (indexCurrent + 1) % image.length;
        } else if (arrows.classList.contains('slider__arrow_prev')) {
            next = (indexCurrent - 1 + image.length) % image.length;
        }
    } else if (dotClicked) {
        next = dot.indexOf(dotClicked);
    }
    imageCurrent.classList.remove('slider__item_active');
    image[next].classList.add('slider__item_active');
    dotCurrent.classList.remove('slider__dot_active');
    dot[next].classList.add('slider__dot_active');
})