
import Messages from './Messages';
import { factory } from './RuleFactory';
import strings, { setStrings, mergeStrings } from './strings';
import Validator from './Validator';
import ValidationFailure from './ValidationFailure';

export default Validator;
export { strings, setStrings, mergeStrings, Messages, ValidationFailure, factory };
