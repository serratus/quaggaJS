const viewport = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

const canvas = {
    height: 0,
    width: 0,
};

export function generateSourceInterface() {
    return {
        type: "INTERFACE",
        getDimensions() {
            return {
                viewport,
                canvas,
            };
        },
        getConstraints() {},
        getDrawable() {},
        applyConstraints() {},
        getLabel() {},
        stop() {},
        getScope() {},
    };
}
