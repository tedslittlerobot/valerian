import _ from 'lodash';

import strings from './strings';
import ValidationError from './ValidationError';

export default class Validator {
  constructor(data = {}, rules = [], overrideStrings = {}) {
    this.rules = rules;
    this.initialData = data;
    this.data = {}; // will be a validated subset of initialData
    this.names = {};
    this.status = null;
    this.error = new ValidationError();
    this.strings = _.extend(strings(), overrideStrings);

    // Method Bindings
    this.setFieldNames = this.fieldNames.bind(this);
    this.getData = this.getData.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.passes = this.passes.bind(this);
    this.fails = this.fails.bind(this);
    this.validate = this.validate.bind(this);
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
    if (this.status === null) this.validate();

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

    this.status = this.error.hasMessages();

    if (strict && this.error.hasMessages()) {
      throw this.error;
    }

    return this;
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

    rules.forEach((rule) => {
      if (rule.validate(value, field, this)) return;

      this.addError(field, rule, value);
    });
  }

  // /////// HELPERS /////// //

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
  getData(field) {
    return this.data[field];
  }

  /**
   * Get initial data by key
   *
   * @param  {key} field
   * @return {mixed}
   */
  getInitialData(field) {
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
    this.error.addMessage(field, this.makeErrorMessage(rule, field, value));
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
    const str = this.strings[rule.error()] || rule.error();
    const name = this.guessFieldName(field);
    const replacements = { field, value, name };
    _.extend(
      replacements,
      (rule.replacements ? rule.replacements(field, this) : {}),
    );

    return _.reduce(replacements, (replacement, message, key) => message.replace(`:${key}`, replacement), str);
  }
}
