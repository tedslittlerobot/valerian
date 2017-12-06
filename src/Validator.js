import _ from 'lodash';

export default class Validator {
  constructor(data, rules) {
    this.rules = rules;
    this.initialData = data;
    this.data = {}; // will be a validated subset of initialData
    this.names = {};
    this.status = null;
    this.errors = {};

    // Method Bindings
    this.fieldNames = this.fieldNames.bind(this);
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

  /**
   * Assign the field names
   *
   * @param  {string} names
   * @return {Validator}
   */
  fieldNames(names) {
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
   * Run the validation
   *
   * @return {Validator}
   */
  validate() {
    _.each(this.rules, this.validateField);

    this.status = this.errors.length === 0;

    return this;
  }

  /**
   * Apply the given rules to a field
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

  /**
   * Add an error message to the list
   *
   * @param {string} field
   * @param {Rule} rule
   * @param {mixed} value
   */
  addError(field, rule, value) {
    if (!this.errors[field]) {
      this.errors[field] = [];
    }

    this.errors[field].push(this.makeErrorMessage(rule, field, value));
  }

  /**
   * Guess a proper field name
   *
   * @param  {string} field
   * @return {string}
   */
  guessFieldName(field) {
    return this.names[field] || field;
  }

  /**
   * Construct an error message
   * @param  {Rule} rule
   * @param  {string} field
   * @param  {string} value
   * @return {string}
   */
  makeErrorMessage(rule, field, value) {
    const name = this.guessFieldName(field);
    const replacements = { field, value, name };
    _.assign(replacements, rule.replacements(field, this));

    const str = rule.error(); // @todo - should be a translation string

    return _.reduce(replacements, (replacement, message, key) => message.replace(key, replacement), str);
  }
}
