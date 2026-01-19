const book = document.getElementById('book');
const fontSizes = document.querySelectorAll('.font-size');

const textColorPanel = document.querySelector('.book__control_color');
const textColorTask = textColorPanel.querySelectorAll('.color');

const bgColorPanel = document.querySelector('.book__control_background');
const bgColorTask = bgColorPanel.querySelectorAll('.color');

fontSizes.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        fontSizes.forEach(btn => btn.classList.remove('font-size_active'));
        button.classList.add('font-size_active');
        const size = button.dataset.size;
        book.classList.remove('book_fs-small', 'book_fs-big');
        if (size === 'big') {
            book.classList.add('book_fs-big');
        } else if (size === 'small') {
            book.classList.add('book_fs-small');
        }
    })
})

textColorTask.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        textColorTask.forEach(btn => btn.classList.remove('color_active'));
        button.classList.add('color_active');
        const textColor = button.dataset.textColor;
        book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
        if (textColor === 'black') {
            book.classList.add('book_color-black');
        } else if (textColor === 'gray') {
            book.classList.add('book_color-gray');
        } else if (textColor === 'whitesmoke') {
            book.classList.add('book_color-whitesmoke');
        }
    })
})

bgColorTask.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        bgColorTask.forEach(btn => btn.classList.remove('color_active'));
        button.classList.add('color_active');
        const textBgColor = button.dataset.bgColor;
        book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
        if (textBgColor === 'black') {
            book.classList.add('book_bg-black');
        } else if (textBgColor === 'gray') {
            book.classList.add('book_bg-gray');
        } else if (textBgColor === 'white') {
            book.classList.add('book_bg-white');
        }
    })
})