
export default class IsDate {
  validate(value) {
    return !Number.isNaN(Date.parse(value));
  }

  error() {
    return 'is_date';
  }

  replacements() {
    return {};
  }
}
