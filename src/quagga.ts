import _polyfills from './common/polyfills';
import { ResultCollector } from './analytics/result-collector';
import { Box } from './common/box';
import { EventCallback, Events, EventSubscription } from './common/events';
import { ImageDebug } from './common/image-debug';
import { ImageWrapper } from './common/image-wrapper';
import { merge } from './common/merge';
import { Point } from './common/point';
import { config as defaultConfig, QuaggaConfig } from './config/config';
import { BarcodeDecoder, QuaggaBarcode } from './decoder/barcode-decoder';
import { CameraAccess } from './input/camera-access';
import { FrameGrabber } from './input/frame-grabber';
import { ImageStream } from './input/image-stream';
import { InputStream } from './input/input-stream';
import { LiveStream } from './input/live-stream';
import { VideoStream } from './input/video-stream';
import { checkImageConstraints } from './input/input-stream-utils';
import { BarcodeLocator } from './locator/barcode-locator';
import { BarcodeReaderDeclaration } from './reader/barcode-reader';

interface WorkerThread {
    worker: Worker;
    imageData: Uint8Array;
    busy: boolean;
}

export interface QuaggaCanvasContainer {
    ctx: {
        image: CanvasRenderingContext2D,
        overlay: CanvasRenderingContext2D
    },
    dom: {
        image: HTMLCanvasElement,
        overlay: HTMLCanvasElement
    }
}

let _inputStream: InputStream;
let _frameGrabber: FrameGrabber;
let _stopped: boolean;
const _canvasContainer: QuaggaCanvasContainer = {
    ctx: {
        image: null,
        overlay: null
    },
    dom: {
        image: null,
        overlay: null
    }
};
let _inputImageWrapper: ImageWrapper;
let _locator: BarcodeLocator;
let _boxSize: Box;
let _decoder: BarcodeDecoder;
let _workerPool = new Array<WorkerThread>();
let _onUIThread: boolean;
let _resultCollector: ResultCollector;
let _config: QuaggaConfig;

export default {
    init(config: QuaggaConfig, cb: () => void, imageWrapper?: ImageWrapper) {
        _onUIThread = true;
        _config = merge(defaultConfig, config);
        if (imageWrapper) {
            _onUIThread = false;
            _initializeData(imageWrapper);
            cb();
        } else {
            _initInputStream(cb);
        }
    },

    CameraAccess: CameraAccess,

    ImageDebug: ImageDebug,

    ImageWrapper: ImageWrapper,

    ResultCollector: ResultCollector,

    get canvas(): QuaggaCanvasContainer {
        return _canvasContainer;
    },

    start(): void {
        if (_onUIThread && _config.inputStream.type === 'LiveStream') {
            _startContinuousUpdate();
        } else {
            _update();
        }
    },

    stop(): void {
        _stopped = true;
        _adjustWorkerPool(0);
        if (_config.inputStream.type === 'LiveStream') {
            CameraAccess.release();
            _inputStream.clearEventHandlers();
        }
    },

    decodeSingle(config: QuaggaConfig, resultCallback: (_: QuaggaBarcode) => void): void {
        config = merge({
            inputStream: {
                type: 'ImageStream',
                sequence: false,
                size: 800,
                src: config.src
            },
            numOfWorkers: (process.env.NODE_ENV !== 'production' && config.debug) ? 0 : 1,
            locator: {
                halfSample: false
            }
        }, config);

        this.init(config, () => {
            Events.once('processed', (result: QuaggaBarcode) => {
                this.stop();
                resultCallback.call(null, result);
            }, true);
            this.start();
        });
    },

    pause(): void {
        _stopped = true;
    },

    onDetected(callback: EventSubscription | EventCallback): void {
        Events.subscribe('detected', callback);
    },

    offDetected(callback: EventCallback): void {
        Events.unsubscribe('detected', callback);
    },

    onProcessed(callback: EventSubscription | EventCallback): void {
        Events.subscribe('processed', callback);
    },

    offProcessed(callback: EventCallback): void {
        Events.unsubscribe('processed', callback);
    },

    setReaders(readers: Array<BarcodeReaderDeclaration>): void {
        if (_decoder) {
            _decoder.setReaders(readers);
        } else if (_onUIThread && _workerPool.length > 0) {
            _workerPool.forEach(({ worker }) => worker.postMessage({ cmd: 'setReaders', readers }));
        }
    },

    registerResultCollector(resultCollector: ResultCollector): void {
        if (resultCollector && typeof resultCollector.addResult === 'function') {
            _resultCollector = resultCollector;
        }
    }
};

function _initializeData(imageWrapper?: ImageWrapper): void {
    _initBuffers(imageWrapper);
    _decoder = new BarcodeDecoder(_config.decoder, _inputImageWrapper);
}

function _initInputStream(callback: (err?: any) => void): void {
    let video: HTMLVideoElement;
    if (_config.inputStream.type === 'VideoStream') {
        video = document.createElement('video');
        _inputStream = new VideoStream(video);
    } else if (_config.inputStream.type === 'ImageStream') {
        _inputStream = new ImageStream();
    } else if (_config.inputStream.type === 'LiveStream') {
        const viewport = _getViewPort();
        if (viewport) {
            video = viewport.querySelector('video');
            if (!video) {
                video = document.createElement('video');
                viewport.appendChild(video);
            }
        }
        _inputStream = new LiveStream(video);
        CameraAccess.request(video, _config.inputStream.constraints)
            .then(() => _inputStream.trigger('canrecord'), err => callback(err));
    }

    _inputStream.setAttribute('preload', 'auto');
    _inputStream.config = _config.inputStream;
    _inputStream.addEventListener('canrecord', _canRecord.bind(this, callback));
}

function _getViewPort(): HTMLElement {
    const target = _config.inputStream.target;
    // Check if target is already a DOM element
    if (target instanceof HTMLElement) {
        return target;
    } else {
        // Use '#interactive.viewport' as a fallback selector (backwards compatibility)
        const selector = typeof target === 'string' ? target : '#interactive.viewport';
        return document.querySelector(selector);
    }
}

function _canRecord(cb: () => void): void {
    checkImageConstraints(_inputStream, _config.locator);
    _initCanvas();
    _frameGrabber = new FrameGrabber(_inputStream, _canvasContainer.dom.image);

    _adjustWorkerPool(_config.numOfWorkers, () => {
        if (_config.numOfWorkers === 0) {
            _initializeData();
        }

        _inputStream.play();
        cb();
    });
}

function _initCanvas(): void {
    if (typeof document !== 'undefined') {
        const viewport = _getViewPort();
        _canvasContainer.dom.image = document.querySelector('canvas.imgBuffer');
        if (!_canvasContainer.dom.image) {
            _canvasContainer.dom.image = document.createElement('canvas');
            _canvasContainer.dom.image.className = 'imgBuffer';
            if (viewport && _config.inputStream.type === 'ImageStream') {
                viewport.appendChild(_canvasContainer.dom.image);
            }
        }
        _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext('2d');
        _canvasContainer.dom.image.width = _inputStream.canvasWidth;
        _canvasContainer.dom.image.height = _inputStream.canvasHeight;

        _canvasContainer.dom.overlay = document.querySelector('canvas.drawingBuffer');
        if (!_canvasContainer.dom.overlay) {
            _canvasContainer.dom.overlay = document.createElement('canvas');
            _canvasContainer.dom.overlay.className = 'drawingBuffer';
            if (viewport) {
                viewport.appendChild(_canvasContainer.dom.overlay);
            }
            const clearFix = document.createElement('br');
            clearFix.setAttribute('clear', 'all');
            if (viewport) {
                viewport.appendChild(clearFix);
            }
        }
        _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext('2d');
        _canvasContainer.dom.overlay.width = _inputStream.canvasWidth;
        _canvasContainer.dom.overlay.height = _inputStream.canvasHeight;
    }
}

function _initBuffers(imageWrapper?: ImageWrapper): void {
    if (imageWrapper) {
        _inputImageWrapper = imageWrapper;
    } else {
        _inputImageWrapper = new ImageWrapper({
            x: _inputStream.width,
            y: _inputStream.height
        });
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log(_inputImageWrapper.size);
    }
    _boxSize = [
        { x: 0, y: 0 },
        { x: 0, y: _inputImageWrapper.size.y },
        { x: _inputImageWrapper.size.x, y: _inputImageWrapper.size.y },
        { x: _inputImageWrapper.size.x, y: 0 }
    ];
    _locator = new BarcodeLocator(_inputImageWrapper, _config.locator);
}

function _transform(polygon: ReadonlyArray<Point>, offset: Point): void {
    polygon.forEach(vertex => {
        vertex.x += offset.x;
        vertex.y += offset.y;
    })
}

function _transformResult(result: QuaggaBarcode, offset: Point): void {
    if (result.barcodes) {
        result.barcodes.forEach(barcode => _transformResult(barcode, offset));
    }

    if (result.line) {
        _transform(result.line, offset);
    }

    if (result.box) {
        _transform(result.box, offset);
    }

    if (result.boxes) {
        result.boxes.forEach(box => _transform(box, offset));
    }
}

function _addResult(result: QuaggaBarcode, imageData: Uint8Array, canvasWidth: number, canvasHeight: number): void {
    if (imageData && _resultCollector) {
        if (result.barcodes) {
            result.barcodes.forEach(({ codeResult }) => {
                if (codeResult) {
                    _resultCollector.addResult(imageData, canvasWidth, canvasHeight, codeResult)
                }
            });
        } else if (result.codeResult) {
            _resultCollector.addResult(imageData, canvasWidth, canvasHeight, result.codeResult);
        }
    }
}

function _hasCodeResult(result: QuaggaBarcode): boolean {
    return result && (!!result.codeResult || result.barcodes && result.barcodes.some(barcode => !!barcode.codeResult));
}

function _publishResult(result?: QuaggaBarcode, imageData?: Uint8Array): void {
    let resultToPublish: QuaggaBarcode | Array<QuaggaBarcode> = result;

    if (result && _onUIThread) {
        const offset = _inputStream.topLeft;

        if (offset.x !== 0 || offset.y !== 0) {
            _transformResult(result, offset);
        }

        _addResult(result, imageData, _inputStream.canvasWidth, _inputStream.canvasHeight);
        resultToPublish = result.barcodes || result;
    }

    Events.publish('processed', resultToPublish);
    if (_hasCodeResult(result)) {
        Events.publish('detected', resultToPublish);
    }
}

function _locateAndDecode(): void {
    const boxes = _config.locate ? _locator.locate() : [_boxSize];
    const result = _decoder.decodeFromBoundingBoxes(boxes);
    _publishResult(result, _inputImageWrapper.data);
}

function _update(): void {
    if (_onUIThread) {
        if (_workerPool.length > 0) {
            const availableWorker = _workerPool.find(({ busy }) => !busy);
            if (!availableWorker) {
                return; // all workers are busy
            }

            const imageData = availableWorker.imageData;

            if (_frameGrabber.grab(imageData)) {
                availableWorker.busy = true;
                availableWorker.worker.postMessage({ cmd: 'process', imageData }, [imageData.buffer]);
            }
        } else if (_frameGrabber.grab(_inputImageWrapper.data)) {
            _locateAndDecode();
        }
    } else {
        _locateAndDecode();
    }
}

function _startContinuousUpdate(): void {
    const delay = 1000 / (_config.frequency || 60);
    let next = null;
    _stopped = false;

    (function frame(timestamp): void {
        next = next || timestamp;
        if (!_stopped) {
            if (timestamp >= next) {
                next += delay;
                _update();
            }
            window.requestAnimationFrame(frame);
        }
    }(performance.now()));
}

function _initWorker(cb: (workerThread: WorkerThread) => void): void {
    const blobURL = _generateWorkerBlob();
    const workerThread = {
        worker: new Worker(blobURL),
        imageData: new Uint8Array(_inputStream.width * _inputStream.height),
        busy: true
    };

    workerThread.worker.onmessage = ({ data }) => {
        if (data.event === 'initialized') {
            URL.revokeObjectURL(blobURL);
            workerThread.busy = false;
            workerThread.imageData = new Uint8Array(data.imageData);
            if (process.env.NODE_ENV !== 'production') {
                console.log('Worker initialized');
            }
            cb(workerThread);
        } else if (data.event === 'processed') {
            workerThread.busy = false;
            workerThread.imageData = new Uint8Array(data.imageData);
            _publishResult(data.result, workerThread.imageData);
        } else if (data.event === 'error') {
            if (process.env.NODE_ENV !== 'production') {
                console.log('Worker error:', data.message);
            }
        }
    };

    workerThread.worker.postMessage({
        cmd: 'init',
        size: { x: _inputStream.width, y: _inputStream.height },
        imageData: workerThread.imageData,
        config: merge(_config, { inputStream: { target: null } })
    }, [workerThread.imageData.buffer]);
}

function _workerInterface(factory: Function): void {
    let Quagga: any;
    const worker: any = self;
    let imageWrapper: ImageWrapper;

    if (factory) {
        Quagga = factory().default;
        if (!Quagga) {
            worker.postMessage({ event: 'error', message: 'Quagga could not be created' });
            return;
        }
    }

    self.onmessage = ({ data }) => {
        if (data.cmd === 'init') {
            const config: QuaggaConfig = data.config;
            config.numOfWorkers = 0;
            imageWrapper = new Quagga.ImageWrapper({ x: data.size.x, y: data.size.y }, new Uint8Array(data.imageData));
            Quagga.init(
                config,
                () => worker.postMessage(
                    { event: 'initialized', imageData: imageWrapper.data }, [imageWrapper.data.buffer]
                ),
                imageWrapper
            );
            Quagga.onProcessed((result: QuaggaBarcode) =>
                worker.postMessage(
                    { event: 'processed', imageData: imageWrapper.data, result }, [imageWrapper.data.buffer]
                )
            );
        } else if (data.cmd === 'process') {
            imageWrapper.data = new Uint8Array(data.imageData);
            Quagga.start();
        } else if (data.cmd === 'setReaders') {
            Quagga.setReaders(data.readers);
        }
    };
}

function _generateWorkerBlob(): string {
    // @ts-ignore
    let factorySource: string = __factorySource__ || '';
    const blob = new Blob([`(${_workerInterface.toString()})(${factorySource});`], { type: 'text/javascript' });

    return window.URL.createObjectURL(blob);
}

function _adjustWorkerPool(capacity: number, cb?: () => void): void {
    const increaseBy = capacity - _workerPool.length;

    if (increaseBy > 0) {
        for (let i = 0; i < increaseBy; i++) {
            _initWorker(workerThread => {
                _workerPool.push(workerThread);
                if (_workerPool.length >= capacity && cb) {
                    cb();
                }
            });
        }
    } else {
        if (increaseBy < 0) {
            _workerPool.slice(increaseBy).forEach(({ worker }) => {
                worker.terminate();
                if (process.env.NODE_ENV !== 'production') {
                    console.log('Worker terminated!');
                }
            });
            _workerPool = _workerPool.slice(0, increaseBy);
        }
        return cb && cb();
    }
}
