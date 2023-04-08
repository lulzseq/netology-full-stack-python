import Magician from '../src/js/magician';
import Daemon from '../src/js/daemon';
import Math from '../src/js/app';

test('test 100', () => {
  const data = new Magician('Boo', 'Magician', 1);
  const expected = {
    name: 'Boo',
    type: 'Magician',
    health: 100,
    level: 1,
    attack: 20,
    defense: 50,
    stoned: 100,
  };
  expect(data).toEqual(expected);
});

test('test 90', () => {
  const data = new Magician('Boo', 'Magician', 2);
  const expected = {
    name: 'Boo',
    type: 'Magician',
    health: 100,
    level: 1,
    attack: 20,
    defense: 50,
    stoned: 90,
  };
  expect(data).toEqual(expected);
});

test('test 80', () => {
  const data = new Daemon('Boo', 'Daemon', 3);
  const expected = {
    name: 'Boo',
    type: 'Daemon',
    health: 100,
    level: 1,
    attack: 10,
    defense: 70,
    stoned: 80,
  };
  expect(data).toEqual(expected);
});

test('test 70', () => {
  const data = new Daemon('Boo', 'Daemon', 4);
  const expected = {
    name: 'Boo',
    type: 'Daemon',
    health: 100,
    level: 1,
    attack: 10,
    defense: 70,
    stoned: 70,
  };
  expect(data).toEqual(expected);
});

test('test 60', () => {
  const data = new Daemon('Boo', 'Daemon', 5);
  const expected = {
    name: 'Boo',
    type: 'Daemon',
    health: 100,
    level: 1,
    attack: 10,
    defense: 70,
    stoned: 60,
  };
  expect(data).toEqual(expected);
});

test('get sell', () => {
    const data = new Math('Boo', 'Magican', 20, 20, 50);
    const expected = data.cell;
    expect(data.stoned).toEqual(expected);
});

test('set sell', () => {
    const data = new Math('Boo', 'Daemon', 10, 10, 70);
    const expected = data.dope;
    expect(data.attack).toEqual(expected);
});
