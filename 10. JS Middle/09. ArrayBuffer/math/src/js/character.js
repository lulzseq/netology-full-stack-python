export default class Character {
  constructor(name, type, attack, defense) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = attack;
    this.defense = defense;
  }
}
