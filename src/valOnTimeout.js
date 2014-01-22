angular.module('calendee.valOnTimeout',[]).
    directive('valOnTimeout', ['$timeout', function($timeout) {

        return {

            restrict    : 'AC',
            require     : 'ngModel',
            link        : function(scope, elem, attrs, ctrl) {

                var timer, typingLimit, focusLimit, blurLimit;

                ctrl.$timedout = false;

                if(attrs.hasOwnProperty('typingLimit')) typingLimit = parseInt(attrs.typingLimit, 10) || 1250;
                if(attrs.hasOwnProperty('focusLimit')) focusLimit = parseInt(attrs.focusLimit, 10) || 5000;
                if(attrs.hasOwnProperty('blurLimit')) blurLimit = parseInt(attrs.blurLimit, 10) || 500;


                /**
                 * Start timer for specified period.  If not cancelled before triggered, the 'timeout' property will
                 * be added to the field.
                 *
                 * @param timeLimit
                 */
                var startTimer = function(timeLimit) {

                    timer = $timeout(function(){

                        scope.$apply( function() {
                            ctrl.$timedout = true;
                        });

                    }, timeLimit);

                };

                /**
                 * Cancel any existing timer.
                 */
                var cancelTimer = function() {

                    $timeout.cancel(timer);

                };

                /**
                 * Will start a timer after focus event fired for field.
                 * Used to detect when field receives focus but typing never starts
                 */
                if( attrs.hasOwnProperty('focusLimit')) {

                    elem.bind('focus', function(){

                        // If the field has already timedout, don't change it.
                        if(ctrl.$timedout) return;

                        // If timer is already running, kill it
                        if(timer) cancelTimer();

                        // Start the timer
                        startTimer(focusLimit);

                    })
                }

                /**
                 * Will start a timer after blur event fired for field
                 */
                if( attrs.hasOwnProperty('blurLimit')) {

                    elem.bind('blur', function(){

                        // If the field has already timedout, don't change it.
                        if(ctrl.$timedout) return;

                        // If timer is already running, kill it
                        if(timer) cancelTimer();

                        // Start the timer
                        startTimer(blurLimit);

                    })
                }

                /**
                 * Will start a timer after each keypress to detect when typing stops
                 */
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