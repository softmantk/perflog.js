const assert = require("assert");

//todo add sinon (spy) testing
describe("debug", () => {
    it("passes a basic sanity test", () => {
        assert.doesNotThrow(() => {
            const perfGen = require("./");
            const perf = perfGen();
            perf("test");
            perf("test");
        });
    });

});
