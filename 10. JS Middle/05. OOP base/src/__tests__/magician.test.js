import { Magician } from '../js/magician';
import { Character } from '../js/app';

describe('Magician', () => {
  test('Creates a magician with name, type, attack, and defence', () => {
    const magician = new Magician('Robin', 'Magician');
    expect(magician.name).toBe('Robin');
    expect(magician.type).toBe('Magician');
    expect(magician.health).toBe(100);
    expect(magician.level).toBe(1);
    expect(magician.attack).toBe(10);
    expect(magician.defence).toBe(40);
  });

  test('inherits from the Character class', () => {
    const magician = new Magician('Robin', 'Magician');
    expect(magician instanceof Character).toBe(true);
  });
});
