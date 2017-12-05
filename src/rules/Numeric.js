
export default class Numeric {
  validate(value) {
    if (typeof value !== 'number') return false;

    return true;
  }
}
