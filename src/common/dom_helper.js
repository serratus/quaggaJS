const hasWindow = typeof window !== 'undefined';
const windowRef = hasWindow ? window : {};

const windowObjects = [
    "MediaStream",
    "HTMLImageElement",
    "HTMLVideoElement",
    "HTMLCanvasElement",
    "FileList",
    "File",
    "URL"
];

const DOMHelper = windowObjects.reduce((result, obj) => {
    return {
        ...result,
        [obj]: obj in windowRef ? windowRef[obj] : () => {}
    };
}, {});

DOMHelper.setObject = (key, value) => {
    DOMHelper[key] = value;
};

export default DOMHelper;
