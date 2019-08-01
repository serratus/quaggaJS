import { ImageInfo } from './image-loader';
import { InputStream } from './input-stream';
import { InputStreamConfig } from './input-stream-config';

const getPixels = require('get-pixels');

type ndarray<_T = number> = any;

export class ImageStream extends InputStream {
    private _baseUrl: string;
    private _ended: boolean;
    private _frame: ndarray<number>;
    private _height: number;
    private _loaded: boolean;
    private _offset: number;
    private _size: number;
    private _width: number;

    constructor() {
        super();

        this._canvasHeight = 0;
        this._canvasWidth = 0;
        this._baseUrl = null;
        this._ended = false;
        this._frame = null;
        this._height = 0;
        this._loaded = false;
        this._offset = 1;
        this._size = 0;
        this._width = 0;
    }

    get realHeight(): number {
        return this._height;
    }

    get realWidth(): number {
        return this._width;
    }

    get config(): InputStreamConfig {
        return this._config;
    }

    set config(config: InputStreamConfig) {
        this._config = { ...config };
        this._baseUrl = config.src || '';

        this._loadImages();
    }

    get ended(): boolean {
        return this._ended;
    }

    setAttribute() { }

    pause(): void { }

    play(): void { }

    set currentTime(_time: number) { }

    getFrame(): HTMLVideoElement | ImageInfo {
        if (!this._loaded) {
            return null;
        }
        return this._frame as any;
    }

    private _loadImages(): void {
        this._loaded = false;

        getPixels(this._baseUrl, this._config.mime, (err: any, pixels: ndarray<number>) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            this._loaded = true;
            this._frame = pixels;
            console.log(pixels.shape);

            this._width = pixels.shape[0] | 0;
            this._height = pixels.shape[1] | 0;

            this._canvasWidth = this._calculatedWidth = this._config.size ? this._width > this._height ?
                this._config.size : this._width * this._config.size / this._height | 0 : this._width;
            this._canvasHeight = this._calculatedHeight = this._config.size ? this._width > this._height ?
                this._height * this._config.size / this._width | 0 : this._config.size : this._height;

            setTimeout(() => this.trigger('canrecord', []), 0);
        }, this._offset, this._size, this._config.sequence);
    }
}
