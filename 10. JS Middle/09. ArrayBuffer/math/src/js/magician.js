import Math from './app';

export default class Magician extends Math {
  constructor(name, type, cell) {
    super(name, type, cell);
    this.attack = 20;
    this.defense = 50;
    this.cell = cell;
  }
}
