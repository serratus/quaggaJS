import {merge, pick, omit} from 'lodash';

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
    return navigator.mediaDevices.getUserMedia(constraints)
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

function applyCameraFacing(facing, constraints) {
    if (typeof constraints.video.deviceId === 'string' && constraints.video.deviceId.length > 0) {
        return Promise.resolve({
            ...constraints,
            video: {
                ...omit(constraints.video, "facingMode")
            }
        });
    } else if (!facing) {
        return Promise.resolve(constraints);
    }
    if ( typeof MediaStreamTrack !== 'undefined' &&
            typeof MediaStreamTrack.getSources !== 'undefined') {
        return new Promise((resolve) => {
            MediaStreamTrack.getSources((sourceInfos) => {
                const videoSource = sourceInfos.filter((sourceInfo) => (
                    sourceInfo.kind === "video" && sourceInfo.facing === facing
                ))[0];
                if (videoSource) {
                    return resolve(merge({}, constraints,
                        {video: {deviceId: videoSource.id}}));
                }
                return resolve(constraints);
            });
        });
    }
    return Promise.resolve(merge({}, constraints, {video: {facingMode: facing}}));
}

function pickConstraints(videoConstraints) {
    const constraints = {
        audio: false,
        video: deprecatedConstraints(videoConstraints)
    };
    return applyCameraFacing(constraints.video.facingMode, constraints);
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
    }
};
