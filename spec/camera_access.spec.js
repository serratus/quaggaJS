define(['camera_access'], function(CameraAccess){
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
        window.URL = null;
        
        
        stream = {
            getVideoTracks: function() {
                return tracks;
            }
        };
        sinon.spy(tracks[0], "stop");

        video = {
            src: null,
            addEventListener: function() {
                
            },
            removeEventListener: function() {

            },
            play: function() {
                
            },
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
            sinon.stub(navigator, "getUserMedia", function(constraints, success) {
                success(stream);
            });
        });

        afterEach(function() {
            navigator.getUserMedia.restore();
        });
        describe('request', function () {
            it('should request the camera', function (done) {
                CameraAccess.request(video, {}, function () {
                    expect(navigator.getUserMedia.calledOnce).to.equal(true);
                    expect(video.src).to.deep.equal(stream);
                    done();
                });
            });
        });

        describe('release', function () {
            it('should release the camera', function (done) {
                CameraAccess.request(video, {}, function () {
                    expect(video.src).to.deep.equal(stream);
                    CameraAccess.release();
                    expect(video.src.getVideoTracks()).to.have.length(1);
                    expect(video.src.getVideoTracks()[0].stop.calledOnce).to.equal(true);
                    done();
                });
            });
        });
    });

    describe('failure', function() {
        describe("permission denied", function(){
            before(function() {
                sinon.stub(navigator, "getUserMedia", function(constraints, success, failure) {
                    failure(new Error());
                });
            });

            after(function() {
                navigator.getUserMedia.restore();
            });

            it('should throw if getUserMedia not available', function(done) {
                CameraAccess.request(video, {}, function(err) {
                    expect(err).to.be.defined;
                    done();
                });
            });
        });

        describe("not available", function(){
            var originalGetUserMedia;

            before(function() {
                originalGetUserMedia = navigator.getUserMedia;
                navigator.getUserMedia = undefined;
            });

            after(function() {
                navigator.getUserMedia = originalGetUserMedia;
            });

            it('should throw if getUserMedia not available', function(done) {
                CameraAccess.request(video, {}, function(err) {
                    expect(err).to.be.defined;
                    done();
                });
            });
        });
    });
});
