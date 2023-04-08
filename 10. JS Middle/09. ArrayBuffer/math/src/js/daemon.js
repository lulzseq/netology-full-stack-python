import Math from './app';

export default class Daemon extends Math {
  constructor(name, type, cell) {
    super(name, type, cell);
    this.attack = 10;
    this.defense = 70;
    this.cell = cell;
  }
}
