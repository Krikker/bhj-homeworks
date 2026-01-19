const clickAmountHTML = document.getElementById("clicker__counter");
let clickAmount = parseInt(clickAmountHTML.textContent, 10);

const speedClickHTML = document.getElementById("speed__counter");
let speedClick = parseInt(speedClickHTML.textContent, 10);

const touchEl = document.getElementById("cookie");

let clickTimestamp = [];

touchEl.onclick = () => {
    const now = Date.now();
    clickTimestamp.push(now);
    clickTimestamp = clickTimestamp.filter(item => now - item < 1000);
    clickAmount += 1;
    clickAmountHTML.textContent = clickAmount;
    speedClickHTML.textContent = clickTimestamp.length;
    touchEl.width = '300';
    setTimeout(() => touchEl.width = '200', 100);
}