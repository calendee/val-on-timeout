////'use strict';
////
////describe('', function() {
////
////    var $compile;
////    var $scope;
////
////    beforeEach(inject(function(_$compile_, _$rootScope_) {
////        $compile = _$compile_;
////        $scope = _$rootScope_.$new();
////    }));
////
////    describe('Getting Trigger To Work', function() {
////
//////        it('Should Trigger a KeyDown Event', function() {
//////
//////            var el = $compile('<form name="testing"><input id="field1" name="testfield" ng-model="result" type="text" ng-minlength="5" ng-maxlength="50"/></form>')($scope);
//////            console.log(el);
//////
//////            var inputEl = el.find('input');
//////            console.log(inputEl);
//////
//////            var e = $.Event('keydown');
//////            e.which = 65;
//////
//////            inputEl.trigger(e);
//////
//////        });
////
////        it('Should Trigger a KeyDown Event', function() {
////
////            var el = $compile('<form name="testing"><input id="field1" name="testfield" ng-model="result" type="text" ng-minlength="5" ng-maxlength="50"/></form>')($scope);
////
////            var inputEl = el.find('input');
////
//////            angular.element(inputEl).trigger('keydown');
////
////            var e = $.Event('keydown');
////            e.which = 65;
////            $(inputEl).trigger('keydown');
////
////        });
////
////    });
////
////
////
////});
//
//
////describe("Asynchronous specs", function() {
////    var value;
////
////    beforeEach(function(done) {
////        setTimeout(function() {
////            value = 0;
////            done();
////        }, 500);
////    });
////
////    it("should support async execution of test preparation and expectations", function(done) {
////        value++;
////        expect(value).toBeGreaterThan(0);
////        done();
////    });
////});
//
//
//describe("Asynchronous specs", function() {
//    var value, flag;
//
//    it("should support async execution of test preparation and expectations", function() {
//
//            runs(function() {
//                flag = false;
//                value = 0;
//
//                setTimeout(function() {
//                    flag = true;
//                }, 500);
//            });
//
//            waitsFor(function() {
//                value++;
//                return flag;
//            }, "The Value should be incremented", 750);
//
//            runs(function() {
//                expect(value).toBeGreaterThan(0);
//            });
//    });
//});