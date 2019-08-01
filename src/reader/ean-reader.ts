import { merge } from '../common/merge';
import { Barcode, BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from './barcode-reader';

const EXTENSION_START_PATTERN = [1, 1, 2];
const CODE_PATTERN = [
    [3, 2, 1, 1],
    [2, 2, 2, 1],
    [2, 1, 2, 2],
    [1, 4, 1, 1],
    [1, 1, 3, 2],
    [1, 2, 3, 1],
    [1, 1, 1, 4],
    [1, 3, 1, 2],
    [1, 2, 1, 3],
    [3, 1, 1, 2],
    [1, 1, 2, 3],
    [1, 2, 2, 2],
    [2, 2, 1, 2],
    [1, 1, 4, 1],
    [2, 3, 1, 1],
    [1, 3, 2, 1],
    [4, 1, 1, 1],
    [2, 1, 3, 1],
    [3, 1, 2, 1],
    [2, 1, 1, 3]
];
const CODE_FREQUENCY = [0, 11, 13, 14, 19, 25, 28, 21, 22, 26];

export class EANReader extends BarcodeReader {
    get CODE_L_START(): number {
        return 0;
    }

    get CODE_G_START(): number {
        return 10;
    }

    get START_PATTERN(): Array<number> {
        return [1, 1, 1];
    }

    get STOP_PATTERN(): Array<number> {
        return [1, 1, 1];
    }

    get MIDDLE_PATTERN(): Array<number> {
        return [1, 1, 1, 1, 1];
    }

    constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>) {
        super(merge({
            supplements: [] // Allowed extensions to be decoded (2 and/or 5)
        }, config), supplements);

        this._format = 'ean_13';
        this._singleCodeError = 0.70;
        this._averageCodeError = 0.48;
    }

    protected _decodeCode(start: number, coderange?: number): BarcodeInfo {
        const counter = [0, 0, 0, 0];
        const offset = start;
        const bestMatch: BarcodeInfo = {
            error: Number.MAX_VALUE,
            code: -1,
            start: start,
            end: start
        };
        const epsilon = this.AVERAGE_CODE_ERROR;
        let isWhite: 0 | 1 = this._row[offset] ? 0 : 1;
        let counterPos = 0;

        if (!coderange) {
            coderange = CODE_PATTERN.length;
        }

        for (let i = offset; i < this._row.length; i++) {
            if (this._row[i] ^ isWhite) {
                counter[counterPos]++;
            } else {
                if (counterPos === counter.length - 1) {
                    for (let code = 0; code < coderange; code++) {
                        const error = this._matchPattern(counter, CODE_PATTERN[code]);
                        if (error < bestMatch.error) {
                            bestMatch.code = code;
                            bestMatch.error = error;
                        }
                    }
                    bestMatch.end = i;
                    if (bestMatch.error > epsilon) {
                        return null;
                    }
                    return bestMatch;
                } else {
                    counterPos++;
                }
                counter[counterPos] = 1;
                isWhite = isWhite ? 0 : 1;
            }
        }

        return null;
    }

    protected _findStart(): BarcodeInfo {
        let offset = this._nextSet(this._row);
        let startInfo: BarcodeInfo;

        while (!startInfo) {
            startInfo = this._findPattern(this.START_PATTERN, offset, 0, true);

            if (!startInfo) {
                return null;
            }

            const leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);

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
        const trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);

        if (trailingWhitespaceEnd < this._row.length) {
            if (this._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
                return endInfo;
            }
        }

        return null;
    }

    protected _findEnd(offset: number, isWhite: 0 | 1): BarcodeInfo {
        const endInfo = this._findPattern(this.STOP_PATTERN, offset, isWhite, false);

        return endInfo !== null ? this._verifyTrailingWhitespace(endInfo) : null;
    }

    private _calculateFirstDigit(codeFrequency: number): number | null {
        for (let i = 0; i < CODE_FREQUENCY.length; i++) {
            if (codeFrequency === CODE_FREQUENCY[i]) {
                return i;
            }
        }
        return null;
    }

    protected _decodePayload(code: BarcodeInfo, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo {
        let codeFrequency = 0x0;

        for (let i = 0; i < 6; i++) {
            code = this._decodeCode(code.end);
            if (!code) {
                return null;
            }
            if (code.code >= this.CODE_G_START) {
                code.code -= this.CODE_G_START;
                codeFrequency |= 1 << (5 - i);
            } else {
                codeFrequency |= 0 << (5 - i);
            }
            result.push(code.code);
            decodedCodes.push(code);
        }

        const firstDigit = this._calculateFirstDigit(codeFrequency);

        if (firstDigit === null) {
            return null;
        }

        result.unshift(firstDigit);

        code = this._findPattern(this.MIDDLE_PATTERN, code.end, 1, false);

        if (code === null) {
            return null;
        }

        decodedCodes.push(code);

        for (let i = 0; i < 6; i++) {
            code = this._decodeCode(code.end, this.CODE_G_START);

            if (!code) {
                return null;
            }

            decodedCodes.push(code);
            result.push(code.code);
        }

        return code;
    }

    decode(): Barcode {
        const result = new Array<number>();
        const decodedCodes = new Array<BarcodeInfo>();
        let resultInfo: Barcode = {};
        let startInfo = this._findStart();

        if (!startInfo) {
            return null;
        }

        let code: BarcodeInfo = {
            code: startInfo.code,
            start: startInfo.start,
            end: startInfo.end
        };
        decodedCodes.push(code);

        code = this._decodePayload(code, result, decodedCodes);

        if (!code) {
            return null;
        }

        code = this._findEnd(code.end, 0);

        if (!code) {
            return null;
        }

        decodedCodes.push(code);

        // Checksum
        if (!this._checksum(result)) {
            return null;
        }

        if (this.supplements.length > 0) {
            const supplement = this._decodeExtensions(code.end);
            if (!supplement) {
                return null;
            }

            const lastCode = supplement.decodedCodes[supplement.decodedCodes.length - 1] as BarcodeInfo;
            const endInfo = {
                start: lastCode.start + (((lastCode.end - lastCode.start) / 2) | 0),
                end: lastCode.end
            };

            if (!this._verifyTrailingWhitespace(endInfo)) {
                return null;
            }

            resultInfo = {
                supplement,
                code: result.join('') + supplement.code
            };
        }

        return {
            code: result.join(''),
            start: startInfo.start,
            end: code.end,
            startInfo,
            decodedCodes,
            ...resultInfo
        };
    }

    private _decodeExtensions(offset: number): Barcode {
        const start = this._nextSet(this._row, offset);
        const startInfo = this._findPattern(EXTENSION_START_PATTERN, start, 0, false);

        if (startInfo === null) {
            return null;
        }

        for (let i = 0; i < this.supplements.length; i++) {
            let result = this.supplements[i].decode(this._row, startInfo.end);
            if (result !== null) {
                return {
                    code: result.code,
                    start,
                    startInfo,
                    end: result.end,
                    decodedCodes: result.decodedCodes
                };
            }
        }

        return null;
    }

    protected _checksum(result: Array<number>): boolean {
        let sum = 0;

        for (let i = result.length - 2; i >= 0; i -= 2) {
            sum += result[i];
        }

        sum *= 3;

        for (let i = result.length - 1; i >= 0; i -= 2) {
            sum += result[i];
        }

        return sum % 10 === 0;
    }
}