
export default class Required {
  validate(value) {
    return value !== undefined && value !== null;
  }
}
