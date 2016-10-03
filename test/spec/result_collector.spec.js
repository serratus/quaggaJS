import ResultCollector from '../../src/analytics/result_collector';
import ImageDebug from '../../src/common/image_debug';

var canvasMock,
    imageSize,
    config;


describe("resultCollector", () => {
    beforeEach(function() {
        imageSize = {x: 320, y: 240};
        config = {
            capture: true,
            capacity: 20,
            blacklist: [{code: "3574660239843", format: "ean_13"}],
            filter: function() {
                return true;
            }
        };
        canvasMock = {
            getContext: function() {
                return {};
            },
            toDataURL: sinon.spy(),
            width: 0,
            height: 0
        };
        sinon.stub(document, "createElement", function(type) {
            if (type === "canvas") {
                return canvasMock;
            }
        });
    });

    afterEach(function() {
        document.createElement.restore();
    });


    describe('create', function () {
        it("should return a new collector", function() {
            ResultCollector.create(config);
            expect(document.createElement.calledOnce).to.be.equal(true);
            expect(document.createElement.getCall(0).args[0]).to.equal("canvas");
        });
    });

    describe('addResult', function() {
        beforeEach(function() {
            sinon.stub(ImageDebug, "drawImage", function() {});
        });

        afterEach(function() {
            ImageDebug.drawImage.restore();
        });

        it("should not add result if capacity is full", function(){
            config.capacity = 1;
            var collector = ResultCollector.create(config);
            collector.addResult([], imageSize, {});
            collector.addResult([], imageSize, {});
            collector.addResult([], imageSize, {});
            expect(collector.getResults()).to.have.length(1);
        });

        it("should only add results which match constraints", function(){
            var collector = ResultCollector.create(config),
                results;

            collector.addResult([], imageSize, {code: "423423443", format: "ean_13"});
            collector.addResult([], imageSize, {code: "3574660239843", format: "ean_13"});
            collector.addResult([], imageSize, {code: "3574660239843", format: "code_128"});

            results = collector.getResults();
            expect(results).to.have.length(2);

            results.forEach(function(result) {
                expect(result).not.to.deep.equal(config.blacklist[0]);
            });
        });

        it("should add result if no filter is set", function() {
            delete config.filter;
            var collector = ResultCollector.create(config);

            collector.addResult([], imageSize, {code: "423423443", format: "ean_13"});
            expect(collector.getResults()).to.have.length(1);
        });

        it("should not add results if filter returns false", function() {
            config.filter = () => (false);
            var collector = ResultCollector.create(config);

            collector.addResult([], imageSize, {code: "423423443", format: "ean_13"});
            expect(collector.getResults()).to.have.length(0);
        });

        it("should add result if no blacklist is set", function() {
            delete config.blacklist;
            var collector = ResultCollector.create(config);

            collector.addResult([], imageSize, {code: "3574660239843", format: "ean_13"});
            expect(collector.getResults()).to.have.length(1);
        });
    });
})
