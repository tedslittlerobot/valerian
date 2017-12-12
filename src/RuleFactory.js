
import Rule from './rules/Rule';

export default class RuleFactory {
  constructor() {
    this.factories = {};
    this.cache = {};

    this.extend = this.extend.bind(this);
    this.make = this.make.bind(this);
  }

  /**
   * Add a new factory for a rule type
   *
   * @param  {string} key
   * @param  {func} factory
   * @return {RuleFactory}
   */
  extend(key, factory) {
    this.factories[key] = factory;

    return this;
  }

  /**
   * Construct a rule
   *
   * @param  {string} symbol
   * @return {Rule}
   */
  make(symbol) {
    // if it's already a rule, just return that
    if (symbol instanceof Rule) {
      return symbol;
    }

    if (typeof symbol !== 'string') {
      throw new Error(`Rules must either be an instance of Rule, or a string - [${typeof symbol}] supplied.`);
    }

    // if it's cached, return that
    if (this.cache[symbol]) {
      return this.cache[symbol];
    }

    // parse the basic key and parameters
    const tokens = symbol.split(':');
    const key = tokens.shift();

    // get the factory
    const factory = this.factories[key];

    if (!factory) {
      throw new Error(`No registered rule factory for rule [${key}].`);
    }

    // run it and cache
    return this.cache[symbol] = factory(...tokens);
  }

  /**
   * Alias a factory to another one.
   *
   * For example, to alias needed to requried
   *
   * factory.extend('required', () => new Required).alias('needed', 'required');
   *
   * @param  {string} newKey
   * @param  {string} aliasKey
   * @return {RuleFactory}
   */
  alias(newKey, aliasKey) {
    if (!this.factories[aliasKey]) {
      throw new Error(`There is no factory [${aliasKey}] to alias [${newKey}] to.`);
    }

    this.factories[newKey] = this.factories[aliasKey];

    return this;
  }
}

const factory = new RuleFactory();
export { factory };
