import {
    getCenterLineFromBox as getLine,
    getLineLength,
    getLineAngle,
    getExtendedLine,
    getPointOnLine
} from '../common/geometric';
import ImageDebug from '../common/image_debug';
import Bresenham from '../decoder/bresenham';
import {findPattern} from '../reader/common';

const vec2 = {
    clone: require('gl-vec2/clone'),
    dot: require('gl-vec2/dot')
};

const START_PATTERN = [8, 1, 1, 1, 1, 1, 1, 3],
    STOP_PATTERN = [7, 1, 1, 3, 1, 1, 1, 2, 1],
    MODULO = START_PATTERN.reduce((sum, i) => (sum + i), 0);

function findTopLeft(line, angle, inputImageWrapper, ctx) {
    let barcodeLine,
        match,
        pos = [
            vec2.clone([0, 0]),
            vec2.clone([0, 0])
        ],
        xdir = Math.sin(angle),
        ydir = Math.cos(angle);

    do {
        barcodeLine = Bresenham.getBarcodeLine(inputImageWrapper, line[0], line[1]);
        if (ENV.development && ctx) {
            ImageDebug.drawPath(line, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 1});
        }

        Bresenham.toBinaryLine(barcodeLine);
        match = findPattern(barcodeLine.line, START_PATTERN, {modulo: MODULO});
        if (match) {
            pos[0] = getPointOnLine(line, match.start, angle);
            pos[1] = getPointOnLine(line, match.end, angle);
            line[0].x += xdir*10;
            line[0].y -= ydir*10;
            line[1].x += xdir*10;
            line[1].y -= ydir*10;
        }
        ImageDebug.drawVertices(pos, {x: 0, y: 1}, ctx, {color: 'blue', lineWidth: 1});
    } while (match);

    return pos;
}

export default function detect(inputImageWrapper, box, ctx) {
    let line = getLine(box),
        lineLength = getLineLength(line),
        lineAngle = getLineAngle(line),
        extendedLine = getExtendedLine(inputImageWrapper, line, lineAngle, Math.floor(lineLength * 0.15));

    var topLeft = findTopLeft(extendedLine, lineAngle, inputImageWrapper, ctx);
    console.log(topLeft);

    return [
        vec2.clone([199, 84]),
        vec2.clone([210, 303]),
        vec2.clone([634, 88]),
        vec2.clone([660, 271]),
        vec2.clone([295, 83]),
        vec2.clone([310, 295]),
        vec2.clone([554, 83]),
        vec2.clone([580, 277])
    ];
};
