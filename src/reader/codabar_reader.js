import BarcodeReader from './barcode_reader';

function CodabarReader() {
    BarcodeReader.call(this);
    this._counters = [];
}

var properties = {
    ALPHABETH_STRING: {value: "0123456789-$:/.+ABCD"},
    ALPHABET: {value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68]},
    CHARACTER_ENCODINGS: {value: [0x003, 0x006, 0x009, 0x060, 0x012, 0x042, 0x021, 0x024, 0x030, 0x048, 0x00c, 0x018,
        0x045, 0x051, 0x054, 0x015, 0x01A, 0x029, 0x00B, 0x00E]},
    START_END: {value: [0x01A, 0x029, 0x00B, 0x00E]},
    MIN_ENCODED_CHARS: {value: 4},
    MAX_ACCEPTABLE: {value: 2.0},
    PADDING: {value: 1.5},
    FORMAT: {value: "codabar", writeable: false}
};

CodabarReader.prototype = Object.create(BarcodeReader.prototype, properties);
CodabarReader.prototype.constructor = CodabarReader;

CodabarReader.prototype._decode = function() {
    var self = this,
        result = [],
        start,
        decodedChar,
        pattern,
        nextStart,
        end;

    this._counters = self._fillCounters();
    start = self._findStart();
    if (!start) {
        return null;
    }
    nextStart = start.startCounter;

    do {
        pattern = self._toPattern(nextStart);
        if (pattern < 0) {
            return null;
        }
        decodedChar = self._patternToChar(pattern);
        if (decodedChar < 0){
            return null;
        }
        result.push(decodedChar);
        nextStart += 8;
        if (result.length > 1 && self._isStartEnd(pattern)) {
            break;
        }
    } while (nextStart < self._counters.length);

    // verify end
    if ((result.length - 2) < self.MIN_ENCODED_CHARS || !self._isStartEnd(pattern)) {
        return null;
    }

    // verify end white space
    if (!self._verifyWhitespace(start.startCounter, nextStart - 8)){
        return null;
    }

    if (!self._validateResult(result, start.startCounter)){
        return null;
    }

    nextStart = nextStart > self._counters.length ? self._counters.length : nextStart;
    end = start.start + self._sumCounters(start.startCounter, nextStart - 8);

    return {
        code: result.join(""),
        start: start.start,
        end: end,
        startInfo: start,
        decodedCodes: result
    };
};

CodabarReader.prototype._verifyWhitespace = function(startCounter, endCounter) {
    if ((startCounter - 1 <= 0)
            || this._counters[startCounter - 1] >= (this._calculatePatternLength(startCounter) / 2.0)) {
        if ((endCounter + 8 >= this._counters.length)
                || this._counters[endCounter + 7] >= (this._calculatePatternLength(endCounter) / 2.0)) {
            return true;
        }
    }
    return false;
};

CodabarReader.prototype._calculatePatternLength = function(offset) {
    var i,
        sum = 0;

    for (i = offset; i < offset + 7; i++) {
        sum += this._counters[i];
    }

    return sum;
};

CodabarReader.prototype._thresholdResultPattern = function(result, startCounter){
    var self = this,
        categorization = {
            space: {
                narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE},
                wide: {size: 0, counts: 0, min: 0, max: Number.MAX_VALUE}
            },
            bar: {
                narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE},
                wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE}
            }
        },
        kind,
        cat,
        i,
        j,
        pos = startCounter,
        pattern;

    for (i = 0; i < result.length; i++){
        pattern = self._charToPattern(result[i]);
        for (j = 6; j >= 0; j--) {
            kind = (j & 1) === 2 ? categorization.bar : categorization.space;
            cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
            cat.size += self._counters[pos + j];
            cat.counts++;
            pattern >>= 1;
        }
        pos += 8;
    }

    ["space", "bar"].forEach(function(key) {
        var newkind = categorization[key];
        newkind.wide.min =
            Math.floor((newkind.narrow.size / newkind.narrow.counts + newkind.wide.size / newkind.wide.counts) / 2);
        newkind.narrow.max = Math.ceil(newkind.wide.min);
        newkind.wide.max = Math.ceil((newkind.wide.size * self.MAX_ACCEPTABLE + self.PADDING) / newkind.wide.counts);
    });

    return categorization;
};

CodabarReader.prototype._charToPattern = function(char) {
    var self = this,
        charCode = char.charCodeAt(0),
        i;

    for (i = 0; i < self.ALPHABET.length; i++) {
        if (self.ALPHABET[i] === charCode){
            return self.CHARACTER_ENCODINGS[i];
        }
    }
    return 0x0;
};

CodabarReader.prototype._validateResult = function(result, startCounter) {
    var self = this,
        thresholds = self._thresholdResultPattern(result, startCounter),
        i,
        j,
        kind,
        cat,
        size,
        pos = startCounter,
        pattern;

    for (i = 0; i < result.length; i++) {
        pattern = self._charToPattern(result[i]);
        for (j = 6; j >= 0; j--) {
            kind = (j & 1) === 0 ? thresholds.bar : thresholds.space;
            cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
            size = self._counters[pos + j];
            if (size < cat.min || size > cat.max) {
                return false;
            }
            pattern >>= 1;
        }
        pos += 8;
    }
    return true;
};

CodabarReader.prototype._patternToChar = function(pattern) {
    var i,
        self = this;

    for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
        if (self.CHARACTER_ENCODINGS[i] === pattern) {
            return String.fromCharCode(self.ALPHABET[i]);
        }
    }
    return -1;
};

CodabarReader.prototype._computeAlternatingThreshold = function(offset, end) {
    var i,
        min = Number.MAX_VALUE,
        max = 0,
        counter;

    for (i = offset; i < end; i += 2){
        counter = this._counters[i];
        if (counter > max) {
            max = counter;
        }
        if (counter < min) {
            min = counter;
        }
    }

    return ((min + max) / 2.0) | 0;
};

CodabarReader.prototype._toPattern = function(offset) {
    var numCounters = 7,
        end = offset + numCounters,
        barThreshold,
        spaceThreshold,
        bitmask = 1 << (numCounters - 1),
        pattern = 0,
        i,
        threshold;

    if (end > this._counters.length) {
        return -1;
    }

    barThreshold = this._computeAlternatingThreshold(offset, end);
    spaceThreshold = this._computeAlternatingThreshold(offset + 1, end);

    for (i = 0; i < numCounters; i++){
        threshold = (i & 1) === 0 ? barThreshold : spaceThreshold;
        if (this._counters[offset + i] > threshold) {
            pattern |= bitmask;
        }
        bitmask >>= 1;
    }

    return pattern;
};

CodabarReader.prototype._isStartEnd = function(pattern) {
    var i;

    for (i = 0; i < this.START_END.length; i++) {
        if (this.START_END[i] === pattern) {
            return true;
        }
    }
    return false;
};

CodabarReader.prototype._sumCounters = function(start, end) {
    var i,
        sum = 0;

    for (i = start; i < end; i++) {
        sum += this._counters[i];
    }
    return sum;
};

CodabarReader.prototype._findStart = function() {
    var self = this,
        i,
        pattern,
        start = self._nextUnset(self._row),
        end;

    for (i = 1; i < this._counters.length; i++) {
        pattern = self._toPattern(i);
        if (pattern !== -1 && self._isStartEnd(pattern)) {
            // TODO: Look for whitespace ahead
            start += self._sumCounters(0, i);
            end = start + self._sumCounters(i, i + 8);
            return {
                start: start,
                end: end,
                startCounter: i,
                endCounter: i + 8
            };
        }
    }
};

export default CodabarReader;
