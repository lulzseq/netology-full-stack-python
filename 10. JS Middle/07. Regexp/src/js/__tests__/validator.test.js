import Validator from '../validator';

test.each([
  ['a1', false],
  ['a1_q-', false],
  ['01Ivan', false],
  ['Ivan1', false],
  ['Иван', false],
  ['Ivan01_q', true],
  ['Ivan01-q-', false],
  ['1Ivan-2', false],
  ['1', false],
  ['aA', true],
  ['aA0-', false],
  ['I-1V', true],
])(
  ('Testing Validator class, method validateUsername(str)'),
  (param, expected) => {
    const validStr = new Validator(param);
    const received = validStr.validateUsername();
    console.log('expected: ', expected);
    console.log('received: ', received);
    expect(expected).toBe(received);
  },
);
