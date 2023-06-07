import { Goblin } from './components/goblin/goblin';

const gameField = document.getElementById('game');

for (let i = 1; i < 17; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  gameField.appendChild(cell);
}

const completeField = Array.from(document.querySelectorAll('.cell'));

const goblin = new Goblin();
goblin.move(completeField);

setInterval(() => {
  goblin.move(completeField);
}, 1000);
