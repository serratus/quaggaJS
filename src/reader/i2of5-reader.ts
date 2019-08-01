import { merge } from '../common/merge';
import { Barcode, BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from './barcode-reader';

const N = 1;
const W = 3;
const START_PATTERN = [N, N, N, N];
const STOP_PATTERN = [N, N, W];
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
const MAX_CORRECTION_FACTOR = 5;

export class I2of5Reader extends BarcodeReader {
    private _barSpaceRatio: [number, number];

    constructor(config?: BarcodeReaderConfig) {
        super(merge({
            normalizeBarSpaceWidth: false // Normalize the width difference between bars and spaces
        }, config));

        this._barSpaceRatio = [1, 1];
        this._format = 'i2of5';

        if (this.config.normalizeBarSpaceWidth) {
            this._singleCodeError = 0.38;
            this._averageCodeError = 0.09;
        } else {
            this._singleCodeError = 0.78;
            this._averageCodeError = 0.38;
        }
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

        if (!code || result.length % 2 !== 0 || result.length < 6) {
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

    protected _matchPattern(counter: Array<number>, code: ReadonlyArray<number>): number {
        if (this.config.normalizeBarSpaceWidth) {
            const counterSum: [number, number] = [0, 0];
            const codeSum: [number, number] = [0, 0];
            const correction: [number, number] = [0, 0];
            const correctionRatio = MAX_CORRECTION_FACTOR;
            const correctionRatioInverse = 1 / correctionRatio;

            for (let i = 0; i < counter.length; i++) {
                counterSum[i % 2] += counter[i];
                codeSum[i % 2] += code[i];
            }

            correction[0] = codeSum[0] / counterSum[0];
            correction[1] = codeSum[1] / counterSum[1];

            correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
            correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
            this._barSpaceRatio = correction;

            for (let i = 0; i < counter.length; i++) {
                counter[i] *= this._barSpaceRatio[i % 2];
            }
        }

        return super._matchPattern(counter, code);
    }

    protected _findStart(): BarcodeInfo {
        let offset = this._nextSet(this._row);
        let startInfo: BarcodeInfo;

        while (!startInfo) {
            startInfo = this._findPattern(START_PATTERN, offset, 0, true);
            if (!startInfo) {
                return null;
            }

            const narrowBarWidth = (startInfo.end - startInfo.start) >> 2;
            const leadingWhitespaceStart = startInfo.start - narrowBarWidth * 10;

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

        const endInfo = this._findPattern(STOP_PATTERN, undefined, 0, false);

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

    protected _decodeCode(counter: Array<number>): BarcodeInfo {
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

    protected _decodePayload(counters: ReadonlyArray<number>, result: Array<number>, decodedCodes: Array<BarcodeInfo>): [BarcodeInfo, BarcodeInfo] {
        const counterLength = counters.length;
        const counter0 = [0, 0, 0, 0, 0];
        const counter1 = [0, 0, 0, 0, 0];
        let code0: BarcodeInfo;
        let code1: BarcodeInfo;
        let pos = 0;

        while (pos < counterLength) {
            for (let i = 0; i < 5; i++) {
                counter0[i] = counters[pos] * this._barSpaceRatio[0];
                counter1[i] = counters[pos + 1] * this._barSpaceRatio[1];
                pos += 2;
            }

            code0 = this._decodeCode(counter0);
            if (!code0) {
                return null;
            }

            code1 = this._decodeCode(counter1);
            if (!code1) {
                return null;
            }

            result.push(code0.code, code1.code);
            decodedCodes.push(code0, code1);
        }

        return [code0, code1];
    }
}
