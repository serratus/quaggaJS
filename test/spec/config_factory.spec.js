import {createConfigFromSource} from '../../src/input/config_factory';
import DOMHelper from '../../src/common/dom_helper';

function MyFileList(file) {
    Array.call(this);
    this.push(file);
};
MyFileList.prototype = Object.create(Array.prototype);
MyFileList.prototype.constructor = MyFileList;

const OriginalFileList = DOMHelper.FileList;

function expectImageConfig(config) {
    expect(config.inputStream.type).to.equal("ImageStream");
    expect(config.inputStream.sequence).to.equal(false);
    expect(config.inputStream.size).to.be.above(0);
    expect(config.numOfWorkers).to.equal(0);
}

function expectVideoConfig(config) {
    expect(config.inputStream.type).to.equal("VideoStream");
    expect(config.inputStream.src).to.be.a('string');
}

function expectLiveConfig(config) {
    expect(config.inputStream.type).to.equal("LiveStream");
    expect(config.inputStream.src).to.not.exist;
    expect(config.inputStream.constraints.width).to.be.above(0);
    expect(config.inputStream.constraints.height).to.be.above(0);
}

describe("createConfigFromSource", () => {
    beforeEach(function() {
        DOMHelper.setObject('FileList', MyFileList);
    });

    afterEach(function() {
        DOMHelper.setObject('FileList', OriginalFileList);
    });

    it("should create an image config for an image-file", () => {
        const file = new File([], "image.jpg", {type: 'image/jpg'});
        const config = createConfigFromSource({}, {}, file);
        expectImageConfig(config);
        expect(config.inputStream.src).to.have.string("blob:");
    });

    it("should create an image config for a data-url", () => {
        const config = createConfigFromSource({}, {}, "data:image/png;base64," +
        "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/d" +
        "AAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A" +
        "6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC");

        expectImageConfig(config);
        expect(config.inputStream.src).to.have.string("data:image/png");
    });

    it("should create an image config for a regular image url", () => {
        const config = createConfigFromSource({}, {}, "/image-001.jpg");
        expectImageConfig(config);
        expect(config.inputStream.src).to.have.string("/image-001.jpg");
    });

    it("should create an image config for an absolute image url", () => {
        const config = createConfigFromSource({}, {}, "http://dja.com/ige.png");
        expectImageConfig(config);
        expect(config.inputStream.src).to.have.string("http://dja.com/ige.png");
    });

    it("should throw an error in case of an blob-url", () => {
        expect(createConfigFromSource.bind(null, {}, {}, "blob:das"))
            .to.throw(Error, /objectURL/);
    });

    it("should throw an error in case an arbitrary string is given", () => {
        expect(createConfigFromSource.bind(null, {}, {}, "dhfskjdfhsdfsdf"))
            .to.throw(Error, /dhfskjdfhsdfsdf/);
    });

    it("should throw an error in case of an unsupported mime type", () => {
        expect(createConfigFromSource.bind(null, {}, {}, "data:audio/mp3;base64,379"))
            .to.throw(Error, /mimetype/);
    });

    it("should throw an error in case of an unsupported extension", () => {
        expect(createConfigFromSource.bind(null, {}, {}, "sdflsdkf.mp3"))
            .to.throw(Error, /MediaString/);
    });

    it("should throw an error in case of an HTMLImageElement", () => {
        expect(createConfigFromSource.bind(null, {}, {}, new Image()))
            .to.throw(Error, /HTMLImageElement/);
    });

    it("should throw an error in case of an HTMLVideoElement", () => {
        const video = document.createElement("video");
        console.log(typeof video);
        expect(createConfigFromSource.bind(null, {}, {}, video))
            .to.throw(Error, /HTMLVideoElement/);
    });

    it("should work with a fileList", () => {
        const file = new File([], "image.jpg", {type: 'image/jpg'});
        const fileList = new MyFileList(file);
        const config = createConfigFromSource({}, {}, fileList);
        expectImageConfig(config);
        expect(config.inputStream.src).to.have.string("blob:");
    });

    it("should create a video config for a given url", () => {
        const config = createConfigFromSource({}, {}, "/video-001.ogg");
        expectVideoConfig(config);
        expect(config.inputStream.src).to.have.string("/video-001.ogg");
    });

    it("should create a video config for a given file", () => {
        const file = new File([], "video-001.ogg", {type: 'video/ogg'});
        const config = createConfigFromSource({}, {}, file);
        expectVideoConfig(config);
        expect(config.inputStream.src).to.have.string("blob:");
    });

    it("should create a live config", () => {
        const config = createConfigFromSource({}, {}, {
            constraints: {
                width: 1280,
                height: 480,
                facingMode: "user"
            }
        });
        expectLiveConfig(config);
        expect(config.inputStream.constraints.facingMode).to.equal("user");
    });
});
