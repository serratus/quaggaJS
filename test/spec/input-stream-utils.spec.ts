import sinon from 'sinon';

import { Point } from '../../src/common/point';
import { config, QuaggaConfig } from '../../src/config/config';
import { InputStream } from '../../src/input/input-stream';
import { InputStreamConfig } from '../../src/input/input-stream-config';
import {
    _dimensionsConverters,
    _parseCssDimensionValues,
    calculatePatchSize,
    checkImageConstraints,
    computeImageArea
} from '../../src/input/input-stream-utils';

describe('calculatePatchSize', () => {
    it('should not throw an error in case of valid image size', () => {
        const expected: Point = { x: 32, y: 32 };
        const patchSize = calculatePatchSize('medium', { x: 640, y: 480 });

        expect(patchSize).to.deep.equal(expected);
    });

    it('should thow an error if image size it not valid', () => {
        const expected = { x: 32, y: 32 };
        const patchSize = calculatePatchSize('medium', { x: 640, y: 480 });

        expect(patchSize).to.deep.equal(expected);
    });
});

describe('checkImageConstraints', () => {
    let _config: QuaggaConfig;
    let inputStream: InputStream;
    let imageSize: Point;
    let streamConfig: InputStreamConfig = {};
    const topLeft: Point = { x: 0, y: 0 };
    let heightStub: sinon.SinonStub;
    let widthStub: sinon.SinonStub;
    let topLeftStub: sinon.SinonStub;
    let setCanvasSizeStub: sinon.SinonStub;

    beforeEach(() => {
        imageSize = {
            x: 640,
            y: 480
        };
        _config = { ...config };
        inputStream = {
            height: imageSize.y,
            width: imageSize.x,
            topLeft,
            setCanvasSize: () => { },
            config: streamConfig
        } as unknown as InputStream;
        heightStub = sinon.stub(inputStream, 'height').get(() => imageSize.y).set(height => imageSize.y = height);
        widthStub = sinon.stub(inputStream, 'width').get(() => imageSize.x).set(width => imageSize.x = width);
        topLeftStub = sinon.stub(inputStream, 'topLeft').get(() => topLeft).set(({ x, y }) => { topLeft.x = x; topLeft.y = y; });
        setCanvasSizeStub = sinon.stub(inputStream, 'setCanvasSize');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should not adjust the image size if not needed', () => {
        const expected = { x: imageSize.x, y: imageSize.y };

        checkImageConstraints(inputStream, _config.locator);
        expect(inputStream.width).to.equal(expected.x);
        expect(inputStream.height).to.equal(expected.y);
    });

    it('should adjust the image size', () => {
        const expected = { x: imageSize.x, y: imageSize.y };

        _config.locator.halfSample = true;
        imageSize.y += 1;
        checkImageConstraints(inputStream, _config.locator);
        expect(inputStream.width).to.equal(expected.x);
        expect(inputStream.height).to.equal(expected.y);
    });

    it('should adjust the image size', () => {
        const expected = { x: imageSize.x, y: imageSize.y };

        imageSize.y += 1;
        _config.locator.halfSample = false;
        checkImageConstraints(inputStream, _config.locator);
        expect(inputStream.height).to.equal(expected.y);
        expect(inputStream.width).to.equal(expected.x);
    });

    it('should take the defined area into account', () => {
        const expectedSize = {
            x: 420,
            y: 315
        };
        const expectedTopLeft = {
            x: 115,
            y: 52
        };
        const expectedCanvasSize = [640, 480];

        streamConfig.area = {
            top: '11%',
            right: '15%',
            bottom: '20%',
            left: '18%'
        };

        _config.locator.halfSample = false;
        checkImageConstraints(inputStream, _config.locator);
        expect(inputStream.height).to.equal(expectedSize.y);
        expect(inputStream.width).to.equal(expectedSize.x);
        expect(inputStream.topLeft).to.deep.equal(expectedTopLeft);
        expect(setCanvasSizeStub.getCall(0).args).to.deep.equal(expectedCanvasSize);
    });

    it('should return the original size if set to full image', () => {
        const expectedSize = {
            x: 640,
            y: 480
        };
        const expectedTopLeft = {
            x: 0,
            y: 0
        };
        const expectedCanvasSize = [640, 480];

        streamConfig.area = {
            top: '0%',
            right: '0%',
            bottom: '0%',
            left: '0%'
        };

        _config.locator.halfSample = false;
        checkImageConstraints(inputStream, _config.locator);
        expect(inputStream.height).to.equal(expectedSize.y);
        expect(inputStream.width).to.equal(expectedSize.x);
        expect(inputStream.topLeft).to.deep.equal(expectedTopLeft);
        expect(setCanvasSizeStub.getCall(0).args).to.deep.equal(expectedCanvasSize);
    });
});

describe('_parseCssDimensionValues', () => {
    it('should convert a percentual value correctly', () => {
        const expected = {
            value: 10,
            unit: '%'
        };
        const result = _parseCssDimensionValues('10%');

        expect(result).to.deep.equal(expected);
    });

    it('should convert a 0% value correctly', () => {
        const expected = {
            value: 100,
            unit: '%'
        };
        const result = _parseCssDimensionValues('100%');

        expect(result).to.deep.equal(expected);
    });

    it('should convert a 100% value correctly', () => {
        const expected = {
            value: 0,
            unit: '%'
        };
        const result = _parseCssDimensionValues('0%');

        expect(result).to.deep.equal(expected);
    });

    it('should convert a pixel value correctly', () => {
        const expected = {
            value: 26.3,
            unit: 'px'
        };
        const result = _parseCssDimensionValues('26.3px');

        console.log(result);
        expect(result).to.deep.equal(expected);
    });
});

describe('_dimensionsConverters', () => {
    let context;

    beforeEach(() => {
        context = {
            width: 640,
            height: 480
        };
    });

    it('should convert a top-value correclty', () => {
        const expected = 48;
        const result = _dimensionsConverters.top({ value: 10, unit: '%' }, context);

        expect(result).to.equal(expected);
    });

    it('should convert a right-value correclty', () => {
        const expected = 640 - 128;
        const result = _dimensionsConverters.right({ value: 20, unit: '%' }, context);

        expect(result).to.equal(expected);
    });

    it('should convert a bottom-value correclty', () => {
        const expected = 480 - 77;
        const result = _dimensionsConverters.bottom({ value: 16, unit: '%' }, context);

        expect(result).to.equal(expected);
    });

    it('should convert a left-value correclty', () => {
        const expected = 57;
        const result = _dimensionsConverters.left({ value: 9, unit: '%' }, context);

        expect(result).to.equal(expected);
    });
});

describe('computeImageArea', () => {
    it('should calculate an image-area', () => {
        const expected = {
            topLeft: { x: 115, y: 48 },
            width: 429,
            height: 336
        };
        const result = computeImageArea(640, 480, {
            top: '10%',
            right: '15%',
            bottom: '20%',
            left: '18%'
        });

        expect(result).to.deep.equal(expected);
    });

    it('should calculate full image-area', () => {
        const expected = {
            topLeft: { x: 0, y: 0 },
            width: 640,
            height: 480
        };
        const result = computeImageArea(640, 480, {
            top: '0%',
            right: '0%',
            bottom: '0%',
            left: '0%'
        });

        expect(result).to.deep.equal(expected);
    });
});
