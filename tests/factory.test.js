
import Rule from '../src/rules/Rule';
import RuleFactory from '../src/RuleFactory';

describe('rule factory adding', () => {

  test('extending adds a factory', () => {
    const f = new RuleFactory();

    const func = () => {};

    f.extend('foo', func);

    expect(f.factories.foo).toBe(func);
  });

  test('aliasing adds a factory', () => {
    const f = new RuleFactory();

    const func = () => {};

    f.extend('foo', func);
    f.alias('baz', 'foo');

    expect(f.factories.foo).toBe(func);
    expect(f.factories.baz).toBe(func);
  });

  test('aliasing something that does not exist errors', () => {
    const f = new RuleFactory();

    expect(() => f.alias('baz', 'foo')).toThrow('There is no factory [foo] to alias [baz] to.');
  });

});

describe('rule factory construction', () => {

  test('Rule instances get passed through', () => {
    const f = new RuleFactory();
    const r = new Rule();

    expect(f.make(r)).toBe(r);
  });

  test('non-strings are not allowed', () => {
    const f = new RuleFactory();

    expect(() => f.make({})).toThrow('Rules must either be an instance of Rule, or a string - [object] supplied.');
    expect(() => f.make(1)).toThrow('Rules must either be an instance of Rule, or a string - [number] supplied.');
  });

  test('invalid rules throw an error', () => {
    const f = new RuleFactory();

    expect(() => f.make('foo')).toThrow('No registered rule factory for rule [foo].');
  });

  test('cached factories are returned', () => {
    const f = new RuleFactory();

    f.cache.foo = 'bar';

    expect(f.make('foo')).toBe('bar');
  });

  test('successful simple construction', () => {
    const f = new RuleFactory();

    f.factories.foo = () => 'bar';

    expect(f.make('foo')).toBe('bar');
    expect(f.cache.foo).toBe('bar');
  });

  test('arguments are split and passed to a factory', () => {
    const f = new RuleFactory();

    f.factories.foo = (one, two, three) => {
      expect(one).toBe('one');
      expect(two).toBe('two');
      expect(three).toBe('three');
    };

    f.make('foo|one|two|three');
  });

  test('list arguments are converted to arrays', () => {
    const f = new RuleFactory();

    const result = f.parseArgument('one,two,three');

    expect(result).toEqual(['one', 'two', 'three']);
  });

  test('colonic arguments are converted to maps', () => {
    const f = new RuleFactory();

    const result = f.parseArgument('one:a,two:b,three:c');

    expect(result).toEqual({ one: 'a', two: 'b', three: 'c' });
  });

});
