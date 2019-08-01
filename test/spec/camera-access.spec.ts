import sinon from 'sinon';

import { CameraAccess } from '../../src/input/camera-access';

describe('camera-access', () => {
    let originalURL: typeof URL;
    let video: HTMLVideoElement;
    let _stream: MediaStream;
    let _constraints: MediaStreamConstraints;
    let _supported = true;
    let stopSpy: sinon.SinonSpy;

    beforeEach(() => {
        const tracks: Array<MediaStreamTrack> = [{
            stop: () => { }
        } as any];

        originalURL = window.URL;
        window.URL = {
            createObjectURL(stream: object) {
                return stream.toString();
            }
        } as any;

        _stream = {
            getVideoTracks: function () {
                return tracks;
            }
        } as any;

        sinon.stub(navigator.mediaDevices, 'getUserMedia').callsFake(constraints => {
            _constraints = constraints;
            if (_supported) {
                return Promise.resolve(_stream);
            }
            return Promise.reject(new Error('das'));
        });

        stopSpy = sinon.spy(tracks[0], 'stop');

        video = {
            srcObject: null,
            addEventListener: () => { },
            removeEventListener: () => { },
            setAttribute: sinon.spy(),
            play: async () => { },
            videoWidth: 320,
            videoHeight: 480
        } as any;
        sinon.stub(video, 'addEventListener').callsFake((type, cb: EventListener) => {
            cb(new Event(type));
        });
        sinon.stub(video, 'play');
    });

    afterEach(() => {
        window.URL = originalURL;

        sinon.restore();
    });

    describe('success', () => {
        describe('request', () => {
            it('should request the camera', done => {
                CameraAccess.request(video, {})
                    .then(() => {
                        expect(video.srcObject).to.deep.equal(_stream);
                        done();
                    });
            });

            it('should allow deprecated constraints to be used', done => {
                CameraAccess.request(video, {
                    width: 320,
                    height: 240,
                    facing: 'user',
                    minAspectRatio: 2,
                    maxAspectRatio: 100
                } as any)
                    .then(() => {
                        const video = _constraints.video as MediaTrackConstraints;
                        expect(video.width).to.equal(320);
                        expect(video.height).to.equal(240);
                        expect(video.facingMode).to.equal('user');
                        expect(video.aspectRatio).to.equal(2);
                        expect((video as any).facing).to.equal(undefined);
                        expect((video as any).minAspectRatio).to.equal(undefined);
                        expect((video as any).maxAspectRatio).to.equal(undefined);
                        done();
                    });
            });
        });

        describe('release', () => {
            it('should release the camera', done => {
                CameraAccess.request(video, {})
                    .then(() => {
                        expect(video.srcObject).to.deep.equal(_stream);
                        CameraAccess.release();
                        expect((video.srcObject as MediaStream).getVideoTracks()).to.have.length(1);
                        expect(stopSpy.calledOnce).to.equal(true);
                        done();
                    });
            });
        });
    });

    describe('failure', () => {
        beforeEach(() => {
            _supported = false;
        });

        afterEach(() => {
            _supported = true;
        });

        describe('permission denied', () => {
            it('should throw if getUserMedia not available', done => {
                CameraAccess.request(video, {})
                    .catch(err => {
                        expect(err).not.to.equal(undefined);
                        done();
                    });
            });
        });

        describe('not available', () => {
            it('should throw if getUserMedia not available', done => {
                CameraAccess.request(video, {})
                    .catch(err => {
                        expect(err).not.to.equal(undefined);
                        done();
                    });
            });
        });
    });

    describe('pickConstraints', () => {
        it('should return the given constraints if no facingMode is defined', () => {
            const givenConstraints = { width: 180 };

            const actualConstraints = CameraAccess.pickConstraints(givenConstraints);

            Object.keys(actualConstraints.video)
                .forEach(key => (actualConstraints.video[key] === undefined) && delete actualConstraints.video[key]);

            expect(actualConstraints.video).to.deep.equal(givenConstraints);
        });

        it('should return the given constraints if deviceId is defined', () => {
            const givenConstraints = { width: 180, deviceId: '4343' };

            const actualConstraints = CameraAccess.pickConstraints(givenConstraints);

            Object.keys(actualConstraints.video)
                .forEach(key => (actualConstraints.video[key] === undefined) && delete actualConstraints.video[key]);

            expect(actualConstraints.video).to.deep.equal(givenConstraints);
        });
    });
});
