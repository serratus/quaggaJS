
export function sleep(millis) {
    return new Promise(function(resolve) {
        window.setTimeout(resolve, millis);
    });
}

export function getViewport(target) {
    if (target && target.nodeName && target.nodeType === 1) {
        return target;
    } else {
        // Use '#interactive.viewport' as a fallback selector (backwards compatibility)
        var selector = typeof target === 'string' ? target : '#interactive.viewport';
        return document.querySelector(selector);
    }
}
