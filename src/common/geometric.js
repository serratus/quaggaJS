const vec2 = {
    clone: require('gl-vec2/clone')
};

export function getCenterLineFromBox(box) {
    return [{
        x: (box[1][0] - box[0][0]) / 2 + box[0][0],
        y: (box[1][1] - box[0][1]) / 2 + box[0][1]
    }, {
        x: (box[3][0] - box[2][0]) / 2 + box[2][0],
        y: (box[3][1] - box[2][1]) / 2 + box[2][1]
    }];
}

export function getLineLength(line) {
    return Math.sqrt(
        Math.pow(Math.abs(line[1].y - line[0].y), 2) +
        Math.pow(Math.abs(line[1].x - line[0].x), 2));
}

export function getLineAngle(line) {
    return Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
}

function extendLine(line, angle, ext) {
    const extension = {
        y: ext * Math.sin(angle),
        x: ext * Math.cos(angle)
    };

    line[0].y -= extension.y;
    line[0].x -= extension.x;
    line[1].y += extension.y;
    line[1].x += extension.x;
    return line;
}

export function getExtendedLine(inputImageWrapper, line, angle, ext) {
    line = extendLine(line, angle, ext);
    while (ext > 1 && (!inputImageWrapper.inImageWithBorder(line[0], 0)
            || !inputImageWrapper.inImageWithBorder(line[1], 0))) {
        ext -= Math.ceil(ext / 2);
        line = extendLine(line, angle, -ext);
    }
    return line;
}

export function getPointOnLine(line, distance, angle) {
    const x = distance * Math.cos(angle) + line[0].x,
        y = distance * Math.sin(angle) + line[0].y;

    return vec2.clone([x, y]);
}
