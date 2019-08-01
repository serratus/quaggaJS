/**
 * Performs a deep merge of objects and returns new object.
 * Does not modify objects (immutable).
 * @see https://stackoverflow.com/a/48218209
 *
 * @param objects - Objects to merge
 * @returns New object with merged key/values
 */
export function merge(...objects: ReadonlyArray<any>): object {
    const isObject = (obj: unknown) => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const pVal = prev[key];
                const oVal = obj[key];

                if (Array.isArray(pVal) && Array.isArray(oVal)) {
                    // prev[key] = pVal.concat(...oVal);
                    prev[key] = oVal;
                } else if (isObject(pVal) && isObject(oVal)) {
                    prev[key] = merge(pVal, oVal);
                } else {
                    prev[key] = oVal;
                }
            });
        }

        return prev;
    }, {});
}