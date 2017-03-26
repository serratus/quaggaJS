export const DEBUG = "debug";

export function log(level, scope, ...rest) {
    if (level !== DEBUG) {
        console.log(`${level}: ${scope} - ${msg(rest)}`);
    }
}

function msg(args) {
    return args.map(arg => {
        if (typeof arg === 'function') {
            return arg();
        }
        return arg;
    }).join(', ');
}
