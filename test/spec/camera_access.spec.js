import CameraAccess, {pickConstraints} from '../../src/input/camera_access';
import {setDevices, setStream, getConstraints, setSupported} from 'mediaDevices';

var originalURL,
    originalMediaStreamTrack,
    video,
    stream;

describe("CameraAccess", () => {
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
        setStream(stream);
        sinon.spy(tracks[0], "stop");

        video = {
            srcObject: null,
            addEventListener: function() {},
            removeEventListener: function() {},
            setAttribute: sinon.spy(),
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
        describe('request', function () {
            it('should request the camera', function (done) {
                CameraAccess.request(video, {})
                .then(function () {
                    expect(video.srcObject).to.deep.equal(stream);
                    done();
                })
                .catch((e) => {
                    console.log(e);
                    expect(true).to.equal(false);
                    done();
                });
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
                    const transformedConstraints = getConstraints();
                    expect(transformedConstraints.video.width).to.equal(320);
                    expect(transformedConstraints.video.height).to.equal(240);
                    expect(transformedConstraints.video.facingMode).to.equal("user");
                    expect(transformedConstraints.video.aspectRatio).to.equal(2);
                    expect(transformedConstraints.video.facing).not.to.be.defined;
                    expect(transformedConstraints.video.minAspectRatio).not.to.be.defined;
                    expect(transformedConstraints.video.maxAspectRatio).not.to.be.defined;
                    done();
                });
            });
        });

        describe('release', function () {
            it('should release the camera', function (done) {
                CameraAccess.request(video, {})
                .then(function () {
                    expect(video.srcObject).to.deep.equal(stream);
                    CameraAccess.release();
                    expect(video.srcObject.getVideoTracks()).to.have.length(1);
                    expect(video.srcObject.getVideoTracks()[0].stop.calledOnce).to.equal(true);
                    done();
                });
            });
        });
    });

    describe('failure', function() {
        beforeEach(() => {
            setSupported(false);
        });

        afterEach(() => {
            setSupported(true);
        });

        describe("permission denied", function(){
            it('should throw if getUserMedia not available', function(done) {
                CameraAccess.request(video, {})
                .catch(function (err) {
                    expect(err).to.be.defined;
                    done();
                });
            });
        });
    });

    describe("pickConstraints", () => {
        it("should return the given constraints if no facingMode is defined", (done) => {
            const givenConstraints = {width: 180};
            return pickConstraints(givenConstraints).then((actualConstraints) => {
                expect(actualConstraints.video).to.deep.equal(givenConstraints);
                done();
            })
            .catch((err) => {
                expect(err).to.equal(null);
                console.log(err);
                done();
            });
        });

        it("should return the given constraints if deviceId is defined", (done) => {
            const givenConstraints = {width: 180, deviceId: "4343"};
            return pickConstraints(givenConstraints).then((actualConstraints) => {
                expect(actualConstraints.video).to.deep.equal(givenConstraints);
                done();
            })
            .catch((err) => {
                expect(err).to.equal(null);
                console.log(err);
                done();
            });
        });

        it("should set deviceId if facingMode & deviceId are set", (done) => {
            setDevices([{deviceId: "front", kind: "videoinput", label: "front Facing"},
                {deviceId: "back", label: "back Facing", kind: "videoinput"}]);
            const givenConstraints = {width: 180, facingMode: "environment", deviceId: "back"};
            return pickConstraints(givenConstraints)
            .then((actualConstraints) => {
                console.log(JSON.stringify(actualConstraints, 0, 4));
                expect(actualConstraints.video).to.deep.equal({width: 180, deviceId: "back"});
                done();
            })
            .catch((err) => {
                console.log(err);
                expect(err).to.equal(null);
                done();
            });
        });
    });
});
