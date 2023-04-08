import ErrorRepository from '../js/app';

test.each([
  ['Has error', 1, 'Error 1'],
  ['Error undefined', 2, 'Unknown error'],
])('err', (_, code, expected) => {
  const err = new ErrorRepository();
  expect(err.transalate(code)).toBe(expected);
});
