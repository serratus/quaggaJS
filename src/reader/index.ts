import { Code128Reader } from './code-128-reader';
import { Code39Reader } from './code-39-reader';
import { Code39VINReader } from './code-39-vin-reader';
import { CodabarReader } from './codabar-reader';
import { EANReader } from './ean-reader';
import { EAN8Reader } from './ean-8-reader';
import { EAN2Reader } from './ean-2-reader';
import { EAN5Reader } from './ean-5-reader';
import { UPCReader } from './upc-reader';
import { UPCEReader } from './upc-e-reader';
import { I2of5Reader } from './i2of5-reader';
import { TwoOfFiveReader } from './2of5-reader';
import { Code93Reader } from './code-93-reader';

export const Readers = {
    code_128_reader: Code128Reader,
    ean_reader: EANReader,
    ean_5_reader: EAN5Reader,
    ean_2_reader: EAN2Reader,
    ean_8_reader: EAN8Reader,
    code_39_reader: Code39Reader,
    code_39_vin_reader: Code39VINReader,
    codabar_reader: CodabarReader,
    upc_reader: UPCReader,
    upc_e_reader: UPCEReader,
    i2of5_reader: I2of5Reader,
    '2of5_reader': TwoOfFiveReader,
    code_93_reader: Code93Reader
};
