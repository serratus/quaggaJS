/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    [
        "./ean_reader"
    ],
    function(EANReader) {
        "use strict";

        function EAN8Reader() {
            EANReader.call(this);
        }

        var properties = {
            FORMAT: {value: "ean_8", writeable: false}
        };

        EAN8Reader.prototype = Object.create(EANReader.prototype, properties);
        EAN8Reader.prototype.constructor = EAN8Reader;

        EAN8Reader.prototype._decodePayload = function(code, result, decodedCodes) {
            var i,
                self = this;

            for ( i = 0; i < 4; i++) {
                code = self._decodeCode(code.end, self.CODE_G_START);
                if (!code) {
                    return null;
                }
                result.push(code.code);
                decodedCodes.push(code);
            }

            code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
            if (code === null) {
                return null;
            }
            decodedCodes.push(code);

            for ( i = 0; i < 4; i++) {
                code = self._decodeCode(code.end, self.CODE_G_START);
                if (!code) {
                    return null;
                }
                decodedCodes.push(code);
                result.push(code.code);
            }

            return code;
        };

        return (EAN8Reader);
    }
);