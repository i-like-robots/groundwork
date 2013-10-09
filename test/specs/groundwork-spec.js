define(["groundwork"], function(gw) {

    describe("Config", function() {

        afterEach(function() {
            gw.options = undefined;
        });

        it("Should merge the given options with the default options", function() {

            var custom = {
                scope: "foo",
                attribute: "bar"
            };

            gw.config(custom);

            expect(gw.options.scope).toBe(custom.scope);
            expect(gw.options.attribute).toBe(custom.attribute);

        });

        it("Should return itself to enable chaining", function() {
            var result = gw.config({});
            expect(result).toEqual(gw);
        });

    });

    xdescribe("Startup", function() {

    });

    xdescribe("Shutdown", function() {

    });

    xdescribe("Get component", function() {

    });

});