import BarcodeReader from './barcode_reader';
import ArrayHelper from '../common/array_helper';

function Code93Reader() {
    BarcodeReader.call(this);
}

const ALPHABETH_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*";

var properties = {
    ALPHABETH_STRING: {value: ALPHABETH_STRING},
    ALPHABET: {value: ALPHABETH_STRING.split('').map(char => char.charCodeAt(0))},
    CHARACTER_ENCODINGS: {value: [
        0x114, 0x148, 0x144, 0x142, 0x128, 0x124, 0x122, 0x150, 0x112, 0x10A,
        0x1A8, 0x1A4, 0x1A2, 0x194, 0x192, 0x18A, 0x168, 0x164, 0x162, 0x134,
        0x11A, 0x158, 0x14C, 0x146, 0x12C, 0x116, 0x1B4, 0x1B2, 0x1AC, 0x1A6,
        0x196, 0x19A, 0x16C, 0x166, 0x136, 0x13A, 0x12E, 0x1D4, 0x1D2, 0x1CA,
        0x16E, 0x176, 0x1AE, 0x126, 0x1DA, 0x1D6, 0x132, 0x15E
    ]},
    ASTERISK: {value: 0x15E},
    FORMAT: {value: "code_93", writeable: false}
};

Code93Reader.prototype = Object.create(BarcodeReader.prototype, properties);
Code93Reader.prototype.constructor = Code93Reader;

Code93Reader.prototype._decode = function() {
    var self = this,
        counters = [0, 0, 0, 0, 0, 0],
        result = [],
        start = self._findStart(),
        decodedChar,
        lastStart,
        pattern,
        nextStart;

    if (!start) {
        return null;
    }
    nextStart = self._nextSet(self._row, start.end);

    do {
        counters = self._toCounters(nextStart, counters);
        pattern = self._toPattern(counters);
        if (pattern < 0) {
            return null;
        }
        decodedChar = self._patternToChar(pattern);
        if (decodedChar < 0){
            return null;
        }
        result.push(decodedChar);
        lastStart = nextStart;
        nextStart += ArrayHelper.sum(counters);
        nextStart = self._nextSet(self._row, nextStart);
    } while (decodedChar !== '*');
    result.pop();

    if (!result.length) {
        return null;
    }

    if (!self._verifyEnd(lastStart, nextStart, counters)) {
        return null;
    }

    if (!self._verifyChecksums(result)) {
        return null;
    }

    result = result.slice(0, result.length - 2);
    if ((result = self._decodeExtended(result)) === null) {
        return null;
    };

    return {
        code: result.join(""),
        start: start.start,
        end: nextStart,
        startInfo: start,
        decodedCodes: result
    };
};

Code93Reader.prototype._verifyEnd = function(lastStart, nextStart) {
    if (lastStart === nextStart || !this._row[nextStart]) {
        return false;
    }
    return true;
};

Code93Reader.prototype._patternToChar = function(pattern) {
    var i,
        self = this;

    for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
        if (self.CHARACTER_ENCODINGS[i] === pattern) {
            return String.fromCharCode(self.ALPHABET[i]);
        }
    }
    return -1;
};

Code93Reader.prototype._toPattern = function(counters) {
    const numCounters = counters.length;
    let pattern = 0;
    let sum = 0;
    for (let i = 0; i < numCounters; i++) {
        sum += counters[i];
    }

    for (let i = 0; i < numCounters; i++) {
        let normalized = Math.round(counters[i] * 9 / sum);
        if (normalized < 1 || normalized > 4) {
            return -1;
        }
        if ((i & 1) === 0) {
            for (let j = 0; j < normalized; j++) {
                pattern = (pattern << 1) | 1;
            }
        } else {
            pattern <<= normalized;
        }
    }

    return pattern;
};

Code93Reader.prototype._findStart = function() {
    var self = this,
        offset = self._nextSet(self._row),
        patternStart = offset,
        counter = [0, 0, 0, 0, 0, 0],
        counterPos = 0,
        isWhite = false,
        i,
        j,
        whiteSpaceMustStart;

    for ( i = offset; i < self._row.length; i++) {
        if (self._row[i] ^ isWhite) {
            counter[counterPos]++;
        } else {
            if (counterPos === counter.length - 1) {
                // find start pattern
                if (self._toPattern(counter) === self.ASTERISK) {
                    whiteSpaceMustStart = Math.floor(Math.max(0, patternStart - ((i - patternStart) / 4)));
                    if (self._matchRange(whiteSpaceMustStart, patternStart, 0)) {
                        return {
                            start: patternStart,
                            end: i
                        };
                    }
                }

                patternStart += counter[0] + counter[1];
                for ( j = 0; j < 4; j++) {
                    counter[j] = counter[j + 2];
                }
                counter[4] = 0;
                counter[5] = 0;
                counterPos--;
            } else {
                counterPos++;
            }
            counter[counterPos] = 1;
            isWhite = !isWhite;
        }
    }
    return null;
};

Code93Reader.prototype._decodeExtended = function(charArray) {
    const length = charArray.length;
    const result = [];
    for (let i = 0; i < length; i++) {
        const char = charArray[i];
        if (char >= 'a' && char <= 'd') {
            if (i > (length - 2)) {
                return null;
            }
            const nextChar = charArray[++i];
            const nextCharCode = nextChar.charCodeAt(0);
            let decodedChar;
            switch (char) {
            case 'a':
                if (nextChar >= 'A' && nextChar <= 'Z') {
                    decodedChar = String.fromCharCode(nextCharCode - 64);
                } else {
                    return null;
                }
                break;
            case 'b':
                if (nextChar >= 'A' && nextChar <= 'E') {
                    decodedChar = String.fromCharCode(nextCharCode - 38);
                } else if (nextChar >= 'F' && nextChar <= 'J') {
                    decodedChar = String.fromCharCode(nextCharCode - 11);
                } else if (nextChar >= 'K' && nextChar <= 'O') {
                    decodedChar = String.fromCharCode(nextCharCode + 16);
                } else if (nextChar >= 'P' && nextChar <= 'S') {
                    decodedChar = String.fromCharCode(nextCharCode + 43);
                } else if (nextChar >= 'T' && nextChar <= 'Z') {
                    decodedChar = String.fromCharCode(127);
                } else {
                    return null;
                }
                break;
            case 'c':
                if (nextChar >= 'A' && nextChar <= 'O') {
                    decodedChar = String.fromCharCode(nextCharCode - 32);
                } else if (nextChar === 'Z') {
                    decodedChar = ':';
                } else {
                    return null;
                }
                break;
            case 'd':
                if (nextChar >= 'A' && nextChar <= 'Z') {
                    decodedChar = String.fromCharCode(nextCharCode + 32);
                } else {
                    return null;
                }
                break;
            }
            result.push(decodedChar);
        } else {
            result.push(char);
        }
    }
    return result;
};

Code93Reader.prototype._verifyChecksums = function(charArray) {
    return this._matchCheckChar(charArray, charArray.length - 2, 20)
        && this._matchCheckChar(charArray, charArray.length - 1, 15);
};

Code93Reader.prototype._matchCheckChar = function(charArray, index, maxWeight) {
    const arrayToCheck = charArray.slice(0, index);
    const length = arrayToCheck.length;
    const weightedSums = arrayToCheck.reduce((sum, char, i) => {
        const weight = (((i * -1) + (length - 1)) % maxWeight) + 1;
        const value = this.ALPHABET.indexOf(char.charCodeAt(0));
        return sum + (weight * value);
    }, 0);

    const checkChar = this.ALPHABET[(weightedSums % 47)];
    return checkChar === charArray[index].charCodeAt(0);
};

export default Code93Reader;
