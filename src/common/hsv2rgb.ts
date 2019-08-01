export type HSV = [number, number, number];

export type RGB = [number, number, number];

export function hsv2rgb(hsv: HSV, rgb?: RGB): RGB {
    const h = hsv[0];
    const s = hsv[1];
    const v = hsv[2];
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else if (h < 360) {
        r = c;
        b = x;
    }

    rgb = rgb || [0, 0, 0];

    rgb[0] = (r + m) * 255 | 0;
    rgb[1] = (g + m) * 255 | 0;
    rgb[2] = (b + m) * 255 | 0;

    return rgb;
}
