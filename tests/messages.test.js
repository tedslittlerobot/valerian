
import Messages from '../src/Messages';

describe('message assignment', () => {

  test('add a single message', () => {
    const m = new Messages();

    m.addMessage('foo', 'bar');

    expect(m.messageList).toEqual({ foo: ['bar'] });
  });

  test('add multiple messages to the same key', () => {
    const m = new Messages();

    m.addMessage('foo', 'bar');
    m.addMessage('foo', 'baz');

    expect(m.messageList).toEqual({ foo: ['bar', 'baz'] });
  });

  test('add multiple messages to the multiple keys', () => {
    const m = new Messages();

    m.addMessage('foo', 'bar');
    m.addMessage('foo', 'baz');
    m.addMessage('monkeys', 'woop');

    expect(m.messageList).toEqual({ foo: ['bar', 'baz'], monkeys: ['woop'] });
  });

});

describe('message checking', () => {
  const list = {
    foo: ['foo', 'bar', 'baz'],
    bar: ['bar', 'baz'],
    baz: ['baz'],
  }

  test('test if a message list without messages has any messages', () => {
    const m = new Messages();

    expect(m.hasMessages()).toBe(false);
  });

  test('test if a message list with messages has any messages', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.hasMessages()).toBe(true);
  });

  test('test if a given key has messages', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.hasMessages('foo')).toBe(true);
    expect(m.hasMessage('foo')).toBe(true);
    expect(m.hasMessages('monkeys')).toBe(false);
    expect(m.hasMessage('monkeys')).toBe(false);
  });

  test('test accessing a single message', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.message('foo')).toBe('foo');
    expect(m.message('bar')).toBe('bar');
    expect(m.message('baz')).toBe('baz');
    expect(m.message('monkeys')).toBe(null);
  });

  test('test first() method aliases to message()', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.first('foo')).toBe(m.message('foo'));
  });

  test('test accessing all messages', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.messages()).toEqual(list);
  });

  test('test accessing all messages for a key', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.messages('foo')).toEqual(['foo', 'bar', 'baz']);
    expect(m.messages('bar')).toEqual(['bar', 'baz']);
    expect(m.messages('baz')).toEqual(['baz']);
    expect(m.messages('monkeys')).toBe(null);
  });

  test('test first() method aliases to message()', () => {
    const m = new Messages();

    m.messageList = list;

    expect(m.all('foo')).toEqual(m.messages('foo'));
  });

});
