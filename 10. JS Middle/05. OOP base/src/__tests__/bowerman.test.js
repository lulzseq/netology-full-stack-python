import { Bowerman } from '../js/bowerman';
import { Character } from '../js/app';

describe('Bowerman', () => {
  test('Creates a bowerman with name, type, attack, and defence', () => {
    const bowerman = new Bowerman('Robin', 'Bowerman');
    expect(bowerman.name).toBe('Robin');
    expect(bowerman.type).toBe('Bowerman');
    expect(bowerman.health).toBe(100);
    expect(bowerman.level).toBe(1);
    expect(bowerman.attack).toBe(25);
    expect(bowerman.defence).toBe(25);
  });

  test('inherits from the Character class', () => {
    const bowerman = new Bowerman('Robin', 'Bowerman');
    expect(bowerman instanceof Character).toBe(true);
  });
});
