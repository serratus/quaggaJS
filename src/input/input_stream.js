import ImageLoader from './image_loader';

var InputStream = {};
InputStream.createVideoStream = function(video) {
    var that = {},
        _config = null,
        _eventNames = ['canrecord', 'ended'],
        _eventHandlers = {},
        _calculatedWidth,
        _calculatedHeight,
        _topRight = {x: 0, y: 0},
        _canvasSize = {x: 0, y: 0};

    function initSize() {
        var width = video.videoWidth,
            height = video.videoHeight;

        _calculatedWidth =
            _config.size ? width / height > 1 ? _config.size : Math.floor((width / height) * _config.size) : width;
        _calculatedHeight =
            _config.size ? width / height > 1 ? Math.floor((height / width) * _config.size) : _config.size : height;

        _canvasSize.x = _calculatedWidth;
        _canvasSize.y = _calculatedHeight;
    }

    that.getRealWidth = function() {
        return video.videoWidth;
    };

    that.getRealHeight = function() {
        return video.videoHeight;
    };

    that.getWidth = function() {
        return _calculatedWidth;
    };

    that.getHeight = function() {
        return _calculatedHeight;
    };

    that.setWidth = function(width) {
        _calculatedWidth = width;
    };

    that.setHeight = function(height) {
        _calculatedHeight = height;
    };

    that.setInputStream = function(config) {
        _config = config;
        video.src = (typeof config.src !== 'undefined') ? config.src : '';
    };

    that.ended = function() {
        return video.ended;
    };

    that.getConfig = function() {
        return _config;
    };

    that.setAttribute = function(name, value) {
        video.setAttribute(name, value);
    };

    that.pause = function() {
        video.pause();
    };

    that.play = function() {
        video.play();
    };

    that.setCurrentTime = function(time) {
        if (_config.type !== "LiveStream") {
            video.currentTime = time;
        }
    };

    that.addEventListener = function(event, f, bool) {
        if (_eventNames.indexOf(event) !== -1) {
            if (!_eventHandlers[event]) {
                _eventHandlers[event] = [];
            }
            _eventHandlers[event].push(f);
        } else {
            video.addEventListener(event, f, bool);
        }
    };

    that.clearEventHandlers = function() {
        _eventNames.forEach(function(eventName) {
            var handlers = _eventHandlers[eventName];
            if (handlers && handlers.length > 0) {
                handlers.forEach(function(handler) {
                    video.removeEventListener(eventName, handler);
                });
            }
        });
    };

    that.trigger = function(eventName, args) {
        var j,
            handlers = _eventHandlers[eventName];

        if (eventName === 'canrecord') {
            initSize();
        }
        if (handlers && handlers.length > 0) {
            for ( j = 0; j < handlers.length; j++) {
                handlers[j].apply(that, args);
            }
        }
    };

    that.setTopRight = function(topRight) {
        _topRight.x = topRight.x;
        _topRight.y = topRight.y;
    };

    that.getTopRight = function() {
        return _topRight;
    };

    that.setCanvasSize = function(size) {
        _canvasSize.x = size.x;
        _canvasSize.y = size.y;
    };

    that.getCanvasSize = function() {
        return _canvasSize;
    };

    that.getFrame = function() {
        return video;
    };

    return that;
};

InputStream.createLiveStream = function(video) {
    video.setAttribute("autoplay", true);
    var that = InputStream.createVideoStream(video);

    that.ended = function() {
        return false;
    };

    return that;
};

InputStream.createImageStream = function() {
    var that = {};
    var _config = null;

    var width = 0,
        height = 0,
        frameIdx = 0,
        paused = true,
        loaded = false,
        imgArray = null,
        size = 0,
        offset = 1,
        baseUrl = null,
        ended = false,
        calculatedWidth,
        calculatedHeight,
        _eventNames = ['canrecord', 'ended'],
        _eventHandlers = {},
        _topRight = {x: 0, y: 0},
        _canvasSize = {x: 0, y: 0};

    function loadImages() {
        loaded = false;
        ImageLoader.load(baseUrl, function(imgs) {
            imgArray = imgs;
            if (imgs[0].tags && imgs[0].tags.orientation) {
                switch (imgs[0].tags.orientation) {
                case 6:
                case 8:
                    width = imgs[0].img.height;
                    height = imgs[0].img.width;
                    break;
                default:
                    width = imgs[0].img.width;
                    height = imgs[0].img.height;
                }
            } else {
                width = imgs[0].img.width;
                height = imgs[0].img.height;
            }
            calculatedWidth =
                _config.size ? width / height > 1 ? _config.size : Math.floor((width / height) * _config.size) : width;
            calculatedHeight =
                _config.size ? width / height > 1 ? Math.floor((height / width) * _config.size) : _config.size : height;
            _canvasSize.x = calculatedWidth;
            _canvasSize.y = calculatedHeight;
            loaded = true;
            frameIdx = 0;
            setTimeout(function() {
                publishEvent("canrecord", []);
            }, 0);
        }, offset, size, _config.sequence);
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

    that.setWidth = function(newWidth) {
        calculatedWidth = newWidth;
    };

    that.setHeight = function(newHeight) {
        calculatedHeight = newHeight;
    };

    that.getRealWidth = function() {
        return width;
    };

    that.getRealHeight = function() {
        return height;
    };

    that.setInputStream = function(stream) {
        _config = stream;
        if (stream.sequence === false) {
            baseUrl = stream.src;
            size = 1;
        } else {
            baseUrl = stream.src;
            size = stream.length;
        }
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

    that.setTopRight = function(topRight) {
        _topRight.x = topRight.x;
        _topRight.y = topRight.y;
    };

    that.getTopRight = function() {
        return _topRight;
    };

    that.setCanvasSize = function(canvasSize) {
        _canvasSize.x = canvasSize.x;
        _canvasSize.y = canvasSize.y;
    };

    that.getCanvasSize = function() {
        return _canvasSize;
    };

    that.getFrame = function() {
        var frame;

        if (!loaded){
            return null;
        }
        if (!paused) {
            frame = imgArray[frameIdx];
            if (frameIdx < (size - 1)) {
                frameIdx++;
            } else {
                setTimeout(function() {
                    ended = true;
                    publishEvent("ended", []);
                }, 0);
            }
        }
        return frame;
    };

    return that;
};

export default InputStream;
