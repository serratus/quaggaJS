export const PORTRAIT = "portrait";
export const LANDSCAPE = "landscape";

const matchingScreens = {
    [PORTRAIT]: /portrait/i,
    [LANDSCAPE]: /landscape/i,
};

export function determineOrientation() {
    var orientationType = screen.msOrientation || screen.mozOrientation;
    if (typeof orientationType !== 'string') {
        orientationType = screen.orientation;
        if (typeof orientationType === 'object' && orientationType.type) {
            orientationType = orientationType.type;
        }
    }
    if (orientationType) {
        return Object.keys(matchingScreens)
            .filter(orientation => matchingScreens[orientation].test(orientationType))[0];
    }
    console.log(`Failed to determine orientation, defaults to ${PORTRAIT}`);
    return PORTRAIT;
}
