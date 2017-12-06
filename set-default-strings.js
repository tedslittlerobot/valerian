
import { setStrings } from './src/strings';

setStrings({
  confirmed: 'The :name field must be confirmed.',
  email: 'The :name field must be a valid email address.',
  instance_of: 'The :name field must be an instance of :class.',
  integer: 'The :name field must be an integer.',
  'integer/min': 'The :name field must be at least :min.',
  'integer/max': 'The :name field must be at most :max.',
  'integer/between': 'The :name field must be somewhere between :min and :max.',
  is_date: 'The :name field must be a valid date.',
  is_string: 'The :name field must be a string.',
  'is_string/min': 'The :name field must be at least :min characters long.',
  'is_string/max': 'The :name field must be at most :max characters.',
  'is_string/between': 'The :name field must be between :min and :max characters.',
  matches: 'The :name field must match the :other field.',
  numeric: 'The :name field must be numeric.',
  'numeric/min': 'The :name field must be at least :min.',
  'numeric/max': 'The :name field must be at most :max.',
  'numeric/between': 'The :name field must be somewhere between :min and :max.',
  one_of: 'The :name field must be one of the allowed values.',
  required: 'The :name field is required.',
  required_with: 'The :name field is required with the :other field.',
  required_without: 'The :name field is required if the :other field is not present.',
  type_of: 'The :name field must be of type :type.',
  url: 'The :name field must be a valid URL.',
});
