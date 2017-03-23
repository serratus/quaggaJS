
export function sleep(millis) {
    return new Promise(function(resolve) {
        window.setTimeout(resolve, millis);
    });
}
