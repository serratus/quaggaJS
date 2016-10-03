
let devices = [],
    stream,
    _constraints,
    _supported = true;

export function enumerateDevices() {
    console.log("enumerateDevices!!!!");
    return Promise.resolve(devices);
};

export function getUserMedia(constraints) {
    console.log("getUserMedia!!!!");
    _constraints = constraints;
    if (_supported) {
        return Promise.resolve(stream);
    }
    return Promise.reject(new Error("das"));
}

export function setDevices(newDevices) {
    devices = [...newDevices];
}

export function setStream(newStream) {
    stream = newStream;
}

export function getConstraints() {
    return _constraints;
}

export function setSupported(supported) {
    console.log("Supported: " + supported);
    _supported = supported;
}
