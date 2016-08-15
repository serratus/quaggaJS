import {
    imageRef,
    grayAndHalfSampleFromCanvasData,
    computeGray
} from '../common/cv_utils';

const TO_RADIANS = Math.PI / 180;

function adjustCanvasSize(canvas, targetSize) {
    if (canvas.width !== targetSize.x) {
        if (ENV.development) {
            console.log("WARNING: canvas-size needs to be adjusted");
        }
        canvas.width = targetSize.x;
    }
    if (canvas.height !== targetSize.y) {
        if (ENV.development) {
            console.log("WARNING: canvas-size needs to be adjusted");
        }
        canvas.height = targetSize.y;
    }
}

var FrameGrabber = {};

FrameGrabber.create = function(inputStream, canvas) {
    var _that = {},
        _streamConfig = inputStream.getConfig(),
        _video_size = imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
        _canvasSize = inputStream.getCanvasSize(),
        _size = imageRef(inputStream.getWidth(), inputStream.getHeight()),
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
    if (ENV.development) {
        console.log("FrameGrabber", JSON.stringify({
            size: _size,
            topRight: topRight,
            videoSize: _video_size,
            canvasSize: _canvasSize
        }));
    }

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
            drawable = frame,
            drawAngle = 0,
            ctxData;
        if (drawable) {
            adjustCanvasSize(_canvas, _canvasSize);
            if (_streamConfig.type === 'ImageStream') {
                drawable = frame.img;
                if (frame.tags && frame.tags.orientation) {
                    switch (frame.tags.orientation) {
                    case 6:
                        drawAngle = 90 * TO_RADIANS;
                        break;
                    case 8:
                        drawAngle = -90 * TO_RADIANS;
                        break;
                    }
                }
            }

            if (drawAngle !== 0) {
                _ctx.translate(_canvasSize.x / 2, _canvasSize.y / 2);
                _ctx.rotate(drawAngle);
                _ctx.drawImage(drawable, -_canvasSize.y / 2, -_canvasSize.x / 2, _canvasSize.y, _canvasSize.x);
                _ctx.rotate(-drawAngle);
                _ctx.translate(-_canvasSize.x / 2, -_canvasSize.y / 2);
            } else {
                _ctx.drawImage(drawable, 0, 0, _canvasSize.x, _canvasSize.y);
            }

            ctxData = _ctx.getImageData(_sx, _sy, _size.x, _size.y).data;
            if (doHalfSample){
                grayAndHalfSampleFromCanvasData(ctxData, _size, _data);
            } else {
                computeGray(ctxData, _data, _streamConfig);
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

export default FrameGrabber;
