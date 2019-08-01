/**
 * @borrows http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */

import { ImageWrapper } from '../common/image-wrapper';
import { ContourVertex, Tracer } from './tracer';

enum EdgeLabel {
    Outside = -32767,
    Inside = -32766
};

enum ContourDirection {
    CW = 0,
    CCW = 1,
    Unknown = 2
};

interface Contour {
    dir: ContourDirection;
    index: number;
    firstVertex: ContourVertex;
    previousPeer?: Contour;
    nextPeer?: Contour;
    insideContours: Contour;
}

export interface RasterResult {
    cc: Contour;
    count: number;
}

export class Rasterizer {
    private _width: number;
    private _height: number;
    private _tracer: Tracer;
    private _imageData: Uint8Array;
    private _labelData: Array<number>;

    constructor(imageWrapper: ImageWrapper<Uint8Array>, labelWrapper: ImageWrapper<Array<number>>) {
        this._imageData = imageWrapper.data;
        this._labelData = labelWrapper.data as Array<number>;
        this._width = imageWrapper.size.x;
        this._height = imageWrapper.size.y;
        this._tracer = new Tracer(imageWrapper, labelWrapper);
    }

    rasterize(depthLabel: number): RasterResult {
        const colorMap = new Array<number>();

        for (let i = 0; i < 400; i++) {
            colorMap[i] = 0;
        }

        colorMap[0] = this._imageData[0];

        let cc: Contour = null;
        let sc: Contour;
        let connectedCount = 0;

        for (let cy = 1; cy < this._height - 1; cy++) {
            let labelIndex = 0;
            let bc = colorMap[0];

            for (let cx = 1; cx < this._width - 1; cx++) {
                const pos = cy * this._width + cx;

                if (this._labelData[pos] === 0) {
                    const color = this._imageData[pos];
                    if (color !== bc) {
                        if (labelIndex === 0) {
                            const lc = connectedCount + 1;
                            colorMap[lc] = color;
                            bc = color;
                            const vertex = this._tracer.contourTracing(cy, cx, lc, color, EdgeLabel.Outside);
                            if (vertex !== null) {
                                connectedCount++;
                                labelIndex = lc;
                                const p: Contour = {
                                    dir: ContourDirection.CW,
                                    index: labelIndex,
                                    firstVertex: vertex,
                                    nextPeer: cc,
                                    insideContours: null
                                };
                                if (cc !== null) {
                                    cc.previousPeer = p;
                                }
                                cc = p;
                            }
                        } else {
                            const vertex = this._tracer.contourTracing(cy, cx, EdgeLabel.Inside, color, labelIndex);
                            if (vertex !== null) {
                                const p: Contour = {
                                    dir: depthLabel === 0 ? ContourDirection.CCW : ContourDirection.CW,
                                    firstVertex: vertex,
                                    index: depthLabel,
                                    insideContours: null
                                };
                                sc = cc;
                                while ((sc !== null) && sc.index !== labelIndex) {
                                    sc = sc.nextPeer;
                                }
                                if (sc !== null) {
                                    p.nextPeer = sc.insideContours;
                                    if (sc.insideContours !== null) {
                                        sc.insideContours.previousPeer = p;
                                    }
                                    sc.insideContours = p;
                                }
                            }
                        }
                    } else {
                        this._labelData[pos] = labelIndex;
                    }
                } else if (this._labelData[pos] === EdgeLabel.Inside) {
                    labelIndex = 0;
                    bc = this._imageData[pos];
                } else if (this._labelData[pos] === EdgeLabel.Outside) {
                    labelIndex = 0;
                    bc = colorMap[0];
                } else {
                    labelIndex = this._labelData[pos];
                    bc = colorMap[labelIndex];
                }
            }
        }

        sc = cc;
        while (sc !== null) {
            sc.index = depthLabel;
            sc = sc.nextPeer;
        }

        return {
            cc,
            count: connectedCount
        };
    }

    drawContour(canvas: HTMLCanvasElement, firstContour: Contour): void {
        const context = canvas.getContext('2d');

        context.strokeStyle = 'red';
        context.fillStyle = 'red';
        context.lineWidth = 1;

        let pq = firstContour;
        let iq = pq && pq.insideContours;

        while (pq !== null) {
            let q = iq || pq;

            if (iq !== null) {
                iq = iq.nextPeer;
            } else {
                pq = pq.nextPeer;
                iq = pq && pq.insideContours;
            }

            switch (q.dir) {
                case ContourDirection.CW: {
                    context.strokeStyle = 'red';
                    break;
                }
                case ContourDirection.CCW: {
                    context.strokeStyle = 'blue';
                    break;
                }
                case ContourDirection.Unknown: {
                    context.strokeStyle = 'green';
                    break;
                }
            }

            let p = q.firstVertex;
            context.beginPath();
            context.moveTo(p.x, p.y);

            do {
                p = p.next;
                context.lineTo(p.x, p.y);
            } while (p !== q.firstVertex);

            context.stroke();
        }
    }
}
