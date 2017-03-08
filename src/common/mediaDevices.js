
export function enumerateDevices() {
    if (navigator.mediaDevices
            && typeof navigator.mediaDevices.enumerateDevices === 'function') {
        return navigator.mediaDevices.enumerateDevices();
    }
    return Promise.reject(new Error('enumerateDevices is not defined'));
};

export function getUserMedia(constraints) {
    if (navigator.mediaDevices
            && typeof navigator.mediaDevices.getUserMedia === 'function') {
        return navigator.mediaDevices
            .getUserMedia(constraints);
    }
    return Promise.reject(new Error('getUserMedia is not defined'));
}
