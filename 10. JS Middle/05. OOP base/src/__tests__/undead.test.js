import { Undead } from '../js/undead';
import { Character } from '../js/app';

describe('Undead', () => {
  test('Creates a undead with name, type, attack, and defence', () => {
    const undead = new Undead('Robin', 'Undead');
    expect(undead.name).toBe('Robin');
    expect(undead.type).toBe('Undead');
    expect(undead.health).toBe(100);
    expect(undead.level).toBe(1);
    expect(undead.attack).toBe(25);
    expect(undead.defence).toBe(25);
  });

  test('inherits from the Character class', () => {
    const undead = new Undead('Robin', 'Undead');
    expect(undead instanceof Character).toBe(true);
  });
});
