import {clone} from 'lodash';
import {determineOrientation, PORTRAIT, LANDSCAPE, SQUARE} from '../common/device';
import CameraAccess from './camera_access';
import {getViewport} from '../common/utils';

const ConstraintPresets = [
    {
        width: 720,
        height: 1280,
    }, {
        width: 540,
        height: 960,
    }, {
        width: 600,
        height: 800,
    }, {
        width: 480,
        height: 640,
    }, {
        width: 1280,
        height: 720,
    }, {
        width: 960,
        height: 540,
    }, {
        width: 800,
        height: 600,
    }, {
        width: 640,
        height: 480,
    }, {
        width: 1280,
        height: 1280,
    }, {
        width: 1080,
        height: 1080,
    }, {
        width: 960,
        height: 960,
    }, {
        width: 800,
        height: 800,
    }, {
        width: 640,
        height: 640,
    },
].map((preset) => Object.assign({}, preset, {aspectRatio: preset.width / preset.height}));

function getFilter(aspectRatio) {
    if (aspectRatio === 1) {
        return pre => pre.aspectRatio === aspectRatio;
    } else if (aspectRatio > 1) {
        return pre => pre.aspectRatio > 1;
    }
    return pre => pre.aspectRatio < 1;
}

function resolveMinWidthToAdvanced({aspectRatio, minPixels}) {
    return [...ConstraintPresets]
    .filter(getFilter(aspectRatio))
    .map((pre) => {
        return {
            error: Math.abs((pre.width * pre.height) - minPixels),
            pre,
        };
    })
    .sort(({error: errorA}, {error: errorB}) => {
        if (errorB > errorA) {
            return -1;
        }
        if (errorB < errorA) {
            return 1;
        }
        return 0;
    })
    .map(({pre}) => pre);
}

function getOrCreateVideo(source, target) {
    const $viewport = getViewport(target);
    if ($viewport) {
        let $video = $viewport.querySelector("video");
        if (!$video) {
            $video = document.createElement("video");
            $viewport.appendChild($video);
        }
        return $video;
    }
    return document.createElement("video");
}

function constraintToNumber(constraint) {
    if (!constraint) {
        return null;
    }
    if (typeof constraint === 'number') {
        return constraint;
    }
    const {ideal, exact, min, max} = constraint;
    if (typeof exact !== 'undefined') {
        return exact;
    }
    if (typeof ideal !== 'undefined') {
        return ideal;
    }
    if (typeof min !== 'undefined') {
        return min;
    }
    if (typeof max !== 'undefined') {
        return max;
    }

    return null;
}

function adjustWithZoom(videoConstraints) {
    const constraints = clone(videoConstraints);
    const orientation = determineOrientation();

    let zoom = constraintToNumber(constraints.zoom) || 1,
        width = constraintToNumber(constraints.width),
        height = constraintToNumber(constraints.height),
        aspectRatio = constraintToNumber(constraints.aspectRatio) || (width / height);

    if (constraints[orientation]) {
        zoom = constraintToNumber(constraints[orientation].zoom) || zoom;
        width = constraintToNumber(constraints[orientation].width) || width;
        height = constraintToNumber(constraints[orientation].height) || height;
        aspectRatio = constraintToNumber(constraints[orientation].aspectRatio) || (width / height);
    }

    if (zoom > 1) {
        width = Math.floor(width * zoom);
        height = Math.floor(height * zoom);
    }

    delete constraints.zoom;
    delete constraints.orientation;
    delete constraints.landscape;
    delete constraints.portrait;

    const advanced = resolveMinWidthToAdvanced({minPixels: (width * height), aspectRatio});
    return {
        zoom,
        video: Object.assign({}, constraints, {
            width: {ideal: advanced[0].width},
            height: {ideal: advanced[0].height},
            aspectRatio: {exact: advanced[0].aspectRatio || aspectRatio},
            advanced,
        }),
    };
}

export function fromCamera(constraints) {
    var {video: videoConstraints, zoom} = adjustWithZoom(constraints);

    const video = getOrCreateVideo();
    return CameraAccess.request(video, videoConstraints)
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
                if (zoom > 1) {
                    viewport.width = Math.floor(video.videoWidth / zoom);
                    viewport.height = Math.floor(video.videoHeight / zoom);
                    viewport.x = Math.floor((video.videoWidth - viewport.width) / 2);
                    viewport.y = Math.floor((video.videoHeight - viewport.height) / 2);
                }

                return {
                    viewport,
                    canvas: {
                        width: viewport.width,     // AR
                        height: viewport.height,   // AR
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
                return CameraAccess.request(video, videoConstraints);
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
    .then(() => {
        const width = $image.naturalWidth;
        const height = $image.naturalHeight;
        const imageAR = width / height;

        const calculatedWidth = imageAR > 1 ? constraints.width : Math.floor((imageAR) * constraints.width);
        const calculatedHeight = imageAR > 1 ? Math.floor((1 / imageAR) * constraints.width) : constraints.width;
        const colorChannels = constraints.channels || 3;

        return {
            type: "IMAGE",
            colorChannels,
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
