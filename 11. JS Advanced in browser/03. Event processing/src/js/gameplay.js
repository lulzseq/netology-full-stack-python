import '../css/style.css';

export default class GamePlay {
  constructor() {
    this.table = document.querySelector('.table');
    this.cells = this.table.children;
    this.userScore = 0;
    this.goblinScore = 0;
    this.intervalId = null;
  }

  init() {
    const getRandom = () => Math.floor(1 + Math.random() * 15);

    let lastTarget = getRandom();

    const removeActiveByIndex = (index) => this.cells[index].classList.remove('picture');
    const appendActiveByIndex = (index) => this.cells[index].classList.add('picture');

    const updateScores = () => {
      document.getElementById('user').innerHTML = this.userScore;
      document.getElementById('goblin').innerHTML = this.goblinScore;
    };

    const intervalHandler = () => {
      removeActiveByIndex(lastTarget);
      lastTarget = getRandom();
      appendActiveByIndex(lastTarget);
    };

    this.intervalId = setInterval(intervalHandler, 1000);

    this.table.addEventListener('click', ({ target }) => {
      if (target.classList.contains('picture')) {
        this.userScore += 1;
        updateScores();
        removeActiveByIndex(lastTarget);
        clearInterval(this.intervalId);
        this.intervalId = setInterval(intervalHandler, 1000);
      } else {
        this.goblinScore += 1;
        updateScores();
        if (this.goblinScore >= 5) {
          document.getElementById('goblin').innerHTML = 'WIN';
          alert('Goblin WIN');
          clearInterval(this.intervalId);
        }
      }
    });

    updateScores();
  }
}
