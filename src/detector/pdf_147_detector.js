import {
    getCenterLineFromBox as getLine,
    getLineLength,
    getLineAngle,
    getExtendedLine
} from '../common/geometric';
import ImageDebug from '../common/image_debug';
import Bresenham from '../decoder/bresenham';
import {findPattern} from '../reader/common';

const vec2 = {
    clone: require('gl-vec2/clone'),
    dot: require('gl-vec2/dot')
}

const START_PATTERN = [8, 1, 1, 1, 1, 1, 1, 3],
    STOP_PATTERN = [7, 1, 1, 3, 1, 1, 1, 2, 1],
    MODULO = START_PATTERN.reduce((sum, i) => (sum + i),0);

export default function detect(inputImageWrapper, box, ctx) {
    let line = getLine(box),
        lineLength = getLineLength(line),
        lineAngle = getLineAngle(line),
        extendedLine = getExtendedLine(inputImageWrapper, line, lineAngle, Math.floor(lineLength * 0.15)),
        barcodeLine = Bresenham.getBarcodeLine(inputImageWrapper, extendedLine[0], extendedLine[1]);

    if (ENV.development) {
        if (ctx) {
            ImageDebug.drawPath(extendedLine, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 1});
        }
    }

    Bresenham.toBinaryLine(barcodeLine);

    const match = findPattern(barcodeLine.line, START_PATTERN, {modulo: MODULO});
    console.log(match);

    return [
        vec2.clone([199, 84]),
        vec2.clone([210, 303]),
        vec2.clone([634, 88]),
        vec2.clone([660, 271]),
        vec2.clone([295, 83]),
        vec2.clone([310, 295]),
        vec2.clone([554, 83]),
        vec2.clone([580, 277])
    ]
};
