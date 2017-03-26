import {DEBUG, log} from './log';

const debug = log.bind(null, DEBUG, "buffers.js");
let buffers = [];

export function aquire(bytes) {
    const allocation = findBySize(bytes);
    if (allocation) {
        debug(`reusing ${bytes}`, debugSize);
        return allocation;
    }
    debug(`allocating ${bytes}`, debugSize);
    const buffer = new ArrayBuffer(bytes);
    return buffer;
}

export function release(buffer) {
    if (!buffer) {
        throw new Error("Buffer not defined");
    }
    buffers.push(buffer);
    debug('release', debugSize);
}

export function releaseAll() {
    buffers = [];
}

function debugSize() {
    return "size: " + Object
        .keys(buffers)
        .filter((key) => buffers[key] !== null)
        .length;
}

function findBySize(bytes) {
    for (let i = 0; i < buffers.length; i++) {
        if (buffers[i].byteLength === bytes) {
            let allocation = buffers[i];
            buffers.splice(i, 1);
            return allocation;
        }
    }
    return null;
}
