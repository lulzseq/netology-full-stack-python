import ArrayBufferConverter from '../src/js/app';
import getBuffer from '../src/js/buffer';

test('toString', () => {
  const data = new ArrayBufferConverter();
  data.load(getBuffer());
  const result = data.toString();
  const expected = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  expect(result).toMatch(expected);
});
