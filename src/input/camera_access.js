const merge = require('lodash/object/merge');

var streamRef,
    loadedDataHandler;

/**
 * Wraps browser-specific getUserMedia
 * @param {Object} constraints
 * @param {Object} success Callback
 * @param {Object} failure Callback
 */
function getUserMedia(constraints, success, failure) {
    if (typeof navigator.getUserMedia !== 'undefined') {
        navigator.getUserMedia(constraints, function (stream) {
            streamRef = stream;
            var videoSrc = (window.URL && window.URL.createObjectURL(stream)) || stream;
            success.apply(null, [videoSrc]);
        }, failure);
    } else {
        failure(new TypeError("getUserMedia not available"));
    }
}

function loadedData(video, callback) {
    var attempts = 10;

    function checkVideo() {
        if (attempts > 0) {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                if (ENV.development) {
                    console.log(video.videoWidth + "px x " + video.videoHeight + "px");
                }
                callback();
            } else {
                window.setTimeout(checkVideo, 500);
            }
        } else {
            callback('Unable to play video stream. Is webcam working?');
        }
        attempts--;
    }
    checkVideo();
}

/**
 * Tries to attach the camera-stream to a given video-element
 * and calls the callback function when the content is ready
 * @param {Object} constraints
 * @param {Object} video
 * @param {Object} callback
 */
function initCamera(constraints, video, callback) {
    getUserMedia(constraints, function(src) {
        video.src = src;
        if (loadedDataHandler) {
            video.removeEventListener("loadeddata", loadedDataHandler, false);
        }
        loadedDataHandler = loadedData.bind(null, video, callback);
        video.addEventListener('loadeddata', loadedDataHandler, false);
        video.play();
    }, function(e) {
        callback(e);
    });
}

/**
 * Normalizes the incoming constraints to satisfy the current browser
 * @param config
 * @param cb Callback which is called whenever constraints are created
 * @returns {*}
 */
function normalizeConstraints(config, cb) {
    var constraints = {
            audio: false,
            video: true
        },
        videoConstraints = merge({
            width: 640,
            height: 480,
            minAspectRatio: 0,
            maxAspectRatio: 100,
            facing: "environment"
        }, config);

    if ( typeof MediaStreamTrack !== 'undefined' && typeof MediaStreamTrack.getSources !== 'undefined') {
        MediaStreamTrack.getSources(function(sourceInfos) {
            var videoSourceId, videoIndex = 0;
            for (var i = 0; i < sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === "video") {
                    if (sourceInfo.facing === videoConstraints.facing) {
                        videoSourceId = sourceInfo.id;
                        break;
                    }
                    
                    if (videoConstraints.cameraIndex === 'undefined' || videoConstraints.cameraIndex >= videoIndex) {
                        videoSourceId = sourceInfo.id;
                    }
                    
                    videoIndex++;
                }
            }
            constraints.video = {
                mandatory: {
                    minWidth: videoConstraints.width,
                    minHeight: videoConstraints.height,
                    minAspectRatio: videoConstraints.minAspectRatio,
                    maxAspectRatio: videoConstraints.maxAspectRatio
                },
                optional: [{
                    sourceId: videoSourceId
                }]
            };
            return cb(constraints);
        });
    } else {
        constraints.video = {
            mediaSource: "camera",
            width: { min: videoConstraints.width, max: videoConstraints.width },
            height: { min: videoConstraints.height, max: videoConstraints.height },
            require: ["width", "height"]
        };
        return cb(constraints);
    }
}

/**
 * Requests the back-facing camera of the user. The callback is called
 * whenever the stream is ready to be consumed, or if an error occures.
 * @param {Object} video
 * @param {Object} callback
 */
function request(video, videoConstraints, callback) {
    normalizeConstraints(videoConstraints, function(constraints) {
        initCamera(constraints, video, callback);
    });
}

export default {
    request: function(video, constraints, callback) {
        request(video, constraints, callback);
    },
    release: function() {
        var tracks = streamRef && streamRef.getVideoTracks();
        if (tracks && tracks.length) {
            tracks[0].stop();
        }
        streamRef = null;
    }
};
