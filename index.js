const {performance} = require('perf_hooks');
module.exports = (mark) => {

    perf.obj = perf.obj || {};
    perf._summary = perf._summary || {};
    const time = performance.now();
    if (!perf.obj[mark]) {
        perf.obj[mark] = time;
        return 0;
    }

    const timeTaken = (time - perf.obj[mark]).toFixed(2);
    console.log(`PERF:${mark}:`, timeTaken);
    perf._summary[mark] = timeTaken;
    delete perf.obj[mark];
    return timeTaken;
};
