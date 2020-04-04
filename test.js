const assert = require("assert");
const perfGen = require("./");
const delayFn = (fn, delay = 1000) => {
    return new Promise((res, rej) => [
        setTimeout(() => {
            fn();
            res();
        }, delay)
    ]);
};
//todo add sinon (spy) testing
describe("debug", () => {
    it("passes a basic sanity test", () => {
        assert.doesNotThrow(() => {
            const perf = perfGen({inLineLog: false});
            perf("test");
            delayFn(() => 0, 2000);
            perf("test");
        });
    });
    it("should contain the 'marker' as a property in _summary object", () => {
        const perf = perfGen({inLineLog: false});
        perf("test");
        delayFn(() => 0, 2000);
        perf("test");
        assert.ok(perf._summary.hasOwnProperty("test"));
    });
    it("performance value should be a number", async () => {
        const perf = perfGen({inLineLog: false});
        perf("start");
        await delayFn(() => 0, 20);
        perf("start");
        assert.equal(typeof perf._summary.start, "number");
    });
    describe("switching the functionality", () => {
        it("should be on if forced is on", async () => {
            const perf1 = perfGen({enabled: false, forced: true, inLineLog: false});
            perf1("start");
            await delayFn(() => 0, 10);
            perf1("start");

            assert.ok(perf1._summary.start);

            const perf2 = perfGen({enabled: false, forced: true, inLineLog: false});

            perf2("start");
            await delayFn(() => 0, 20);
            perf2("start");
            assert.ok(perf2._summary.start);
        });
        it("should be off if forced is off", async () => {
            const perf1 = perfGen({enabled: false, forced: false, inLineLog: false});
            perf1("start");
            await delayFn(() => 0, 10);
            perf1("start");
            assert.ok(!perf1._summary);

            const perf2 = perfGen({enabled: false, forced: false, inLineLog: false});

            perf2("start");
            await delayFn(() => 0, 20);
            perf2("start");
            assert.ok(!perf2._summary);
        });
    });
    
    // describe("In line logging", () => {
    //     it("should write in terminal if I turned inLineLog on", async () => {
    //         //todo incomplete
    //         const perf = perfGen();
    //         perf("start");
    //         await delayFn(() => 0, 20);
    //         perf("start");
    //         const unhook = setupLogTest((string, encoding, fd)=>{
    //             assert(string, "sss")
    //         });
    //         unhook()
    //     });
    // });
});
