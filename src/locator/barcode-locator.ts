import { Box } from '../common/box';
import { Cluster } from '../common/cluster';
import { HSV, hsv2rgb, RGB } from '../common/hsv2rgb';
import { ImageDebug } from '../common/image-debug';
import { ImageWrapper } from '../common/image-wrapper';
import { Moment } from '../common/moment';
import { Point } from '../common/point';
import { calculatePatchSize } from '../input/input-stream-utils';
import { BarcodeLocatorConfig } from './barcode-locator-config';
import { halfSample, invert, otsuThreshold, transformWithMatrix } from './barcode-locator-utils';
import { Rasterizer } from './rasterizer';
import skeletonizer from './skeletonizer';
import { SearchDirections } from './tracer';

interface Patch {
    box: Box;
    index: number;
    moments: Array<Moment>;
    pos: Point;
    rad: number;
    x: number;
    y: number;
}

type Sceletonizer = any;

const MomentSimilarityThreshold = 0.9;

export class BarcodeLocator {
    private _config: BarcodeLocatorConfig;
    private _inputImageWrapper: ImageWrapper;
    private _currentImageWrapper: ImageWrapper;
    private _skelImageWrapper: ImageWrapper;
    private _subImageWrapper: ImageWrapper;
    private _labelImageWrapper: ImageWrapper<Array<number>>;
    private _binaryImageWrapper: ImageWrapper;
    private _patchGrid: ImageWrapper;
    private _patchLabelGrid: ImageWrapper<Int32Array>;
    private _imageToPatchGrid: Array<Patch>;
    private _patchSize: Point;
    private _binaryContext: CanvasRenderingContext2D;
    private _numPatches: Point;
    private _skeletonizer: Sceletonizer;

    constructor(inputImageWrapper: ImageWrapper, config: BarcodeLocatorConfig) {
        this._config = config;
        this._inputImageWrapper = inputImageWrapper;
        this._numPatches = { x: 0, y: 0 };

        this._initBuffers();
        this._initCanvas();
    }

    locate() {
        if (this._config.halfSample) {
            halfSample(this._inputImageWrapper, this._currentImageWrapper);
        }

        this._binarizeImage();
        const patchesFound = this._findPatches();
        // return unless 5% or more patches are found
        if (patchesFound.length < this._numPatches.x * this._numPatches.y * 0.05) {
            return null;
        }

        // rasterize area by comparing angular similarity;
        const maxLabel = this._rasterizeAngularSimilarity(patchesFound);
        if (maxLabel < 1) {
            return null;
        }

        // search for area with the most patches (biggest connected area)
        const topLabels = this._findBiggestConnectedAreas(maxLabel);
        if (topLabels.length === 0) {
            return null;
        }

        const boxes = this._findBoxes(topLabels, maxLabel);
        return boxes;
    }

    private _initBuffers(): void {
        if (this._config.halfSample) {
            this._currentImageWrapper = new ImageWrapper({
                x: this._inputImageWrapper.size.x / 2 | 0,
                y: this._inputImageWrapper.size.y / 2 | 0
            });
        } else {
            this._currentImageWrapper = this._inputImageWrapper;
        }

        this._patchSize = calculatePatchSize(this._config.patchSize, this._currentImageWrapper.size);

        this._numPatches.x = this._currentImageWrapper.size.x / this._patchSize.x | 0;
        this._numPatches.y = this._currentImageWrapper.size.y / this._patchSize.y | 0;

        this._binaryImageWrapper = new ImageWrapper(this._currentImageWrapper.size, undefined, Uint8Array, false);

        this._labelImageWrapper = new ImageWrapper(this._patchSize, undefined, Array, true);

        const skeletonImageData = new ArrayBuffer(64 * 1024);
        this._subImageWrapper = new ImageWrapper(this._patchSize, new Uint8Array(skeletonImageData, 0, this._patchSize.x * this._patchSize.y));
        this._skelImageWrapper = new ImageWrapper(this._patchSize,
            new Uint8Array(skeletonImageData, this._patchSize.x * this._patchSize.y * 3, this._patchSize.x * this._patchSize.y),
            undefined, true);
        this._skeletonizer = skeletonizer(
            (typeof window !== 'undefined') ? window : (typeof self !== 'undefined') ? self : global,
            { size: this._patchSize.x },
            skeletonImageData
        );

        const size = {
            x: (this._currentImageWrapper.size.x / this._subImageWrapper.size.x) | 0,
            y: (this._currentImageWrapper.size.y / this._subImageWrapper.size.y) | 0
        };
        this._patchLabelGrid = new ImageWrapper(size, undefined, Int32Array, true);
        this._patchGrid = new ImageWrapper(size, undefined, undefined, true);
        this._imageToPatchGrid = new Array<Patch>(this._patchLabelGrid.data.length);
    }

    private _initCanvas() {
        if (this._config.useWorker || typeof document === 'undefined') {
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.className = 'binaryBuffer';
        canvas.width = this._binaryImageWrapper.size.x;
        canvas.height = this._binaryImageWrapper.size.y;
        if (process.env.NODE_ENV !== 'production' && this._config.debug && this._config.debug.showCanvas) {
            document.querySelector('#debug').appendChild(canvas);
        }
        this._binaryContext = canvas.getContext('2d');
    }

    /**
     * Creates a bounding box which encloses all the given patches
     * @returns The minimal bounding box
     */
    private _boxFromPatches(patches: Array<Patch>): Box {
        const debug = process.env.NODE_ENV !== 'production' && this._config.debug;
        let averageRad = patches.reduce((sum, { pos, rad }) => {
            if (debug && debug.showPatches) {
                // draw all patches which are to be taken into consideration
                this._drawRect(pos, this._subImageWrapper.size, 'red', 1);
            }

            return sum + rad;
        }, 0) / patches.length;

        averageRad = (averageRad * 180 / Math.PI + 90) % 180 - 90;
        if (averageRad < 0) {
            averageRad += 180;
        }
        averageRad = (180 - averageRad) * Math.PI / 180;

        const cos = Math.cos(averageRad);
        const sin = Math.sin(averageRad);
        const matrix = new Float32Array([cos, sin, -sin, cos]);
        const inverseMatrix = invert(matrix);

        // iterate over patches and rotate by angle
        patches.forEach(({ box }) => {
            for (let j = 0; j < 4; j++) {
                box[j] = transformWithMatrix(box[j], matrix);
            }

            if (debug && debug.boxFromPatches.showTransformed) {
                this._drawPath(box, '#99ff00', 2);
            }
        });

        let minX = this._binaryImageWrapper.size.x;
        let minY = this._binaryImageWrapper.size.y;
        let maxX = -minX;
        let maxY = -minY;

        // find bounding box
        patches.forEach(({ box }) => {
            box.forEach(({ x, y }) => {
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            });
        });

        let box: Box = [{ x: minX, y: minY }, { x: maxX, y: minY }, { x: maxX, y: maxY }, { x: minX, y: maxY }];

        if (debug && debug.boxFromPatches.showTransformedBox) {
            this._drawPath(box, '#ff0000', 2);
        }

        // reverse rotation
        box = box.map(vertex => transformWithMatrix(vertex, inverseMatrix)) as Box;

        if (debug && debug.boxFromPatches.showBB) {
            this._drawPath(box, '#ff0000', 2);
        }

        if (this._config.halfSample) {
            // scale
            box = box.map(({ x, y }) => ({ x: x * 2, y: y *= 2 })) as Box;
        }

        return box;
    }

    /**
     * Creates a binary image of the current image
     */
    private _binarizeImage(): void {
        otsuThreshold(this._currentImageWrapper, this._binaryImageWrapper);
        this._binaryImageWrapper.zeroBorder();

        if (process.env.NODE_ENV !== 'production' && this._config.debug && this._config.debug.showCanvas) {
            this._binaryImageWrapper.show(this._binaryContext, 255);
        }
    }

    /**
     * Iterate over the entire image, extract patches
     */
    private _findPatches(): Array<Patch> {
        const debug = process.env.NODE_ENV !== 'production' && this._config.debug;
        let patchesFound = new Array<Patch>();

        for (let i = 0; i < this._numPatches.x; i++) {
            for (let j = 0; j < this._numPatches.y; j++) {
                const x = this._subImageWrapper.size.x * i;
                const y = this._subImageWrapper.size.y * j;

                // seperate parts
                this._skeletonize(x, y);

                // Rasterize, find individual bars
                this._skelImageWrapper.zeroBorder();
                this._labelImageWrapper.data.fill(0);
                const rasterizer = new Rasterizer(this._skelImageWrapper, this._labelImageWrapper);
                const rasterResult = rasterizer.rasterize(0);

                if (debug && debug.showLabels) {
                    this._labelImageWrapper.overlay(this._binaryContext, 360 / rasterResult.count | 0, x, y);
                }

                // calculate moments from the skeletonized patch
                const moments = this._labelImageWrapper.moments(rasterResult.count);

                // extract eligible patches
                const patch = this._describePatch(moments, j * this._numPatches.x + i, x, y);
                if (patch) {
                    patchesFound.push(patch);

                    if (debug && debug.showFoundPatches) {
                        this._drawRect(patch.pos, this._subImageWrapper.size, '#99ff00', 2);
                    }
                }
            }
        }

        return patchesFound;
    }

    /**
     * Finds those connected areas which contain at least 6 patches
     * and returns them ordered DESC by the number of contained patches
     * @param maxLabel
     */
    private _findBiggestConnectedAreas(maxLabel: number): Array<number> {
        let labelHist = new Array<number>(maxLabel).fill(0);

        this._patchLabelGrid.data.forEach((data: number) => {
            if (data > 0) {
                labelHist[data - 1]++;
            }
        });

        // extract top areas with at least 6 patches present
        const topLabels = labelHist.map((value, index) => ({ value, index }))
            .filter(({ value }) => value >= 5).sort((a, b) => b.value - a.value).map(({ index }) => index + 1);

        return topLabels;
    }

    /**
     *
     */
    private _findBoxes(topLabels: Array<number>, maxLabel: number): Array<Box> {
        const boxes = new Array<Box>();
        const showRemainingPatchLabels = process.env.NODE_ENV !== 'production' &&
            this._config.debug && this._config.debug.showRemainingPatchLabels;

        topLabels.forEach(label => {
            const patches = new Array<Patch>();

            this._patchLabelGrid.data.forEach((data: number, index: number) => {
                if (data === label) {
                    patches.push(this._imageToPatchGrid[index]);
                }
            });

            const box = this._boxFromPatches(patches);

            if (box) {
                boxes.push(box);

                if (showRemainingPatchLabels) {
                    // draw patch-labels if requested
                    const hsv: HSV = [(label / (maxLabel + 1)) * 360, 1, 1];
                    const rgb: RGB = [0, 0, 0];
                    hsv2rgb(hsv, rgb);

                    const color = `rgb(${rgb.join(',')})`;

                    patches.forEach(({ pos }) => this._drawRect(pos, this._subImageWrapper.size, color, 2));
                }
            }
        });

        return boxes;
    }

    /**
     * Find similar moments (via cluster)
     * @param moments
     */
    private _similarMoments(moments: Array<Moment>): Array<Moment> {
        const clusters = Cluster.clusterize(moments, MomentSimilarityThreshold);
        const topCluster = clusters.reduce((top, item) => {
            const count = item.moments.length;
            return count > top.count ? { item, count } : top;
        }, { item: { moments: [] }, count: 0 });
        const result = topCluster.item.moments;

        return result;
    }

    private _skeletonize(x: number, y: number): void {
        this._binaryImageWrapper.subImageAsCopy(this._subImageWrapper, x, y);
        this._skeletonizer.skeletonize();

        // Show skeleton if requested
        if (process.env.NODE_ENV !== 'production' && this._config.debug && this._config.debug.showSkeleton) {
            this._skelImageWrapper.overlay(this._binaryContext, 360, x, y);
        }
    }

    /**
     * Extracts and describes those patches which seem to contain a barcode pattern
     * @param moments
     * @param index
     * @param x
     * @param y
     * @returns list of patches
     */
    private _describePatch(moments: Array<Moment>, index: number, x: number, y: number): Patch {
        if (moments.length > 1) {
            const minComponentWeight = Math.ceil(this._patchSize.x / 3);
            // only collect moments which area covers at least minComponentWeight pixels
            const eligibleMoments = moments.filter(moment => moment.m00 > minComponentWeight);

            // if at least 2 moments are found which have at least minComponentWeights covered
            if (eligibleMoments.length > 1) {
                const matchingMoments = this._similarMoments(eligibleMoments);
                const length = matchingMoments.length | 0;

                // Only two of the moments are allowed not to fit into the equation
                if (length > 1 && (length << 2) >= eligibleMoments.length * 3 && (length << 2) > moments.length) {
                    // determine the similarity of the moments
                    const rad = matchingMoments.reduce((sum: number, moment: Moment) => sum + moment.rad, 0) / length;

                    return {
                        index,
                        pos: { x, y },
                        box: [
                            { x, y },
                            { x: x + this._subImageWrapper.size.x, y },
                            { x: x + this._subImageWrapper.size.x, y: y + this._subImageWrapper.size.y },
                            { x, y: y + this._subImageWrapper.size.y }
                        ],
                        moments: matchingMoments,
                        rad,
                        x: Math.cos(rad),
                        y: Math.sin(rad)
                    };
                }
            }
        }

        return null;
    }

    private _notYetProcessed(): number {
        for (let i = 0; i < this._patchLabelGrid.data.length; i++) {
            if (this._patchLabelGrid.data[i] === 0 && this._patchGrid.data[i] === 1) {
                return i;
            }
        }
        return this._patchLabelGrid.data.length;
    }

    private _trace(currentIndex: number, label: number): void {
        const threshold = 0.95;
        const current: Point = {
            x: currentIndex % this._patchLabelGrid.size.x,
            y: (currentIndex / this._patchLabelGrid.size.x) | 0
        };

        if (currentIndex < this._patchLabelGrid.data.length) {
            const currentPatch = this._imageToPatchGrid[currentIndex];
            // assign label
            this._patchLabelGrid.data[currentIndex] = label;

            SearchDirections.forEach(direction => {
                const y = current.y + direction[0];
                const x = current.x + direction[1];
                const index = y * this._patchLabelGrid.size.x + x;

                // continue if patch empty
                if (this._patchGrid.data[index] === 0) {
                    this._patchLabelGrid.data[index] = Number.MAX_VALUE;
                } else if (this._patchLabelGrid.data[index] === 0) {
                    const patch = this._imageToPatchGrid[index];
                    const similarity = Math.abs(patch.x * currentPatch.x + patch.y * currentPatch.y);
                    if (similarity > threshold) {
                        this._trace(index, label);
                    }
                }
            });
        }
    }

    /**
     * Finds patches which are connected and share the same orientation
     * @param patchesFound
     */
    private _rasterizeAngularSimilarity(patchesFound: Array<Patch>): number {
        let label = 0;
        const hsv: HSV = [0, 1, 1];
        const rgb: RGB = [0, 0, 0];

        // prepare for finding the right patches
        this._patchGrid.data.fill(0);
        this._patchLabelGrid.data.fill(0);
        this._imageToPatchGrid.fill(null);

        patchesFound.forEach(patch => {
            this._imageToPatchGrid[patch.index] = patch;
            this._patchGrid.data[patch.index] = 1;
        });

        // rasterize the patches found to determine area
        this._patchGrid.zeroBorder();

        let currentIndex = 0;
        while ((currentIndex = this._notYetProcessed()) < this._patchLabelGrid.data.length) {
            label++;
            this._trace(currentIndex, label);
        }

        // draw patch-labels if requested
        if (process.env.NODE_ENV !== 'production' && this._config.debug && this._config.debug.showPatchLabels) {
            for (let j = 0; j < this._patchLabelGrid.data.length; j++) {
                if (this._patchLabelGrid.data[j] > 0 && this._patchLabelGrid.data[j] <= label) {
                    const patch = this._imageToPatchGrid[j];
                    hsv[0] = (this._patchLabelGrid.data[j] / (label + 1)) * 360;
                    hsv2rgb(hsv, rgb);
                    this._drawRect(patch.pos, this._subImageWrapper.size, `rgb(${rgb.join(',')})`, 2);
                }
            }
        }

        return label;
    }

    private _drawRect({ x, y }: Point, size: Point, color: string, lineWidth: number): void {
        this._binaryContext.strokeStyle = color;
        this._binaryContext.fillStyle = color;
        this._binaryContext.lineWidth = lineWidth || 1;
        this._binaryContext.strokeRect(x, y, size.x, size.y);
    }

    private _drawPath(path: Array<Point>, color: string, lineWidth: number): void {
        ImageDebug.drawPath(path, this._binaryContext, color, lineWidth);
    }
}
