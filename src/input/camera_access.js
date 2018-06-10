import {omit, pick} from 'lodash';
import {getUserMedia, enumerateDevices} from 'mediaDevices';

const facingMatching = {
    "user": /front/i,
    "environment": /back/i
};

var streamRef;

function waitForVideo(video) {
    return new Promise((resolve, reject) => {
        let attempts = 10;

        function checkVideo() {
            if (attempts > 0) {
                if (video.videoWidth > 10 && video.videoHeight > 10) {
                    if (ENV.development) {
                        console.log(video.videoWidth + "px x " + video.videoHeight + "px");
                    }
                    resolve();
                } else {
                    window.setTimeout(checkVideo, 500);
                }
            } else {
                reject('Unable to play video stream. Is webcam working?');
            }
            attempts--;
        }
        checkVideo();
    });
}

/**
 * Tries to attach the camera-stream to a given video-element
 * and calls the callback function when the content is ready
 * @param {Object} constraints
 * @param {Object} video
 */
function initCamera(video, constraints) {
    return getUserMedia(constraints)
    .then((stream) => {
        return new Promise((resolve) => {
            streamRef = stream;
            video.setAttribute("autoplay", true);
            video.setAttribute('muted', true);
            video.setAttribute('playsinline', true);
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', () => {
                video.play();
                resolve();
            });
        });
    })
    .then(waitForVideo.bind(null, video));
}

function deprecatedConstraints(videoConstraints) {
    const normalized = pick(videoConstraints, ["width", "height", "facingMode",
            "aspectRatio", "deviceId"]);

    if (typeof videoConstraints.minAspectRatio !== 'undefined' &&
            videoConstraints.minAspectRatio > 0) {
        normalized.aspectRatio = videoConstraints.minAspectRatio;
        console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead");
    }
    if (typeof videoConstraints.facing !== 'undefined') {
        normalized.facingMode = videoConstraints.facing;
        console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'");
    }
    return normalized;
}

export function pickConstraints(videoConstraints) {
    const normalizedConstraints = {
        audio: false,
        video: deprecatedConstraints(videoConstraints)
    };

    if (normalizedConstraints.video.deviceId
            && normalizedConstraints.video.facingMode) {
        delete normalizedConstraints.video.facingMode;
    }
    return Promise.resolve(normalizedConstraints);
}

function enumerateVideoDevices() {
    return enumerateDevices()
    .then(devices => devices.filter(device => device.kind === 'videoinput'));
}

function getActiveTrack() {
    if (streamRef) {
        const tracks = streamRef.getVideoTracks();
        if (tracks && tracks.length) {
            return tracks[0];
        }
    }
}

export default {
    request: function(video, videoConstraints) {
        return pickConstraints(videoConstraints)
            .then(initCamera.bind(null, video));
    },
    release: function() {
        var tracks = streamRef && streamRef.getVideoTracks();
        if (tracks && tracks.length) {
            tracks[0].stop();
        }
        streamRef = null;
    },
    enumerateVideoDevices,
    getActiveStreamLabel: function() {
        const track = getActiveTrack();
        return track ? track.label : '';
    },
    getActiveTrack
};
