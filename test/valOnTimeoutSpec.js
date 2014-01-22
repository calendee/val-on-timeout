'use strict';

describe('', function() {

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

    describe('testing valOnTimeout', function() {

        var flag;

        it('should add "timedout" to field after default typing timeout', function(done) {

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

    });

});