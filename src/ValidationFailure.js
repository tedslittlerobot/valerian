
export default class ValidationFailure extends Error {
  constructor(errors, ...params) {
    super('There were validation errors.', ...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationFailure);
    }

    this.errors = errors;
  }
}
