import { Box } from '../common/box';
import { ImageWrapper } from '../common/image-wrapper';
import { Point } from '../common/point';
import { Readers } from '../reader/index';
import { Barcode, BarcodeReader, BarcodeReaderConfig, BarcodeReaderDeclaration, BarcodeReaderType } from '../reader/barcode-reader';
import { BarcodeLine, Bresenham } from './bresenham';
import { ImageDebug } from '../common/image-debug';

export interface BarcodeDecoderConfig {
    debug?: {
        drawBoundingBox?: boolean;
        drawScanline?: boolean;
        showFrequency?: boolean;
        showPattern?: boolean;
    };
    multiple?: boolean;
    readers?: Array<BarcodeReaderDeclaration>;
}

type Line = [Point, Point];

export interface QuaggaBarcode {
    angle?: number;
    barcodes?: Array<QuaggaBarcode>; // TOOD: deal with multiple results
    box?: Box;
    boxes?: Array<Box>; // TOOD: deal with multiple results
    codeResult?: Barcode;
    frame?: string;
    line?: Line;
    pattern?: Array<number>;
    threshold?: number;
};

interface BarcodeAndBarcodeLine {
    codeResult: Barcode;
    barcodeLine: BarcodeLine;
}

export class BarcodeDecoder {
    private _config: BarcodeDecoderConfig;
    private _inputImageWrapper: ImageWrapper<Uint8Array>;
    private _frequencyCanvas: HTMLCanvasElement;
    private _patternCanvas: HTMLCanvasElement;
    private _overlayContext: CanvasRenderingContext2D;
    private _barcodeReaders: Array<BarcodeReader>;

    constructor(config: BarcodeDecoderConfig, inputImageWrapper: ImageWrapper<Uint8Array>) {
        this._config = config;
        this._inputImageWrapper = inputImageWrapper;
        this._barcodeReaders = [];

        if (process.env.NODE_ENV !== 'production' && this._config.debug && typeof document !== 'undefined') {
            const debugDiv = document.querySelector('#debug.detection');

            this._frequencyCanvas = document.querySelector('canvas.frequency');
            if (!this._frequencyCanvas) {
                this._frequencyCanvas = document.createElement('canvas');
                this._frequencyCanvas.className = 'frequency';
                if (debugDiv) {
                    debugDiv.appendChild(this._frequencyCanvas);
                }
            }
            this._frequencyCanvas.style.display = this._config.debug.showFrequency ? 'block' : 'none';

            this._patternCanvas = document.querySelector('canvas.patternBuffer');
            if (!this._patternCanvas) {
                this._patternCanvas = document.createElement('canvas');
                this._patternCanvas.className = 'patternBuffer';
                if (debugDiv) {
                    debugDiv.appendChild(this._patternCanvas);
                }
            }
            this._patternCanvas.style.display = this._config.debug.showPattern ? 'block' : 'none';

            const overlayCanvas = document.querySelector<HTMLCanvasElement>('canvas.drawingBuffer');
            this._overlayContext = overlayCanvas ? overlayCanvas.getContext('2d') : null;
        }

        this._initReaders();
    }

    decodeFromBoundingBoxes(boxes: Array<Box>): QuaggaBarcode {
        let barcode: QuaggaBarcode = null;

        if (boxes) {
            if (this._config.multiple) {
                const barcodes = boxes.map(box => this.decodeFromBoundingBox(box));
                return { barcodes, boxes };
            }
            if (boxes.some(box => !!(barcode = this.decodeFromBoundingBox(box)))) {
                barcode.boxes = boxes;
            }
        }

        return barcode;
    }

    /**
     * With the help of the configured readers this function tries to detect
     * a valid barcode pattern within the given area.
     * @param box The area to search in
     * @returns The result {codeResult, line, angle, pattern, threshold}
     */
    decodeFromBoundingBox(box: Box): QuaggaBarcode {
        const debug = process.env.NODE_ENV !== 'production' && this._overlayContext && this._config.debug;

        if (debug && debug.drawBoundingBox) {
            this._drawPath(box, 'blue', 2);
        }

        let line = this._getLine(box);

        if (line === null) {
            return null;
        }

        const angle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
        line = this._getExtendedLine(line, angle);

        let result = this._tryDecode(line);
        if (result === null) {
            result = this._tryDecodeBruteForce(box, line, angle);
        }

        if (result === null) {
            return null;
        }

        if (debug && debug.drawScanline) {
            this._drawPath(line, 'red', 3);
        }

        return {
            angle,
            box,
            codeResult: result.codeResult,
            line,
            pattern: result.barcodeLine.line,
            threshold: result.barcodeLine.threshold
        };
    }

    setReaders(readers: Array<BarcodeReaderDeclaration>): void {
        this._config.readers = readers;
        this._barcodeReaders.length = 0;
        this._initReaders();
    }

    private _initReaders(): void {
        this._config.readers.forEach(readerConfig => {
            let reader: BarcodeReaderType;
            let configuration: BarcodeReaderConfig = {};
            let supplements = [];

            if (typeof readerConfig === 'object') {
                reader = readerConfig.format;
                configuration = readerConfig.config || {};
            } else if (typeof readerConfig === 'string') {
                reader = readerConfig;
            }

            if (process.env.NODE_ENV !== 'production') {
                console.log('Before registering reader:', reader);
            }

            if (configuration.supplements) {
                supplements = configuration.supplements.map(supplement => new Readers[supplement]());
            }

            this._barcodeReaders.push(new Readers[reader](configuration, supplements));
        });

        if (process.env.NODE_ENV !== 'production') {
            console.log('Registered Readers:',
                ...this._barcodeReaders.map(({ config, FORMAT }) => JSON.stringify({ config, FORMAT })));
        }
    }

    /**
     * extend the line on both ends
     * @param line
     * @param angle
     */
    private _getExtendedLine(line: Line, angle: number): Line {
        function extendLine(amount: number) {
            const extension = {
                y: amount * Math.sin(angle),
                x: amount * Math.cos(angle)
            };

            line[0].y -= extension.y;
            line[0].x -= extension.x;
            line[1].y += extension.y;
            line[1].x += extension.x;
        }

        const lineLength = Math.sqrt((line[1].y - line[0].y) ** 2 + (line[1].x - line[0].x) ** 2);
        let extensionLength = lineLength * 0.1 | 0;

        extendLine(extensionLength);

        // check if inside image
        while (extensionLength > 1 && (!this._inputImageWrapper.inImageWithBorder(line[0], 0)
            || !this._inputImageWrapper.inImageWithBorder(line[1], 0))) {
            extensionLength >>= 1;
            extendLine(-extensionLength);
        }

        return line;
    }

    private _getLine(box: Box): Line {
        return [{
            x: (box[1].x + box[0].x) / 2,
            y: (box[1].y + box[0].y) / 2
        }, {
            x: (box[3].x + box[2].x) / 2,
            y: (box[3].y + box[2].y) / 2
        }];
    }

    private _tryDecode(line: Line): BarcodeAndBarcodeLine {
        const debug = process.env.NODE_ENV !== 'production' && this._config.debug;

        if (debug && this._overlayContext) {
            this._drawPath(line, 'red', 3);
        }

        let barcodeLine = Bresenham.getBarcodeLine(this._inputImageWrapper, line[0], line[1]);

        if (debug && debug.showFrequency) {
            this._printFrequency(barcodeLine.line);
        }

        barcodeLine = Bresenham.toBinaryLine(barcodeLine);

        if (debug && debug.showPattern) {
            this._printPattern(barcodeLine.line);
        }

        let codeResult: Barcode = null;

        this._barcodeReaders.some(reader => !!(codeResult = reader.decodePattern(barcodeLine.line)));

        return codeResult ? { codeResult, barcodeLine } : null;
    }

    /**
     * This method slices the given area apart and tries to detect a barcode-pattern for each slice.
     * It returns the decoded barcode, or null if nothing was found
     * @param box
     * @param line
     * @param lineAngle
     */
    private _tryDecodeBruteForce(box: Box, line: Line, lineAngle: number): BarcodeAndBarcodeLine {
        const sideLength = Math.sqrt((box[1].x - box[0].x) ** 2 + (box[1].y - box[0].y) ** 2);
        const slices = 16;
        const xdir = Math.sin(lineAngle);
        const ydir = Math.cos(lineAngle);

        for (let i = 1; i < slices; i++) {
            // move line perpendicular to angle
            const dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
            line[0].y += dir * xdir;
            line[0].x -= dir * ydir;
            line[1].y += dir * xdir;
            line[1].x -= dir * ydir;

            const result = this._tryDecode(line);
            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * Used for development only
     */
    private _printFrequency(line: Array<number>): void {
        const context = this._frequencyCanvas.getContext('2d');
        this._frequencyCanvas.width = line.length;
        this._frequencyCanvas.height = 256;

        context.beginPath();
        context.strokeStyle = 'blue';

        for (let i = 0; i < line.length; i++) {
            context.moveTo(i, 255);
            context.lineTo(i, 255 - line[i]);
        }

        context.closePath();
        context.stroke();
    }

    /**
     * Used for development only
     */
    private _printPattern(line: Array<number>): void {
        const context = this._patternCanvas.getContext('2d');

        this._patternCanvas.width = line.length;
        context.fillStyle = 'black';

        for (let i = 0; i < line.length; i++) {
            if (line[i] === 1) {
                context.fillRect(i, 0, 1, 100);
            }
        }
    }

    private _drawPath(path: Array<Point>, color: string, lineWidth: number): void {
        ImageDebug.drawPath(path, this._overlayContext, color, lineWidth);
    }
}
