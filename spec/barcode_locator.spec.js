
define(['barcode_locator', 'config', 'html_utils'],
    function(BarcodeLocator, Config, HtmlUtils){

    describe('checkImageConstraints', function() {
        var config,
            inputStream,
            imageSize;

        beforeEach(function() {
            imageSize = {
                x: 640, y: 480
            };
            config = HtmlUtils.mergeObjects({}, Config);
            inputStream = {
                getWidth: function() {
                    return imageSize.x;
                },
                getHeight: function() {
                    return imageSize.y;
                },
                setWidth: function() {},
                setHeight: function() {}
            };
            sinon.stub(inputStream, "setWidth", function(width) {
                imageSize.x = width;
            });
            sinon.stub(inputStream, "setHeight", function(height) {
                imageSize.y = height;
            });
        });

        afterEach(function() {
            inputStream.setWidth.restore();
            inputStream.setHeight.restore();
        });

        it('should not adjust the image-size if not needed', function() {
            var expected = {x: imageSize.x, y: imageSize.y};
            BarcodeLocator.checkImageConstraints(inputStream, config.locator);
            expect(inputStream.getWidth()).to.be.equal(expected.x);
            expect(inputStream.getHeight()).to.be.equal(expected.y);
        });

        it('should adjust the image-size', function() {
            var expected = {x: imageSize.x, y: imageSize.y};

            config.locator.halfSample = true;
            imageSize.y += 1;
            BarcodeLocator.checkImageConstraints(inputStream, config.locator);
            expect(inputStream.getWidth()).to.be.equal(expected.x);
            expect(inputStream.getHeight()).to.be.equal(expected.y);
        });

        it('should adjust the image-size', function() {
            var expected = {x: imageSize.x, y: imageSize.y};

            imageSize.y += 1;
            config.locator.halfSample = false;
            BarcodeLocator.checkImageConstraints(inputStream, config.locator);
            expect(inputStream.getHeight()).to.be.equal(expected.y);
            expect(inputStream.getWidth()).to.be.equal(expected.x);
        });
    });
});
