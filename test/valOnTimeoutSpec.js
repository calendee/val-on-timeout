'use strict';

describe('Overall Test Spec for valOnTimeout', function() {

    var $compile;
    var $scope;
    var $timeout;

    beforeEach(module('calendee.valOnTimeout'));

    // Based on https://github.com/angular-ui/bootstrap/blob/master/src/typeahead/test/typeahead.spec.js
    // Angular strips the underscores when injecting
    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $timeout = _$timeout_;
        $scope = _$rootScope_.$new();
    }));

    var triggerKeyDown = function (element, keyCode) {
        var inputEl = findInput(element);
        var e = $.Event('keydown');
        e.which = keyCode;
        $(inputEl).trigger(e);
    };

    var triggerFocus = function (element) {
        var inputEl = findInput(element);
        $(inputEl).triggerHandler( "focus" );
    };

    var triggerBlur = function (element) {
        var inputEl = findInput(element);
        $(inputEl).triggerHandler( "blur" );
    };

    var prepareInputEl = function (inputTpl) {
        var el = $compile(angular.element(inputTpl))($scope);
        $scope.$digest();
        return el;
    };

    var findInput = function (element) {
        return element.find('input');
    };

    var defaultTypingTimeout = 1250;
    var defaultFocusTimeout = 5000;
    var defaultBlurTimeout = 500;

    /** Testing Typing Timeout **/
    describe('Testing Typing Timeout', function() {

        var flag;

        it('should set "timedout" on field after default typing timeout', function(done) {

            runs(function() {
                // Will be checked by waitsFor to ensure tests aren't checked until after a timeout
                flag = false;

                var element = prepareInputEl(
                    '<form name="testform"><input name="testfield" ng-model="testModel" type="text" ng-minlength="5" ng-maxlength="50" ng-required="true" val-on-timeout /></form></div>'
                );

                // Put a value in field for later testing
                $scope.testform.testfield.$setViewValue('b');

                // Fire a keydown event in the field
                triggerKeyDown(element, 65);

                // Wait a few ms longer than default typing limit
                setTimeout(function() {
                    // Tell waitsFor to stop waiting
                    flag = true;
                }, defaultTypingTimeout + 25);
            });

            // Jasmine async test, will wait up to 2500ms.
            waitsFor(function() {

                try {
                    // Only way to get $timeout in directive to fire
                    $timeout.flush();
                } catch(e) {
//                    console.log('Flush whines about no deferred tasks to run');
                }

                return flag;
            }, "The field should have timed out by now", 2500);

            runs(function() {
                expect($scope.testform.testfield.$viewValue).toEqual('b');
                expect($scope.testform.testfield.$valid).toEqual(false);
                expect($scope.testform.testfield.$timedout).toEqual(true);
            });

        });

        it('should set "timedout" on field after custom typing timeout', function(done) {

            var customTypingLimit = 500;

            runs(function() {
                // Will be checked by waitsFor to ensure tests aren't checked until after a timeout
                flag = false;

                var element = prepareInputEl(
                    '<form name="testform"><input name="testfield" ng-model="testModel" type="text" ng-minlength="5" ng-maxlength="50" ng-required="true" val-on-timeout typing-limit="500"/></form></div>'
                );

                // Put a value in field for later testing
                $scope.testform.testfield.$setViewValue('b');

                // Fire a keydown event in the field
                triggerKeyDown(element, 65);

                // Wait a few ms longer than default typing limit
                setTimeout(function() {
                    // Tell waitsFor to stop waiting
                    flag = true;
                }, customTypingLimit + 25);
            });

            // Jasmine async test, will wait up to 2500ms.
            waitsFor(function() {

                try {
                    // Only way to get $timeout in directive to fire
                    $timeout.flush();
                } catch(e) {
                    // Ignore these errors
                }

                return flag;
            }, "The field should have timed out by now", customTypingLimit + 100);

            runs(function() {
                expect($scope.testform.testfield.$viewValue).toEqual('b');
                expect($scope.testform.testfield.$valid).toEqual(false);
                expect($scope.testform.testfield.$timedout).toEqual(true);
            });

        });

    });

    /** Testing Focus Timeout **/
    describe('Testing Focus Timeout', function() {

        var flag;

        it('should set "timedout" on field after default focus limit', function(done) {

            runs(function() {
                // Will be checked by waitsFor to ensure tests aren't checked until after a timeout
                flag = false;

                var element = prepareInputEl(
                    '<form name="testform"><input name="testfield" ng-model="testModel" type="text" ng-minlength="5" ng-maxlength="50" required="true" val-on-timeout focus-limit/></form></div>'
                );

                // Fire a focus event in the field
                triggerFocus(element);

                // Wait a few ms longer than default typing limit
                setTimeout(function() {
                    // Tell waitsFor to stop waiting
                    flag = true;
                }, defaultFocusTimeout + 50);
            });

            // Jasmine async test
            waitsFor(function() {

                try {
                    // Only way to get $timeout in directive to fire
                    $timeout.flush();
                } catch(e) {
                    // Ignore these errors
                }

                return flag;
            }, "The field should have timed out by now", defaultFocusTimeout + 100);

            runs(function() {
                // Nothing has been typed in the field
                expect($scope.testform.testfield.$viewValue).toEqual(undefined);

                // The field does not meet requirements
                expect($scope.testform.testfield.$valid).toEqual(false);

                // It should have 'timedout' due to focus limit exceeded
                expect($scope.testform.testfield.$timedout).toEqual(true);
            });

        });

        it('should set "timedout" on field after custom focus limit', function(done) {

            var customFocusLimit = 500;

            runs(function() {
                // Will be checked by waitsFor to ensure tests aren't checked until after a timeout
                flag = false;

                var element = prepareInputEl(
                    '<form name="testform"><input name="testfield" ng-model="testModel" type="text" ng-minlength="5" ng-maxlength="50" required="true" val-on-timeout focus-limit="500"/></form></div>'
                );

                // Fire a focus event in the field
                triggerFocus(element);

                // Wait a few ms longer than default typing limit
                setTimeout(function() {
                    // Tell waitsFor to stop waiting
                    flag = true;
                }, customFocusLimit + 50);
            });

            // Jasmine async test
            waitsFor(function() {

                try {
                    // Only way to get $timeout in directive to fire
                    $timeout.flush();
                } catch(e) {
                    // Ignore these errors
                }

                return flag;
            }, "The field should have timed out by now", customFocusLimit + 100);

            runs(function() {
                // Nothing has been typed in the field
                expect($scope.testform.testfield.$viewValue).toEqual(undefined);

                // The field does not meet requirements
                expect($scope.testform.testfield.$valid).toEqual(false);

                // It should have 'timedout' due to focus limit exceeded
                expect($scope.testform.testfield.$timedout).toEqual(true);
            });

        });

    });


    /** Testing Blur Timeout **/
    describe('Testing Blur Timeout', function() {

        var flag;

        it('should set "timedout" on field after default blur limit', function(done) {

            runs(function() {
                // Will be checked by waitsFor to ensure tests aren't checked until after a timeout
                flag = false;

                var element = prepareInputEl(
                    '<form name="testform"><input name="testfield" ng-model="testModel" type="text" ng-minlength="5" ng-maxlength="50" required="true" val-on-timeout blur-limit/></form></div>'
                );

                // Fire a blur event in the field
                triggerBlur(element);

                // Wait a few ms longer than default typing limit
                setTimeout(function() {
                    // Tell waitsFor to stop waiting
                    flag = true;
                }, defaultBlurTimeout + 50);
            });

            // Jasmine async test
            waitsFor(function() {

                try {
                    // Only way to get $timeout in directive to fire
                    $timeout.flush();
                } catch(e) {
                    // Ignore these errors
                }

                return flag;
            }, "The field should have timed out by now", defaultBlurTimeout + 100);

            runs(function() {
                // Nothing has been typed in the field
                expect($scope.testform.testfield.$viewValue).toEqual(undefined);

                // The field does not meet requirements
                expect($scope.testform.testfield.$valid).toEqual(false);

                // It should have 'timedout' due to blur limit exceeded
                expect($scope.testform.testfield.$timedout).toEqual(true);
            });

        });

        it('should set "timedout" on field after custom blur limit', function(done) {

            var customBlurLimit = 500;

            runs(function() {
                // Will be checked by waitsFor to ensure tests aren't checked until after a timeout
                flag = false;

                var element = prepareInputEl(
                    '<form name="testform"><input name="testfield" ng-model="testModel" type="text" ng-minlength="5" ng-maxlength="50" required="true" val-on-timeout blur-limit="500"/></form></div>'
                );

                // Fire a focus event in the field
                triggerBlur(element);

                // Wait a few ms longer than default typing limit
                setTimeout(function() {
                    // Tell waitsFor to stop waiting
                    flag = true;
                }, customBlurLimit + 50);
            });

            // Jasmine async test
            waitsFor(function() {

                try {
                    // Only way to get $timeout in directive to fire
                    $timeout.flush();
                } catch(e) {
                    // Ignore these errors
                }

                return flag;
            }, "The field should have timed out by now", customBlurLimit + 100);

            runs(function() {
                // Nothing has been typed in the field
                expect($scope.testform.testfield.$viewValue).toEqual(undefined);

                // The field does not meet requirements
                expect($scope.testform.testfield.$valid).toEqual(false);

                // It should have 'timedout' due to blur limit exceeded
                expect($scope.testform.testfield.$timedout).toEqual(true);
            });

        });

    });

});