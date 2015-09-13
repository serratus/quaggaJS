/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(["cv_utils"], function(CVUtils) {
    "use strict";

    var Ndarray = require("ndarray"),
        Interp2D = require("ndarray-linear-interpolate").d2;

    var FrameGrabber = {};

    FrameGrabber.create = function(inputStream) {
        var _that = {},
            _streamConfig = inputStream.getConfig(),
            _video_size = CVUtils.imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
            _canvasSize = inputStream.getCanvasSize(),
            _size = CVUtils.imageRef(inputStream.getWidth(), inputStream.getHeight()),
            topRight = inputStream.getTopRight(),
            _data = new Uint8Array(_size.x * _size.y),
            _grayData = new Uint8Array(_video_size.x * _video_size.y),
            _canvasData = new Uint8Array(_canvasSize.x * _canvasSize.y);

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
                frame = inputStream.getFrame();

            if (frame) {
                this.scaleAndCrop(frame, _video_size, _canvasSize, topRight, _size);
                return true;
            } else {
                return false;
            }
        };

        _that.scaleAndCrop = function(frame, frameSize, canvasSize, topRight, targetSize) {
            var grayImageArray = Ndarray(_grayData, [frameSize.y, frameSize.x]).transpose(1, 0),
                canvasImageArray = Ndarray(_canvasData, [canvasSize.y, canvasSize.x]).transpose(1, 0),
                targetImageArray = canvasImageArray.hi(topRight.x + targetSize.x, topRight.y + targetSize.y).lo(topRight.x, topRight.y),
                stepSizeX = frameSize.x/canvasSize.x,
                stepSizeY = frameSize.y/canvasSize.y,
                x,
                y;

            console.log("Input-size: ", grayImageArray.shape);
            console.log("Canvas-size: ", canvasImageArray.shape);
            console.log("Target-size: ", targetImageArray.shape);

            console.log("Step-size: ", [stepSizeX, stepSizeY]);

            // 1. compute full-sized gray image
            CVUtils.computeGray(frame.data, _grayData);

            // 2. interpolate
            for (y = 0; y < canvasSize.y; y++) {
                for (x = 0; x < canvasSize.x; x++) {
                    canvasImageArray.set(x, y, (Interp2D(grayImageArray, x*stepSizeX, y*stepSizeY)) | 0);
                }
            }

            // targetImageArray must be equal to targetSize
            if (targetImageArray.shape[0] !== targetSize.x ||
                targetImageArray.shape[1] !== targetSize.y) {
                throw new Error("Shapes do not match!");
            }
            // 3. crop
            for (y = 0; y < targetSize.y; y++) {
                for (x = 0; x < targetSize.x; x++) {
                    _data[y*targetSize.x + x] = targetImageArray.get(x, y);
                }
            }
        },

        _that.getSize = function() {
            return _size;
        };

        return _that;
    };

    return (FrameGrabber);
});
