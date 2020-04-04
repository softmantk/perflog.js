const {performance} = require('perf_hooks');
const {PERF_LOG = true} = process.env;

function perf({
                  enabled = true,
                  inLineLog = true,
                  round = 2,
                  forced = false,
                  prefix = "PERF:"
              } = {}) {
    if (typeof round !== 'number')
        throw new Error("round must be number type");
    const fn = function (mark) {
        const enabledGlobally = !['false', '0'].includes(PERF_LOG);
        if (!forced) {
            if (!enabledGlobally)
                return;
            if (!enabled)
                return;
        }
        fn.obj = fn.obj || {};
        fn._summary = fn._summary || {};
        const time = performance.now();
        if (!fn.obj[mark]) {
            fn.obj[mark] = time;
            return 0;
        }
        const timeTaken = +(time - fn.obj[mark]).toFixed(round);
        if (inLineLog) {
            console.log(`${prefix}${mark}: `, timeTaken);
        }
        fn._summary[mark] = timeTaken;
        delete fn.obj[mark];
        return timeTaken;
    };
    return fn;
}

module.exports = perf;
