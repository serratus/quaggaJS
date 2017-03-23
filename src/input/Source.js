import {determineOrientation, PORTRAIT} from '../common/device';
import CameraAccess from './camera_access';

export function fromCamera(constraints) {
    if (!constraints) {
        constraints = {width: {ideal: 540}, height: {ideal: 540}, aspectRatio: {ideal: 1}, facingMode: 'environment'};
    }
    var orientation = determineOrientation();
    var videoConstraints = constraints;
    if (orientation === PORTRAIT) {
        constraints = Object.assign({}, constraints, {
            width: constraints.height,
            height: constraints.width,
        });
    }

    const video = document.querySelector('video');
    CameraAccess.request(videoConstraints, video)
    .then(function(mediastream) {
        const track = mediastream.getVideoTracks()[0];
        return {
            type: "CAMERA",
            getDimensions() {
                const viewport = {
                    x: 0,
                    y: 0,
                    width: video.videoWidth,
                    height: video.videoHeight,
                };

                if (constraints.zoom && constraints.zoom.exact > 1) {
                    const zoom = constraints.zoom.exact;
                    viewport.width = Math.floor(video.videoWidth / zoom);
                    viewport.height = Math.floor(video.videoHeight / zoom);
                    viewport.x = Math.floor((video.videoWidth - viewport.width) / 2);
                    viewport.y = Math.floor((video.videoHeight - viewport.height) / 2);
                }

                return {
                    viewport,
                    canvas: {
                        width: constraints.width,     // AR
                        height: constraints.height,   // AR
                    },
                };
            },
            getConstraints: function() {
                return videoConstraints;
            },
            getDrawable: function() {
                return video;
            },
            applyConstraints: function(constraints) {
                track.stop();
                videoConstraints = Object.assign({}, constraints);
                if (determineOrientation() === PORTRAIT) {
                    constraints = Object.assign({}, constraints, {
                        width: constraints.height,
                        height: constraints.width,
                    });
                }
                console.log(videoConstraints, constraints);
                if (constraints.zoom && constraints.zoom.exact > 1) {
                    constraints.width.ideal = Math.floor(constraints.width.ideal * constraints.zoom.exact);
                    constraints.height.ideal = Math.floor(constraints.height.ideal * constraints.zoom.exact);
                    delete constraints.zoom;
                }
                return CameraAccess.request(videoConstraints, video);
            },
            getLabel: function() {
                return track.label;
            }
        };
    });
}

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

export function fromImage(input, constraints = {width: 800, height: 800}) {
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
    .then(() => {
        const width = $image.naturalWidth;
        const height = $image.naturalHeight;
        const imageAR = width / height;

        const calculatedWidth = imageAR > 1 ? constraints.width : Math.floor((imageAR) * constraints.width);
        const calculatedHeight = imageAR > 1 ? Math.floor((1 / imageAR) * constraints.width) : constraints.width;

        return {
            type: "IMAGE",
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
            }
        };
    });
}
