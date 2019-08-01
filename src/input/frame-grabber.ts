import { Point } from '../common/point';
import { InputStream } from './input-stream';
import { InputStreamConfig } from './input-stream-config';

const QUATER_CIRCLE = Math.PI / 2;

export class FrameGrabber {
    private _inputStream: InputStream;
    private _streamConfig: InputStreamConfig;
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _data: Uint8Array;
    private _canvasHeight: number;
    private _canvasWidth: number;
    private _height: number;
    private _width: number;
    private _topLeft: Point;

    constructor(inputStream: InputStream, canvas: HTMLCanvasElement) {
        this._inputStream = inputStream;
        this._streamConfig = inputStream.config;
        this._canvasWidth = inputStream.canvasWidth;
        this._canvasHeight = inputStream.canvasHeight;
        this._width = inputStream.width;
        this._height = inputStream.height;
        this._topLeft = inputStream.topLeft;
        this._canvas = canvas || document.createElement('canvas');
        this._canvas.width = this._canvasWidth;
        this._canvas.height = this._canvasHeight;
        this._context = this._canvas.getContext('2d');
        this._data = new Uint8Array(this._width * this._height);

        if (process.env.NODE_ENV !== 'production') {
            console.log('FrameGrabber', JSON.stringify({
                size: {
                    x: this._width,
                    y: this._height
                },
                topLeft: this._topLeft,
                videoSize: {
                    x: inputStream.realWidth,
                    y: inputStream.realHeight
                },
                canvasSize: {
                    x: this._canvasWidth,
                    y: this._canvasHeight
                }
            }));
        }
    }

    /**
     * Fetches a frame from the input stream and puts into the frame buffer.
     * The image data is converted to gray scale and then half-sampled if configured.
     */
    grab(data: Uint8Array): boolean {
        this._data = data;
        const frame = this._inputStream.getFrame();

        if (frame) {
            this._adjustCanvasSize();

            let drawable: HTMLImageElement | HTMLVideoElement;
            let drawAngle = 0;

            if (frame instanceof HTMLVideoElement) {
                drawable = frame;
            } else {
                drawable = frame.image;

                if (frame.tags) {
                    switch (frame.tags.orientation) {
                        case 6: {
                            drawAngle = QUATER_CIRCLE;
                            break;
                        }
                        case 8: {
                            drawAngle = -QUATER_CIRCLE;
                            break;
                        }
                    }
                }
            }

            if (drawAngle !== 0) {
                const halfWidth = this._canvasWidth >> 1;
                const halfHeight = this._canvasHeight >> 1;

                this._context.translate(halfWidth, halfHeight);
                this._context.rotate(drawAngle);
                this._context.drawImage(drawable, -halfHeight, -halfWidth, this._canvasHeight, this._canvasWidth);
                this._context.rotate(-drawAngle);
                this._context.translate(-halfWidth, -halfHeight);
            } else {
                this._context.drawImage(drawable, 0, 0, this._canvasWidth, this._canvasHeight);
            }

            const imageData = this._context.getImageData(this._topLeft.x, this._topLeft.y, this._width, this._height).data;

            if (this._streamConfig.halfSample) {
                this._grayAndHalfSampleFromCanvasData(imageData);
            } else {
                this._computeGray(imageData);
            }

            return true;
        } else {
            return false;
        }
    }

    private _adjustCanvasSize(): void {
        if (this._canvas.height !== this._canvasHeight || this._canvas.width !== this._canvasWidth) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Canvas size needs to be adjusted');
            }
            this._canvas.height = this._canvasHeight;
            this._canvas.width = this._canvasWidth;
        }
    }

    private _grayAndHalfSampleFromCanvasData(imageData: Uint8ClampedArray): void {
        const endIndex = imageData.length >> 2;
        const outWidth = this._width >> 1;
        let topRowIndex = 0;
        let bottomRowIndex = this._width;
        let outImageIndex = 0;

        while (bottomRowIndex < endIndex) {
            for (let i = 0; i < outWidth; i++) {
                const top4 = topRowIndex << 2;
                const bottom4 = bottomRowIndex << 2;
                this._data[outImageIndex] = (
                    (0.299 * imageData[top4 + 0] + 0.587 * imageData[top4 + 1] + 0.114 * imageData[top4 + 2]) +
                    (0.299 * imageData[top4 + 4] + 0.587 * imageData[top4 + 5] + 0.114 * imageData[top4 + 6]) +
                    (0.299 * imageData[bottom4 + 0] + 0.587 * imageData[bottom4 + 1] + 0.114 * imageData[bottom4 + 2]) +
                    (0.299 * imageData[bottom4 + 4] + 0.587 * imageData[bottom4 + 5] + 0.114 * imageData[bottom4 + 6])
                ) / 4 | 0;
                outImageIndex++;
                topRowIndex += 2;
                bottomRowIndex += 2;
            }
            topRowIndex += this._width;
            bottomRowIndex += this._width;
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
