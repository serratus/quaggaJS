/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";

    var GetPixels = require("get-pixels");

    var InputStream = {};

    InputStream.createImageStream = function() {
        var that = {};
        var _config = null;

        var width = 0,
            height = 0,
            frameIdx = 0,
            paused = true,
            loaded = false,
            frame = null,
            baseUrl,
            ended = false,
            size,
            calculatedWidth,
            calculatedHeight,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {};

        function loadImages() {
            loaded = false;
            GetPixels(baseUrl, function(err, pixels) {
                if (err) {
                    console.log(err);
                    exit(1);
                }
                loaded = true;
                console.log(pixels.shape);
                frame = pixels;
                width = pixels.shape[0];
                height = pixels.shape[1];
                calculatedWidth = _config.size ? width/height > 1 ? _config.size : Math.floor((width/height) * _config.size) : width;
                calculatedHeight = _config.size ? width/height > 1 ? Math.floor((height/width) * _config.size) : _config.size : height;


                setTimeout(function() {
                    publishEvent("canrecord", []);
                }, 0);
            });
        }

        function publishEvent(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];

            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        }


        that.trigger = publishEvent;

        that.getWidth = function() {
            return calculatedWidth;
        };

        that.getHeight = function() {
            return calculatedHeight;
        };

        that.setWidth = function(width) {
            calculatedWidth = width;
        };

        that.setHeight = function(height) {
            calculatedHeight = height;
        };

        that.getRealWidth = function() {
            return width;
        };

        that.getRealHeight = function() {
            return height;
        };

        that.setInputStream = function(stream) {
            _config = stream;
            baseUrl = _config.src;
            size = 1;
            loadImages();
        };

        that.ended = function() {
            return ended;
        };

        that.setAttribute = function() {};

        that.getConfig = function() {
            return _config;
        };

        that.pause = function() {
            paused = true;
        };

        that.play = function() {
            paused = false;
        };

        that.setCurrentTime = function(time) {
            frameIdx = time;
        };

        that.addEventListener = function(event, f) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            }
        };

        that.getFrame = function() {
            if (!loaded){
                return null;
            }
            return frame;
        };

        return that;
    };

    return (InputStream);
});
