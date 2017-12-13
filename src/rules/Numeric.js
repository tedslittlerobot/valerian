
import Rule from './Rule';

export default class Numeric extends Rule {
  constructor() {
    super();

    this.rangeMin = null;
    this.rangeMax = null;

    this.min = this.min.bind(this);
    this.max = this.max.bind(this);
    this.between = this.between.bind(this);
  }

  min(value) {
    this.rangeMin = (value !== null) ? Number(value) : null;

    return this;
  }

  max(value) {
    this.rangeMax = (value !== null) ? Number(value) : null;

    return this;
  }

  between(min, max) {
    this.rangeMin = (min !== null) ? Number(min) : null;
    this.rangeMax = (max !== null) ? Number(max) : null;

    return this;
  }

  validate(value) {
    if (typeof value !== 'number') {
      return false;
    }

    if (this.rangeMin !== null && value < this.rangeMin) {
      return false;
    }

    if (this.rangeMax !== null && value > this.rangeMax) {
      return false;
    }

    return true;
  }

  error() {
    if (this.rangeMin !== null && this.rangeMax !== null) {
      return 'numeric/between';
    }

    if (this.rangeMin !== null) {
      return 'numeric/min';
    }

    if (this.rangeMax !== null) {
      return 'numeric/max';
    }

    return 'numeric';
  }

  replacements() {
    return { min: this.rangeMin, max: this.rangeMax };
  }
}
