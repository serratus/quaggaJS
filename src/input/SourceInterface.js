class Source {
    constructor(type) {
        this.type = type;
    }
    getDimensions() {}
    getConstraints() {}
    getDrawable() {}
    applyConstraints() {}
    getLabel() {}
    stop() {}
    getScope() {}
    waitUntilReady() {
        return Promise.resolve();
    }
}

export {Source};

export function generateSourceInterface() {
    return {
        type: "INTERFACE",
        getDimensions() {},
        getConstraints() {},
        getDrawable() {},
        applyConstraints() {},
        getLabel() {},
        stop() {},
        getScope() {},
        waitUntilReady() {
            return Promise.resolve();
        },
    };
};
