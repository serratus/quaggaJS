import { VideoStream } from './video-stream';

export class LiveStream extends VideoStream {
    constructor(video: HTMLVideoElement) {
        video.setAttribute('autoplay', '');
        super(video);
    }

    get ended(): boolean {
        return false;
    }
}
