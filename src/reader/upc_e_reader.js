import EANReader from './ean_reader';

function UPCEReader(opts, supplements) {
    EANReader.call(this, opts, supplements);
}

var properties = {
    CODE_FREQUENCY: {value: [
        [ 56, 52, 50, 49, 44, 38, 35, 42, 41, 37 ],
        [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]]},
    STOP_PATTERN: { value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7]},
    FORMAT: {value: "upc_e", writeable: false}
};

UPCEReader.prototype = Object.create(EANReader.prototype, properties);
UPCEReader.prototype.constructor = UPCEReader;

UPCEReader.prototype._decodePayload = function(code, result, decodedCodes) {
    var i,
        self = this,
        codeFrequency = 0x0;

    for ( i = 0; i < 6; i++) {
        code = self._decodeCode(code.end);
        if (!code) {
            return null;
        }
        if (code.code >= self.CODE_G_START) {
            code.code = code.code - self.CODE_G_START;
            codeFrequency |= 1 << (5 - i);
        }
        result.push(code.code);
        decodedCodes.push(code);
    }
    if (!self._determineParity(codeFrequency, result)) {
        return null;
    }

    return code;
};

UPCEReader.prototype._determineParity = function(codeFrequency, result) {
    var i,
        nrSystem;

    for (nrSystem = 0; nrSystem < this.CODE_FREQUENCY.length; nrSystem++){
        for ( i = 0; i < this.CODE_FREQUENCY[nrSystem].length; i++) {
            if (codeFrequency === this.CODE_FREQUENCY[nrSystem][i]) {
                result.unshift(nrSystem);
                result.push(i);
                return true;
            }
        }
    }
    return false;
};

UPCEReader.prototype._convertToUPCA = function(result) {
    var upca = [result[0]],
        lastDigit = result[result.length - 2];

    if (lastDigit <= 2) {
        upca = upca.concat(result.slice(1, 3))
            .concat([lastDigit, 0, 0, 0, 0])
            .concat(result.slice(3, 6));
    } else if (lastDigit === 3) {
        upca = upca.concat(result.slice(1, 4))
            .concat([0, 0, 0, 0, 0])
            .concat(result.slice(4, 6));
    } else if (lastDigit === 4) {
        upca = upca.concat(result.slice(1, 5))
            .concat([0, 0, 0, 0, 0, result[5]]);
    } else {
        upca = upca.concat(result.slice(1, 6))
            .concat([0, 0, 0, 0, lastDigit]);
    }

    upca.push(result[result.length - 1]);
    return upca;
};

UPCEReader.prototype._checksum = function(result) {
    return EANReader.prototype._checksum.call(this, this._convertToUPCA(result));
};

UPCEReader.prototype._findEnd = function(offset, isWhite) {
    isWhite = true;
    return EANReader.prototype._findEnd.call(this, offset, isWhite);
};

UPCEReader.prototype._verifyTrailingWhitespace = function(endInfo) {
    var self = this,
        trailingWhitespaceEnd;

    trailingWhitespaceEnd = endInfo.end + ((endInfo.end - endInfo.start) / 2);
    if (trailingWhitespaceEnd < self._row.length) {
        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
            return endInfo;
        }
    }
};

export default UPCEReader;
