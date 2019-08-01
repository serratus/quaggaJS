import { ImageInfo } from './image-loader';
import { InputStream } from './input-stream';
import { InputStreamConfig } from './input-stream-config';

export class VideoStream extends InputStream {
    private _video: HTMLVideoElement;

    constructor(video: HTMLVideoElement) {
        super();

        this._video = video;
    }

    get realHeight(): number {
        return this._video.videoHeight;
    }

    get realWidth(): number {
        return this._video.videoWidth;
    }

    get config(): InputStreamConfig {
        return this._config;
    }

    set config(config: InputStreamConfig) {
        this._config = { ...config };
        this._video.src = config.src || '';
    }

    get ended(): boolean {
        return this._video.ended;
    }

    setAttribute(name: string, value: string): void {
        this._video.setAttribute(name, value);
    }

    pause(): void {
        this._video.pause();
    }

    play(): void {
        this._video.play();
    }

    set currentTime(time: number) {
        if (this._config.type !== 'LiveStream') {
            this._video.currentTime = time;
        }
    }

    addEventListener(event: string, listener: EventListener, options?: boolean): void {
        super.addEventListener(event, listener, options);

        if (this._eventNames.indexOf(event) === -1) {
            this._video.addEventListener(event, listener, options);
        }
    }

    clearEventHandlers(): void {
        // TODO: come up with a way to remove video event handlers
        // this._eventNames.forEach(eventName => {
        //     const handlers = this._eventHandlers.get(eventName);
        //     if (handlers && handlers.length > 0) {
        //         handlers.forEach(handler => this._video.removeEventListener(eventName, handler));
        //     }
        // });
        super.clearEventHandlers();
    }

    trigger(eventName: string, argArray?: any) {
        if (eventName === 'canrecord') {
            this._initSize();
        }

        super.trigger(eventName, argArray)
    }

    getFrame(): HTMLVideoElement | ImageInfo {
        return this._video;
    }

    private _initSize() {
        const width = this._video.videoWidth;
        const height = this._video.videoHeight;

        this._canvasWidth = this._calculatedWidth =
            this._config.size ? width > height ? this._config.size : width * this._config.size / height | 0 : width;
        this._canvasHeight = this._calculatedHeight =
            this._config.size ? width > height ? height * this._config.size / width | 0 : this._config.size : height;
    }
}

export class LiveStream extends VideoStream {
    constructor(video: HTMLVideoElement) {
        video.setAttribute('autoplay', '');
        super(video);
    }

    get ended(): boolean {
        return false;
    }
}
