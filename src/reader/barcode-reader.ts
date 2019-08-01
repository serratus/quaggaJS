export enum BarcodeDirection {
    Forward = 1,
    Reverse = -1
};

export type BarcodeFormat = string;

export type BarcodeReaderType = string;

export type BarcodeReaderDeclaration = BarcodeReaderType | { format: BarcodeReaderType; config: BarcodeReaderConfig; };

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

    static get Exception() {
        return {
            StartNotFoundException: 'Start-Info was not found!',
            CodeNotFoundException: 'Code could not be found!',
            PatternNotFoundException: 'Pattern could not be found!'
        };
    }

    get SINGLE_CODE_ERROR(): number {
        return this._singleCodeError;
    }

    get AVERAGE_CODE_ERROR(): number {
        return this._averageCodeError;
    }

    get FORMAT(): BarcodeFormat {
        return this._format;
    }

    constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>) {
        this._format = 'unknown';
        this._row = [];
        this.config = config || {};
        this.supplements = supplements;
    }

    abstract decode(row?: Array<number>, start?: number): Barcode;

    protected _findPattern(pattern: ReadonlyArray<number>, offset: number, isWhite: 0 | 1, tryHarder: boolean): BarcodeInfo {
        const counter = new Array<number>(pattern.length);
        const bestMatch: BarcodeInfo = {
            error: Number.MAX_VALUE,
            code: -1,
            start: 0,
            end: 0
        };
        const epsilon = this.AVERAGE_CODE_ERROR;
        let counterPos = 0;

        if (!offset) {
            offset = this._nextSet(this._row);
        }

        counter.fill(0);

        for (let i = offset; i < this._row.length; i++) {
            if (this._row[i] ^ isWhite) {
                counter[counterPos]++;
            } else {
                if (counterPos === counter.length - 1) {
                    const error = this._matchPattern(counter, pattern);

                    if (error < epsilon) {
                        bestMatch.error = error;
                        bestMatch.start = i - counter.reduce((sum, value) => sum + value, 0);
                        bestMatch.end = i;
                        return bestMatch;
                    }

                    if (tryHarder) {
                        for (let j = 0; j < counter.length - 2; j++) {
                            counter[j] = counter[j + 2];
                        }
                        counter[counter.length - 2] = 0;
                        counter[counter.length - 1] = 0;
                        counterPos--;
                    } else {
                        return null;
                    }
                } else {
                    counterPos++;
                }
                counter[counterPos] = 1;
                isWhite = isWhite ? 0 : 1;
            }
        }
        return null;
    }

    protected _nextUnset(line: ReadonlyArray<number>, start?: number): number {
        for (let i = start || 0; i < line.length; i++) {
            if (!line[i]) {
                return i;
            }
        }
        return line.length;
    }

    protected _nextSet(line: ReadonlyArray<number>, start?: number): number {
        for (let i = start || 0; i < line.length; i++) {
            if (line[i]) {
                return i;
            }
        }
        return line.length;
    }

    protected _matchRange(start: number, end: number, value: number): boolean {
        for (let i = start < 0 ? 0 : start; i < end; i++) {
            if (this._row[i] !== value) {
                return false;
            }
        }
        return true;
    }

    protected _matchPattern(counter: ReadonlyArray<number>, code: ReadonlyArray<number>, maxSingleError?: number): number {
        let error = 0;
        let sum = 0;
        let modulo = 0;

        maxSingleError = maxSingleError || this.SINGLE_CODE_ERROR || 1;

        for (let i = 0; i < counter.length; i++) {
            sum += counter[i];
            modulo += code[i];
        }

        if (sum < modulo) {
            return Number.MAX_VALUE;
        }

        const barWidth = sum / modulo;
        maxSingleError *= barWidth;

        for (let i = 0; i < counter.length; i++) {
            const count = counter[i];
            const scaled = code[i] * barWidth;
            const singleError = Math.abs(count - scaled) / scaled;

            if (singleError > maxSingleError) {
                return Number.MAX_VALUE;
            }

            error += singleError;
        }

        return error / modulo;
    }

    protected _correctBars(counter: Array<number>, correction: number, indices: Array<number>) {
        let length = indices.length;
        let tmp = 0;

        while (length--) {
            tmp = counter[indices[length]] * (1 - ((1 - correction) / 2));
            if (tmp > 1) {
                counter[indices[length]] = tmp;
            }
        }
    }

    decodePattern(pattern: Array<number>): Barcode {
        this._row = pattern;
        let result = this.decode();

        if (result === null) {
            this._row.reverse();
            result = this.decode();
            if (result) {
                result.direction = BarcodeDirection.Reverse;
                result.start = this._row.length - result.start;
                result.end = this._row.length - result.end;
            }
        } else {
            result.direction = BarcodeDirection.Forward;
        }

        if (result) {
            result.format = this.FORMAT;
        }

        return result;
    }

    _fillCounters(offset: number, end: number, isWhite: 0 | 1): Array<number> {
        const counters = new Array<number>();
        let counterPos = 0;

        counters[counterPos] = 0;

        for (let i = offset; i < end; i++) {
            if (this._row[i] ^ isWhite) {
                counters[counterPos]++;
            } else {
                counterPos++;
                counters[counterPos] = 1;
                isWhite = isWhite ? 0 : 1;
            }
        }

        return counters;
    }

    protected _toCounters(start: number, counters: Uint16Array): Uint16Array {
        const numCounters = counters.length;
        const end = this._row.length;
        let isWhite: 0 | 1 = this._row[start] ? 0 : 1;
        let counterPos = 0;

        counters.fill(0);

        for (let i = start; i < end; i++) {
            if (this._row[i] ^ isWhite) {
                counters[counterPos]++;
            } else {
                counterPos++;
                if (counterPos === numCounters) {
                    break;
                } else {
                    counters[counterPos] = 1;
                    isWhite = isWhite ? 0 : 1;
                }
            }
        }

        return counters;
    }
}
