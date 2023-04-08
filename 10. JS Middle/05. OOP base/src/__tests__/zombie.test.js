import { Zombie } from '../js/zombie';
import { Character } from '../js/app';

describe('Zombie', () => {
  test('Creates a zombie with name, type, attack, and defence', () => {
    const zombie = new Zombie('Robin', 'Zombie');
    expect(zombie.name).toBe('Robin');
    expect(zombie.type).toBe('Zombie');
    expect(zombie.health).toBe(100);
    expect(zombie.level).toBe(1);
    expect(zombie.attack).toBe(40);
    expect(zombie.defence).toBe(10);
  });

  test('inherits from the Character class', () => {
    const zombie = new Zombie('Robin', 'Zombie');
    expect(zombie instanceof Character).toBe(true);
  });
});
