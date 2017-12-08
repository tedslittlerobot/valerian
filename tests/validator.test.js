
import Validator from '../src/Validator';
import ValidationFailure from '../src/ValidationFailure';
import Required from '../src/rules/Required';
import Optional from '../src/rules/Optional';
import IsString from '../src/rules/IsString';

const data = {
  a_string: 'woop',
  a_number: 42,
};

describe('basic validation tests', () => {

  test('validate nothing', () => {
    const val = new Validator();

    expect(val.passes()).toBe(true);
  });

  test('validate some data with no rules', () => {
    const val = new Validator(data);

    expect(val.passes()).toBe(true);
  });

});

describe('basic validation failure / pass tests', () => {

  test('validate some data that passes', () => {
    const val = new Validator(data, { a_string: [new Required()] });

    expect(val.passes()).toBe(true);
  });

  test('validate some data that fails', () => {
    const val = new Validator(data, { b_string: new Required() });

    expect(val.fails()).toBe(true);
  });

  test('validate some data that fails violently with an exception', () => {
    const val = new Validator(data, { b_string: new Required() });

    // @todo - should throw ValidationFailure class
    expect(() => val.validate(true)).toThrow('There were validation errors.');
  });

  test('validate a rule that skips the rest', () => {
    const val = new Validator(data, { b_string: [new Optional(), new IsString()] });

    expect(val.passes()).toBe(true);
  });

  test('validate a rule that does not skip the rest', () => {
    const val = new Validator(data, { a_number: [new Optional(), new IsString()] });

    expect(val.fails()).toBe(true);
  });

});

describe('data filtering', () => {

  test('test retrieve initial data', () => {
    const val = new Validator(data, {});

    expect(val.getInitialData()).toEqual(data);
  });

  test('test filtered data clears out data', () => {
    const val = new Validator(data, {});

    expect(val.passes()).toBe(true);
    expect(val.getData()).toEqual({});
  });

  test('test filtered returns all filtered data', () => {
    const val = new Validator(data, { a_string: [] });

    expect(val.passes()).toBe(true);
    expect(val.getData()).toEqual({ a_string: 'woop' });
  });

  test('test accessing individual filtered data', () => {
    const val = new Validator(data, { a_string: [] });

    expect(val.passes()).toBe(true);
    expect(val.getData('a_string')).toBe('woop');
    expect(val.getData('a_number')).toBe(undefined);
  });

});
describe('validation ruleset checking', () => {

  test('single rules should be converted to array', () => {
    const val = new Validator();
    const rule = new Required();

    const result = val.checkRules(rule);

    expect(result).toEqual([rule]);
    expect(result[0]).toBe(rule);
  });

  test('validate optional rule is implicit', () => {
    const val = new Validator();
    const result = val.checkRules([]);

    expect(result[0] instanceof Optional).toBe(true);
  });

  test('validate optional rule can be explicit', () => {
    const val = new Validator();
    const rule = new Optional();
    const result = val.checkRules([rule]);

    expect(result).toEqual([rule]);
    expect(result[0]).toBe(rule);
  });

  test('validate required does not add implicit optional rule', () => {
    const val = new Validator();
    const rule = new Required();
    const result = val.checkRules([rule]);

    expect(result).toEqual([rule]);
    expect(result[0]).toBe(rule);
  });

  test('validate only Rule classes are allowed', () => {
    const val = new Validator();

    expect(() => val.checkRules(['monkeys'])).toThrow('The supplied rule must be an instance of [Rule]. [String] given.');
  });

});

describe('validation field name replacements', () => {
  const names = { foo: 'bar' };

  test('field names can be added to property', () => {
    const val = new Validator();

    val.setFieldNames(names);

    expect(val.names).toEqual(names);
  });

  test('field name replacement works', () => {
    const val = new Validator();

    val.setFieldNames(names);

    expect(val.guessFieldName('foo')).toBe('bar');
  });

  test('field name replacement fallback works', () => {
    const val = new Validator();

    val.setFieldNames(names);

    expect(val.guessFieldName('bar')).toBe('Bar');
  });

});
