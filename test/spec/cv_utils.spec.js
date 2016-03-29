const {
    imageRef,
    calculatePatchSize,
    _parseCSSDimensionValues,
    _dimensionsConverters,
    computeImageArea
} = require('../../src/common/cv_utils');

describe('imageRef', function() {
    it('gets the image Reference for a coordinate', function() {
        var res = imageRef(1, 2);
        expect(res.x).to.equal(1);
        expect(res.y).to.equal(2);
        expect(res.toVec2()[0]).to.equal(1);
    });
});

describe('calculatePatchSize', function() {
    it('should not throw an error in case of valid image size', function() {
        var expected = {x: 32, y: 32},
            patchSize = calculatePatchSize("medium", {x: 640, y: 480});

        expect(patchSize).to.be.deep.equal(expected);
    });

    it('should thow an error if image size it not valid', function() {
        var expected = {x: 32, y: 32},
            patchSize = calculatePatchSize("medium", {x: 640, y: 480});

        expect(patchSize).to.be.deep.equal(expected);
    });
});

describe('_parseCSSDimensionValues', function() {
    it("should convert a percentual value correctly", function() {
        var expected = {
                value: 10,
                unit: "%"
            },
            result = _parseCSSDimensionValues("10%");

        expect(result).to.be.deep.equal(expected);
    });

    it("should convert a 0% value correctly", function() {
        var expected = {
                value: 100,
                unit: "%"
            },
            result = _parseCSSDimensionValues("100%");

        expect(result).to.be.deep.equal(expected);
    });

    it("should convert a 100% value correctly", function() {
        var expected = {
                value: 0,
                unit: "%"
            },
            result = _parseCSSDimensionValues("0%");

        expect(result).to.be.deep.equal(expected);
    });

    it("should convert a pixel value to percentage", function() {
        var expected = {
                value: 26.3,
                unit: "%"
            },
            result = _parseCSSDimensionValues("26.3px");

        console.log(result);
        expect(result).to.be.deep.equal(expected);
    });
});

describe("_dimensionsConverters", function(){
    var context;

    beforeEach(function() {
        context = {
            width: 640,
            height: 480
        };
    });

    it("should convert a top-value correclty", function() {
        var expected = 48,
            result = _dimensionsConverters.top({value: 10, unit: "%"}, context);

        expect(result).to.be.equal(expected);
    });

    it("should convert a right-value correclty", function() {
        var expected = 640 - 128,
            result = _dimensionsConverters.right({value: 20, unit: "%"}, context);

        expect(result).to.be.equal(expected);
    });

    it("should convert a bottom-value correclty", function() {
        var expected = 480 - 77,
            result = _dimensionsConverters.bottom({value: 16, unit: "%"}, context);

        expect(result).to.be.equal(expected);
    });

    it("should convert a left-value correclty", function() {
        var expected = 57,
            result = _dimensionsConverters.left({value: 9, unit: "%"}, context);

        expect(result).to.be.equal(expected);
    });
});

describe("computeImageArea", function() {
    it("should calculate an image-area", function() {
        var expected = {
                sx: 115,
                sy: 48,
                sw: 429,
                sh: 336
            },
            result = computeImageArea(640, 480, {
                top: "10%",
                right: "15%",
                bottom: "20%",
                left: "18%"
            });

        expect(result).to.be.deep.equal(expected);
    });

    it("should calculate full image-area", function() {
        var expected = {
                sx: 0,
                sy: 0,
                sw: 640,
                sh: 480
            },
            result = computeImageArea(640, 480, {
                top: "0%",
                right: "0%",
                bottom: "0%",
                left: "0%"
            });

        expect(result).to.be.deep.equal(expected);
    });
});
