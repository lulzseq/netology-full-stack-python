import Team from '../js/app';
import Character from '../js/character';

test('Add person', () => {
  const personFirst = new Character('Boo', 'Bowerman');
  const personSecond = new Character('Bo', 'Magician');

  const team = new Team();

  team.add(personFirst);
  team.add(personSecond);
  expect(team.members).toContain(personFirst, personSecond);
});

test('Error checking in add', () => {
  expect(() => {
    const personFirst = new Character('Boo', 'Bowerman');
    
    const team = new Team();
    
    team.add(personFirst);
    team.add(personFirst);
  }).toThrow('This character already exists');
});

test('addAll method', () => {
  const personFirst = new Character('Bob', 'Bowerman');
  const personSecond = new Character('Bob', 'Magician');
  const personThird = new Character('Bob', 'Bowerman');

  const team = new Team();

  team.addAll(personFirst, personSecond, personThird);
  expect(team.members).toContain(personFirst, personSecond);
});

test('toArray method', () => {
  const personFirst = new Character('Bob', 'Bowerman');
  const personSecond = new Character('Bob', 'Magician');

  const team = new Team();

  team.addAll(personFirst, personSecond);
  expect(team.toArray()).toEqual([personFirst, personSecond]);
});
