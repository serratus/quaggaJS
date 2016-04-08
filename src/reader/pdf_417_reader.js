import BarcodeReader from './barcode_reader';
import detect from '../detector/pdf_147_detector';
import ImageDebug from '../common/image_debug';

function Pdf147Reader() {
    BarcodeReader.call(this);
}

const properties = {
    SINGLE_CODE_ERROR: {value: 1},
    AVG_CODE_ERROR: {value: 0.5},
    FORMAT: {value: "pdf147", writeable: false}
};

Pdf147Reader.prototype = Object.create(BarcodeReader.prototype, properties);
Pdf147Reader.prototype.constructor = Pdf147Reader;

Pdf147Reader.prototype.decode = function(inputImageWrapper, box, ctx) {
    console.log("Pdf147Reader...");
    const detectionInfo = detect(inputImageWrapper, box, ctx);
    console.log(detectionInfo);
    if (ENV.development) {
        if (ctx) {
            ImageDebug.drawVertices(detectionInfo, {x: 0, y: 1}, ctx, {color: "red", lineWidth: 1});
        }
    }
    console.log("Pdf147Reader... END")
};

export default Pdf147Reader;
