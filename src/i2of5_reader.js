/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    [
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        "use strict";

        function I2of5Reader(opts) {
            BarcodeReader.call(this, opts);
        }

        var N = 1,
            W = 3,
            properties = {
            MODULO : {value: 10},
            START_PATTERN : {value: [N*2.5, N*2.5, N*2.5, N*2.5]},
            STOP_PATTERN : {value: [N*2, N*2, W*2]},
            CODE_PATTERN : {value: [
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
            SINGLE_CODE_ERROR: {value: 1},
            AVG_CODE_ERROR: {value: 0.38},
            FORMAT: {value: "i2of5", writeable: false}
        };

        I2of5Reader.prototype = Object.create(BarcodeReader.prototype, properties);
        I2of5Reader.prototype.constructor = I2of5Reader;

        I2of5Reader.prototype._findPattern = function(pattern, offset) {
            var counter = [],
                self = this,
                i,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                error,
                j,
                sum,
                normalized,
                isWhite = false,
                epsilon = self.AVG_CODE_ERROR;

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
                        normalized = self._normalize(counter);
                        if (normalized) {
                            error = self._matchPattern(normalized, pattern);

                            if (error < epsilon) {
                                bestMatch.error = error;
                                bestMatch.start = i - sum;
                                bestMatch.end = i;
                                return bestMatch;
                            }
                        }
                        for ( j = 0; j < counter.length - 2; j++) {
                            counter[j] = counter[j + 2];
                        }
                        counter[counter.length - 2] = 0;
                        counter[counter.length - 1] = 0;
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

        I2of5Reader.prototype._findStart = function() {
            var self = this,
                leadingWhitespaceStart,
                offset = self._nextSet(self._row),
                startInfo;

            while(!startInfo) {
                startInfo = self._findPattern(self.START_PATTERN, offset);
                if (!startInfo) {
                    return null;
                }
                leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);
                if (leadingWhitespaceStart >= 0) {
                    if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
                        startInfo.narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / 4);
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

            trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);
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
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                };

            for ( j = 0; j < counter.length; j++) {
                sum += counter[j];
            }
            normalized = self._normalize(counter);
            if (normalized) {
                for (code = 0; code < self.CODE_PATTERN.length; code++) {
                    error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                    if (error < bestMatch.error) {
                        bestMatch.code = code;
                        bestMatch.error = error;
                    }
                }
                if (bestMatch.error < epsilon) {
                    return bestMatch;
                }
            }
            return null;
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
                    counterPair[0][i] = counters[pos];
                    counterPair[1][i] = counters[pos + 1];
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

            endInfo = self._findEnd();
            if (!endInfo) {
                return null;
            }
            console.log(startInfo);
            console.log(endInfo);

            code = {
                code : startInfo.code,
                start : startInfo.start,
                end : startInfo.end
            };
            decodedCodes.push(code);

            counters = self._fillCounters(startInfo.end, endInfo.start, false);
            if (!self._verifyCounterLength(counters)) {
                return null;
            }
            code = self._decodePayload(counters, result, decodedCodes);
            if (!code) {
                return null;
            }

            // Checksum
            if (!self._checksum(result)) {
                return null;
            }

            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                startInfo : startInfo,
                decodedCodes : decodedCodes
            };
        };

        return (I2of5Reader);
    }
);