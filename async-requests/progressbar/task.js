const form = document.getElementById('form');
const sendButton = document.getElementById('send');
sendButton.addEventListener('click', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    const progress = document.getElementById('progress');
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const percent = event.loaded / event.total;
            progress.value = percent;
        }
    };
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            progress.value = 1.0;
            alert('Файл загружен!');
        } else {
            console.error('Ошибка загрузки');
        }
    };
    xhr.send(formData);
})