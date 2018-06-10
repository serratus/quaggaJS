const Quagga = require('../../src/quagga').default;
const async = require('async');

describe('decodeSingle', function () {
    var baseFolder = "base/test/fixtures/";

    function generateConfig() {
        return {
            inputStream: {
                size: 640
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers: ["ean_reader"]
            },
            locate: true,
            src: null
        };
    }

    this.timeout(10000);

    function _runTestSet(testSet, config) {
        var readers = config.decoder.readers.slice(),
            format,
            folder,
            suffix;

        if (typeof readers[0] === 'string'){
            format = readers[0];
        } else {
            if (readers[0].config && readers[0].config.supplements && readers[0].config.supplements.length) {
                suffix = "extended";
            }
            format = readers[0].format;
        }

        folder = baseFolder + format.split('_').slice(0, -1).concat(suffix ? [suffix] : []).join('_') + "/";

        it('should decode ' + folder + " correctly", function(done) {
            async.eachSeries(testSet, function (sample, callback) {
                config.src = folder + sample.name;
                config.readers = readers;
                Quagga.decodeSingle(config, function(result) {
                    console.log(sample.name);
                    expect(result.codeResult.code).to.equal(sample.result);
                    expect(result.codeResult.format).to.equal(sample.format);
                    callback();
                });
            }, function() {
                done();
            });
        });
    }

    describe("EAN", function() {
        var config = generateConfig(),
            testSet = [
                {"name": "image-001.jpg", "result": "3574660239843"},
                {"name": "image-002.jpg", "result": "8032754490297"},
                {"name": "image-003.jpg", "result": "4006209700068"},
                /* {"name": "image-004.jpg", "result": "9002233139084"}, */
                /* {"name": "image-005.jpg", "result": "8004030044005"}, */
                {"name": "image-006.jpg", "result": "4003626011159"},
                {"name": "image-007.jpg", "result": "2111220009686"},
                {"name": "image-008.jpg", "result": "9000275609022"},
                {"name": "image-009.jpg", "result": "9004593978587"},
                {"name": "image-010.jpg", "result": "9002244845578"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "ean_13";
        });

        config.decoder.readers = ['ean_reader'];
        _runTestSet(testSet, config);
    });

    describe("EAN-extended", function() {
        var config = {
                inputStream: {
                    size: 800,
                    singleChannel: false
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 0,
                decoder: {
                    readers: [{
                        format: "ean_reader",
                        config: {
                            supplements: [
                                'ean_5_reader', 'ean_2_reader'
                            ]
                        }
                    }]
                },
                locate: true,
                src: null
            },
            testSet = [
                {"name": "image-001.jpg", "result": "900437801102701"},
                {"name": "image-002.jpg", "result": "419871600890101"},
                {"name": "image-003.jpg", "result": "419871600890101"},
                {"name": "image-004.jpg", "result": "978054466825652495"},
                {"name": "image-005.jpg", "result": "419664190890712"},
                {"name": "image-006.jpg", "result": "412056690699101"},
                {"name": "image-007.jpg", "result": "419204531290601"},
                {"name": "image-008.jpg", "result": "419871600890101"},
                {"name": "image-009.jpg", "result": "978054466825652495"},
                {"name": "image-010.jpg", "result": "900437801102701"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "ean_13";
        });
        _runTestSet(testSet, config);
    });

    describe("Code128", function() {
        var config = {
                inputStream: {
                    size: 800,
                    singleChannel: false
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 0,
                decoder: {
                    readers: ["code_128_reader"]
                },
                locate: true,
                src: null
            },
            testSet = [
                {"name": "image-001.jpg", "result": "0001285112001000040801"},
                {"name": "image-002.jpg", "result": "FANAVF14617104"},
                {"name": "image-003.jpg", "result": "673023"},
                {"name": "image-004.jpg", "result": "010210150301625334"},
                {"name": "image-005.jpg", "result": "419055603900009001012999"},
                {"name": "image-006.jpg", "result": "419055603900009001012999"},
                {"name": "image-007.jpg", "result": "420957479499907123456123456781"},
                {"name": "image-008.jpg", "result": "1020185021797280784055"},
                {"name": "image-009.jpg", "result": "0001285112001000040801"},
                {"name": "image-010.jpg", "result": "673023"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "code_128";
        });

        config.decoder.readers = ['code_128_reader'];
        _runTestSet(testSet, config);
    });

    describe("Code39", function() {
        var config = generateConfig(),
            testSet = [
                {"name": "image-001.jpg", "result": "B3% $DAD$"},
                {"name": "image-003.jpg", "result": "CODE39"},
                {"name": "image-004.jpg", "result": "QUAGGAJS"},
                /* {"name": "image-005.jpg", "result": "CODE39"}, */
                {"name": "image-006.jpg", "result": "2/4-8/16-32"},
                {"name": "image-007.jpg", "result": "2/4-8/16-32"},
                {"name": "image-008.jpg", "result": "CODE39"},
                {"name": "image-009.jpg", "result": "2/4-8/16-32"},
                {"name": "image-010.jpg", "result": "CODE39"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "code_39";
        });

        config.decoder.readers = ['code_39_reader'];
        _runTestSet(testSet, config);
    });

    describe("EAN-8", function() {
        var config = generateConfig(),
            testSet = [
                {"name": "image-001.jpg", "result": "42191605"},
                {"name": "image-002.jpg", "result": "42191605"},
                {"name": "image-003.jpg", "result": "90311208"},
                {"name": "image-004.jpg", "result": "24057257"},
                {"name": "image-005.jpg", "result": "90162602"},
                //{"name": "image-006.jpg", "result": "24036153"},
                {"name": "image-007.jpg", "result": "42176817"},
                {"name": "image-008.jpg", "result": "42191605"},
                {"name": "image-009.jpg", "result": "42242215"},
                {"name": "image-010.jpg", "result": "42184799"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "ean_8";
        });

        config.decoder.readers = ['ean_8_reader'];
        _runTestSet(testSet, config);
    });

    describe("UPC", function() {
        var config = generateConfig(),
            testSet = [
                {"name": "image-001.jpg", "result": "882428015268"},
                {"name": "image-002.jpg", "result": "882428015268"},
                {"name": "image-003.jpg", "result": "882428015084"},
                {"name": "image-004.jpg", "result": "882428015343"},
                {"name": "image-005.jpg", "result": "882428015343"},
                /* {"name": "image-006.jpg", "result": "882428015046"}, */
                {"name": "image-007.jpg", "result": "882428015084"},
                {"name": "image-008.jpg", "result": "882428015046"},
                {"name": "image-009.jpg", "result": "039047013551"},
                {"name": "image-010.jpg", "result": "039047013551"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "upc_a";
        });

        config.decoder.readers = ['upc_reader'];
        _runTestSet(testSet, config);
    });

    describe("UPC-E", function() {
        var config = generateConfig(),
            testSet = [
                {"name": "image-001.jpg", "result": "04965802"},
                {"name": "image-002.jpg", "result": "04965802"},
                {"name": "image-003.jpg", "result": "03897425"},
                {"name": "image-004.jpg", "result": "05096893"},
                {"name": "image-005.jpg", "result": "05096893"},
                {"name": "image-006.jpg", "result": "05096893"},
                {"name": "image-007.jpg", "result": "03897425"},
                {"name": "image-008.jpg", "result": "01264904"},
                /*{"name": "image-009.jpg", "result": "01264904"},*/
                {"name": "image-010.jpg", "result": "01264904"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "upc_e";
        });

        config.decoder.readers = ['upc_e_reader'];
        _runTestSet(testSet, config);
    });

    describe("Codabar", function() {
        var config = generateConfig(),
            testSet = [
                //{"name": "image-001.jpg", "result": "A10/53+17-70D"},
                {"name": "image-002.jpg", "result": "B546745735B"},
                {"name": "image-003.jpg", "result": "C$399.95A"},
                {"name": "image-004.jpg", "result": "B546745735B"},
                {"name": "image-005.jpg", "result": "C$399.95A"},
                {"name": "image-006.jpg", "result": "B546745735B"},
                {"name": "image-007.jpg", "result": "C$399.95A"},
                //{"name": "image-008.jpg", "result": "A16:9/4:3/3:2D"},
                {"name": "image-009.jpg", "result": "C$399.95A"},
                {"name": "image-010.jpg", "result": "C$399.95A"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "codabar";
        });

        config.decoder.readers = ['codabar_reader'];
        _runTestSet(testSet, config);
    });

    describe("I2of5 with localization", function() {
        var config = {
                inputStream: {
                    size: 800,
                    singleChannel: false
                },
                locator: {
                    patchSize: "small",
                    halfSample: false
                },
                numOfWorkers: 0,
                decoder: {
                    readers: ["i2of5_reader"]
                },
                locate: true,
                src: null
            },
            testSet = [
                {"name": "image-001.jpg", "result": "2167361334"},
                //{"name": "image-002.jpg", "result": "2167361334"},
                {"name": "image-003.jpg", "result": "2167361334"},
                {"name": "image-004.jpg", "result": "2167361334"},
                {"name": "image-005.jpg", "result": "2167361334"}
            ];
        testSet.forEach(function(sample) {
            sample.format = "i2of5";
        });
        _runTestSet(testSet, config);
    });

    describe("2of5", function() {
        var config = config = {
                inputStream: {
                    size: 800,
                    singleChannel: false
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: 0,
                decoder: {
                    readers: ["2of5_reader"]
                },
                locate: true,
                src: null
            },
            testSet = [
                {"name": "image-001.jpg", "result": "9577149002"},
                {"name": "image-002.jpg", "result": "9577149002"},
                {"name": "image-003.jpg", "result": "5776158811"},
                {"name": "image-004.jpg", "result": "0463381455"},
                {"name": "image-005.jpg", "result": "3261594101"},
                {"name": "image-006.jpg", "result": "3261594101"},
                {"name": "image-007.jpg", "result": "3261594101"},
                {"name": "image-008.jpg", "result": "6730705801"},
                {"name": "image-009.jpg", "result": "5776158811"},
                {"name": "image-010.jpg", "result": "5776158811"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "2of5";
        });

        _runTestSet(testSet, config);
    });

    describe("code_93", function() {
        var config = config = {
                inputStream: {
                    size: 800,
                    singleChannel: false
                },
                locator: {
                    patchSize: "large",
                    halfSample: true
                },
                numOfWorkers: 0,
                decoder: {
                    readers: ["code_93_reader"]
                },
                locate: true,
                src: null
            },
            testSet = [
                {"name": "image-001.jpg", "result": "WIWV8ETQZ1"},
                {"name": "image-002.jpg", "result": "EH3C-%GU23RK3"},
                {"name": "image-003.jpg", "result": "O308SIHQOXN5SA/PJ"},
                {"name": "image-004.jpg", "result": "DG7Q$TV8JQ/EN"},
                {"name": "image-005.jpg", "result": "DG7Q$TV8JQ/EN"},
                {"name": "image-006.jpg", "result": "O308SIHQOXN5SA/PJ"},
                {"name": "image-007.jpg", "result": "VOFD1DB5A.1F6QU"},
                {"name": "image-008.jpg", "result": "WIWV8ETQZ1"},
                {"name": "image-009.jpg", "result": "4SO64P4X8 U4YUU1T-"},
                {"name": "image-010.jpg", "result": "4SO64P4X8 U4YUU1T-"}
            ];

        testSet.forEach(function(sample) {
            sample.format = "code_93";
        });

        _runTestSet(testSet, config);
    });
});
