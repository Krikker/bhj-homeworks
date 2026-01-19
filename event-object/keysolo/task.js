class Game {
  constructor(container) {
    this.container = container;
    this.symbolWord = container.querySelector('.word');
    this.winAmount = container.querySelector('.status__wins');
    this.lossAmount = container.querySelector('.status__loss');
    this.timerEl = container.querySelector('.timer');

    this.reset();

    this.statusGame();
  }

  reset() {
    this.chooseWord();
    this.winAmount.textContent = 0;
    this.lossAmount.textContent = 0;
  }

  statusGame() {
    setInterval(() => {
      this.symbolLength -= 1;
      this.timerEl.textContent = this.symbolLength;
      if (this.symbolLength === 0) {
        this.lose();
      }
    }, 1000);

    document.addEventListener('keydown', (event) => {
      if (event.shiftKey || event.altKey) {
        return;
      }
      if (event.key === this.currentSymbol.textContent) {
        this.win();
      } else {
        this.lose();
      }
    });
  }

  win() {
    if (this.currentSymbol.classList.contains('symbol_current')) this.currentSymbol.classList.remove('symbol_current');
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winAmount.textContent === 10) {
      alert('Вы выйграли!');
      this.reset();
    };
    this.chooseWord();

  }

  lose() {
    if (++this.lossAmount.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    };
    this.chooseWord();
  }

  getWord() {
    const words = [
        'я люблю kitkat',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
    index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  chooseWord() {
    const word = this.getWord();
    this.reloadWord(word);
  }

  reloadWord(word) {
    const html = [...word].map((s, i) =>
      `<span class="symbol${i === 0 ? ' symbol_current' : ''}">${s}</span>`
    ).join('');
    this.symbolWord.innerHTML = html;
    this.currentSymbol = this.symbolWord.querySelector('.symbol_current');
    this.symbolLength = word.length;
  }
}

new Game(document.getElementById('game'))