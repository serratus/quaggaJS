/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
     [
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        "use strict";
        
        function Code128Reader() {
            BarcodeReader.call(this);
        }
        
        var properties = {
            CODE_SHIFT : {value: 98},
            CODE_C : {value: 99},
            CODE_B : {value: 100},
            CODE_A : {value: 101},
            START_CODE_A : {value: 103},
            START_CODE_B : {value: 104},
            START_CODE_C : {value: 105},
            STOP_CODE : {value: 106},
            MODULO : {value: 11},
            CODE_PATTERN : {value: [
                [2, 1, 2, 2, 2, 2],
                [2, 2, 2, 1, 2, 2],
                [2, 2, 2, 2, 2, 1],
                [1, 2, 1, 2, 2, 3],
                [1, 2, 1, 3, 2, 2],
                [1, 3, 1, 2, 2, 2],
                [1, 2, 2, 2, 1, 3],
                [1, 2, 2, 3, 1, 2],
                [1, 3, 2, 2, 1, 2],
                [2, 2, 1, 2, 1, 3],
                [2, 2, 1, 3, 1, 2],
                [2, 3, 1, 2, 1, 2],
                [1, 1, 2, 2, 3, 2],
                [1, 2, 2, 1, 3, 2],
                [1, 2, 2, 2, 3, 1],
                [1, 1, 3, 2, 2, 2],
                [1, 2, 3, 1, 2, 2],
                [1, 2, 3, 2, 2, 1],
                [2, 2, 3, 2, 1, 1],
                [2, 2, 1, 1, 3, 2],
                [2, 2, 1, 2, 3, 1],
                [2, 1, 3, 2, 1, 2],
                [2, 2, 3, 1, 1, 2],
                [3, 1, 2, 1, 3, 1],
                [3, 1, 1, 2, 2, 2],
                [3, 2, 1, 1, 2, 2],
                [3, 2, 1, 2, 2, 1],
                [3, 1, 2, 2, 1, 2],
                [3, 2, 2, 1, 1, 2],
                [3, 2, 2, 2, 1, 1],
                [2, 1, 2, 1, 2, 3],
                [2, 1, 2, 3, 2, 1],
                [2, 3, 2, 1, 2, 1],
                [1, 1, 1, 3, 2, 3],
                [1, 3, 1, 1, 2, 3],
                [1, 3, 1, 3, 2, 1],
                [1, 1, 2, 3, 1, 3],
                [1, 3, 2, 1, 1, 3],
                [1, 3, 2, 3, 1, 1],
                [2, 1, 1, 3, 1, 3],
                [2, 3, 1, 1, 1, 3],
                [2, 3, 1, 3, 1, 1],
                [1, 1, 2, 1, 3, 3],
                [1, 1, 2, 3, 3, 1],
                [1, 3, 2, 1, 3, 1],
                [1, 1, 3, 1, 2, 3],
                [1, 1, 3, 3, 2, 1],
                [1, 3, 3, 1, 2, 1],
                [3, 1, 3, 1, 2, 1],
                [2, 1, 1, 3, 3, 1],
                [2, 3, 1, 1, 3, 1],
                [2, 1, 3, 1, 1, 3],
                [2, 1, 3, 3, 1, 1],
                [2, 1, 3, 1, 3, 1],
                [3, 1, 1, 1, 2, 3],
                [3, 1, 1, 3, 2, 1],
                [3, 3, 1, 1, 2, 1],
                [3, 1, 2, 1, 1, 3],
                [3, 1, 2, 3, 1, 1],
                [3, 3, 2, 1, 1, 1],
                [3, 1, 4, 1, 1, 1],
                [2, 2, 1, 4, 1, 1],
                [4, 3, 1, 1, 1, 1],
                [1, 1, 1, 2, 2, 4],
                [1, 1, 1, 4, 2, 2],
                [1, 2, 1, 1, 2, 4],
                [1, 2, 1, 4, 2, 1],
                [1, 4, 1, 1, 2, 2],
                [1, 4, 1, 2, 2, 1],
                [1, 1, 2, 2, 1, 4],
                [1, 1, 2, 4, 1, 2],
                [1, 2, 2, 1, 1, 4],
                [1, 2, 2, 4, 1, 1],
                [1, 4, 2, 1, 1, 2],
                [1, 4, 2, 2, 1, 1],
                [2, 4, 1, 2, 1, 1],
                [2, 2, 1, 1, 1, 4],
                [4, 1, 3, 1, 1, 1],
                [2, 4, 1, 1, 1, 2],
                [1, 3, 4, 1, 1, 1],
                [1, 1, 1, 2, 4, 2],
                [1, 2, 1, 1, 4, 2],
                [1, 2, 1, 2, 4, 1],
                [1, 1, 4, 2, 1, 2],
                [1, 2, 4, 1, 1, 2],
                [1, 2, 4, 2, 1, 1],
                [4, 1, 1, 2, 1, 2],
                [4, 2, 1, 1, 1, 2],
                [4, 2, 1, 2, 1, 1],
                [2, 1, 2, 1, 4, 1],
                [2, 1, 4, 1, 2, 1],
                [4, 1, 2, 1, 2, 1],
                [1, 1, 1, 1, 4, 3],
                [1, 1, 1, 3, 4, 1],
                [1, 3, 1, 1, 4, 1],
                [1, 1, 4, 1, 1, 3],
                [1, 1, 4, 3, 1, 1],
                [4, 1, 1, 1, 1, 3],
                [4, 1, 1, 3, 1, 1],
                [1, 1, 3, 1, 4, 1],
                [1, 1, 4, 1, 3, 1],
                [3, 1, 1, 1, 4, 1],
                [4, 1, 1, 1, 3, 1],
                [2, 1, 1, 4, 1, 2],
                [2, 1, 1, 2, 1, 4],
                [2, 1, 1, 2, 3, 2],
                [2, 3, 3, 1, 1, 1, 2]
            ]},
            SINGLE_CODE_ERROR: {value: 1},
            AVG_CODE_ERROR: {value: 0.5},
            FORMAT: {value: "code_128", writeable: false}
        };
        
        Code128Reader.prototype = Object.create(BarcodeReader.prototype, properties);
        Code128Reader.prototype.constructor = Code128Reader;
        
        Code128Reader.prototype._decodeCode = function(start) {
            var counter = [0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = start,
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : start,
                    end : start
                },
                code,
                error,
                normalized;

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        normalized = self._normalize(counter);
                        if (normalized) {
                            for (code = 0; code < self.CODE_PATTERN.length; code++) {
                                error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                                if (error < bestMatch.error) {
                                    bestMatch.code = code;
                                    bestMatch.error = error;
                                }
                            }
                            bestMatch.end = i;
                            return bestMatch;
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

        Code128Reader.prototype._findStart = function() {
            var counter = [0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = false,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                code,
                error,
                j,
                sum,
                normalized;
                
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
                            for (code = self.START_CODE_A; code <= self.START_CODE_C; code++) {
                                error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                                if (error < bestMatch.error) {
                                    bestMatch.code = code;
                                    bestMatch.error = error;
                                }
                            }
                            if (bestMatch.error < self.AVG_CODE_ERROR) {
                                bestMatch.start = i - sum;
                                bestMatch.end = i;
                                return bestMatch;
                            }
                        }

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

        Code128Reader.prototype._decode = function() {
            var self = this,
                startInfo = self._findStart(),
                code = null,
                done = false,
                result = [],
                multiplier = 0,
                checksum = 0,
                codeset,
                rawResult = [],
                decodedCodes = [],
                shiftNext = false,
                unshift,
                lastCharacterWasPrintable;

            if (startInfo === null) {
                return null;
            }
            code = {
                code : startInfo.code,
                start : startInfo.start,
                end : startInfo.end
            };
            decodedCodes.push(code);
            checksum = code.code;
            switch(code.code) {
            case self.START_CODE_A:
                codeset = self.CODE_A;
                break;
            case self.START_CODE_B:
                codeset = self.CODE_B;
                break;
            case self.START_CODE_C:
                codeset = self.CODE_C;
                break;
            default:
                return null;
            }

            while (!done) {
                unshift = shiftNext;
                shiftNext = false;
                code = self._decodeCode(code.end);
                if (code !== null) {
                    if (code.code !== self.STOP_CODE) {
                        rawResult.push(code.code);
                        multiplier++;
                        checksum += multiplier * code.code;
                    }
                    decodedCodes.push(code);

                    switch(codeset) {
                    case self.CODE_A:
                        if (code.code < 64) {
                            result.push(String.fromCharCode(32 + code.code));
                        } else if (code.code < 96) {
                            result.push(String.fromCharCode(code.code - 64));
                        } else {
                            switch (code.code) {
                            case self.CODE_SHIFT:
                                shiftNext = true;
                                codeset = self.CODE_B;
                                break;
                            case self.CODE_B:
                                codeset = self.CODE_B;
                                break;
                            case self.CODE_C:
                                codeset = self.CODE_C;
                                break;
                            case self.STOP_CODE:
                                done = true;
                                break;
                            }
                        }
                        break;
                    case self.CODE_B:
                        if (code.code < 96) {
                            result.push(String.fromCharCode(32 + code.code));
                        } else {
                            if (code.code != self.STOP_CODE) {
                                lastCharacterWasPrintable = false;
                            }
                            switch (code.code) {
                            case self.CODE_SHIFT:
                                shiftNext = true;
                                codeset = self.CODE_A;
                                break;
                            case self.CODE_A:
                                codeset = self.CODE_A;
                                break;
                            case self.CODE_C:
                                codeset = self.CODE_C;
                                break;
                            case self.STOP_CODE:
                                done = true;
                                break;
                            }
                        }
                        break;
                    case self.CODE_C:
                        if (code.code < 100) {
                            result.push(code.code < 10 ? "0" + code.code : code.code);
                        }
                        switch (code.code) {
                        case self.CODE_A:
                            codeset = self.CODE_A;
                            break;
                        case self.CODE_B:
                            codeset = self.CODE_B;
                            break;
                        case self.STOP_CODE:
                            done = true;
                            break;
                        }
                        break;
                    }
                } else {
                    done = true;
                }
                if (unshift) {
                    codeset = codeset == self.CODE_A ? self.CODE_B : self.CODE_A;
                }
            }

            if (code === null) {
                return null;
            }

            // find end bar
            code.end = self._nextUnset(self._row, code.end);
            if(!self._verifyTrailingWhitespace(code)){
                return null;
            }

            // checksum
            // Does not work correctly yet!!! startcode - endcode?
            checksum -= multiplier * rawResult[rawResult.length - 1];
            if (checksum % 103 != rawResult[rawResult.length - 1]) {
                return null;
            }

            if (!result.length) {
                return null;
            }

            // remove last code from result (checksum)
            result.splice(result.length - 1, 1);



            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                codeset : codeset,
                startInfo : startInfo,
                decodedCodes : decodedCodes,
                endInfo : code
            };
        };


        BarcodeReader.prototype._verifyTrailingWhitespace = function(endInfo) {
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
        
        return (Code128Reader);
    }
);