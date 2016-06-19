import {merge, pick, omitBy, isEmpty} from 'lodash';

import DOMHelper from '../common/dom_helper';

const isDataURL = {regex: /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i}, // eslint-disable-line max-len
    isBlobURL = {regex: /^\s*blob:(.*)$/i},
    isMediaURL = {regex: /^(?:(?:http[s]?|ftp):\/)?\/?(?:(?:[^:\/\s]+)(?:(?:\/\w+)*\/))?([\w\-]+\.([^#?\s]+))(?:.*)?(?:#[\w\-]+)?$/i},  // eslint-disable-line max-len
    isImageExt = {regex: /(jpe?g|png|gif|tiff)(?:\s+|$)/i},
    isVideoExt = {regex: /(webm|ogg|mp4|m4v)/i};

export function createConfigFromSource(config, sourceConfig, source) {
    if (source instanceof DOMHelper.MediaStream) {
        return createConfigForStream(config, sourceConfig, {srcObject: source});
    } else if (source instanceof DOMHelper.HTMLImageElement) {
        throw new Error('Source "HTMLImageElement": not yet supported');
        // return createConfigForImage(config, inputConfig, {image: source});
    } else if (source instanceof DOMHelper.HTMLVideoElement) {
        throw new Error('Source "HTMLVideoElement": not yet supported');
        // return createConfigForVideo(config, inputConfig, {video: source});
    } else if (source instanceof DOMHelper.HTMLCanvasElement) {
        return createConfigForCanvas(config, sourceConfig, {canvas: source});
    } else if (source instanceof DOMHelper.FileList) {
        if (source.length > 0) {
            return createConfigForFile(config, sourceConfig, source[0]);
        }
    } else if (source instanceof DOMHelper.File) {
        return createConfigForFile(config, sourceConfig, source);
    } else if (typeof source === 'string') {
        return createConfigForString(config, sourceConfig, source);
    } else if (typeof source === 'object'
            && (typeof source.constraints !== 'undefined'
            || typeof source.area !== 'undefined')) {
        return createConfigForLiveStream(config, source);
    } else {
        throw new Error("No source given!");
    }
}

function createConfigForImage(config, source, inputConfig = {}) {
    const staticImageConfig = {
        inputStream: merge({
            type: "ImageStream",
            sequence: false,
            size: 800
        }, source),
        numOfWorkers: (ENV.development && config.debug) ? 0 : 1
    };
    return merge(
        config,
        staticImageConfig,
        {numOfWorkers: typeof config.numOfWorkers === 'number' && config.numOfWorkers > 0 ? 1 : 0},
        {inputStream: omitBy(pick(config.inputStream, ['size']), isEmpty)},
        {inputStream: inputConfig});
}

function createConfigForMimeType(config, inputConfig, {src, mime}) {
    const [, type] = mime.match(/^(video|image)\/(.*)$/i) || [];
    if (type === 'video') {
        return createConfigForVideo(config, {src}, inputConfig);
    } else if (type === 'image') {
        return createConfigForImage(config, {src}, inputConfig);
    }
    throw new Error(`Source with mimetype: "${type}" not supported`);
}

function createConfigForFile(config, inputConfig, file) {
    const src = DOMHelper.URL.createObjectURL(file);
    return createConfigForMimeType(config, inputConfig, {
        src,
        mime: file.type
    });
}

function createConfigForString(config, inputConfig = {}, source) {
    const [, mime] = source.match(isDataURL.regex) || [];
    if (mime) {
        return createConfigForMimeType(config, inputConfig, {src: source, mime});
    }
    const blobURL = source.match(isBlobURL.regex);
    if (blobURL) {
        throw new Error(`Source "objectURL": not supported`);
    }
    const [, , ext] = source.match(isMediaURL.regex) || [];
    if (ext) {
        return createConfigForMediaExtension(config, inputConfig, {src: source, ext});
    }
    throw new Error(`Source "${source}": not recognized`);
}

function createConfigForMediaExtension(config, inputConfig, {src, ext}) {
    if (ext.match(isImageExt.regex)) {
        return createConfigForImage(config, {src}, inputConfig);
    } else if (ext.match(isVideoExt.regex)) {
        return createConfigForVideo(config, {src}, inputConfig);
    }
    throw new Error(`Source "MediaString": not recognized`);
}

function createConfigForCanvas (config, {canvas}, inputConfig = {}) {
    // TODO: adjust stream & frame-grabber
    // once/continous
    throw new Error('Source "Canvas": not implemented!');
}

function createConfigForVideo (config, source, inputConfig = {}) {
    return merge({},
        config,
        {
            inputStream: merge({
                type: "VideoStream"
            }, source)
        }, {
            inputStream: inputConfig
        });
}

function createConfigForStream(config, {srcObject}, inputConfig = {}) {
    // TODO: attach to <video> element
    // wait for the video to be ready (dimensions known)
    throw new Error('Source "MediaStream": not implemented!');
}

function createConfigForLiveStream(config, inputConfig = {}) {
    return merge({},
        config,
        {
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                }
            }
        }, {
            inputStream: inputConfig
        });
}
