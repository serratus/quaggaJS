declare module "common/polyfills" {
    export function polyfills(): void;
    const _default: void;
    export default _default;
}
declare module "common/point" {
    export interface Point {
        x: number;
        y: number;
    }
}
declare module "common/image-debug" {
    import { Point } from "common/point";
    export const ImageDebug: {
        drawPath(path: Point[], context: CanvasRenderingContext2D, color: string, lineWidth: number): void;
        drawImage(imageData: Uint8Array, width: number, height: number, context: CanvasRenderingContext2D): boolean;
    };
}
declare module "common/box" {
    import { Point } from "common/point";
    export type Box = [Point, Point, Point, Point];
}
declare module "common/moment" {
    export interface Moment {
        x?: number;
        y?: number;
        m00?: number;
        m01?: number;
        m10?: number;
        m11?: number;
        m02?: number;
        m20?: number;
        theta?: number;
        rad?: number;
    }
}
declare module "common/hsv2rgb" {
    export type HSV = [number, number, number];
    export type RGB = [number, number, number];
    export function hsv2rgb(hsv: HSV, rgb?: RGB): RGB;
}
declare module "common/image-wrapper" {
    import { Moment } from "common/moment";
    import { Point } from "common/point";
    type ArrayType = Array<number> | Uint8Array | Int32Array;
    /**
     * Represents a basic image combining the data and size.
     * In addition, some methods for manipulation are contained.
     */
    export class ImageWrapper<T extends ArrayType = Uint8Array> {
        data: T | Uint8Array;
        size: Point;
        /**
         * @param size The size of the image in pixel
         * @param data If given, a flat array containing the pixel data
         * @param arrayType If given, the desired DataType of the Array (may be typed/non-typed)
         * @param initialize Indicating if the array should be initialized on creation.
         */
        constructor(size: Point, data?: T, arrayType?: {
            new (_: number): T | Uint8Array;
        }, initialize?: boolean);
        /**
         * Tests if a position is within the image with a given offset
         * @param point The location to test
         * @param border The padding value in pixels
         * @returns true if location inside the image's border, false otherwise
         * @see cvd/image.h
         */
        inImageWithBorder(point: Point, border: number): boolean;
        /**
         * Creates an {ImageWrapper) and copies the needed underlying image-data area
         * @param imageWrapper The target {ImageWrapper} where the data should be copied
         * @param fromX The horizontal position where to copy from
         * @param fromY The vertical position where to copy from
        */
        subImageAsCopy(imageWrapper: ImageWrapper, fromX: number, fromY: number): void;
        /**
         * Retrieves a given pixel position from the image
         * @param x The x-position
         * @param y The y-position
         * @returns The grayscale value at the pixel-position
         */
        get(x: number, y: number): number;
        /**
         * Sets a given pixel position in the image
         * @param x The x-position
         * @param y The y-position
         * @param value The grayscale value to set
         * @returns The Image itself (for possible chaining)
         */
        set(x: number, y: number, value: number): ImageWrapper<T>;
        /**
         * Sets the border of the image (1 pixel) to zero
         */
        zeroBorder(): void;
        /**
         * Inverts a binary image in place
         */
        invert(): void;
        moments(labelCount: number): Array<Moment>;
        /**
         * Displays the {ImageWrapper} in a given canvas
         * @param context The rendering context to write to
         * @param scale Scale which is applied to each pixel-value
         */
        show(context: CanvasRenderingContext2D, scale: number): void;
        /**
         * Displays the part of the image in a given canvas
         * @param context The rendering context to write to
         * @param scale Scale which is applied to each pixel-value
         * @param fromX The horizontal position where to overlay from
         * @param fromY The vertical position where to overlay from
         */
        overlay(context: CanvasRenderingContext2D, scale: number, fromX: number, fromY: number): void;
    }
}
declare module "reader/barcode-reader" {
    export enum BarcodeDirection {
        Forward = 1,
        Reverse = -1
    }
    export type BarcodeFormat = string;
    export type BarcodeReaderType = string;
    export type BarcodeReaderDeclaration = BarcodeReaderType | {
        format: BarcodeReaderType;
        config: BarcodeReaderConfig;
    };
    export interface BarcodeReaderConfig {
        normalizeBarSpaceWidth?: boolean;
        supplements?: Array<BarcodeReaderType>;
    }
    export interface BarcodeCorrection {
        bar: number;
        space: number;
    }
    export interface BarcodeInfo {
        code?: number;
        correction?: BarcodeCorrection;
        end?: number;
        endCounter?: number;
        error?: number;
        start?: number;
        startCounter?: number;
    }
    export interface Barcode {
        code?: string;
        codeset?: number;
        correction?: BarcodeCorrection;
        decodedCodes?: Array<string | BarcodeInfo>;
        direction?: BarcodeDirection;
        end?: number;
        endInfo?: BarcodeInfo;
        format?: BarcodeFormat;
        start?: number;
        startInfo?: BarcodeInfo;
        supplement?: Barcode;
    }
    export abstract class BarcodeReader {
        protected _singleCodeError: number;
        protected _averageCodeError: number;
        protected _format: BarcodeFormat;
        protected _row: Array<number>;
        config: BarcodeReaderConfig;
        supplements: Array<BarcodeReader>;
        static readonly Exception: {
            StartNotFoundException: string;
            CodeNotFoundException: string;
            PatternNotFoundException: string;
        };
        readonly SINGLE_CODE_ERROR: number;
        readonly AVERAGE_CODE_ERROR: number;
        readonly FORMAT: BarcodeFormat;
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        abstract decode(row?: Array<number>, start?: number): Barcode;
        protected _findPattern(pattern: ReadonlyArray<number>, offset: number, isWhite: 0 | 1, tryHarder: boolean): BarcodeInfo;
        protected _nextUnset(line: ReadonlyArray<number>, start?: number): number;
        protected _nextSet(line: ReadonlyArray<number>, start?: number): number;
        protected _matchRange(start: number, end: number, value: number): boolean;
        protected _matchPattern(counter: ReadonlyArray<number>, code: ReadonlyArray<number>, maxSingleError?: number): number;
        protected _correctBars(counter: Array<number>, correction: number, indices: Array<number>): void;
        decodePattern(pattern: Array<number>): Barcode;
        _fillCounters(offset: number, end: number, isWhite: 0 | 1): Array<number>;
        protected _toCounters(start: number, counters: Uint16Array): Uint16Array;
    }
}
declare module "reader/code-128-reader" {
    import { Barcode, BarcodeCorrection, BarcodeInfo, BarcodeReader } from "reader/barcode-reader";
    export class Code128Reader extends BarcodeReader {
        constructor();
        protected _decodeCode(start: number, correction: BarcodeCorrection): BarcodeInfo;
        private _correct;
        protected _findStart(): {
            error: number;
            code: number;
            start: number;
            end: number;
            correction: {
                bar: number;
                space: number;
            };
        };
        decode(): Barcode;
        protected _verifyTrailingWhitespace(endInfo: BarcodeInfo): BarcodeInfo;
        private _calculateCorrection;
    }
}
declare module "reader/code-39-reader" {
    import { Barcode, BarcodeInfo, BarcodeReader } from "reader/barcode-reader";
    export class Code39Reader extends BarcodeReader {
        constructor();
        decode(): Barcode;
        protected _patternToChar(pattern: any): string;
        private _verifyTrailingWhitespace;
        private _findNextWidth;
        private _toPattern;
        protected _findStart(): BarcodeInfo;
    }
}
declare module "reader/code-39-vin-reader" {
    import { Barcode } from "reader/barcode-reader";
    import { Code39Reader } from "reader/code-39-reader";
    export class Code39VINReader extends Code39Reader {
        constructor();
        /**
         * @borrows
         * https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
         */
        decode(): Barcode;
        private _checkChecksum;
    }
}
declare module "reader/codabar-reader" {
    import { Barcode, BarcodeInfo, BarcodeReader } from "reader/barcode-reader";
    export class CodabarReader extends BarcodeReader {
        private _counters;
        constructor();
        decode(): Barcode;
        protected _verifyWhitespace(startCounter: number, endCounter: number): boolean;
        private _calculatePatternLength;
        private _thresholdResultPattern;
        private _charToPattern;
        private _validateResult;
        private _patternToChar;
        private _computeAlternatingThreshold;
        private _toPattern;
        private _sumCounters;
        protected _findStart(): BarcodeInfo;
    }
}
declare module "common/merge" {
    /**
     * Performs a deep merge of objects and returns new object.
     * Does not modify objects (immutable).
     * @see https://stackoverflow.com/a/48218209
     *
     * @param objects - Objects to merge
     * @returns New object with merged key/values
     */
    export function merge(...objects: ReadonlyArray<any>): object;
}
declare module "reader/ean-reader" {
    import { Barcode, BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    export class EANReader extends BarcodeReader {
        readonly CODE_L_START: number;
        readonly CODE_G_START: number;
        readonly START_PATTERN: Array<number>;
        readonly STOP_PATTERN: Array<number>;
        readonly MIDDLE_PATTERN: Array<number>;
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        protected _decodeCode(start: number, coderange?: number): BarcodeInfo;
        protected _findStart(): BarcodeInfo;
        protected _verifyTrailingWhitespace(endInfo: BarcodeInfo): BarcodeInfo;
        protected _findEnd(offset: number, isWhite: 0 | 1): BarcodeInfo;
        private _calculateFirstDigit;
        protected _decodePayload(code: BarcodeInfo, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo;
        decode(): Barcode;
        private _decodeExtensions;
        protected _checksum(result: Array<number>): boolean;
    }
}
declare module "reader/ean-8-reader" {
    import { BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    import { EANReader } from "reader/ean-reader";
    export class EAN8Reader extends EANReader {
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        protected _decodePayload(code: BarcodeInfo, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo;
    }
}
declare module "reader/ean-2-reader" {
    import { Barcode, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    import { EANReader } from "reader/ean-reader";
    export class EAN2Reader extends EANReader {
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        decode(row?: Array<number>, start?: number): Barcode;
    }
}
declare module "reader/ean-5-reader" {
    import { Barcode, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    import { EANReader } from "reader/ean-reader";
    export class EAN5Reader extends EANReader {
        readonly CHECK_DIGIT_ENCODINGS: Array<number>;
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        decode(row?: Array<number>, start?: number): Barcode;
        private _determineCheckDigit;
        private _extensionChecksum;
    }
}
declare module "reader/upc-reader" {
    import { Barcode, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    import { EANReader } from "reader/ean-reader";
    export class UPCReader extends EANReader {
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        decode(): Barcode;
    }
}
declare module "reader/upc-e-reader" {
    import { BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    import { EANReader } from "reader/ean-reader";
    export class UPCEReader extends EANReader {
        readonly STOP_PATTERN: number[];
        constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>);
        protected _decodePayload(code: BarcodeInfo, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo;
        private _determineParity;
        private _convertToUPCA;
        protected _checksum(result: Array<number>): boolean;
        protected _findEnd(offset: number, isWhite: 0 | 1): BarcodeInfo;
        protected _verifyTrailingWhitespace(endInfo: BarcodeInfo): BarcodeInfo;
    }
}
declare module "reader/i2of5-reader" {
    import { Barcode, BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    export class I2of5Reader extends BarcodeReader {
        private _barSpaceRatio;
        constructor(config?: BarcodeReaderConfig);
        decode(): Barcode;
        protected _matchPattern(counter: Array<number>, code: ReadonlyArray<number>): number;
        protected _findStart(): BarcodeInfo;
        protected _verifyTrailingWhitespace(endInfo: BarcodeInfo): BarcodeInfo;
        protected _findEnd(): BarcodeInfo;
        protected _decodeCode(counter: Array<number>): BarcodeInfo;
        protected _decodePayload(counters: ReadonlyArray<number>, result: Array<number>, decodedCodes: Array<BarcodeInfo>): [BarcodeInfo, BarcodeInfo];
    }
}
declare module "reader/2of5-reader" {
    import { Barcode, BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from "reader/barcode-reader";
    export class TwoOfFiveReader extends BarcodeReader {
        private _barSpaceRatio;
        constructor(config?: BarcodeReaderConfig);
        decode(): Barcode;
        protected _findStart(): BarcodeInfo;
        protected _verifyTrailingWhitespace(endInfo: BarcodeInfo): BarcodeInfo;
        protected _findEnd(): BarcodeInfo;
        protected _decodeCode(counter: ReadonlyArray<number>): BarcodeInfo;
        protected _decodePayload(counters: ReadonlyArray<number>, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo;
    }
}
declare module "reader/code-93-reader" {
    import { Barcode, BarcodeReader } from "reader/barcode-reader";
    export class Code93Reader extends BarcodeReader {
        constructor();
        decode(): Barcode;
        protected _patternToChar(pattern: number): string;
        private _verifyEnd;
        private _toPattern;
        private _findStart;
        private _decodeExtended;
        private _verifyChecksums;
        private _matchCheckChar;
    }
}
declare module "reader/index" {
    import { Code128Reader } from "reader/code-128-reader";
    import { Code39Reader } from "reader/code-39-reader";
    import { Code39VINReader } from "reader/code-39-vin-reader";
    import { CodabarReader } from "reader/codabar-reader";
    import { EANReader } from "reader/ean-reader";
    import { EAN8Reader } from "reader/ean-8-reader";
    import { EAN2Reader } from "reader/ean-2-reader";
    import { EAN5Reader } from "reader/ean-5-reader";
    import { UPCReader } from "reader/upc-reader";
    import { UPCEReader } from "reader/upc-e-reader";
    import { I2of5Reader } from "reader/i2of5-reader";
    import { TwoOfFiveReader } from "reader/2of5-reader";
    import { Code93Reader } from "reader/code-93-reader";
    export const Readers: {
        code_128_reader: typeof Code128Reader;
        ean_reader: typeof EANReader;
        ean_5_reader: typeof EAN5Reader;
        ean_2_reader: typeof EAN2Reader;
        ean_8_reader: typeof EAN8Reader;
        code_39_reader: typeof Code39Reader;
        code_39_vin_reader: typeof Code39VINReader;
        codabar_reader: typeof CodabarReader;
        upc_reader: typeof UPCReader;
        upc_e_reader: typeof UPCEReader;
        i2of5_reader: typeof I2of5Reader;
        '2of5_reader': typeof TwoOfFiveReader;
        code_93_reader: typeof Code93Reader;
    };
}
declare module "decoder/bresenham" {
    import { Point } from "common/point";
    import { ImageWrapper } from "common/image-wrapper";
    export interface BarcodeLine {
        line: Array<number>;
        max?: number;
        min?: number;
        threshold?: number;
    }
    export const Bresenham: {
        /**
         * Scans a line of the given image from point p1 to p2 and returns a result object containing
         * gray-scale values (0-255) of the underlying pixels in addition to the min and max values.
         * @param imageWrapper
         * @param p1 The start point {x,y}
         * @param p2 The end point {x,y}
         * @returns {line, min, max}
         */
        getBarcodeLine(imageWrapper: ImageWrapper<Uint8Array>, p1: Point, p2: Point): BarcodeLine;
        /**
         * Converts the result from getBarcodeLine into a binary representation
         * also considering the frequency and slope of the signal for more robust results
         * @param result {line, min, max}
         */
        toBinaryLine(result: BarcodeLine): BarcodeLine;
    };
}
declare module "decoder/barcode-decoder" {
    import { Box } from "common/box";
    import { ImageWrapper } from "common/image-wrapper";
    import { Point } from "common/point";
    import { Barcode, BarcodeReaderDeclaration } from "reader/barcode-reader";
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
        barcodes?: Array<QuaggaBarcode>;
        box?: Box;
        boxes?: Array<Box>;
        codeResult?: Barcode;
        frame?: string;
        line?: Line;
        pattern?: Array<number>;
        threshold?: number;
    }
    export class BarcodeDecoder {
        private _config;
        private _inputImageWrapper;
        private _frequencyCanvas;
        private _patternCanvas;
        private _overlayContext;
        private _barcodeReaders;
        constructor(config: BarcodeDecoderConfig, inputImageWrapper: ImageWrapper<Uint8Array>);
        decodeFromBoundingBoxes(boxes: Array<Box>): QuaggaBarcode;
        /**
         * With the help of the configured readers this function tries to detect
         * a valid barcode pattern within the given area.
         * @param box The area to search in
         * @returns The result {codeResult, line, angle, pattern, threshold}
         */
        decodeFromBoundingBox(box: Box): QuaggaBarcode;
        setReaders(readers: Array<BarcodeReaderDeclaration>): void;
        private _initReaders;
        /**
         * extend the line on both ends
         * @param line
         * @param angle
         */
        private _getExtendedLine;
        private _getLine;
        private _tryDecode;
        /**
         * This method slices the given area apart and tries to detect a barcode-pattern for each slice.
         * It returns the decoded barcode, or null if nothing was found
         * @param box
         * @param line
         * @param lineAngle
         */
        private _tryDecodeBruteForce;
        /**
         * Used for development only
         */
        private _printFrequency;
        /**
         * Used for development only
         */
        private _printPattern;
        private _drawPath;
    }
}
declare module "analytics/result-collector" {
    import { QuaggaBarcode } from "decoder/barcode-decoder";
    import { Barcode } from "reader/barcode-reader";
    export interface ResultCollectorConfig {
        capacity?: number;
        capture?: boolean;
        blacklist?: Array<Barcode>;
        filter?: (item: Barcode) => boolean;
    }
    export class ResultCollector {
        private _canvas;
        private _context;
        private _config;
        private _capacity;
        private _capture;
        private _results;
        constructor(config: ResultCollectorConfig);
        addResult(data: Uint8Array, imageWidth: number, imageHeight: number, codeResult: Barcode): void;
        getResults(): Array<QuaggaBarcode>;
        private _contains;
        private _passesFilter;
    }
}
declare module "common/events" {
    export interface EventCallback {
        (data: any): void;
    }
    export interface EventSubscription {
        callback: EventCallback;
        async?: boolean;
        once?: boolean;
    }
    export class Events {
        static subscribe(event: string, callback: EventSubscription | EventCallback, async?: boolean): void;
        static publish(type: string, data?: any): void;
        static once(event: string, callback: EventCallback, async?: boolean): void;
        static unsubscribe(eventName?: string, callback?: EventCallback): void;
    }
}
declare module "locator/barcode-locator-config" {
    export type PatchSizeConfig = number | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
    export interface BarcodeLocatorDebugConfig {
        /**
         * @default false
         */
        showCanvas?: boolean;
        /**
         * @default false
         */
        showPatches?: boolean;
        /**
         * @default false
         */
        showFoundPatches?: boolean;
        /**
         * @default false
         */
        showSkeleton?: boolean;
        /**
         * @default false
         */
        showLabels?: boolean;
        /**
         * @default false
         */
        showPatchLabels?: boolean;
        /**
         * @default false
         */
        showRemainingPatchLabels?: boolean;
        boxFromPatches?: {
            /**
             * @default false
             */
            showTransformed?: boolean;
            /**
             * @default false
             */
            showTransformedBox?: boolean;
            /**
             * @default false
             */
            showBB?: boolean;
        };
    }
    export interface BarcodeLocatorConfig {
        debug?: BarcodeLocatorDebugConfig;
        /**
         * @default true
         */
        halfSample?: boolean;
        /**
         * @default 'medium'
         */
        patchSize?: PatchSizeConfig;
        useWorker?: boolean;
    }
}
declare module "input/input-stream-config" {
    type InputStreamType = 'ImageStream' | 'LiveStream' | 'VideoStream';
    export interface AreaConfig {
        bottom?: string;
        left?: string;
        right?: string;
        top?: string;
    }
    export interface InputStreamConfig {
        area?: AreaConfig;
        constraints?: MediaTrackConstraints;
        halfSample?: boolean;
        length?: number;
        mime?: string;
        name?: string;
        sequence?: boolean;
        singleChannel?: boolean;
        size?: number;
        src?: string;
        target?: HTMLElement | string;
        type?: InputStreamType;
    }
}
declare module "config/config" {
    import { BarcodeDecoderConfig } from "decoder/barcode-decoder";
    import { BarcodeLocatorConfig } from "locator/barcode-locator-config";
    import { InputStreamConfig } from "input/input-stream-config";
    interface DebugConfig {
    }
    export interface QuaggaConfig {
        debug?: DebugConfig;
        decoder?: BarcodeDecoderConfig;
        frequency?: number;
        inputStream?: InputStreamConfig;
        locate?: boolean;
        locator?: BarcodeLocatorConfig;
        numOfWorkers?: number;
        src?: string;
    }
    export const config: QuaggaConfig;
}
declare module "common/media-devices" {
    export function enumerateDevices(): Promise<Array<MediaDeviceInfo>>;
    export function getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
}
declare module "input/camera-access" {
    export const CameraAccess: {
        /**
         * Attempts to attach the camera-stream to a given video element
         * and calls the callback function when the content is ready
         * @param video
         * @param videoConstraints
         */
        request(video: HTMLVideoElement, videoConstraints: MediaTrackConstraints): Promise<void>;
        release(): void;
        enumerateVideoDevices(): Promise<MediaDeviceInfo[]>;
        getActiveStreamLabel(): string;
        getActiveTrack(): MediaStreamTrack;
        pickConstraints(videoConstraints: MediaTrackConstraints): MediaStreamConstraints;
    };
}
declare module "input/exif-helper" {
    export const AvailableTags: Array<string>;
    export interface Tags {
        [key: string]: number | string;
    }
    export function findTagsInObjectURL(src: string, tags?: string[]): Promise<Tags>;
    export function findTagsInBuffer(file: ArrayBuffer, selectedTags?: Array<string>): Tags;
}
declare module "input/image-loader" {
    import { Tags } from "input/exif-helper";
    export interface ImageInfo {
        image: HTMLImageElement;
        tags?: Tags;
    }
    export class ImageLoader {
        static load(baseUri: string, callback: (_: Array<ImageInfo>) => void, offset: number, size: number, sequence: boolean): Promise<void>;
    }
}
declare module "input/input-stream" {
    import { Point } from "common/point";
    import { ImageInfo } from "input/image-loader";
    import { InputStreamConfig } from "input/input-stream-config";
    export abstract class InputStream {
        protected _calculatedHeight: number;
        protected _calculatedWidth: number;
        protected _canvasHeight: number;
        protected _canvasWidth: number;
        protected _config: InputStreamConfig;
        protected _eventNames: Array<string>;
        protected _eventHandlers: Map<string, Array<EventListener>>;
        protected _topLeft: Point;
        constructor();
        abstract readonly realHeight: number;
        abstract readonly realWidth: number;
        height: number;
        width: number;
        topLeft: Point;
        setCanvasSize(width: number, height: number): void;
        readonly canvasHeight: number;
        readonly canvasWidth: number;
        abstract config: InputStreamConfig;
        abstract readonly ended: boolean;
        abstract setAttribute(name: string, value: string): void;
        abstract pause(): void;
        abstract play(): void;
        abstract currentTime: number;
        addEventListener(event: string, listener: EventListener, _options?: boolean): void;
        clearEventHandlers(): void;
        trigger(eventName: string, argArray?: any): void;
        abstract getFrame(): HTMLVideoElement | ImageInfo;
    }
}
declare module "input/frame-grabber" {
    import { InputStream } from "input/input-stream";
    export class FrameGrabber {
        private _inputStream;
        private _streamConfig;
        private _canvas;
        private _context;
        private _data;
        private _canvasHeight;
        private _canvasWidth;
        private _height;
        private _width;
        private _topLeft;
        constructor(inputStream: InputStream, canvas: HTMLCanvasElement);
        /**
         * Fetches a frame from the input stream and puts into the frame buffer.
         * The image data is converted to gray scale and then half-sampled if configured.
         */
        grab(data: Uint8Array): boolean;
        private _adjustCanvasSize;
        private _grayAndHalfSampleFromCanvasData;
        private _computeGray;
    }
}
declare module "input/image-stream" {
    import { ImageInfo } from "input/image-loader";
    import { InputStream } from "input/input-stream";
    import { InputStreamConfig } from "input/input-stream-config";
    export class ImageStream extends InputStream {
        private _baseUrl;
        private _ended;
        private _frameIndex;
        private _height;
        private _images;
        private _loaded;
        private _offset;
        private _paused;
        private _size;
        private _width;
        constructor();
        readonly realHeight: number;
        readonly realWidth: number;
        config: InputStreamConfig;
        readonly ended: boolean;
        setAttribute(): void;
        pause(): void;
        play(): void;
        currentTime: number;
        getFrame(): HTMLVideoElement | ImageInfo;
        private _loadImages;
    }
}
declare module "input/video-stream" {
    import { ImageInfo } from "input/image-loader";
    import { InputStream } from "input/input-stream";
    import { InputStreamConfig } from "input/input-stream-config";
    export class VideoStream extends InputStream {
        private _video;
        constructor(video: HTMLVideoElement);
        readonly realHeight: number;
        readonly realWidth: number;
        config: InputStreamConfig;
        readonly ended: boolean;
        setAttribute(name: string, value: string): void;
        pause(): void;
        play(): void;
        currentTime: number;
        addEventListener(event: string, listener: EventListener, options?: boolean): void;
        clearEventHandlers(): void;
        trigger(eventName: string, argArray?: any): void;
        getFrame(): HTMLVideoElement | ImageInfo;
        private _initSize;
    }
    export class LiveStream extends VideoStream {
        constructor(video: HTMLVideoElement);
        readonly ended: boolean;
    }
}
declare module "input/live-stream" {
    import { VideoStream } from "input/video-stream";
    export class LiveStream extends VideoStream {
        constructor(video: HTMLVideoElement);
        readonly ended: boolean;
    }
}
declare module "input/input-stream-utils" {
    import { Point } from "common/point";
    import { BarcodeLocatorConfig, PatchSizeConfig } from "locator/barcode-locator-config";
    import { InputStream } from "input/input-stream";
    import { AreaConfig } from "input/input-stream-config";
    export interface Dimension {
        unit: '%' | 'px';
        value: number;
    }
    export function calculatePatchSize(patchSize: PatchSizeConfig, { x, y }: Point): Point;
    export function checkImageConstraints(inputStream: InputStream, config: BarcodeLocatorConfig): boolean;
    export function _parseCssDimensionValues(value: string): Dimension;
    export const _dimensionsConverters: {
        bottom: (dimension: Dimension, { height }: {
            height: any;
        }) => any;
        left: (dimension: Dimension, { width }: {
            width: any;
        }) => number;
        right: (dimension: Dimension, { width }: {
            width: any;
        }) => any;
        top: (dimension: Dimension, { height }: {
            height: any;
        }) => number;
    };
    export function computeImageArea(inputWidth: number, inputHeight: number, area: AreaConfig): {
        topLeft: {
            x: number;
            y: number;
        };
        width: number;
        height: number;
    };
}
declare module "common/cluster" {
    import { Moment } from "common/moment";
    /**
     * Creates a cluster for grouping similar orientations of moments
     */
    export class Cluster {
        private _threshold;
        private _moments;
        private _center;
        static clusterize(moments: Array<Moment>, threshold: number): Array<Cluster>;
        constructor(threshold: number, moment: Moment);
        add(point: Moment): void;
        fits(moment: Moment): boolean;
        readonly moments: Moment[];
    }
}
declare module "locator/barcode-locator-utils" {
    import { ImageWrapper } from "common/image-wrapper";
    import { Point } from "common/point";
    /**
     * Invert matrix
     * @param matrix the matrix to invert
     * @returns the inverted matrix
     */
    export function invert(matrix: Float32Array): Float32Array;
    /**
     * Transforms the vector with a matrix
     * @param { x, y } vector to transform
     * @param matrix matrix to transform with
     * @returns the transformed vector
     */
    export function transformWithMatrix({ x, y }: Point, matrix: Float32Array): Point;
    export function otsuThreshold(imageWrapper: ImageWrapper, targetWrapper: ImageWrapper): number;
    /**
     * @param imageWrapper input image to be sampled
     * @param outImageWrapper {ImageWrapper} to be stored in
     */
    export function halfSample(imageWrapper: ImageWrapper, outImageWrapper: ImageWrapper): void;
}
declare module "locator/tracer" {
    import { ImageWrapper } from "common/image-wrapper";
    /**
     * @borrows http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
     */
    type Direction = number;
    export const SearchDirections: Array<Array<Direction>>;
    export interface ContourVertex {
        x: number;
        y: number;
        dir: Direction;
        next: ContourVertex;
        prev: ContourVertex;
    }
    interface Current {
        cx: number;
        cy: number;
        dir: Direction;
    }
    export class Tracer {
        private _imageData;
        private _labelData;
        private _width;
        constructor(imageWrapper: ImageWrapper, labelWrapper: ImageWrapper<Array<number>>);
        trace(current: Current, color: number, label: number, edgeLabel: number): boolean;
        contourTracing(sy: number, sx: number, label: number, color: number, edgeLabel: number): ContourVertex;
    }
}
declare module "locator/rasterizer" {
    /**
     * @borrows http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
     */
    import { ImageWrapper } from "common/image-wrapper";
    import { ContourVertex } from "locator/tracer";
    enum ContourDirection {
        CW = 0,
        CCW = 1,
        Unknown = 2
    }
    interface Contour {
        dir: ContourDirection;
        index: number;
        firstVertex: ContourVertex;
        previousPeer?: Contour;
        nextPeer?: Contour;
        insideContours: Contour;
    }
    export interface RasterResult {
        cc: Contour;
        count: number;
    }
    export class Rasterizer {
        private _width;
        private _height;
        private _tracer;
        private _imageData;
        private _labelData;
        constructor(imageWrapper: ImageWrapper<Uint8Array>, labelWrapper: ImageWrapper<Array<number>>);
        rasterize(depthLabel: number): RasterResult;
        drawContour(canvas: HTMLCanvasElement, firstContour: Contour): void;
    }
}
declare module "locator/barcode-locator" {
    import { ImageWrapper } from "common/image-wrapper";
    import { Point } from "common/point";
    import { BarcodeLocatorConfig } from "locator/barcode-locator-config";
    export class BarcodeLocator {
        private _config;
        private _inputImageWrapper;
        private _currentImageWrapper;
        private _skelImageWrapper;
        private _subImageWrapper;
        private _labelImageWrapper;
        private _binaryImageWrapper;
        private _patchGrid;
        private _patchLabelGrid;
        private _imageToPatchGrid;
        private _patchSize;
        private _binaryContext;
        private _numPatches;
        private _skeletonizer;
        constructor(inputImageWrapper: ImageWrapper, config: BarcodeLocatorConfig);
        locate(): [Point, Point, Point, Point][];
        private _initBuffers;
        private _initCanvas;
        /**
         * Creates a bounding box which encloses all the given patches
         * @returns The minimal bounding box
         */
        private _boxFromPatches;
        /**
         * Creates a binary image of the current image
         */
        private _binarizeImage;
        /**
         * Iterate over the entire image, extract patches
         */
        private _findPatches;
        /**
         * Finds those connected areas which contain at least 6 patches
         * and returns them ordered DESC by the number of contained patches
         * @param maxLabel
         */
        private _findBiggestConnectedAreas;
        /**
         *
         */
        private _findBoxes;
        /**
         * Find similar moments (via cluster)
         * @param moments
         */
        private _similarMoments;
        private _skeletonize;
        /**
         * Extracts and describes those patches which seem to contain a barcode pattern
         * @param moments
         * @param index
         * @param x
         * @param y
         * @returns list of patches
         */
        private _describePatch;
        private _notYetProcessed;
        private _trace;
        /**
         * Finds patches which are connected and share the same orientation
         * @param patchesFound
         */
        private _rasterizeAngularSimilarity;
        private _drawRect;
        private _drawPath;
    }
}
declare module "quagga" {
    import { ResultCollector } from "analytics/result-collector";
    import { EventCallback, EventSubscription } from "common/events";
    import { ImageWrapper } from "common/image-wrapper";
    import { Point } from "common/point";
    import { QuaggaConfig } from "config/config";
    import { QuaggaBarcode } from "decoder/barcode-decoder";
    import { BarcodeReaderDeclaration } from "reader/barcode-reader";
    export interface QuaggaCanvasContainer {
        ctx: {
            image: CanvasRenderingContext2D;
            overlay: CanvasRenderingContext2D;
        };
        dom: {
            image: HTMLCanvasElement;
            overlay: HTMLCanvasElement;
        };
    }
    const _default_1: {
        init(config: QuaggaConfig, cb: () => void, imageWrapper?: ImageWrapper<Uint8Array>): void;
        CameraAccess: {
            request(video: HTMLVideoElement, videoConstraints: MediaTrackConstraints): Promise<void>;
            release(): void;
            enumerateVideoDevices(): Promise<MediaDeviceInfo[]>;
            getActiveStreamLabel(): string;
            getActiveTrack(): MediaStreamTrack;
            pickConstraints(videoConstraints: MediaTrackConstraints): MediaStreamConstraints;
        };
        ImageDebug: {
            drawPath(path: Point[], context: CanvasRenderingContext2D, color: string, lineWidth: number): void;
            drawImage(imageData: Uint8Array, width: number, height: number, context: CanvasRenderingContext2D): boolean;
        };
        ImageWrapper: typeof ImageWrapper;
        ResultCollector: typeof ResultCollector;
        readonly canvas: QuaggaCanvasContainer;
        start(): void;
        stop(): void;
        decodeSingle(config: QuaggaConfig, resultCallback: (_: QuaggaBarcode) => void): void;
        pause(): void;
        onDetected(callback: EventCallback | EventSubscription): void;
        offDetected(callback: EventCallback): void;
        onProcessed(callback: EventCallback | EventSubscription): void;
        offProcessed(callback: EventCallback): void;
        setReaders(readers: BarcodeReaderDeclaration[]): void;
        registerResultCollector(resultCollector: ResultCollector): void;
    };
    export default _default_1;
}
declare module "config/config.dev" {
    import { QuaggaConfig } from "config/config";
    export const config: QuaggaConfig;
}
declare module "config/config.node" {
    import { QuaggaConfig } from "config/config";
    export const config: QuaggaConfig;
}
declare module "input/frame-grabber.node" {
    import { InputStream } from "input/input-stream";
    export class FrameGrabber {
        private _inputStream;
        private _streamConfig;
        private _data;
        private _canvasData;
        private _grayData;
        private _canvasImageArray;
        private _grayImageArray;
        private _targetImageArray;
        private _canvasHeight;
        private _canvasWidth;
        private _videoHeight;
        private _videoWidth;
        private _height;
        private _width;
        private _stepSizeX;
        private _stepSizeY;
        private _topLeft;
        constructor(inputStream: InputStream);
        /**
         * Fetches a frame from the input stream and puts into the frame buffer.
         * The image data is converted to gray scale and then half-sampled if configured.
         */
        grab(data: Uint8Array): boolean;
        private _scaleAndCrop;
        private _computeGray;
    }
}
declare module "input/image-stream.node" {
    import { ImageInfo } from "input/image-loader";
    import { InputStream } from "input/input-stream";
    import { InputStreamConfig } from "input/input-stream-config";
    export class ImageStream extends InputStream {
        private _baseUrl;
        private _ended;
        private _frame;
        private _height;
        private _loaded;
        private _offset;
        private _size;
        private _width;
        constructor();
        readonly realHeight: number;
        readonly realWidth: number;
        config: InputStreamConfig;
        readonly ended: boolean;
        setAttribute(): void;
        pause(): void;
        play(): void;
        currentTime: number;
        getFrame(): HTMLVideoElement | ImageInfo;
        private _loadImages;
    }
}
