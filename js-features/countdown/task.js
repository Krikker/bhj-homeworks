const timerCount = document.getElementById("timer");
let seconds = parseInt(timerCount.textContent, 10);

if (isNaN(seconds)) {
    alert("Начальное значение не число");
} else {
    const countdown = setInterval(() => {
        seconds -= 1;
        const mins = Math.floor(seconds/60);
        const sec = seconds % 60;
        timerCount.textContent = `${String(mins).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        if (seconds <= 0) {
            clearInterval(countdown);
            alert("Вы победили в конкурсе!");
            window.location.assign("https://github.com/torvalds/linux/archive/refs/heads/master.zip")
        }
    }, 1000);
}