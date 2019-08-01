import { Barcode, BarcodeReader, BarcodeReaderConfig } from './barcode-reader';
import { EANReader } from './ean-reader';

export class UPCReader extends EANReader {
    constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>) {
        super(config, supplements);

        this._format = 'upc_a';
    }

    decode(): Barcode {
        const result = super.decode();

        if (result && result.code && result.code.length === 13 && result.code.charAt(0) === '0') {
            result.code = result.code.substring(1);
            return result;
        }

        return null;
    }
}