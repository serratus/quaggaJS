import {memoize} from 'lodash';
import {
    computeGray,
    computeImageArea,
} from '../common/cv_utils';
import {sleep, getViewport} from '../common/utils';
import {aquire} from '../common/buffers';

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

    if (drawable instanceof HTMLVideoElement
          || drawable instanceof HTMLImageElement) {
        $canvas = getOrCreateCanvas(source, target);
        ctx = $canvas.getContext('2d');
    }

    if (drawable instanceof HTMLCanvasElement) {
        $canvas = drawable;
        ctx = drawable.getContext('2d');
    }

    function nextAvailableBuffer(bytesRequired) {
        return new Uint8Array(aquire(bytesRequired));
    }



    return {
        grabFrameData: function grabFrameData({clipping} = {}) {
            const {viewport, canvas: canvasSize} = source.getDimensions();
            const sx = viewport.x;
            const sy = viewport.y;
            const sWidth = viewport.width;
            const sHeight = viewport.height;
            const dx = 0;
            const dy = 0;
            const dWidth = canvasSize.width;
            const dHeight = canvasSize.height;

            console.time("clipp")

            clipping = clipping ? clipping(canvasSize) : {
                x: 0,
                y: 0,
                width: canvasSize.width,
                height: canvasSize.height,
            };

            adjustCanvasSize(canvasSize, $canvas);
            if ($canvas.height < 10 || $canvas.width < 10) {
                return sleep(100).then(grabFrameData);
            }
            if (!(drawable instanceof HTMLCanvasElement)) {
                ctx.drawImage(drawable, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            var imageData = ctx.getImageData(
                clipping.x,
                clipping.y,
                clipping.width,
                clipping.height
            ).data;
            var imageBuffer = nextAvailableBuffer(clipping.width * clipping.height);
            computeGray(imageData, imageBuffer);
            return Promise.resolve({
                width: clipping.width,
                height: clipping.height,
                dimensions: {
                    viewport,
                    canvas: canvasSize,
                    clipping,
                },
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
