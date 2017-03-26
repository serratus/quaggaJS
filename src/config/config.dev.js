module.exports = {
    numOfWorkers: 0,
    locate: true,
    target: '#interactive.viewport',
    frequency: 5,
    constraints: {
        width: 640,
        height: 640,
        // aspectRatio: 640/480, // optional
        facingMode: "environment", // or user
        // deviceId: "38745983457387598375983759834"
    },
    detector: {
        area: {
            top: "0%",
            right: "0%",
            left: "0%",
            bottom: "0%"
        },
        singleChannel: false // true: only the red color-channel is read
    },
    decoder: {
        readers: [
            'code_128_reader'
        ],
        debug: {
            drawBoundingBox: false,
            showFrequency: false,
            drawScanline: false,
            showPattern: false
        }
    },
    locator: {
        halfSample: true,
        patchSize: "medium", // x-small, small, medium, large, x-large
        debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
                showTransformed: false,
                showTransformedBox: false,
                showBB: false
            }
        }
    }
};
