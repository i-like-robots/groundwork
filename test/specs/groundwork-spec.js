define(["groundwork", "groundwork/core"], function(gw, core) {

    describe("Config", function() {

        afterEach(function() {
            gw.options = undefined;
        });

        it("Should merge the given options with the default options", function() {

            var userSettings = {
                scope: "foo",
                attribute: "bar"
            };

            gw.config(userSettings);

            expect(gw.options.scope).toBe(userSettings.scope);
            expect(gw.options.attribute).toBe(userSettings.attribute);

        });

        it("Should return itself to enable chaining", function() {
            var result = gw.config({});
            expect(result).toEqual(gw);
        });

    });


    xdescribe("Startup", function() {

        it("Should find elements, load modules and instantiate components", function() {

        });

    });


    xdescribe("Shutdown", function() {

        it("Should iterate through elements and teardown components", function() {

        });

    });


    describe("Get component", function() {

        it("Should return the component instance for the given element and component name", function() {

            var fixture = document.createElement("div");
            var storage = core.getElementStorage(fixture);

            storage["foo"] = "bar";

            var result = gw.getComponent(fixture, "foo");

            expect(result).toEqual("bar");

        });

    });

});