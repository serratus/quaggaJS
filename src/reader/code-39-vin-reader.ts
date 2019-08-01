import { Barcode } from './barcode-reader';
import { Code39Reader } from './code-39-reader';

export class Code39VINReader extends Code39Reader {
    constructor() {
        super();

        this._format = 'code_39_vin';
    }

    /**
     * @borrows
     * https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
     */
    decode(): Barcode {
        const result = super.decode();
        if (!result) {
            return null;
        }

        let code = result.code;

        if (!code) {
            return null;
        }

        code = code.replace(/[IOQ]/g, '');

        if (!/[A-Z0-9]{17}/.test(code)) {
            if (process.env.NODE_ENV !== 'production') {
                console.log('Failed AZ09 pattern code:', code);
            }
            return null;
        }

        if (!this._checkChecksum(code)) {
            return null;
        }

        result.code = code;
        return result;
    }

    private _checkChecksum(code: string): boolean {
        // TODO
        return !!code;
    }
}
