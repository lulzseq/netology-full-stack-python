import { Swordsman } from '../js/swordsman';
import { Character } from '../js/app';

describe('Swordsman', () => {
  test('Creates a swordsman with name, type, attack, and defence', () => {
    const swordsman = new Swordsman('Robin', 'Swordsman');
    expect(swordsman.name).toBe('Robin');
    expect(swordsman.type).toBe('Swordsman');
    expect(swordsman.health).toBe(100);
    expect(swordsman.level).toBe(1);
    expect(swordsman.attack).toBe(40);
    expect(swordsman.defence).toBe(10);
  });

  test('inherits from the Character class', () => {
    const swordsman = new Swordsman('Robin', 'Swordsman');
    expect(swordsman instanceof Character).toBe(true);
  });
});
