/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";

    var _events = function() {
        var events = {};

        function getEvent(eventName) {
            if (!events[eventName]) {
                events[eventName] = {
                    subscribers : []
                };
            }
            return events[eventName];
        }

        function publishSubscription(subscription, data) {
            if (subscription.async) {
                setTimeout(function() {
                    subscription.callback.call(null, data);
                }, 4);
            } else {
                subscription.callback.call(null, data);
            }
        }

        return {
            subscribe : function(event, callback, async) {
                var subscription;

                if ( typeof callback === "function") {
                    subscription = {
                        callback : callback,
                        async : async
                    };
                } else {
                    subscription = callback;
                    if (!subscription.callback) {
                        throw "Callback was not specified on options";
                    }
                }

                getEvent(event).subscribers.push(subscription);
            },
            publish : function(eventName, data) {
                var subscribers = getEvent(eventName).subscribers, i;
                for ( i = 0; i < subscribers.length; i++) {
                    publishSubscription(subscribers[i], data);
                }
            }
        };
    }();

    return _events;
}); 