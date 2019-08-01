import { Barcode, BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from './barcode-reader';

const N = 1;
const W = 3;
const START_PATTERN = [W, N, W, N, N, N];
const STOP_PATTERN = [W, N, N, N, W];
const CODE_PATTERN = [
    [N, N, W, W, N],
    [W, N, N, N, W],
    [N, W, N, N, W],
    [W, W, N, N, N],
    [N, N, W, N, W],
    [W, N, W, N, N],
    [N, W, W, N, N],
    [N, N, N, W, W],
    [W, N, N, W, N],
    [N, W, N, W, N]
];
const startPatternLength = START_PATTERN.reduce((sum, val) => sum + val, 0);

export class TwoOfFiveReader extends BarcodeReader {
    private _barSpaceRatio: [number, number];

    constructor(config?: BarcodeReaderConfig) {
        super(config);

        this._barSpaceRatio = [1, 1];
        this._format = '2of5';
        this._singleCodeError = 0.78;
        this._averageCodeError = 0.30;
    }

    decode(): Barcode {
        const startInfo = this._findStart();

        if (!startInfo) {
            return null;
        }

        const endInfo = this._findEnd();

        if (!endInfo) {
            return null;
        }

        const counters = this._fillCounters(startInfo.end, endInfo.start, 0);

        if (counters.length % 10 !== 0) {
            return null;
        }

        const result = new Array<number>();
        const decodedCodes = new Array<BarcodeInfo>();

        decodedCodes.push(startInfo);

        const code = this._decodePayload(counters, result, decodedCodes);

        if (!code || result.length < 5) {
            return null;
        }

        decodedCodes.push(endInfo);

        return {
            code: result.join(''),
            start: startInfo.start,
            end: endInfo.end,
            startInfo,
            decodedCodes
        };
    }

    protected _findStart(): BarcodeInfo {
        let offset = this._nextSet(this._row);
        let narrowBarWidth = 1;
        let startInfo: BarcodeInfo;

        while (!startInfo) {
            startInfo = this._findPattern(START_PATTERN, offset, 0, true);

            if (!startInfo) {
                return null;
            }

            narrowBarWidth = (startInfo.end - startInfo.start) / startPatternLength | 0;
            const leadingWhitespaceStart = startInfo.start - narrowBarWidth * 5;

            if (leadingWhitespaceStart >= 0) {
                if (this._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                    return startInfo;
                }
            }

            offset = startInfo.end;
            startInfo = null;
        }

        return null;
    }

    protected _verifyTrailingWhitespace(endInfo: BarcodeInfo): BarcodeInfo {
        const trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;

        if (trailingWhitespaceEnd < this._row.length) {
            if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                return endInfo;
            }
        }

        return null;
    }

    protected _findEnd(): BarcodeInfo {
        this._row.reverse();

        const offset = this._nextSet(this._row);
        const endInfo = this._findPattern(STOP_PATTERN, offset, 0, true);

        this._row.reverse();

        if (endInfo === null) {
            return null;
        }

        // reverse numbers
        const start = endInfo.start;
        endInfo.start = this._row.length - endInfo.end;
        endInfo.end = this._row.length - start;

        return endInfo !== null ? this._verifyTrailingWhitespace(endInfo) : null;
    }

    protected _decodeCode(counter: ReadonlyArray<number>): BarcodeInfo {
        const bestMatch: BarcodeInfo = {
            error: Number.MAX_VALUE,
            code: -1,
            start: 0,
            end: 0
        };

        for (let code = 0; code < CODE_PATTERN.length; code++) {
            const error = this._matchPattern(counter, CODE_PATTERN[code]);
            if (error < bestMatch.error) {
                bestMatch.code = code;
                bestMatch.error = error;
            }
        }

        return bestMatch.error < this.AVERAGE_CODE_ERROR ? bestMatch : null;
    }

    protected _decodePayload(counters: ReadonlyArray<number>, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo {
        const counterLength = counters.length;
        const counter = [0, 0, 0, 0, 0];
        let pos = 0;
        let code: BarcodeInfo;

        while (pos < counterLength) {
            for (let i = 0; i < 5; i++) {
                counter[i] = counters[pos] * this._barSpaceRatio[0];
                pos += 2;
            }

            code = this._decodeCode(counter);

            if (!code) {
                return null;
            }

            result.push(code.code);
            decodedCodes.push(code);
        }

        return code;
    }
}
