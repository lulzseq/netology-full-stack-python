import { Character } from '../js/app';

describe('Character', () => {
  describe('constructor', () => {
    it('should throw an error if name is less than 2 characters', () => {
      expect(() => new Character('a', 'Swordsman')).toThrowError('Ошибка в name');
    });

    it('should throw an error if name is more than 100 characters', () => {
      const longName = 'a'.repeat(101);
      expect(() => new Character(longName, 'Swordsman')).toThrowError('Ошибка в name');
    });

    it('should throw an error if name is not a string', () => {
      expect(() => new Character(123, 'Swordsman')).toThrowError('Ошибка в name');
    });

    it('should throw an error if type is not a valid type', () => {
      expect(() => new Character('Bob', 'Wizard')).toThrowError('Ошибка в type');
    });

    it('should set name and type properties if inputs are valid', () => {
      const character = new Character('Bob', 'Swordsman');
      expect(character.name).toBe('Bob');
      expect(character.type).toBe('Swordsman');
    });

    it('should set health, level, attack, and defence properties to default values', () => {
      const character = new Character('Bob', 'Swordsman');
      expect(character.health).toBe(100);
      expect(character.level).toBe(1);
      expect(character.attack).toBe(undefined);
      expect(character.defence).toBe(undefined);
    });
  });

  describe('levelUp', () => {
    it('should throw an error if character is dead', () => {
      const character = new Character('Bob', 'Swordsman');
      character.level = 0;
      expect(() => character.levelUp()).toThrowError('Нельзя повысить level умершего');
    });

    it('should increase level by 1 and increase attack and defence by 20% if character is alive', () => {
      const character = new Character('Bob', 'Swordsman');
      character.attack = 50;
      character.defence = 30;
      character.levelUp();
      expect(character.level).toBe(2);
      expect(character.attack).toBe(60);
      expect(character.defence).toBe(36);
    });

    it('should reset health to 100 if character is alive', () => {
      const character = new Character('Bob', 'Swordsman');
      character.health = 50;
      character.levelUp();
      expect(character.health).toBe(100);
    });
  });

  it('should decrease health by correct amount based on points and defence', () => {
    const character = new Character('John', 'Bowerman');
    character.defence = 20;
    character.damage(50);
    expect(character.health).toBeCloseTo(60);
  });

  it('should not decrease health if character is already dead', () => {
    const character = new Character('Test', 'Swordsman');
    character.health = -50;
    character.defence = 50;
    character.damage(50);
    expect(character.health).toBe(-50);
  });
});
