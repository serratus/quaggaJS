export function polyfills(): void {
    if (!Math.imul) {
        Math.imul = function (opA: number, opB: number): number {
            opB |= 0; // ensure that opB is an integer. opA will automatically be coerced.
            // floating points give us 53 bits of precision to work with plus 1 sign bit
            // automatically handled for our convienence:
            // 1. 0x003fffff /*opA & 0x000fffff*/ * 0x7fffffff /*opB*/ = 0x1fffff7fc00001
            //    0x1fffff7fc00001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
            let result = (opA & 0x003fffff) * opB;
            // 2. We can remove an integer coersion from the statement above because:
            //    0x1fffff7fc00001 + 0xffc00000 = 0x1fffffff800001
            //    0x1fffffff800001 < Number.MAX_SAFE_INTEGER /*0x1fffffffffffff*/
            if (opA & 0xffc00000 /*!== 0*/) {
                result += (opA & 0xffc00000) * opB | 0;
            }
            return result | 0;
        };
    }
}

export default polyfills();
