import {findTagsInObjectURL} from './exif_helper';

export function fromImage(input, constraints = {width: 800, height: 800, channels: 3}) {
    var $image = null;
    var src = null;
    if (typeof input === 'string') {
        // data or url, or queryString
        $image = new Image();
        src = input;
    } else if (input instanceof HTMLImageElement) {
        $image = input;
    } else if (input instanceof File) {
        $image = new Image();
        src = URL.createObjectURL(input);
    } else {
        return Promise.reject("fromImage needs a src, HTMLImageElement or File");
    }
    return new Promise(function(resolve, reject) {
        if (src || !$image.complete) {
            console.log('Adding eventlistener');
            $image.addEventListener('load', function() {
                resolve();
            }, false);
            $image.addEventListener('error', function(e) {
                reject(e);
            }, false);
            if (src) {
                console.log(`Setting src = ${src}`);
                $image.src = src;
            }
        } else {
            return resolve();
        }
    })
    .then(() => findTagsInObjectURL(src, ['orientation']))
    .then((tags) => {
        let width = $image.naturalWidth;
        let height = $image.naturalHeight;
        if (tags && tags.orientation) {
            switch (tags.orientation) {
            case 6:
            case 8:
                width = $image.naturalHeight;
                height = $image.naturalWidth;
            }
        }
        const imageAR = width / height;
        const calculatedWidth = imageAR > 1 ? constraints.width : Math.floor((imageAR) * constraints.width);
        const calculatedHeight = imageAR > 1 ? Math.floor((1 / imageAR) * constraints.width) : constraints.width;
        const colorChannels = constraints.channels || 3;

        return {
            type: "IMAGE",
            colorChannels,
            tags,
            getDimensions() {
                return {
                    viewport: {
                        width: $image.naturalWidth,   // AR
                        height: $image.naturalHeight, // AR
                        x: 0,                         // AR
                        y: 0,                         // AR
                    },
                    canvas: {
                        width: calculatedWidth,     // AR
                        height: calculatedHeight,   // AR
                    },
                };
            },
            getDrawable: function() {
                return $image;
            },
            getLabel: function() {
                return $image.src;
            },
            getConstraints: function() {
                return constraints;
            },
            applyConstraints: function() {
                console.log('ImageSource.applyConstraints not implemented');
            },
        };
    });
}
