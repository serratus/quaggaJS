/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(["cv_utils"], function(CVUtils) {
    "use strict";

    var FrameGrabber = {};

    FrameGrabber.create = function(inputStream, canvas) {
        var _that = {},
            _streamConfig = inputStream.getConfig(),
            _video_size = CVUtils.imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
            _canvasSize = inputStream.getCanvasSize(),
            _size = CVUtils.imageRef(inputStream.getWidth(), inputStream.getHeight()),
            topRight = inputStream.getTopRight(),
            _sx = topRight.x,
            _sy = topRight.y,
            _canvas,
            _ctx = null,
            _data = null;

        _canvas = canvas ? canvas : document.createElement("canvas");
        _canvas.width = _canvasSize.x;
        _canvas.height = _canvasSize.y;
        _ctx = _canvas.getContext("2d");
        _data = new Uint8Array(_size.x * _size.y);
        console.log("FrameGrabber", JSON.stringify({
            size: _size,
            topRight: topRight,
            videoSize: _video_size,
            canvasSize: _canvasSize
        }));

        /**
         * Uses the given array as frame-buffer 
         */
        _that.attachData = function(data) {
            _data = data;
        };

        /**
         * Returns the used frame-buffer
         */
        _that.getData = function() {
            return _data;
        };

        /**
         * Fetches a frame from the input-stream and puts into the frame-buffer.
         * The image-data is converted to gray-scale and then half-sampled if configured.
         */
        _that.grab = function() {
            var doHalfSample = _streamConfig.halfSample,
                frame = inputStream.getFrame(),
                ctxData;
            if (frame) {
                _ctx.drawImage(frame, 0, 0, _canvasSize.x, _canvasSize.y);
                ctxData = _ctx.getImageData(_sx, _sy, _size.x, _size.y).data;
                if(doHalfSample){
                    CVUtils.grayAndHalfSampleFromCanvasData(ctxData, _size, _data);
                } else {
                    CVUtils.computeGray(ctxData, _data, _streamConfig);
                }
                return true;
            } else {
                return false;
            }
        };

        _that.getSize = function() {
            return _size;
        };

        return _that;
    };

    return (FrameGrabber);
});
