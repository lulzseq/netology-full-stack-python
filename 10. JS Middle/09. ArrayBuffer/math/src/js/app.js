import Character from './character';

export default class Math extends Character {
  constructor(name, type, dope, defense, cell) {
    super(name, type, defense);
    this.dope = dope;
    this.defense = defense;
    this.cell = cell;
  }

  get cell() {
    return this.stoned;
  }

  set cell(value) {
    if (value === 1) {
      this.stoned = 100;
    }
    if (value === 2) {
      this.stoned = 90;
    }
    if (value === 3) {
      this.stoned = 80;
    }
    if (value === 4) {
      this.stoned = 70;
    }
    if (value === 5) {
      this.stoned = 60;
    }
  }

  get dope() {
    return this.attack;
  }

  set dope(cell) {
    this.attack -= 5 * cell; // TypeError: Math.log2 is not a function
  }
}
