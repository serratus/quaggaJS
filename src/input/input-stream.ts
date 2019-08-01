import { Point } from '../common/point';
import { ImageInfo } from './image-loader';
import { InputStreamConfig } from './input-stream-config';

export abstract class InputStream {
    protected _calculatedHeight: number;
    protected _calculatedWidth: number;
    protected _canvasHeight: number;
    protected _canvasWidth: number;
    protected _config: InputStreamConfig;
    protected _eventNames: Array<string>;
    protected _eventHandlers: Map<string, Array<EventListener>>;
    protected _topLeft: Point;

    constructor() {
        this._canvasWidth = 0;
        this._canvasHeight = 0;
        this._config = null;
        this._eventNames = ['canrecord', 'ended'];
        this._eventHandlers = new Map<string, Array<EventListener>>();
        this._topLeft = { x: 0, y: 0 };
    }

    abstract get realHeight(): number;

    abstract get realWidth(): number;

    get height(): number {
        return this._calculatedHeight;
    }

    set height(height: number) {
        this._calculatedHeight = height;
    }

    get width(): number {
        return this._calculatedWidth;
    }

    set width(width: number) {
        this._calculatedWidth = width;
    }

    get topLeft(): Point {
        return { ...this._topLeft };
    }

    set topLeft(topLeft: Point) {
        this._topLeft.x = topLeft.x;
        this._topLeft.y = topLeft.y;
    }

    setCanvasSize(width: number, height: number): void {
        this._canvasWidth = width;
        this._canvasHeight = height;
    }

    get canvasHeight(): number {
        return this._canvasHeight;
    }

    get canvasWidth(): number {
        return this._canvasWidth;
    }

    abstract get config(): InputStreamConfig;

    abstract set config(config: InputStreamConfig);

    abstract get ended(): boolean;

    abstract setAttribute(name: string, value: string): void;

    abstract pause(): void;

    abstract play(): void;

    abstract set currentTime(time: number);

    addEventListener(event: string, listener: EventListener, _options?: boolean): void {
        if (this._eventNames.indexOf(event) !== -1) {
            if (!this._eventHandlers.has(event)) {
                this._eventHandlers.set(event, new Array<EventListener>());
            }
            this._eventHandlers.get(event).push(listener);
        }
    }

    clearEventHandlers(): void {
        this._eventHandlers.clear();
    }

    trigger(eventName: string, argArray?: any) {
        const handlers = this._eventHandlers.get(eventName);

        if (handlers) {
            handlers.forEach(handler => handler.apply(this, argArray));
        }
    }

    abstract getFrame(): HTMLVideoElement | ImageInfo;
}
