import { Point } from '../common/point';
import { ImageWrapper } from '../common/image-wrapper';

enum Slope {
    Up = 1,
    Down = -1
};

export interface BarcodeLine {
    line: Array<number>;
    max?: number;
    min?: number;
    threshold?: number;
}

export const Bresenham = {
    /**
     * Scans a line of the given image from point p1 to p2 and returns a result object containing
     * gray-scale values (0-255) of the underlying pixels in addition to the min and max values.
     * @param imageWrapper
     * @param p1 The start point {x,y}
     * @param p2 The end point {x,y}
     * @returns {line, min, max}
     */
    getBarcodeLine(imageWrapper: ImageWrapper, p1: Point, p2: Point): BarcodeLine {
        let x0 = p1.x | 0;
        let y0 = p1.y | 0;
        let x1 = p2.x | 0;
        let y1 = p2.y | 0;
        const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
        let tmp: number;
        const line = [];
        const imageData = imageWrapper.data;
        const width = imageWrapper.size.x;
        let val: number;
        let min = 255;
        let max = 0;

        function read(a: number, b: number) {
            val = imageData[b * width + a];
            min = val < min ? val : min;
            max = val > max ? val : max;
            line.push(val);
        }

        if (steep) {
            tmp = x0;
            x0 = y0;
            y0 = tmp;

            tmp = x1;
            x1 = y1;
            y1 = tmp;
        }
        if (x0 > x1) {
            tmp = x0;
            x0 = x1;
            x1 = tmp;

            tmp = y0;
            y0 = y1;
            y1 = tmp;
        }

        let deltax = x1 - x0;
        let deltay = Math.abs(y1 - y0);
        let error = (deltax / 2) | 0;
        let y = y0;
        let ystep = y0 < y1 ? 1 : -1;

        for (let x = x0; x < x1; x++) {
            if (steep) {
                read(y, x);
            } else {
                read(x, y);
            }
            error = error - deltay;
            if (error < 0) {
                y += ystep;
                error = error + deltax;
            }
        }

        return {
            line,
            min,
            max
        };
    },

    /**
     * Converts the result from getBarcodeLine into a binary representation
     * also considering the frequency and slope of the signal for more robust results
     * @param result {line, min, max}
     */
    toBinaryLine(result: BarcodeLine): BarcodeLine {
        const min = result.min;
        const max = result.max;
        const line = result.line;
        const center = min + (max - min) / 2;
        const extrema = new Array<{ pos: number; val: number; }>();
        let threshold = (max - min) / 12;
        const rThreshold = -threshold;

        // 1. find extrema
        let currentDir = line[0] > center ? Slope.Up : Slope.Down;
        extrema.push({
            pos: 0,
            val: line[0]
        });
        for (let i = 0; i < line.length - 2; i++) {
            const slope = (line[i + 1] - line[i]);
            const slope2 = (line[i + 2] - line[i + 1]);
            let dir: Slope;
            if ((slope + slope2) < rThreshold && line[i + 1] < (center * 1.5)) {
                dir = Slope.Down;
            } else if ((slope + slope2) > threshold && line[i + 1] > (center * 0.5)) {
                dir = Slope.Up;
            } else {
                dir = currentDir;
            }

            if (currentDir !== dir) {
                extrema.push({
                    pos: i,
                    val: line[i]
                });
                currentDir = dir;
            }
        }
        extrema.push({
            pos: line.length,
            val: line[line.length - 1]
        });

        for (let j = extrema[0].pos; j < extrema[1].pos; j++) {
            line[j] = line[j] > center ? 0 : 1;
        }

        // iterate over extrema and convert to binary based on avg between minmax
        for (let i = 1; i < extrema.length - 1; i++) {
            if (extrema[i + 1].val > extrema[i].val) {
                threshold = (extrema[i].val + ((extrema[i + 1].val - extrema[i].val) / 3) * 2) | 0;
            } else {
                threshold = (extrema[i + 1].val + ((extrema[i].val - extrema[i + 1].val) / 3)) | 0;
            }

            for (let j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
                line[j] = line[j] > threshold ? 0 : 1;
            }
        }

        return {
            ...result,
            threshold
        };
    }
};
