module.exports = {
    inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
            width: 640,
            height: 480,
            minAspectRatio: 0,
            maxAspectRatio: 100,
            facing: "environment" // or user
        },
        area: {
            top: "0%",
            right: "0%",
            left: "0%",
            bottom: "0%"
        },
        singleChannel: false // true: only the red color-channel is read
    },
    locate: true,
    numOfWorkers: 4,
    decoder: {
        readers: [
            'code_128_reader'
        ]
    },
    locator: {
        halfSample: true,
        patchSize: "medium" // x-small, small, medium, large, x-large
    }
};
