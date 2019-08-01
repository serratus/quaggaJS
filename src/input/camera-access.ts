import { getUserMedia, enumerateDevices } from '../common/media-devices';

let _stream: MediaStream;

export const CameraAccess = {
    /**
     * Attempts to attach the camera-stream to a given video element
     * and calls the callback function when the content is ready
     * @param video
     * @param videoConstraints
     */
    async request(video: HTMLVideoElement, videoConstraints: MediaTrackConstraints): Promise<void> {
        const normalizedConstraints = CameraAccess.pickConstraints(videoConstraints);
        _stream = await getUserMedia(normalizedConstraints);
        video.srcObject = _stream;
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        return new Promise(resolve => video.addEventListener('loadedmetadata', () => {
            video.play();
            resolve();
        })).then(_waitForVideo.bind(null, video));
    },

    release(): void {
        const tracks = _stream && _stream.getVideoTracks();
        if (tracks && tracks.length) {
            tracks[0].stop();
        }
        _stream = null;
    },

    async enumerateVideoDevices(): Promise<Array<MediaDeviceInfo>> {
        const devices = await enumerateDevices();
        return devices.filter(({ kind }) => kind === 'videoinput');
    },

    getActiveStreamLabel(): string {
        const track = CameraAccess.getActiveTrack();
        return track ? track.label : '';
    },

    getActiveTrack() {
        const tracks = _stream && _stream.getVideoTracks();
        if (tracks && tracks.length) {
            return tracks[0];
        }

        return null;
    },

    pickConstraints(videoConstraints: MediaTrackConstraints): MediaStreamConstraints {
        let { width, height, facingMode, aspectRatio, deviceId } = videoConstraints;
        const { minAspectRatio, facing } = videoConstraints as any;

        if (typeof minAspectRatio !== 'undefined' && minAspectRatio > 0) {
            aspectRatio = minAspectRatio;
            console.log(`WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead`);
        }

        if (typeof facing !== 'undefined') {
            facingMode = facing;
            console.log(`WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'`);
        }

        const normalizedConstraints = deviceId && facingMode ?
            { width, height, aspectRatio, deviceId } : { width, height, facingMode, aspectRatio, deviceId };

        return {
            audio: false,
            video: normalizedConstraints
        };
    }
}

function _waitForVideo({ videoWidth, videoHeight }): Promise<void> {
    return new Promise((resolve, reject) => {
        let attempts = 10;

        function checkVideo() {
            if (attempts > 0) {
                if (videoWidth > 10 && videoHeight > 10) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(`${videoWidth}px x ${videoHeight}px`);
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
