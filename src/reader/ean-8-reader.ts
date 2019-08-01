import { BarcodeInfo, BarcodeReader, BarcodeReaderConfig } from './barcode-reader';
import { EANReader } from './ean-reader';

export class EAN8Reader extends EANReader {
    constructor(config?: BarcodeReaderConfig, supplements?: Array<BarcodeReader>) {
        super(config, supplements);

        this._format = 'ean_8';
    }

    protected _decodePayload(code: BarcodeInfo, result: Array<number>, decodedCodes: Array<BarcodeInfo>): BarcodeInfo {
        for (let i = 0; i < 4; i++) {
            code = this._decodeCode(code.end, this.CODE_G_START);
            if (!code) {
                return null;
            }
            result.push(code.code);
            decodedCodes.push(code);
        }

        code = this._findPattern(this.MIDDLE_PATTERN, code.end, 1, false);

        if (code === null) {
            return null;
        }

        decodedCodes.push(code);

        for (let i = 0; i < 4; i++) {
            code = this._decodeCode(code.end, this.CODE_G_START);

            if (!code) {
                return null;
            }

            decodedCodes.push(code);
            result.push(code.code);
        }

        return code;
    }
}
