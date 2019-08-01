import { Point } from '../common/point';
import { BarcodeLocatorConfig, PatchSizeConfig } from '../locator/barcode-locator-config';
import { InputStream } from './input-stream';
import { AreaConfig } from './input-stream-config';

export interface Dimension {
    unit: '%' | 'px',
    value: number;
}

function _computeDivisors(n: number): Array<number> {
    const divisors = new Array<number>();
    const largeDivisors = new Array<number>();

    for (let divisor = 1; divisor * divisor <= n; divisor++) {
        if (n % divisor === 0) {
            divisors.push(divisor);
            if (divisor * divisor !== n) {
                largeDivisors.unshift(n / divisor | 0);
            }
        }
    }

    return divisors.concat(largeDivisors);
}

function _computeCommonDivisors(m: number, n: number): Array<number> {
    if (m === n) {
        return _computeDivisors(m);
    }

    const max = m > n ? m : n;
    const min = m > n ? n : m;
    const divisors = new Array<number>();
    const largeDivisors = new Array<number>();

    for (let divisor = 1; divisor * divisor <= min; divisor++) {
        if (max % divisor === 0 && min % divisor === 0) {
            divisors.push(divisor);
            const largeDivisor = min / divisor | 0;
            if (divisor !== largeDivisor && max % largeDivisor === 0) {
                largeDivisors.unshift();
            }
        }
    }

    return divisors.concat(largeDivisors);
}

export function calculatePatchSize(patchSize: PatchSizeConfig, { x, y }: Point): Point {
    const wideSide = Math.max(x | 0, y | 0) | 0;
    const nrOfPatchesList = [8, 10, 15, 20, 32, 60, 80];
    const nrOfPatchesMap = {
        'x-small': 5,
        small: 4,
        medium: 3,
        large: 2,
        'x-large': 1
    };
    const nrOfPatchesIndex = nrOfPatchesMap[patchSize] || nrOfPatchesMap.medium | 0;
    const nrOfPatches = nrOfPatchesList[nrOfPatchesIndex] | 0;
    const desiredPatchSize = wideSide / nrOfPatches | 0;

    function findPatchSizeForDivisors(divisors: Array<number>): Point {
        let i = 0;
        let found = divisors[divisors.length >> 1] | 0;

        while (i < (divisors.length - 1) && divisors[i] < desiredPatchSize) {
            i++;
        }
        if (i > 0) {
            if (Math.abs(divisors[i] - desiredPatchSize) > Math.abs(divisors[i - 1] - desiredPatchSize)) {
                found = divisors[i - 1] | 0;
            } else {
                found = divisors[i] | 0;
            }
        }
        if (desiredPatchSize / found < nrOfPatchesList[nrOfPatchesIndex + 1] / nrOfPatchesList[nrOfPatchesIndex] &&
            desiredPatchSize / found > nrOfPatchesList[nrOfPatchesIndex - 1] / nrOfPatchesList[nrOfPatchesIndex]) {
            return { x: found, y: found };
        }
        return null;
    }

    const optimalPatchSize = findPatchSizeForDivisors(_computeCommonDivisors(x, y)) ||
        findPatchSizeForDivisors(_computeDivisors(wideSide)) ||
        findPatchSizeForDivisors(_computeDivisors(desiredPatchSize * nrOfPatches));

    return optimalPatchSize;
}

export function checkImageConstraints(inputStream: InputStream, config: BarcodeLocatorConfig) {
    let width = inputStream.width;
    let height = inputStream.height;
    const shift = config.halfSample ? 1 : 0 | 0;
    const inputStreamConfig = inputStream.config;

    // calculate width and height based on area
    if (inputStreamConfig && inputStreamConfig.area) {
        const area = computeImageArea(width, height, inputStreamConfig.area);
        inputStream.topLeft = area.topLeft;
        inputStream.setCanvasSize(width, height);
        width = area.width;
        height = area.height;
    }

    const size = {
        x: width >> shift,
        y: height >> shift
    };

    const patchSize = calculatePatchSize(config.patchSize, size);
    if (process.env.NODE_ENV !== 'production') {
        console.log('Patch-Size:', JSON.stringify(patchSize));
    }

    inputStream.width = (size.x / patchSize.x << shift) * patchSize.x | 0;
    inputStream.height = (size.y / patchSize.y << shift) * patchSize.y | 0;

    if ((inputStream.width % patchSize.x) === 0 && (inputStream.height % patchSize.y) === 0) {
        return true;
    }

    // eslint-disable-next-line max-len
    throw new Error(`Image dimensions do not comply with the current settings: width (${width}) and height (${height}) must be a multiple of ${patchSize.x}`);
}

export function _parseCssDimensionValues(value: string): Dimension {
    const dimension: Dimension = {
        value: parseFloat(value),
        unit: value.indexOf('%') === value.length - 1 ? '%' : value.indexOf('px') === value.length - 2 ? 'px' : '%'
    };

    return dimension;
}

export const _dimensionsConverters = {
    bottom: (dimension: Dimension, { height }) => dimension.unit === '%' ?
        height - height * dimension.value / 100 | 0 : dimension.unit === 'px' ? height - dimension.value : height,
    left: (dimension: Dimension, { width }) => dimension.unit === '%' ?
        width * dimension.value / 100 | 0 : dimension.unit === 'px' ? dimension.value : 0,
    right: (dimension: Dimension, { width }) => dimension.unit === '%' ?
        width - width * dimension.value / 100 | 0 : dimension.unit === 'px' ? width - dimension.value : width,
    top: (dimension: Dimension, { height }): number => dimension.unit === '%' ?
        height * dimension.value / 100 | 0 : dimension.unit === 'px' ? dimension.value : 0
};

export function computeImageArea(inputWidth: number, inputHeight: number, area: AreaConfig) {
    const context = { width: inputWidth, height: inputHeight };
    const parsedArea: {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    } = Object.keys(area).reduce((result, key) => {
        const value = area[key];
        const parsed = _parseCssDimensionValues(value);
        const calculated = _dimensionsConverters[key](parsed, context);

        result[key] = calculated;
        return result;
    }, {});

    return {
        topLeft: { x: parsedArea.left, y: parsedArea.top },
        width: parsedArea.right - parsedArea.left,
        height: parsedArea.bottom - parsedArea.top
    };
}
