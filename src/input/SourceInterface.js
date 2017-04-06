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
    };
};
