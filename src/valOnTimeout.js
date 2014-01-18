angular.module('calendee.valOnTimeout',[]).
    directive('valOnTimeout', ['$timeout', function($timeout) {

        return {

            restrict    : 'AC',
            require     : 'ngModel',
            link        : function(scope, elem, attrs, ctrl) {

                var timer;
                var typingLimit = 1250;
                var focusLimit;
                var blurLimit;

                ctrl.$timedout = false;

                if(attrs.typingLimit) typingLimit = parseInt(attrs.typingLimit, 10) || typingLimit;
                if(attrs.focusLimit) focusLimit = parseInt(attrs.focusLimit, 10) || 5000;
                if(attrs.blurLimit) blurLimit = parseInt(attrs.blurLimit, 10) || 500;

                var startTimer = function(timeLimit) {

                    timer = $timeout(function(){
                        scope.$apply(function() {ctrl.$timedout = true;});
                    }, timeLimit);

                };

                var cancelTimer = function() {

                    $timeout.cancel(timer);

                };

                if(attrs.focusLimit) {

                    elem.bind('focus', function(){

                        // If the field has already timedout, don't change it.
                        if(ctrl.$timedout) return;

                        // If timer is already running, kill it
                        if(timer) cancelTimer();

                        // Start the timer
                        startTimer(focusLimit);

                    })
                }

                if(attrs.blurLimit) {

                    elem.bind('blur', function(){

                        // If the field has already timedout, don't change it.
                        if(ctrl.$timedout) return;

                        // If timer is already running, kill it
                        if(timer) cancelTimer();

                        // Start the timer
                        startTimer(blurLimit);

                    })
                }

                elem.bind('keydown', function() {

                    // If the field has already timedout, don't change it.
                    if(ctrl.$timedout) return;

                    // If timer is already running, kill it
                    if(timer) cancelTimer();

                    // Start the timer
                    startTimer(typingLimit);

                });

            }
        }

    }]);