import { Point } from './point';

export const ImageDebug = {
    drawPath(path: Array<Point>, context: CanvasRenderingContext2D, color: string, lineWidth: number): void {
        if (path && path.length > 1) {
            context.strokeStyle = color;
            context.fillStyle = color;
            context.lineWidth = lineWidth;
            context.beginPath();
            context.moveTo(path[0].x, path[0].y);
            path.slice(1).forEach(({ x, y }) => context.lineTo(x, y));
            context.closePath();
            context.stroke();
        }
    },

    drawImage(imageData: Uint8Array, width: number, height: number, context: CanvasRenderingContext2D): boolean {
        const canvasData = context.getImageData(0, 0, width, height);
        const data = canvasData.data;
        let imageIndex = imageData.length | 0;
        let canvasIndex = data.length | 0;

        if (canvasIndex / imageIndex !== 4) {
            return false;
        }

        while (imageIndex--) {
            const value = imageData[imageIndex];
            data[--canvasIndex] = 255;
            data[--canvasIndex] = value;
            data[--canvasIndex] = value;
            data[--canvasIndex] = value;
        }

        context.putImageData(canvasData, 0, 0);

        return true;
    }
}
