import getLevel from '../basic';

test.each([
  [{ name: 'мечник', health: 10 }, 'critical'],
  [{ name: 'маг', health: 100 }, 'healthy'],
  [{ name: 'дракула', health: 40 }, 'wounded'],
  [{ name: 'дьявол' }, null],
])(
  ('healthy hero testing'),
  (hero, health) => {
    const result = getLevel(hero);

    expect(result).toBe(health);
  },
);
