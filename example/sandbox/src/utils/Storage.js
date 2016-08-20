function storageWrapper(cb) {
    if (typeof window.localStorage !== 'undefined') {
        return cb(window.localStorage);
    } else {
        console.log("localStorage not available");
    }
}


export function persist(key, object) {
    storageWrapper((storage) => {
        storage.setItem(key, JSON.stringify(object));
    });
};

export function push(key, object) {
    storageWrapper((storage) => {
        const item = storage.getItem() || "[]",
            parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
            parsed.push(object);
            storage.setItem(key, JSON.stringify(parsed));
        }
    });
}

export function load(key) {
    return storageWrapper((storage) => {
        const item = storage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    });
}
