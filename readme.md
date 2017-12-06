# Valerian: JS Validation Library

## Usage

```javascript
import 'valerian/set-default-strings'; // only needs to be done once to setup the error messages
import { Email, Integer, IsString } from 'valerian/rules';
import Validator from 'valerian';

// 1. Get your data
const data = { name: 'Tony', age: 'Tony', email: 'not an email' };

// 2. Set some rules
const rules = { 
  name: [new IsString()],
  age: [(new Integer()).between(18, 100)],
  email: [new Email()],
};

// 3. Make a validator
const val = new Validator(data, rules);

// 4. Test your data!
val.passes(); // false
val.fails(); // true

// 5. Show some error messages

val.error.message('age') // 'The age field must be somewhere between 18 and 100.'
val.error.message('name') // null
val.error.messages('age') // ['The age field must be somewhere between 18 and 100.']
val.error.messages('name') // null
val.error.messages()
// {
//   age: ['The age field must be somewhere between 18 and 100.'],
//   email: ['The email field must be a valid email address.'],
// }

val.error.hasMessages('name') // false
val.error.hasMessages('age') // true

// To throw an exception:
val.validate(true); // throws ValidationError - it has all the methods available to val.error (e.message('age'))
```

## Rules

The following rules are available

### Confirmed

```javascript
import { Confirmed } from 'valerian/rules';

new Confirmed();

// The field must match a field with its own name with _confirmation appended.
// For example if you used it on, `password: [new Confirmed()]`, there must be a
// password and password_confirmation field, and they must match each other.
```

### Email

```javascript
import { Email } from 'valerian/rules';

new Email();

// uses the JS regex from http://emailregex.com/

(new Email).useStrict(false); // do a weak email check - uses /\S+@\S+/
```

### InstanceOf

```javascript
import { InstanceOf } from 'valerian/rules';

new InstanceOf(Date); // must provide a class to check against
```

### Integer

```javascript
import { Integer } from 'valerian/rules';

new Integer();

(new Integer()).min(1).max(5);
(new Integer()).between(1, 5);
```

### IsDate

```javascript
import { IsDate } from 'valerian/rules';

new IsDate();

// Checks with Date.parse()
```

### IsString

```javascript
import { IsString } from 'valerian/rules';

new IsString(); // defaults to .min(1)

(new IsString()).min(10).max(50); // set the required string lengths
(new IsString()).between(10, 50); // shorthand for both
(new IsString()).emptiable(); // sets min length to null
```

### Matches

```javascript
import { Matches } from 'valerian/rules';

new Matches('name');

// This field must match the field passed in here. For example:
// `name: [new String(), new Matches('name_check')]` - the name and name_check 
// fields must match
```

### Numeric

```javascript
import { Numeric } from 'valerian/rules';

new Numeric();

(new Numeric()).min(1).max(5);
(new Numeric()).between(1, 5);
```

### OneOf

```javascript
import { OneOf } from 'valerian/rules';

new OneOf(['apple', 'banana']);

// Must be one of the supplied values
```

### Required

```javascript
import { Required } from 'valerian/rules';

new Required();
```

### RequiredWith

```javascript
import { RequiredWith } from 'valerian/rules';

new RequiredWith();
```

### RequiredWithout

```javascript
import { RequiredWithout } from 'valerian/rules';

new RequiredWithout();
```

### TypeOf

```javascript
import { TypeOf } from 'valerian/rules';

new TypeOf('string');

// checks against the typeof operator
```

### Url

```javascript
import { Url } from 'valerian/rules';

new Url();

// Must be a valid URL
```

## Using your own strings

```javascript
// Optional: This bootstraps the strings with a default set.
import 'valerian/set-default-strings';

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
