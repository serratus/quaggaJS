import CameraAccess from '../../src/input/camera_access';

var originalURL,
    originalMediaStreamTrack,
    video,
    stream;

beforeEach(function() {
    var tracks = [{
        stop: function() {}
    }];

    originalURL = window.URL;
    originalMediaStreamTrack = window.MediaStreamTrack;
    window.MediaStreamTrack = {};
    window.URL = {
        createObjectURL(stream) {
            return stream;
        }
    };

    stream = {
        getVideoTracks: function() {
            return tracks;
        }
    };
    sinon.spy(tracks[0], "stop");

    video = {
        src: null,
        addEventListener: function() {},
        removeEventListener: function() {},
        play: function() {},
        videoWidth: 320,
        videoHeight: 480
    };
    sinon.stub(video, "addEventListener", function(event, cb) {
        cb();
    });
    sinon.stub(video, "play");
});

afterEach(function() {
    window.URL = originalURL;
    window.MediaStreamTrack = originalMediaStreamTrack;
});

describe('success', function() {
    beforeEach(function() {
        sinon.stub(navigator.mediaDevices, "getUserMedia", function(constraints) {
            return Promise.resolve(stream);
        });
    });

    afterEach(function() {
        navigator.mediaDevices.getUserMedia.restore();
    });
    describe('request', function () {
        it('should request the camera', function (done) {
            CameraAccess.request(video, {})
            .then(function () {
                expect(navigator.mediaDevices.getUserMedia.calledOnce).to.equal(true);
                expect(video.src).to.deep.equal(stream);
                done();
            })
            window.setTimeout(() => {
                video.onloadedmetadata();
            }, 100);
        });

        it("should allow deprecated constraints to be used", (done) => {
            CameraAccess.request(video, {
                width: 320,
                height: 240,
                facing: "user",
                minAspectRatio: 2,
                maxAspectRatio: 100
            })
            .then(function () {
                const call = navigator.mediaDevices.getUserMedia.getCall(0),
                    args = call.args;
                expect(call).to.be.defined;
                expect(args[0].video.width).to.equal(320);
                expect(args[0].video.height).to.equal(240);
                expect(args[0].video.facingMode).to.equal("user");
                expect(args[0].video.aspectRatio).to.equal(2);
                expect(args[0].video.facing).not.to.be.defined;
                expect(args[0].video.minAspectRatio).not.to.be.defined;
                expect(args[0].video.maxAspectRatio).not.to.be.defined;
                done();
            })
            window.setTimeout(() => {
                video.onloadedmetadata();
            }, 100);
        });
    });

    describe('facingMode fallback in Chrome', () => {
        beforeEach(() => {
            window.MediaStreamTrack.getSources = (cb) => {
                return cb([
                    {kind: "video", facing: "environment", id: "environment"},
                    {kind: "audio", id: "audio"},
                    {kind: "video", facing: "user", id: "user"}
                ]);
            };
        });

        afterEach(() => {
            window.MediaStreamTrack = {};
        })

        it("should set deviceId in case facingMode is not supported", (done) => {
            CameraAccess.request(video, {
                facing: "user"
            })
            .then(function () {
                const call = navigator.mediaDevices.getUserMedia.getCall(0),
                    args = call.args;
                expect(call).to.be.defined;
                expect(args[0].video.facingMode).not.to.be.defined;
                expect(args[0].video.deviceId).to.equal("user");
                done();
            })
            window.setTimeout(() => {
                video.onloadedmetadata();
            }, 100);
        });
    });

    describe('release', function () {
        it('should release the camera', function (done) {
            CameraAccess.request(video, {})
            .then(function () {
                expect(video.src).to.deep.equal(stream);
                CameraAccess.release();
                expect(video.src.getVideoTracks()).to.have.length(1);
                expect(video.src.getVideoTracks()[0].stop.calledOnce).to.equal(true);
                done();
            });
            window.setTimeout(() => {
                video.onloadedmetadata();
            }, 100);
        });
    });
});

describe('failure', function() {
    describe("permission denied", function(){
        beforeEach(function() {
            sinon.stub(navigator.mediaDevices, "getUserMedia", function(constraints, success, failure) {
                return Promise.reject(new Error());
            });
        });

        afterEach(function() {
            navigator.mediaDevices.getUserMedia.restore();
        });

        it('should throw if getUserMedia not available', function(done) {
            CameraAccess.request(video, {})
            .catch(function (err) {
                expect(err).to.be.defined;
                done();
            });
        });
    });

    describe("not available", function(){
        var originalGetUserMedia;

        beforeEach(function() {
            originalGetUserMedia = navigator.mediaDevices.getUserMedia;
            navigator.mediaDevices.getUserMedia = undefined;
        });

        afterEach(function() {
            navigator.mediaDevices.getUserMedia = originalGetUserMedia;
        });

        it('should throw if getUserMedia not available', function(done) {
            CameraAccess.request(video, {})
            .catch((err) => {
                expect(err).to.be.defined;
                done();
            });
        });
    });
});
