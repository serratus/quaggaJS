import {
    computeGray
} from '../common/cv_utils';
import {sleep} from '../common/utils';
import {getViewport} from '../common/utils';

function adjustCanvasSize(input, canvas) {
    if (input instanceof HTMLVideoElement) {
        if (canvas.height !== input.videoHeight || canvas.width !== input.videoWidth) {
            console.log('adjusting canvas size', input.videoHeight, input.videoWidth);
            canvas.height = input.videoHeight;
            canvas.width = input.videoWidth;
            return true;
        }
        return false;
    } else if (typeof input.width !== 'undefined') {
        if (canvas.height !== input.height || canvas.width !== input.width) {
            console.log('adjusting canvas size', input.height, input.width);
            canvas.height = input.height;
            canvas.width = input.width;
            return true;
        }
        return false;
    } else {
        throw new Error('Not a video element!');
    }
}

function getOrCreateCanvas(source, target) {
    const $viewport = getViewport(target);
    let $canvas = $viewport.querySelector("canvas.imgBuffer");
    if (!$canvas) {
        $canvas = document.createElement("canvas");
        $canvas.className = "imgBuffer";
        if ($viewport && source.type === "IMAGE") {
            $viewport.appendChild($canvas);
        }
    }
    return $canvas;
}

export function fromSource(source, {target = "#interactive.viewport"} = {}) {
    var drawable = source.getDrawable();
    var $canvas = null;
    var ctx = null;
    var bytePool = [];

    if (drawable instanceof HTMLVideoElement
          || drawable instanceof HTMLImageElement) {
        $canvas = getOrCreateCanvas(source, target);
        ctx = $canvas.getContext('2d');
    }

    if (drawable instanceof HTMLCanvasElement) {
        $canvas = drawable;
        ctx = drawable.getContext('2d');
    }

    function nextAvailableBuffer() {
        var i;
        var buffer;
        var bytesRequired = ($canvas.height * $canvas.width);
        for (i = 0; i < bytePool.length; i++) {
            buffer = bytePool[i];
            if (buffer && buffer.buffer.byteLength === bytesRequired) {
                return bytePool[i];
            }
        }
        buffer = new Uint8Array(bytesRequired);
        bytePool.push(buffer);
        console.log("Added new entry to bufferPool", bytesRequired);
        return buffer;
    }

    return {
        grabFrameData: function grabFrameData({buffer, clipping}) {
            const {viewport, canvas: canvasSize} = source.getDimensions();
            const sx = viewport.x;
            const sy = viewport.y;
            const sWidth = viewport.width;
            const sHeight = viewport.height;
            const dx = 0;
            const dy = 0;
            const dWidth = canvasSize.width;
            const dHeight = canvasSize.height;

            adjustCanvasSize(canvasSize, $canvas);
            if ($canvas.height < 10 || $canvas.width < 10) {
                console.log('$canvas not initialized. Waiting 100ms and then continuing');
                return sleep(100).then(grabFrameData);
            }
            if (!(drawable instanceof HTMLCanvasElement)) {
                ctx.drawImage(drawable, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            var imageData = ctx.getImageData(0, 0, $canvas.width, $canvas.height).data;
            var imageBuffer = buffer ? buffer : nextAvailableBuffer();
            computeGray(imageData, imageBuffer);
            return Promise.resolve({
                width: $canvas.width,
                height: $canvas.height,
                data: imageBuffer,
            });
        },
        getSource: function() {
            return source;
        },
        getCanvas: function() {
            return $canvas;
        },
        getCaptureSize() {
            return source.getDimensions().canvas;
        },

    };
}
