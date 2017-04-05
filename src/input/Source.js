export * from './ImageSource';
export * from './CameraSource';

export function fromCanvas(input) {
    var $canvas = null;
    if (typeof input === 'string') {
        $canvas = document.querySelector(input);
    } else if (input instanceof HTMLCanvasElement) {
        $canvas = input;
    } else {
        return Promise.reject("fromCanvas needs a selector or HTMLCanvasElement");
    }

    return Promise.resolve({
        type: "CANVAS",
        getWidth: function() {
            return $canvas.width;
        },
        getHeight: function() {
            return $canvas.height;
        },
        getDrawable: function() {
            return $canvas;
        },
        getLabel: function() {
            return $canvas.getAttribute('id');
        },
        getConstraints: function() {
            return {};
        },
        applyConstraints: function() {
            console.log('CanvasSource.applyConstraints not implemented');
        }
    });
}
