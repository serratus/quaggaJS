import {clone} from 'lodash';
import {determineOrientation} from '../common/device';
import CameraAccess from './camera_access';
import {getViewport} from '../common/utils';
import {generateSourceInterface} from './SourceInterface';
import {Scope} from './SourceScope';

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

function getOrCreateVideo(target) {
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

export function fromCamera(constraints, {target, scope = Scope.EXTERNAL} = {}) {
    let {video: videoConstraints, zoom} = adjustWithZoom(constraints);

    const video = getOrCreateVideo(target);
    return CameraAccess.request(video, videoConstraints)
    .then((mediastream) => {
        let track = mediastream.getVideoTracks()[0];
        return Object.assign(generateSourceInterface(), {
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
            getConstraints() {
                return videoConstraints;
            },
            getDrawable() {
                return video;
            },
            applyConstraints(newConstraints) {
                track.stop();
                constraints = newConstraints;
                const adjustment = adjustWithZoom(constraints);
                videoConstraints = adjustment.video;
                zoom = adjustment.zoom;
                return CameraAccess.request(video, videoConstraints)
                .then((stream) => {
                    mediastream = stream;
                    track = mediastream.getVideoTracks()[0];
                });
            },
            getLabel() {
                return track.label;
            },
            stop() {
                track.stop();
            },
            waitUntilReady() {
                if (track.readyState === "live") {
                    return Promise.resolve();
                }
                return this.applyConstraints(constraints);
            },
            getScope() {
                return scope;
            }
        });
    });
}
