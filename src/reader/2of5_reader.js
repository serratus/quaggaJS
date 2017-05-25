import BarcodeReader from './barcode_reader';

function TwoOfFiveReader(opts) {
    BarcodeReader.call(this, opts);
    this.barSpaceRatio = [1, 1];
}

var N = 1,
    W = 3,
    properties = {
        START_PATTERN: {value: [W, N, W, N, N, N]},
        STOP_PATTERN: {value: [W, N, N, N, W]},
        CODE_PATTERN: {value: [
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
        ]},
        SINGLE_CODE_ERROR: {value: 0.78, writable: true},
        AVG_CODE_ERROR: {value: 0.30, writable: true},
        FORMAT: {value: "2of5"}
    };

const startPatternLength = properties.START_PATTERN.value.reduce((sum, val) => sum + val, 0);

TwoOfFiveReader.prototype = Object.create(BarcodeReader.prototype, properties);
TwoOfFiveReader.prototype.constructor = TwoOfFiveReader;

TwoOfFiveReader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder) {
    var counter = [],
        self = this,
        i,
        counterPos = 0,
        bestMatch = {
            error: Number.MAX_VALUE,
            code: -1,
            start: 0,
            end: 0
        },
        error,
        j,
        sum,
        epsilon = self.AVG_CODE_ERROR;

    isWhite = isWhite || false;
    tryHarder = tryHarder || false;

    if (!offset) {
        offset = self._nextSet(self._row);
    }

    for ( i = 0; i < pattern.length; i++) {
        counter[i] = 0;
    }

    for ( i = offset; i < self._row.length; i++) {
        if (self._row[i] ^ isWhite) {
            counter[counterPos]++;
        } else {
            if (counterPos === counter.length - 1) {
                sum = 0;
                for ( j = 0; j < counter.length; j++) {
                    sum += counter[j];
                }
                error = self._matchPattern(counter, pattern);
                if (error < epsilon) {
                    bestMatch.error = error;
                    bestMatch.start = i - sum;
                    bestMatch.end = i;
                    return bestMatch;
                }
                if (tryHarder) {
                    for (j = 0; j < counter.length - 2; j++) {
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
            isWhite = !isWhite;
        }
    }
    return null;
};

TwoOfFiveReader.prototype._findStart = function() {
    var self = this,
        leadingWhitespaceStart,
        offset = self._nextSet(self._row),
        startInfo,
        narrowBarWidth = 1;

    while (!startInfo) {
        startInfo = self._findPattern(self.START_PATTERN, offset, false, true);
        if (!startInfo) {
            return null;
        }
        narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / startPatternLength);
        leadingWhitespaceStart = startInfo.start - narrowBarWidth * 5;
        if (leadingWhitespaceStart >= 0) {
            if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                return startInfo;
            }
        }
        offset = startInfo.end;
        startInfo = null;
    }
};

TwoOfFiveReader.prototype._verifyTrailingWhitespace = function(endInfo) {
    var self = this,
        trailingWhitespaceEnd;

    trailingWhitespaceEnd = endInfo.end + ((endInfo.end - endInfo.start) / 2);
    if (trailingWhitespaceEnd < self._row.length) {
        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
            return endInfo;
        }
    }
    return null;
};

TwoOfFiveReader.prototype._findEnd = function() {
    var self = this,
        endInfo,
        tmp,
        offset;

    self._row.reverse();
    offset = self._nextSet(self._row);
    endInfo = self._findPattern(self.STOP_PATTERN, offset, false, true);
    self._row.reverse();

    if (endInfo === null) {
        return null;
    }

    // reverse numbers
    tmp = endInfo.start;
    endInfo.start = self._row.length - endInfo.end;
    endInfo.end = self._row.length - tmp;

    return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
};

TwoOfFiveReader.prototype._decodeCode = function(counter) {
    var j,
        self = this,
        sum = 0,
        normalized,
        error,
        epsilon = self.AVG_CODE_ERROR,
        code,
        bestMatch = {
            error: Number.MAX_VALUE,
            code: -1,
            start: 0,
            end: 0
        };

    for ( j = 0; j < counter.length; j++) {
        sum += counter[j];
    }
    for (code = 0; code < self.CODE_PATTERN.length; code++) {
        error = self._matchPattern(counter, self.CODE_PATTERN[code]);
        if (error < bestMatch.error) {
            bestMatch.code = code;
            bestMatch.error = error;
        }
    }
    if (bestMatch.error < epsilon) {
        return bestMatch;
    }
};

TwoOfFiveReader.prototype._decodePayload = function(counters, result, decodedCodes) {
    var i,
        self = this,
        pos = 0,
        counterLength = counters.length,
        counter = [0, 0, 0, 0, 0],
        code;

    while (pos < counterLength) {
        for (i = 0; i < 5; i++) {
            counter[i] = counters[pos] * this.barSpaceRatio[0];
            pos += 2;
        }
        code = self._decodeCode(counter);
        if (!code) {
            return null;
        }
        result.push(code.code + "");
        decodedCodes.push(code);
    }
    return code;
};

TwoOfFiveReader.prototype._verifyCounterLength = function(counters) {
    return (counters.length % 10 === 0);
};

TwoOfFiveReader.prototype._decode = function() {
    var startInfo,
        endInfo,
        self = this,
        code,
        result = [],
        decodedCodes = [],
        counters;

    startInfo = self._findStart();
    if (!startInfo) {
        return null;
    }
    decodedCodes.push(startInfo);

    endInfo = self._findEnd();
    if (!endInfo) {
        return null;
    }

    counters = self._fillCounters(startInfo.end, endInfo.start, false);
    if (!self._verifyCounterLength(counters)) {
        return null;
    }
    code = self._decodePayload(counters, result, decodedCodes);
    if (!code) {
        return null;
    }
    if (result.length < 5) {
        return null;
    }

    decodedCodes.push(endInfo);
    return {
        code: result.join(""),
        start: startInfo.start,
        end: endInfo.end,
        startInfo: startInfo,
        decodedCodes: decodedCodes
    };
};

export default TwoOfFiveReader;
