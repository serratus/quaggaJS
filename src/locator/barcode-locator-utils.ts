import { ImageWrapper } from '../common/image-wrapper';
import { Point } from '../common/point';

/**
 * Invert matrix
 * @param matrix the matrix to invert
 * @returns the inverted matrix
 */
export function invert(matrix: Float32Array): Float32Array {
    const a0 = matrix[0];
    const a1 = matrix[1];
    const a2 = matrix[2];
    const a3 = matrix[3];
    const determinant = a0 * a3 - a2 * a1;

    if (!determinant) {
        return null;
    }

    return new Float32Array([a3 / determinant, -a1 / determinant, -a2 / determinant, a0 / determinant]);
}

/**
 * Transforms the vector with a matrix
 * @param { x, y } vector to transform
 * @param matrix matrix to transform with
 * @returns the transformed vector
 */
export function transformWithMatrix({ x, y }: Point, matrix: Float32Array): Point {
    return {
        x: matrix[0] * x + matrix[2] * y,
        y: matrix[1] * x + matrix[3] * y
    };
}

function _computeHistogram(imageWrapper: ImageWrapper, bitsPerPixel: number): Int32Array {
    if (!bitsPerPixel) {
        bitsPerPixel = 8;
    }

    const imageData = imageWrapper.data;
    const bitShift = 8 - bitsPerPixel;
    const bucketCount = 1 << bitsPerPixel;
    const histogram = new Int32Array(bucketCount);

    for (let i = imageData.length; i--;) {
        histogram[imageData[i] >> bitShift]++;
    }

    return histogram;
}

function _determineOtsuThreshold(imageWrapper: ImageWrapper, bitsPerPixel?: number): number {
    if (!bitsPerPixel) {
        bitsPerPixel = 8;
    }

    const bitShift = 8 - bitsPerPixel;
    const hist = _computeHistogram(imageWrapper, bitsPerPixel);
    const vet = [0];
    const max = (1 << bitsPerPixel) - 1;

    function px(init: number, end: number): number {
        let sum = 0;

        for (let i = init; i <= end; i++) {
            sum += hist[i];
        }

        return sum;
    }

    function mx(init: number, end: number): number {
        let sum = 0;

        for (let i = init; i <= end; i++) {
            sum += i * hist[i];
        }

        return sum;
    }

    for (let k = 1; k < max; k++) {
        const p1 = px(0, k);
        const p2 = px(k + 1, max);
        const p12 = p1 * p2 || 1;
        const m1 = mx(0, k) * p2;
        const m2 = mx(k + 1, max) * p1;
        const m12 = m1 - m2;
        vet[k] = m12 * m12 / p12;
    }

    // index of max element
    const threshold = vet.reduce((maxIndex, item, index, array) => item > array[maxIndex] ? index : maxIndex, 0);

    return threshold << bitShift;
}

export function otsuThreshold(imageWrapper: ImageWrapper, targetWrapper: ImageWrapper): number {
    const threshold = _determineOtsuThreshold(imageWrapper);
    const targetData = targetWrapper.data;

    imageWrapper.data.forEach((value, index) => {
        targetData[index] = value < threshold ? 1 : 0;
    });

    return threshold;
}

/**
 * @param imageWrapper input image to be sampled
 * @param outImageWrapper {ImageWrapper} to be stored in
 */
export function halfSample(imageWrapper: ImageWrapper, outImageWrapper: ImageWrapper): void {
    const image = imageWrapper.data;
    const width = imageWrapper.size.x;
    const outImage = outImageWrapper.data;
    const endIndex = image.length;
    const outWidth = width >> 1;
    let topRowIndex = 0;
    let bottomRowIndex = width;
    let outImgIndex = 0;

    while (bottomRowIndex < endIndex) {
        for (let i = 0; i < outWidth; i++) {
            outImage[outImgIndex] =
                (image[topRowIndex] + image[topRowIndex + 1] + image[bottomRowIndex] + image[bottomRowIndex + 1]) >> 2;
            outImgIndex++;
            topRowIndex += 2;
            bottomRowIndex += 2;
        }
        topRowIndex += width;
        bottomRowIndex += width;
    }
}
