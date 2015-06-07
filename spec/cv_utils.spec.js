
define(['cv_utils'], function(CVUtils){
    describe('imageRef', function() {
        it('gets the image Reference for a coordinate', function() {
            var res = CVUtils.imageRef(1, 2);
            expect(res.x).to.equal(1);
            expect(res.y).to.equal(2);
            expect(res.toVec2()[0]).to.equal(1);
        });
    });

    describe('calculatePatchSize', function() {
        it('should not throw an error in case of valid image size', function() {
            var expected = {x: 32, y: 32},
                patchSize = CVUtils.calculatePatchSize("medium", {x: 640, y: 480});

            expect(patchSize).to.be.deep.equal(expected);
        });

        it('should thow an error if image size it not valid', function() {
            var expected = {x: 32, y: 32},
                patchSize = CVUtils.calculatePatchSize("medium", {x: 640, y: 480});

            expect(patchSize).to.be.deep.equal(expected);
        });
    });
});
