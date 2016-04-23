import EANReader from './ean_reader';

function UPCReader(opts, supplements) {
    EANReader.call(this, opts, supplements);
}

var properties = {
    FORMAT: {value: "upc_a", writeable: false}
};

UPCReader.prototype = Object.create(EANReader.prototype, properties);
UPCReader.prototype.constructor = UPCReader;

UPCReader.prototype._decode = function() {
    var result = EANReader.prototype._decode.call(this);

    if (result && result.code && result.code.length === 13 && result.code.charAt(0) === "0") {
        result.code = result.code.substring(1);
        return result;
    }
    return null;
};

export default UPCReader;
