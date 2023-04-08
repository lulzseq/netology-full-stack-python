import { Deamon } from '../js/deamon';
import { Character } from '../js/app';

describe('Deamon', () => {
  test('Creates a deamon with name, type, attack, and defence', () => {
    const deamon = new Deamon('Robin', 'Deamon');
    expect(deamon.name).toBe('Robin');
    expect(deamon.type).toBe('Deamon');
    expect(deamon.health).toBe(100);
    expect(deamon.level).toBe(1);
    expect(deamon.attack).toBe(40);
    expect(deamon.defence).toBe(10);
  });

  test('inherits from the Character class', () => {
    const deamon = new Deamon('Robin', 'Deamon');
    expect(deamon instanceof Character).toBe(true);
  });
});
