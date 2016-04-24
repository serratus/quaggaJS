import BarcodeReader from './barcode_reader';
import {merge} from 'lodash';

function I2of5Reader(opts) {
    opts = merge(getDefaulConfig(), opts);
    BarcodeReader.call(this, opts);
    this.barSpaceRatio = [1, 1];
    if (opts.normalizeBarSpaceWidth) {
        this.SINGLE_CODE_ERROR = 0.38;
        this.AVG_CODE_ERROR = 0.09;
    }
}

function getDefaulConfig() {
    var config = {};

    Object.keys(I2of5Reader.CONFIG_KEYS).forEach(function(key) {
        config[key] = I2of5Reader.CONFIG_KEYS[key].default;
    });
    return config;
}

var N = 1,
    W = 3,
    properties = {
        START_PATTERN: {value: [N, N, N, N]},
        STOP_PATTERN: {value: [N, N, W]},
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
        AVG_CODE_ERROR: {value: 0.38, writable: true},
        MAX_CORRECTION_FACTOR: {value: 5},
        FORMAT: {value: "i2of5"}
    };

I2of5Reader.prototype = Object.create(BarcodeReader.prototype, properties);
I2of5Reader.prototype.constructor = I2of5Reader;

I2of5Reader.prototype._matchPattern = function(counter, code) {
    if (this.config.normalizeBarSpaceWidth) {
        var i,
            counterSum = [0, 0],
            codeSum = [0, 0],
            correction = [0, 0],
            correctionRatio = this.MAX_CORRECTION_FACTOR,
            correctionRatioInverse = 1 / correctionRatio;

        for (i = 0; i < counter.length; i++) {
            counterSum[i % 2] += counter[i];
            codeSum[i % 2] += code[i];
        }
        correction[0] = codeSum[0] / counterSum[0];
        correction[1] = codeSum[1] / counterSum[1];

        correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
        correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
        this.barSpaceRatio = correction;
        for (i = 0; i < counter.length; i++) {
            counter[i] *= this.barSpaceRatio[i % 2];
        }
    }
    return BarcodeReader.prototype._matchPattern.call(this, counter, code);
};

I2of5Reader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder) {
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
        normalized,
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

I2of5Reader.prototype._findStart = function() {
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
        narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / 4);
        leadingWhitespaceStart = startInfo.start - narrowBarWidth * 10;
        if (leadingWhitespaceStart >= 0) {
            if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                return startInfo;
            }
        }
        offset = startInfo.end;
        startInfo = null;
    }
};

I2of5Reader.prototype._verifyTrailingWhitespace = function(endInfo) {
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

I2of5Reader.prototype._findEnd = function() {
    var self = this,
        endInfo,
        tmp;

    self._row.reverse();
    endInfo = self._findPattern(self.STOP_PATTERN);
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

I2of5Reader.prototype._decodePair = function(counterPair) {
    var i,
        code,
        codes = [],
        self = this;

    for (i = 0; i < counterPair.length; i++) {
        code = self._decodeCode(counterPair[i]);
        if (!code) {
            return null;
        }
        codes.push(code);
    }
    return codes;
};

I2of5Reader.prototype._decodeCode = function(counter) {
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

I2of5Reader.prototype._decodePayload = function(counters, result, decodedCodes) {
    var i,
        self = this,
        pos = 0,
        counterLength = counters.length,
        counterPair = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        codes;

    while (pos < counterLength) {
        for (i = 0; i < 5; i++) {
            counterPair[0][i] = counters[pos] * this.barSpaceRatio[0];
            counterPair[1][i] = counters[pos + 1] * this.barSpaceRatio[1];
            pos += 2;
        }
        codes = self._decodePair(counterPair);
        if (!codes) {
            return null;
        }
        for (i = 0; i < codes.length; i++) {
            result.push(codes[i].code + "");
            decodedCodes.push(codes[i]);
        }
    }
    return codes;
};

I2of5Reader.prototype._verifyCounterLength = function(counters) {
    return (counters.length % 10 === 0);
};

I2of5Reader.prototype._decode = function() {
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
    if (result.length % 2 !== 0 ||
            result.length < 6) {
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

I2of5Reader.CONFIG_KEYS = {
    normalizeBarSpaceWidth: {
        'type': 'boolean',
        'default': false,
        'description': 'If true, the reader tries to normalize the' +
        'width-difference between bars and spaces'
    }
};

export default I2of5Reader;
