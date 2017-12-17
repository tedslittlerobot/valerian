# Valerian: JS Validation Library &middot; [![npm version](https://img.shields.io/npm/v/valerian.svg?style=flat)](https://www.npmjs.com/package/valerian) [![Build Status](https://travis-ci.org/tedslittlerobot/valerian.svg?branch=master)](https://travis-ci.org/tedslittlerobot/valerian) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tedslittlerobot/valerian/blob/master/LICENSE)

## Usage

```javascript
import 'valerian/bootstrap'; // must be done once

import { Email, Integer, IsString } from 'valerian/rules';
import Validator from 'valerian';

// 1. Get your data
const data = { name: 'Tony', age: 'Tony', email: 'not an email' };

// 2. Set some rules
const rules = {
  name: ['string'], // rules can use string constructors
  age: [(new Integer()).between(18, 100)], // or class constructors
  email: ['required', 'string|min:3', 'email'],
};

// 3. Make a validator
const val = new Validator(data, rules);

// 4. Test your data!
val.passes(); // false
val.fails(); // true

// 5. Show some error messages

val.error.first('age') // 'The age field must be somewhere between 18 and 100.'
val.error.first('name') // null
val.error.all('age') // ['The age field must be somewhere between 18 and 100.']
val.error.all('name') // null
val.error.all()
// {
//   age: ['The age field must be somewhere between 18 and 100.'],
//   email: ['The email field must be a valid email address.'],
// }

val.error.hasMessages('name') // false
val.error.hasMessages('age') // true

// To throw an exception:
val.validate(true); // throws ValidationError - it has all the methods available to val.error (e.first('age'))
```

## Rules

The following rules are available

### Numeric

```javascript
import { Numeric } from 'valerian/rules';

// Both numeric and number resolve to this
const rules = { number: ['numeric', 'number']};

new Numeric();

(new Numeric()).min(1).max(5);
const rules = { number: ['number|min:1']};

(new Numeric()).between(1, 5);
const rules = { number: ['number|between:1-5']};
```

### Integer

```javascript
import { Integer } from 'valerian/rules';

const rules = { number: ['integer', 'int']};

new Integer();

(new Integer()).min(1).max(5);
const rules = { number: ['integer|min:1']};

(new Integer()).between(1, 5);
const rules = { number: ['integer|between:1-5']};
```

### IsString

```javascript
import { IsString } from 'valerian/rules';

const rules = { value: ['is_string', 'string'] };

new IsString(); // defaults to .min(1)

(new IsString()).min(10).max(50); // set the required string lengths
const rules = { value: ['string|min:10'] };

(new IsString()).between(10, 50); // shorthand for both
const rules = { value: ['string|between:10-50'] };

(new IsString()).emptiable(); // sets min length to null
```

### Email

By default, uses the JS regex from http://emailregex.com/

```javascript
import { Email } from 'valerian/rules';

const rules = { value: ['email'] };

new Email();

(new Email).useStrict(false); // do a weak email check - uses /\S+@\S+/
```

### Url

Must be a valid URL. Very naive regex at the moment.

```javascript
import { Url } from 'valerian/rules';

const rules = { value: ['url'] };

new Url();
```

### Matches

This field must match the field passed in here. For example: `name: [new String(), new Matches('name_check')]` - the `name` and `name_check`  fields must match

```javascript
import { Matches } from 'valerian/rules';

const rules = { value: ['matches|field_name'] };

new Matches('name');
```

### Confirmed

The field must match a field with its own name with _confirmation appended. For example if you used it on, `password: [new Confirmed()]`, there must be a `password` and `password_confirmation` field, and they must match each other.

```javascript
import { Confirmed } from 'valerian/rules';

const rules = { value: ['confirmed'] };

new Confirmed();
```

### TypeOf

Checks against the typeof operator

```javascript
import { TypeOf } from 'valerian/rules';

const rules = { value: ['typeof|string'] };

new TypeOf('string');
```

### InstanceOf

You must provide a class to check against

```javascript
import { InstanceOf } from 'valerian/rules';

const rules = { value: ['instance_of|classname'] };

new InstanceOf(Date);
```

### IsDateString

Checks that it is a valid date with Date.parse()

```javascript
import { IsDateString } from 'valerian/rules';

const rules = { value: ['is_date_string', 'date_string'] };

new IsDateString();
```

### OneOf

Must be one of the supplied values

```javascript
import { OneOf } from 'valerian/rules';

const rules = { value: ['one_of:1,2,3', 'in:3,4,5'] };

new OneOf(['apple', 'banana']);
```

### Optional

Marks a field as optional. This gets added automatically if you don't have any "required" rules in a rule set.

```javascript
import { Optional } from 'valerian/rules';

const rules = { value: ['optional'] };

new Optional();
```

### Required

```javascript
import { Required } from 'valerian/rules';

const rules = { value: ['required'] };

new Required();
```

### RequiredWith

```javascript
import { RequiredWith } from 'valerian/rules';

const rules = { value: ['required_with:fieldname'] };

new RequiredWith('other_field');
```

### RequiredWithout

```javascript
import { RequiredWithout } from 'valerian/rules';

const rules = { value: ['required_without'] };

new RequiredWithout('other_field');
```

## Using your own strings

```javascript
import 'valerian/bootstrap';

import { setStrings, mergeStrings } from 'valerian';

// This will add any new strings, overriding old ones where necessary.
mergeStrings({
    'email': 'The :name field must be a valid email address.',
});

// This will remove all current strings, and use this as the only strings list
setStrings({
    'email': 'The :name field must be a valid email address.',
});
```

If a string translation is not found, the key will be displayed instead:

```javascript
val.error.message('age'); // 'integer/between'
val.error.message('email'); // 'email'
```

## Custom Rules

Rules are simple JS Classes. The must have two methods as a minimum:

```javascript
class IsMonkey {
  validate(value, field, validator) {
    // value is the value to validate. Most of the time, you will only need this.
    // field is the field name that is being validated.
    // validator is the validator class that contains all the data and rules under validation.

    return value === 'monkey';
  }

  error() {
    // The key used to get the error message.
    // Note that if the key is not found in the available strings, this key will 
    // be displayed, so if you are not bothered about using the strings functionality,
    // you can just put your error message here.

    return 'monkey';
  }
}

mergeStrings({monkey: ':name is not a monkey.'});

new Validator({}, {monkey: [new IsMonkey()]});
```

## Other

This approach to validation is STRONGLY influenced by [Laravel's validation library for PHP](https://laravel.com/docs/5.5/validation).
