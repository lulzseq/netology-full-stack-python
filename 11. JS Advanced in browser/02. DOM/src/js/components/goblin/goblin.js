import './style.css';

export class Goblin {
  constructor() {
    this.randomNumber = null;
  }

  move(field) {
    field.forEach((elem) => {
      if (elem.classList.contains('picture')) {
        elem.classList.remove('picture');
      }
    });

    let random = Math.floor(Math.random() * field.length);

    if (this.randomNumber === random) {
      while (this.randomNumber === random) {
        random = Math.floor(Math.random() * field.length);
      }
      this.randomNumber = random;
      return field[this.randomNumber].classList.add('picture');
    }

    this.randomNumber = random;
    return field[this.randomNumber].classList.add('picture');
  }
}
