import EANReader from './ean_reader';

function EAN2Reader() {
    EANReader.call(this);
}

var properties = {
    FORMAT: {value: "ean_2", writeable: false}
};

EAN2Reader.prototype = Object.create(EANReader.prototype, properties);
EAN2Reader.prototype.constructor = EAN2Reader;

EAN2Reader.prototype.decode = function(row, start) {
    this._row = row;
    var counters = [0, 0, 0, 0],
        codeFrequency = 0,
        i = 0,
        offset = start,
        end = this._row.length,
        code,
        result = [],
        decodedCodes = [];

    for (i = 0; i < 2 && offset < end; i++) {
        code = this._decodeCode(offset);
        if (!code) {
            return null;
        }
        decodedCodes.push(code);
        result.push(code.code % 10);
        if (code.code >= this.CODE_G_START) {
            codeFrequency |= 1 << (1 - i);
        }
        if (i != 1) {
            offset = this._nextSet(this._row, code.end);
            offset = this._nextUnset(this._row, offset);
        }
    }

    if (result.length != 2 || (parseInt(result.join("")) % 4)  !== codeFrequency) {
        return null;
    }
    return {
        code: result.join(""),
        decodedCodes,
        end: code.end
    };
};

export default EAN2Reader;
