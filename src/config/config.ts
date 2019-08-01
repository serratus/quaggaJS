import { BarcodeDecoderConfig } from '../decoder/barcode-decoder';
import { BarcodeLocatorConfig } from '../locator/barcode-locator-config';
import { InputStreamConfig } from '../input/input-stream-config';
import { BarcodeReaderDeclaration } from '../reader/barcode-reader';

interface DebugConfig {

}

export interface QuaggaConfig {
    debug?: DebugConfig;
    decoder?: BarcodeDecoderConfig;
    frequency?: number;
    inputStream?: InputStreamConfig;
    locate?: boolean;
    locator?: BarcodeLocatorConfig;
    numOfWorkers?: number;
    src?: string;
}

export const config: QuaggaConfig = {
    inputStream: {
        name: 'Live',
        type: 'LiveStream',
        constraints: {
            width: 640,
            height: 480,
            // aspectRatio: 640/480, // optional
            facingMode: 'environment' // or user
            // deviceId: '38745983457387598375983759834'
        },
        area: {
            top: '0%',
            right: '0%',
            left: '0%',
            bottom: '0%'
        },
        singleChannel: false // true: only the red color-channel is read
    },
    locate: true,
    numOfWorkers: 4,
    decoder: {
        readers: [
            'code_128_reader'
        ]
    },
    locator: {
        halfSample: true,
        patchSize: 'medium' // x-small, small, medium, large, x-large
    }
};
