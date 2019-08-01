import { eachSeries } from 'async';

import { QuaggaConfig } from '../../src/config/config';
import Quagga from '../../src/quagga';
import { BarcodeFormat } from '../../src/reader/barcode-reader';

interface Sample {
    format?: BarcodeFormat;
    name?: string;
    result?: string;
}

describe('decodeSingle', () => {
    const baseFolder = 'base/test/fixtures/';
    const defaultConfig: QuaggaConfig = {
        inputStream: {
            size: 640
        },
        locator: {
            patchSize: 'medium',
            halfSample: true
        },
        numOfWorkers: 0,
        locate: true,
        src: null
    };

    function _runTestSet(testSet: Array<Sample>, config: QuaggaConfig) {
        const readers = config.decoder.readers.slice();
        const reader = readers[0];
        let format: string;
        let suffix: string;

        if (typeof reader === 'string') {
            format = reader;
        } else {
            if (reader.config && reader.config.supplements && reader.config.supplements.length) {
                suffix = 'extended';
            }
            format = reader.format;
        }

        const folder = baseFolder + format.split('_').slice(0, -1).concat(suffix ? [suffix] : []).join('_') + '/';

        it(`should decode ${folder} correctly`, done => {
            eachSeries(testSet, (sample: Sample, callback) => {
                config.src = folder + sample.name;
                config.decoder.readers = readers;

                Quagga.decodeSingle(config, result => {
                    console.log(format, suffix, sample.name);
                    expect(result).to.haveOwnProperty('codeResult');
                    expect(result.codeResult.code).to.equal(sample.result);
                    expect(result.codeResult.format).to.equal(sample.format);
                    callback();
                });
            }, done);
        }).timeout(1000);
    }

    describe('EAN', () => {
        const config: QuaggaConfig = { ...defaultConfig, decoder: { readers: ['ean_reader'] } };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '3574660239843' },
            { name: 'image-002.jpg', result: '8032754490297' },
            { name: 'image-003.jpg', result: '4006209700068' },
            { name: 'image-004.jpg', result: '9002233139084' },
            { name: 'image-005.jpg', result: '8004030044005' },
            { name: 'image-006.jpg', result: '4003626011159' },
            { name: 'image-007.jpg', result: '2111220009686' },
            { name: 'image-008.jpg', result: '9000275609022' },
            { name: 'image-009.jpg', result: '9004593978587' },
            { name: 'image-010.jpg', result: '9002244845578' }
        ];

        testSet.forEach(sample => sample.format = 'ean_13');

        _runTestSet(testSet, config);
    });

    describe('EAN-extended', () => {
        const config: QuaggaConfig = {
            inputStream: {
                size: 800,
                singleChannel: false
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers: [{
                    format: 'ean_reader',
                    config: {
                        supplements: [
                            'ean_5_reader', 'ean_2_reader'
                        ]
                    }
                }]
            },
            locate: true,
            src: null
        };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '900437801102701' },
            // { name: 'image-002.jpg', result: '419871600890101' },
            { name: 'image-003.jpg', result: '419871600890101' },
            { name: 'image-004.jpg', result: '978054466825652495' },
            { name: 'image-005.jpg', result: '419664190890712' },
            { name: 'image-006.jpg', result: '419056690690101' },
            { name: 'image-007.jpg', result: '419204531290601' },
            { name: 'image-008.jpg', result: '419871600890101' },
            { name: 'image-009.jpg', result: '978054466825652495' }
            // { name: 'image-010.jpg', result: '900437801102701' }
        ];

        testSet.forEach(sample => sample.format = 'ean_13');

        _runTestSet(testSet, config);
    });

    describe('Code128', () => {
        const config: QuaggaConfig = {
            inputStream: {
                size: 800,
                singleChannel: false
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers: ['code_128_reader']
            },
            locate: true,
            src: null
        };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '0001285112001000040801' },
            { name: 'image-002.jpg', result: 'FANAVF14617104' },
            // { name: 'image-003.jpg', result: '673023' },
            { name: 'image-004.jpg', result: '010210150301625334' },
            { name: 'image-005.jpg', result: '419055603900009001012999' },
            { name: 'image-006.jpg', result: '419055603900009001012999' },
            { name: 'image-007.jpg', result: '420957479499907123456123456781' },
            { name: 'image-008.jpg', result: '1020185021797280784055' },
            { name: 'image-009.jpg', result: '0001285112001000040801' },
            { name: 'image-010.jpg', result: '673023' }
            // { name: 'image-011.gif', result: 'ABC-abc-1234' }
        ];

        testSet.forEach(sample => sample.format = 'code_128');

        _runTestSet(testSet, config);
    });

    describe('Code39', () => {
        const config: QuaggaConfig = { ...defaultConfig, decoder: { readers: ['code_39_reader'] } };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: 'B3% $DAD$' },
            { name: 'image-003.jpg', result: 'CODE39' },
            // { name: 'image-004.jpg', result: 'QUAGGAJS' },
            { name: 'image-005.jpg', result: 'CODE39' },
            { name: 'image-006.jpg', result: '2/4-8/16-32' },
            { name: 'image-007.jpg', result: '2/4-8/16-32' },
            { name: 'image-008.jpg', result: 'CODE39' },
            // { name: 'image-009.jpg', result: '2/4-8/16-32' },
            { name: 'image-010.jpg', result: 'CODE39' }
        ];

        testSet.forEach(sample => sample.format = 'code_39');

        _runTestSet(testSet, config);
    });

    describe('EAN-8', () => {
        const config: QuaggaConfig = { ...defaultConfig, decoder: { readers: ['ean_8_reader'] } };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '42191605' },
            { name: 'image-002.jpg', result: '42191605' },
            { name: 'image-003.jpg', result: '90311208' },
            // { name: 'image-004.jpg', result: '24057257' },
            { name: 'image-005.jpg', result: '90162602' },
            { name: 'image-006.jpg', result: '24036153' },
            { name: 'image-007.jpg', result: '42176817' },
            { name: 'image-008.jpg', result: '42191605' },
            { name: 'image-009.jpg', result: '42242215' },
            { name: 'image-010.jpg', result: '42184799' }
        ];

        testSet.forEach(sample => sample.format = 'ean_8');

        _runTestSet(testSet, config);
    });

    describe('UPC', () => {
        const config: QuaggaConfig = { ...defaultConfig, decoder: { readers: ['upc_reader'] } };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '882428015268' },
            { name: 'image-002.jpg', result: '882428015268' },
            { name: 'image-003.jpg', result: '882428015084' },
            { name: 'image-004.jpg', result: '882428015343' },
            { name: 'image-005.jpg', result: '882428015343' },
            { name: 'image-006.jpg', result: '882428015046' },
            { name: 'image-007.jpg', result: '882428015084' },
            { name: 'image-008.jpg', result: '882428015046' },
            { name: 'image-009.jpg', result: '039047013551' },
            { name: 'image-010.jpg', result: '039047013551' }
        ];

        testSet.forEach(sample => sample.format = 'upc_a');

        _runTestSet(testSet, config);
    });

    describe('UPC-E', () => {
        const config: QuaggaConfig = { ...defaultConfig, decoder: { readers: ['upc_e_reader'] } };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '04965802' },
            { name: 'image-002.jpg', result: '04965802' },
            { name: 'image-003.jpg', result: '03897425' },
            { name: 'image-004.jpg', result: '05096893' },
            { name: 'image-005.jpg', result: '05096893' },
            { name: 'image-006.jpg', result: '05096893' },
            { name: 'image-007.jpg', result: '03897425' },
            { name: 'image-008.jpg', result: '01264904' },
            { name: 'image-009.jpg', result: '01264904' },
            { name: 'image-010.jpg', result: '01264904' }
        ];

        testSet.forEach(sample => sample.format = 'upc_e');

        _runTestSet(testSet, config);
    });

    describe('Codabar', () => {
        const config: QuaggaConfig = { ...defaultConfig, decoder: { readers: ['codabar_reader'] } };
        const testSet: Array<Sample> = [
            // { name: 'image-001.jpg', result: 'A10/53+17-70D' },
            { name: 'image-002.jpg', result: 'B546745735B' },
            { name: 'image-003.jpg', result: 'C$399.95A' },
            { name: 'image-004.jpg', result: 'B546745735B' },
            { name: 'image-005.jpg', result: 'C$399.95A' },
            { name: 'image-006.jpg', result: 'B546745735B' },
            { name: 'image-007.jpg', result: 'C$399.95A' },
            { name: 'image-008.jpg', result: 'A16:9/4:3/3:2D' },
            { name: 'image-009.jpg', result: 'C$399.95A' },
            { name: 'image-010.jpg', result: 'C$399.95A' }
        ];

        testSet.forEach(sample => sample.format = 'codabar');

        _runTestSet(testSet, config);
    });

    describe('I2of5 with localization', () => {
        const config: QuaggaConfig = {
            inputStream: {
                size: 800,
                singleChannel: false
            },
            locator: {
                patchSize: 'small',
                halfSample: false
            },
            numOfWorkers: 0,
            decoder: {
                readers: ['i2of5_reader']
            },
            locate: true,
            src: null
        };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '2167361334' },
            { name: 'image-002.jpg', result: '2167361334' },
            { name: 'image-003.jpg', result: '2167361334' },
            { name: 'image-004.jpg', result: '2167361334' },
            { name: 'image-005.jpg', result: '2167361334' },
            { name: 'image-011.jpg', result: '098492200000001278347055' }
            // { name: 'image-012.jpg', result: '098492200000001278347055' },
            // { name: 'image-013.jpg', result: '098492200000001278347055' }
        ];

        testSet.forEach(sample => sample.format = 'i2of5');

        _runTestSet(testSet, config);
    });

    describe('2of5', () => {
        const config: QuaggaConfig = {
            inputStream: {
                size: 800,
                singleChannel: false
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers: ['2of5_reader']
            },
            locate: true,
            src: null
        };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: '9577149002' },
            { name: 'image-002.jpg', result: '9577149002' },
            { name: 'image-003.jpg', result: '5776158811' },
            { name: 'image-004.jpg', result: '0463381455' },
            { name: 'image-005.jpg', result: '3261594101' },
            { name: 'image-006.jpg', result: '3261594101' },
            { name: 'image-007.jpg', result: '3261594101' },
            { name: 'image-008.jpg', result: '6730705801' },
            { name: 'image-009.jpg', result: '5776158811' },
            { name: 'image-010.jpg', result: '5776158811' },
            { name: 'image-012.jpg', result: '0463381455' },
            { name: 'image-015.jpg', result: '8568166929' },
            // { name: 'image-016.jpg', result: '8568166929' },
            { name: 'image-017.jpg', result: '8568166929' }
        ];

        testSet.forEach(sample => sample.format = '2of5');

        _runTestSet(testSet, config);
    });

    describe('code_93', () => {
        const config: QuaggaConfig = {
            inputStream: {
                size: 800,
                singleChannel: false
            },
            locator: {
                patchSize: 'large',
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers: ['code_93_reader']
            },
            locate: true,
            src: null
        };
        const testSet: Array<Sample> = [
            { name: 'image-001.jpg', result: 'WIWV8ETQZ1' },
            { name: 'image-002.jpg', result: 'EH3C-%GU23RK3' },
            { name: 'image-003.jpg', result: 'O308SIHQOXN5SA/PJ' },
            { name: 'image-004.jpg', result: 'DG7Q$TV8JQ/EN' },
            { name: 'image-005.jpg', result: 'DG7Q$TV8JQ/EN' },
            { name: 'image-006.jpg', result: 'O308SIHQOXN5SA/PJ' },
            { name: 'image-007.jpg', result: 'VOFD1DB5A.1F6QU' },
            { name: 'image-008.jpg', result: 'WIWV8ETQZ1' },
            { name: 'image-009.jpg', result: '4SO64P4X8 U4YUU1T-' },
            { name: 'image-010.jpg', result: '4SO64P4X8 U4YUU1T-' }
        ];

        testSet.forEach(sample => sample.format = 'code_93');

        _runTestSet(testSet, config);
    });
});
