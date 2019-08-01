/**
 * @borrows https://github.com/exif-js/exif-js
 */

const ExifTags = { 0x0112: 'orientation' };
export const AvailableTags: Array<string> = Object.keys(ExifTags).map(key => ExifTags[key]);

export interface Tags {
    [key: string]: number | string;
}

export async function findTagsInObjectURL(src: string, tags = AvailableTags): Promise<Tags> {
    if (/^blob:/i.test(src)) {
        const buffer = await objectURLToBlob(src);
        return findTagsInBuffer(buffer, tags);
    }
    return Promise.resolve(null);
}

export function findTagsInBuffer(file: ArrayBuffer, selectedTags: Array<string> = AvailableTags): Tags {
    const dataView = new DataView(file);
    const length = file.byteLength;
    const exifTags = selectedTags.reduce((result, selectedTag) => {
        const exifTag = Object.keys(ExifTags).find(tag => ExifTags[tag] === selectedTag);
        if (exifTag) {
            result[exifTag] = selectedTag;
        }
        return result;
    }, {});
    let offset = 2;

    if ((dataView.getUint8(0) !== 0xFF) || (dataView.getUint8(1) !== 0xD8)) {
        return null;
    }

    while (offset < length) {
        if (dataView.getUint8(offset) !== 0xFF) {
            return null;
        }

        const marker = dataView.getUint8(offset + 1);
        if (marker === 0xE1) {
            return readEXIFData(dataView, offset + 4, exifTags);
        } else {
            offset += 2 + dataView.getUint16(offset + 2);
        }
    }

    return null;
}

async function objectURLToBlob(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    if (response.ok) {
        return response.arrayBuffer();
    }

    throw new Error('HTTP Error ' + response.status);
}

function readEXIFData(dataView: DataView, start: number, exifTags: { [key: number]: string }): Tags {
    if ('Exif'.split('').some((char, index) => dataView.getUint8(start + index) !== char.charCodeAt(0))) {
        return null;
    }

    const tiffOffset = start + 6;
    let bigEnd: boolean;

    if (dataView.getUint16(tiffOffset) === 0x4949) {
        bigEnd = false;
    } else if (dataView.getUint16(tiffOffset) === 0x4D4D) {
        bigEnd = true;
    } else {
        return null;
    }

    if (dataView.getUint16(tiffOffset + 2, !bigEnd) !== 0x002A) {
        return null;
    }

    const firstIFDOffset = dataView.getUint32(tiffOffset + 4, !bigEnd);
    if (firstIFDOffset < 0x00000008) {
        return null;
    }

    const tags = readTags(dataView, tiffOffset + firstIFDOffset, exifTags, bigEnd);
    return tags;
}

function readTags(dataView: DataView, dirStart: number, strings: { [key: number]: string }, bigEnd: boolean): Tags {
    const entries = dataView.getUint16(dirStart, !bigEnd);
    const tags: Tags = {};

    for (let i = 0; i < entries; i++) {
        const entryOffset = dirStart + i * 12 + 2;
        const tag = strings[dataView.getUint16(entryOffset, !bigEnd)];
        if (tag) {
            tags[tag] = readTagValue(dataView, entryOffset, bigEnd);
        }
    }

    return tags;
}

function readTagValue(dataView: DataView, entryOffset: number, bigEnd: boolean): number | string {
    const type = dataView.getUint16(entryOffset + 2, !bigEnd);
    const numValues = dataView.getUint32(entryOffset + 4, !bigEnd);

    return type === 3 && numValues === 1 ? dataView.getUint16(entryOffset + 8, !bigEnd) : undefined;
}
