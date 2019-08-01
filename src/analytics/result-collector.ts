import { ImageDebug } from '../common/image-debug';
import { QuaggaBarcode } from '../decoder/barcode-decoder';
import { Barcode } from '../reader/barcode-reader';

export interface ResultCollectorConfig {
    capacity?: number;
    capture?: boolean;
    blacklist?: Array<Barcode>;
    filter?: (item: Barcode) => boolean;
}

export class ResultCollector {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _config: ResultCollectorConfig;
    private _capacity: number;
    private _capture: boolean;
    private _results: Array<QuaggaBarcode>;

    constructor(config: ResultCollectorConfig) {
        this._results = new Array<QuaggaBarcode>();
        this._config = config;
        this._capacity = config.capacity || 20;
        this._capture = config.capture === true;

        if (this._capture) {
            this._canvas = document.createElement('canvas');
            this._context = this._canvas.getContext('2d');
        }
    }

    addResult(data: Uint8Array, imageWidth: number, imageHeight: number, codeResult: Barcode): void {
        if (codeResult && this._capacity && !this._contains(codeResult) && this._passesFilter(codeResult)) {
            const result: QuaggaBarcode = { codeResult };

            this._capacity--;

            if (this._capture) {
                this._canvas.width = imageWidth;
                this._canvas.height = imageHeight;

                ImageDebug.drawImage(data, imageWidth, imageHeight, this._context);

                result.frame = this._canvas.toDataURL();
            }

            this._results.push(result);
        }
    }

    getResults(): Array<QuaggaBarcode> {
        return this._results;
    }

    private _contains(codeResult: Barcode): boolean {
        return this._config.blacklist &&
            this._config.blacklist.some(item => Object.keys(item).every(key => item[key] === codeResult[key]));
    }

    private _passesFilter(codeResult: Barcode): boolean {
        return typeof this._config.filter !== 'function' || this._config.filter(codeResult);
    }
}
