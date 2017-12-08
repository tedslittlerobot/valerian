
import strings, { setStrings, mergeStrings } from '../src/strings';

test('strings to default to empty object', () => {
  expect(strings()).toEqual({});
});

test('manually set strings', () => {
  setStrings({ foo: 'foo' });
  expect(strings()).toEqual({ foo: 'foo' });
});

test('merge in strings', () => {
  mergeStrings({ bar: 'bar' });
  expect(strings()).toEqual({ foo: 'foo', bar: 'bar' });
});

test('override strings', () => {
  setStrings({ baz: 'baz' });
  expect(strings()).toEqual({ baz: 'baz' });
});
