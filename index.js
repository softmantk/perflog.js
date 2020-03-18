const {performance} = require('perf_hooks');
const {PERF_LOG} = process.env;

function perf({enabled = true}) {
    const fn = function (mark) {
        if ([undefined, null, false, "false"].includes(PERF_LOG) || enabled) {
            fn.obj = fn.obj || {};
            fn._summary = fn._summary || {};
            const time = performance.now();
            if (!fn.obj[mark]) {
                fn.obj[mark] = time;
                return 0;
            }

            const timeTaken = (time - fn.obj[mark]).toFixed(2);
            console.log(`PERF:${mark}:`, timeTaken);
            fn._summary[mark] = timeTaken;
            delete fn.obj[mark];
            return timeTaken;
        }
    };
    return fn;
}

module.exports = perf;
