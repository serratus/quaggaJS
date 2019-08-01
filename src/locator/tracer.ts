import { ImageWrapper } from "../common/image-wrapper";

/**
 * @borrows http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */

type Direction = number;

export const SearchDirections: Array<Array<Direction>> = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

export interface ContourVertex {
    x: number,
    y: number,
    dir: Direction,
    next: ContourVertex,
    prev: ContourVertex
}

interface Current {
    cx: number,
    cy: number,
    dir: Direction
}

export class Tracer {
    private _imageData: Uint8Array;
    private _labelData: Array<number>;
    private _width: number;

    constructor(imageWrapper: ImageWrapper, labelWrapper: ImageWrapper<Array<number>>) {
        this._imageData = imageWrapper.data;
        this._labelData = labelWrapper.data as Array<number>;
        this._width = imageWrapper.size.x;
    }

    trace(current: Current, color: number, label: number, edgeLabel: number): boolean {
        for (let i = 0; i < 7; i++) {
            const y = current.cy + SearchDirections[current.dir][0] | 0;
            const x = current.cx + SearchDirections[current.dir][1] | 0;
            const pos = y * this._width + x | 0;

            if ((this._imageData[pos] === color) && ((this._labelData[pos] === 0) || (this._labelData[pos] === label))) {
                this._labelData[pos] = label;
                current.cx = x;
                current.cy = y;

                return true;
            } else {
                if (this._labelData[pos] === 0) {
                    this._labelData[pos] = edgeLabel;
                }
                current.dir = (current.dir + 1) % 8;
            }
        }

        return false;
    }

    contourTracing(sy: number, sx: number, label: number, color: number, edgeLabel: number): ContourVertex {
        let Fv: ContourVertex = null;
        const current: Current = {
            cx: sx,
            cy: sy,
            dir: 0
        };

        if (this.trace(current, color, label, edgeLabel)) {
            Fv = {
                x: sx,
                y: sy,
                dir: current.dir,
                next: null,
                prev: null
            };
            let Cv = Fv;
            let ldir = current.dir;
            let P = {
                x: current.cx,
                y: current.cy,
                dir: 0,
                next: null,
                prev: Cv
            };
            Cv.next = P;
            Cv = P;

            do {
                current.dir = (current.dir + 6) % 8;

                this.trace(current, color, label, edgeLabel);

                if (ldir !== current.dir) {
                    Cv.dir = current.dir;
                    P = {
                        x: current.cx,
                        y: current.cy,
                        dir: 0,
                        next: null,
                        prev: Cv
                    };
                    Cv.next = P;
                    Cv = P;
                } else {
                    Cv.dir = ldir;
                    Cv.x = current.cx;
                    Cv.y = current.cy;
                }

                ldir = current.dir;
            } while (current.cx !== sx || current.cy !== sy);

            Fv.prev = Cv.prev;
            Cv.prev.next = Fv;
        }
        return Fv;
    }
}
