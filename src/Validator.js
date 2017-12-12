import _ from 'lodash';

import { factory } from './RuleFactory';
import strings from './strings';
import Messages from './Messages';
import ValidationFailure from './ValidationFailure';
import SkippingRule from './rules/SkippingRule';
import Rule from './rules/Rule';
import Required from './rules/Required';
import Optional from './rules/Optional';

export default class Validator {
  constructor(data = {}, rules = {}, overrideStrings = {}) {
    this.rules = this.parseRules(rules);
    this.initialData = data;
    this.data = {}; // will be a validated subset of initialData
    this.names = {};
    this.status = null;
    this.errors = new Messages();
    this.strings = _.extend(strings(), overrideStrings);
    this.cachedOptional = new Optional(); // cached for implicit optional

    // Method Bindings
    this.setFieldNames = this.setFieldNames.bind(this);
    this.getData = this.getData.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.passes = this.passes.bind(this);
    this.fails = this.fails.bind(this);
    this.validate = this.validate.bind(this);
    this.checkRules = this.checkRules.bind(this);
    this.validateField = this.validateField.bind(this);
    this.addError = this.addError.bind(this);
    this.guessFieldName = this.guessFieldName.bind(this);
    this.makeErrorMessage = this.makeErrorMessage.bind(this);
  }

  // /////// VALIDATION /////// //

  /**
   * If the validation passes
   * @return {bool}
   */
  passes() {
    if (this.status === null) {
      this.validate();
    }

    return this.status;
  }

  /**
   * If the validation fails
   * @return {bool}
   */
  fails() {
    return !this.passes();
  }

  /**
   * Run the validation. Throws an error if strict is set to true
   *
   * @param {bool} strict
   * @return {Validator}
   */
  validate(strict = false) {
    _.each(this.rules, this.validateField);

    this.status = !this.errors.hasMessages();

    if (strict && this.errors.hasMessages()) {
      throw new ValidationFailure(this.errors);
    }

    return this;
  }

  /**
   * Check the rule set
   *
   * @todo  - optimise this!
   * @todo  - convert strings and arguments to available rules
   *
   * @param  {array<Rule>} rules
   * @return {array<Rule>}
   */
  checkRules(rules) {
    const ruleset = Array.isArray(rules) ? rules : [rules];

    const has = { required: false, optional: false };

    ruleset.forEach((rule) => {
      // rules must be rules
      if (!(rule instanceof Rule)) {
        throw new Error(`The supplied rule must be an instance of [Rule]. [${rule.constructor.name}] given.`);
      }

      if (rule instanceof Required) {
        has.required = true;
      }

      if (rule instanceof Optional) {
        has.optional = true;
      }
    });

    // a rule must have an optional or a required rule in it
    if (!has.required && !has.optional) {
      ruleset.unshift(this.cachedOptional);
    }

    return ruleset;
  }

  /**
   * Apply the given rules to a field
   *
   * @todo - ignore non-"required" rules if empty
   *
   * @param  {array<Rule>} rules
   * @param  {string} field
   * @return {void}
   */
  validateField(rules, field) {
    const value = this.getInitialData(field);
    this.data[field] = value;

    let shouldSkip = false;

    this.checkRules(rules).forEach((rule) => {
      if (shouldSkip) {
        // if skipping has been set, skip
        return;
      }

      if ((rule instanceof SkippingRule) && rule.shouldSkipRemainingRules(value, field, this)) {
        // if it fails, but should skip, skip!
        return shouldSkip = true;
      }

      if (rule.validate(value, field, this)) {
        // if it passes, ignore and keep going
        return;
      }

      this.addError(field, rule, value);
    });
  }

  // /////// HELPERS /////// //

  parseRules(rules) {
    return _.map(rules, (rules, field) => {
      return rules.map(factory.make);
    });
  }

  /**
   * Assign the field names
   *
   * @param  {string} names
   * @return {Validator}
   */
  setFieldNames(names) {
    this.names = names;

    return this;
  }

  /**
   * Get filtered data by key
   *
   * @param  {key} field
   * @return {mixed}
   */
  getData(field = null) {
    if (field === null) {
      return this.data;
    }

    return this.data[field];
  }

  /**
   * Get initial data by key
   *
   * @param  {key} field
   * @return {mixed}
   */
  getInitialData(field = null) {
    if (field === null) {
      return this.initialData;
    }

    return this.initialData[field];
  }

  /**
   * Guess a proper field name. Either finds it in the names map, or ucfirst's
   * the field name
   *
   * @param  {string} field
   * @return {string}
   */
  guessFieldName(field) {
    return this.names[field] || (field.charAt(0).toUpperCase() + field.slice(1));
  }

  // /////// ERRORS /////// //

  /**
   * Add an error message to the list
   *
   * @param {string} field
   * @param {Rule} rule
   * @param {mixed} value
   */
  addError(field, rule, value) {
    this.errors.addMessage(field, this.makeErrorMessage(rule, field, value));
  }

  /**
   * Construct an error message
   *
   * @param  {Rule} rule
   * @param  {string} field
   * @param  {string} value
   * @return {string}
   */
  makeErrorMessage(rule, field, value) {
    const str = this.strings[rule.error(value, field, this)] || rule.error(value, field, this);
    const name = this.guessFieldName(field);
    const replacements = rule.allReplacements(field, value, name, this);

    return _.reduce(
      replacements,
      (message, replacement, key) => message.replace(`:${key}`, replacement),
      str,
    );
  }
}
