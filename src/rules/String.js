
export default class String {
  constructor() {
    this.rangeMin = 1;
    this.rangeMax = null;
  }

  min(value) {
    this.rangeMin = value;

    return this;
  }

  max(value) {
    this.rangeMin = value;

    return this;
  }

  between(min, max) {
    this.rangeMin = min;
    this.rangeMax = max;

    return this;
  }

  emptiable() {
    this.rangeMin = 0;

    return this;
  }

  validate(value) {
    if (typeof value !== 'string') return false;

    const length = value.length;

    if (this.rangeMin !== null && length < this.rangeMin) return false;

    if (this.rangeMax !== null && length > this.rangeMax) return false;

    return true;
  }
}
