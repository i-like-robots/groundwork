define(["groundwork", "groundwork/core"], function(groundwork, core) {

    describe("Config", function() {

        afterEach(function() {
            groundwork.options = undefined;
        });

        it("Should merge the given options with the default options", function() {

            var userSettings = {
                scope: "foo",
                attribute: "bar"
            };

            groundwork.config(userSettings);

            expect(groundwork.options.scope).toBe(userSettings.scope);
            expect(groundwork.options.attribute).toBe(userSettings.attribute);

        });

        it("Should return itself to enable chaining", function() {
            var result = groundwork.config({});
            expect(result).toEqual(groundwork);
        });

    });

    describe("Startup", function() {

        it("Should find elements, load modules and instantiate specified components", function() {

            var fixture = document.getElementById("startup");

            spyOn(core, "loadComponent").andCallThrough();

            spyOn(core, "newComponent").andCallThrough();

            runs(function() {
                groundwork.startup(fixture);
            });

            waitsFor(function() {
                return core.newComponent.calls.length === 2 && core.loadComponent.calls.length === 2;
            }, "2 modules to be loaded and instantiated", 5000);

            runs(function() {

                expect(fixture.children[0].getAttribute("data-gw-id")).toBeDefined();
                expect(fixture.children[1].getAttribute("data-gw-id")).toBeDefined();

                var result_1 = groundwork.getComponentInstance(fixture.children[0], "foo");
                var result_2 = groundwork.getComponentInstance(fixture.children[1], "bar");

                expect(result_1).toBeDefined();
                expect(result_2).toBeDefined();

            });

        });

    });

    describe("Shutdown", function() {

        it("Should iterate through elements and teardown all components", function() {

            var fixture = document.getElementById("shutdown");
            var fixture_1 = fixture.children[0];
            var fixture_2 = fixture.children[1];
            var storage_1 = core.getElementStorage(fixture_1);
            var storage_2 = core.getElementStorage(fixture_2);
            var spy_1 = jasmine.createSpy("spy");
            var spy_2 = jasmine.createSpy("spy");

            storage_1.foo = {
                teardown: spy_1
            };

            storage_1.bar = {};

            storage_2.foo = {
                teardown: spy_2
            };

            storage_2.bar = {};

            groundwork.shutdown(fixture);

            expect(spy_1).toHaveBeenCalled();
            expect(spy_2).toHaveBeenCalled();
            expect(storage_1.foo).not.toBeDefined();
            expect(storage_1.bar).not.toBeDefined();
            expect(storage_2.foo).not.toBeDefined();
            expect(storage_2.bar).not.toBeDefined();

        });

    });

    describe("Get component instance", function() {

        it("Should return the component instance for the given element and component name", function() {

            var fixture = document.createElement("div");
            var storage = core.getElementStorage(fixture);

            storage.foo = "bar";

            var result = groundwork.getComponentInstance(fixture, "foo");

            expect(result).toEqual("bar");

        });

    });

});