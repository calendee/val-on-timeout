val-on-timeout
==============

val-on-timeout improves the user experience for forms.  When the user has stopped activity in a field, validation errors will be displayed.

## Features

* Configurable timeout after pause in typing
* Configurable timeout on focus
* Configurable timeout on blur

## Examples

### Detect when user stops typing
NOTE : The default timeout for typing is 1250ms.

```html
<input
        type="text"
        placeholder="Your First Name Please"
        name="givenName"
        ng-model="user.givenName"
        ng-minlength="10"
        ng-maxlength="100"
        ng-required="true"
        val-on-timeout
/>

<small class="error" ng-show="testing.givenName.$error.minlength && testing.givenName.$timedout">We don't accept people with short names. Go big or go away.</small>
<small class="error" ng-show="testing.givenName.$error.maxlength && testing.givenName.$timedout">That name is super long.  We don't like you.  Go away.</small>
<small class="error" ng-show="testing.givenName.$error.required && testing.givenName.$timedout">People with no names don't exist.  Go away.</small>

```

## Authors

**Justin Noel**

+ <https://twitter.com/calendee>
+ <https://github.com/calendee>

## LICENSE

val-on-timeout is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.