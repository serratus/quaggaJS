import { ImageInfo, ImageLoader } from './image-loader';
import { InputStream } from './input-stream';
import { InputStreamConfig } from './input-stream-config';

export class ImageStream extends InputStream {
    private _baseUrl: string;
    private _ended: boolean;
    private _frameIndex: number;
    private _height: number;
    private _images: Array<ImageInfo>;
    private _loaded: boolean;
    private _offset: number;
    private _paused: boolean;
    private _size: number;
    private _width: number;

    constructor() {
        super();

        this._canvasHeight = 0;
        this._canvasWidth = 0;
        this._baseUrl = null;
        this._ended = false;
        this._frameIndex = 0;
        this._height = 0;
        this._images = null;
        this._loaded = false;
        this._offset = 1;
        this._paused = true;
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
        this._baseUrl = config.src;
        this._size = config.sequence && config.length ? config.length : 1;

        this._loadImages();
    }

    get ended(): boolean {
        return this._ended;
    }

    setAttribute() { }

    pause(): void {
        this._paused = true;
    }

    play(): void {
        this._paused = false;
    }

    set currentTime(time: number) {
        this._frameIndex = time;
    }

    getFrame(): HTMLVideoElement | ImageInfo {
        let frame: ImageInfo = null;

        if (this._loaded && !this._paused) {
            frame = this._images[this._frameIndex];

            if (this._frameIndex < (this._size - 1)) {
                this._frameIndex++;
            } else {
                setTimeout(() => {
                    this._ended = true;
                    this.trigger('ended', []);
                }, 0);
            }
        }

        return frame;
    }

    private _loadImages(): void {
        this._loaded = false;
        ImageLoader.load(this._baseUrl, images => {
            this._images = images;

            switch (images[0].tags && images[0].tags.orientation) {
                case 6:
                case 8: {
                    this._width = images[0].image.height;
                    this._height = images[0].image.width;
                    break;
                }
                default: {
                    this._width = images[0].image.width;
                    this._height = images[0].image.height;
                }
            }

            this._canvasWidth = this._calculatedWidth = this._config.size ? this._width > this._height ?
                this._config.size : this._width * this._config.size / this._height | 0 : this._width;
            this._canvasHeight = this._calculatedHeight = this._config.size ? this._width > this._height ?
                this._height * this._config.size / this._width | 0 : this._config.size : this._height;
            this._loaded = true;
            this._frameIndex = 0;
            setTimeout(() => this.trigger('canrecord', []), 0);
        }, this._offset, this._size, this._config.sequence);
    }
}
