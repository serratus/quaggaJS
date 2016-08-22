import {merge, pick} from 'lodash';

var streamRef;

function waitForVideo(video) {
    return new Promise((resolve, reject) => {
        let attempts = 10;

        function checkVideo() {
            if (attempts > 0) {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
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
    if (navigator.mediaDevices
            && typeof navigator.mediaDevices.getUserMedia === 'function') {
        return navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                return new Promise((resolve) => {
                    streamRef = stream;
                    video.setAttribute("autoplay", 'true');
                    video.srcObject = stream;
                    video.addEventListener('loadedmetadata', () => {
                        video.play();
                        resolve();
                    });
                });
            })
            .then(waitForVideo.bind(null, video));
    }
    return Promise.reject(new Error('getUserMedia is not defined'));
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

function pickConstraints(videoConstraints) {
    return {
        audio: false,
        video: deprecatedConstraints(videoConstraints)
    };
}

export default {
    request: function(video, videoConstraints) {
        return initCamera(video, pickConstraints(videoConstraints));
    },
    release: function() {
        var tracks = streamRef && streamRef.getVideoTracks();
        if (tracks && tracks.length) {
            tracks[0].stop();
        }
        streamRef = null;
    }
};
