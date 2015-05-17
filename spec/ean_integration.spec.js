

define(['quagga', 'async'], function(Quagga, async) {
    describe('decodeSingle', function () {
        var config;

        this.timeout(10000);

        beforeEach(function () {
            config = {
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
        });

        var folder = "base/test/fixtures/ean/",
            testSet = [{
                "name": "image-001.jpg",
                "result": "3574660239843"
            },
                {
                    "name": "image-002.jpg",
                    "result": "8032754490297"
                },
                {
                    "name": "image-003.jpg",
                    "result": "4006209700068"
                },
                {
                    "name": "image-004.jpg",
                    "result": "9002233139084"
                },
                {
                    "name": "image-005.jpg",
                    "result": "8004030044005"
                },
                {
                    "name": "image-006.jpg",
                    "result": "4003626011159"
                },
                {
                    "name": "image-007.jpg",
                    "result": "2111220009686"
                },
                {
                    "name": "image-008.jpg",
                    "result": "9000275609022"
                },
                {
                    "name": "image-009.jpg",
                    "result": "9004593978587"
                },
                {
                    "name": "image-010.jpg",
                    "result": "9002244845578"
                }
            ];

        async.each(testSet, function (sample, callback) {
            it('should decode ' + sample.name + " correctly", function(done) {
                config.src = folder + sample.name;
                Quagga.decodeSingle(config, function (result) {});
                Quagga.onProcessed(function(result) {
                    expect(result.codeResult.code).to.equal(sample.result);
                    done();
                    callback();
                });
            });
        }, function() {});
    });
});