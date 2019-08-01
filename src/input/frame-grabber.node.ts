import { Point } from '../common/point';
import { InputStream } from './input-stream';
import { InputStreamConfig } from './input-stream-config';

const ndarray = require('ndarray');
type ndarray<_T = number> = any;

export class FrameGrabber {
    private _inputStream: InputStream;
    private _streamConfig: InputStreamConfig;
    private _data: Uint8Array;
    private _canvasData: Uint8Array;
    private _grayData: Uint8Array;
    private _canvasImageArray: ndarray<number>;
    private _grayImageArray: ndarray<number>;
    private _targetImageArray: ndarray<number>;
    private _canvasHeight: number;
    private _canvasWidth: number;
    private _videoHeight: number;
    private _videoWidth: number;
    private _height: number;
    private _width: number;
    private _stepSizeX: number;
    private _stepSizeY: number;
    private _topLeft: Point;

    constructor(inputStream: InputStream) {
        this._inputStream = inputStream;
        this._streamConfig = inputStream.config;
        this._videoHeight = inputStream.realHeight;
        this._videoWidth = inputStream.realWidth;
        this._canvasHeight = inputStream.canvasHeight;
        this._canvasWidth = inputStream.canvasWidth;
        this._width = inputStream.width;
        this._height = inputStream.height;
        this._topLeft = inputStream.topLeft;
        this._data = new Uint8Array(this._width * this._height);
        this._grayData = new Uint8Array(this._videoWidth * this._videoHeight);
        this._canvasData = new Uint8Array(this._canvasWidth * this._canvasHeight);
        this._grayImageArray = ndarray(this._grayData, [this._videoHeight, this._videoWidth]).transpose(1, 0);
        this._canvasImageArray = ndarray(this._canvasData, [this._canvasHeight, this._canvasWidth]).transpose(1, 0);
        this._targetImageArray = this._canvasImageArray
            .hi(this._topLeft.x + this._width, this._topLeft.y + this._height).lo(this._topLeft.x, this._topLeft.y);
        this._stepSizeX = this._videoWidth / this._canvasWidth;
        this._stepSizeY = this._videoHeight / this._canvasHeight;

        console.log('FrameGrabber', JSON.stringify({
            videoSize: this._grayImageArray.shape,
            canvasSize: this._canvasImageArray.shape,
            stepSize: [this._stepSizeX, this._stepSizeY],
            size: this._targetImageArray.shape,
            topLeft: this._topLeft
        }));
    }

    /**
     * Fetches a frame from the input stream and puts into the frame buffer.
     * The image data is converted to gray scale and then half-sampled if configured.
     */
    grab(data: Uint8Array): boolean {
        this._data = data;
        const frame = this._inputStream.getFrame();

        if (frame) {
            this._scaleAndCrop(frame);
            return true;
        } else {
            return false;
        }
    }

    private _scaleAndCrop(frame: ndarray<number>) {
        // 1. compute full-sized gray image
        this._computeGray(frame.data);

        // 2. interpolate
        for (let y = 0; y < this._canvasHeight; y++) {
            for (let x = 0; x < this._canvasWidth; x++) {
                this._canvasImageArray
                    .set(x, y, (interp2d(this._grayImageArray, x * this._stepSizeX, y * this._stepSizeY)) | 0);
            }
        }

        // targetImageArray must be equal to targetSize
        if (this._targetImageArray.shape[0] !== this._width || this._targetImageArray.shape[1] !== this._height) {
            throw new Error('Shapes do not match!');
        }

        // 3. crop
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                this._data[y * this._width + x] = this._targetImageArray.get(x, y);
            }
        }
    }

    private _computeGray(imageData: Uint8ClampedArray): void {
        const imageDataLength = imageData.length;

        if (this._streamConfig && this._streamConfig.singleChannel) {
            for (let i = 0, j = 0; i < imageDataLength; i += 4, j++) {
                this._data[j] = imageData[i];
            }
        } else {
            for (let i = 0, j = 0; i < imageDataLength; i += 4, j++) {
                this._data[j] = 0.299 * imageData[i] + 0.587 * imageData[i + 1] + 0.114 * imageData[i + 2] | 0;
            }
        }
    }
}

/**
 * @borrows https://github.com/scijs/ndarray-linear-interpolate
 */
function interp2d(arr: ndarray<number>, x: number, y: number): number {
    const ix = Math.floor(x);
    const fx = x - ix;
    const s0 = 0 <= ix && ix < arr.shape[0];
    const s1 = 0 <= ix + 1 && ix + 1 < arr.shape[0];
    const iy = Math.floor(y);
    const fy = y - iy;
    const t0 = 0 <= iy && iy < arr.shape[1];
    const t1 = 0 <= iy + 1 && iy + 1 < arr.shape[1];
    const w00 = s0 && t0 ? arr.get(ix, iy) : 0.0;
    const w01 = s0 && t1 ? arr.get(ix, iy + 1) : 0.0;
    const w10 = s1 && t0 ? arr.get(ix + 1, iy) : 0.0;
    const w11 = s1 && t1 ? arr.get(ix + 1, iy + 1) : 0.0;
    return (1.0 - fy) * ((1.0 - fx) * w00 + fx * w10) + fy * ((1.0 - fx) * w01 + fx * w11);
}
