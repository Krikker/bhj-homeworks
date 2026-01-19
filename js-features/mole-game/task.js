const kill = document.getElementById('dead');
let killAmount = parseInt(kill.textContent, 10);

const lost = document.getElementById('lost');
let lostAmount = parseInt(lost.textContent, 10);

for (let i = 1; i <= 9; i++) {
    const getHole = document.getElementById(`hole${i}`);
    getHole.onclick = () => {
        if (getHole.className === 'hole hole_has-mole') {
            killAmount += 1;
            kill.textContent = killAmount;
        } else {
            lostAmount += 1;
            lost.textContent = lostAmount;
        }
        if (killAmount === 10) {
            alert("Вы выйграли!");
            resetGame()
        } else if (lostAmount === 5) {
            alert("Вы проиграли!");
            resetGame()
        }
    }
}

function resetGame() {
    killAmount = 0;
    lostAmount = 0;
    kill.textContent = 0;
    lost.textContent = 0;
}