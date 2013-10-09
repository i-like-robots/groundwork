define(["groundwork/core"], function(core) {

    describe("GUID", function() {

        it("Should return a unique-ish string each time it is called", function() {

            var IDs = [];
            var number = 100;

            while (number--) {
                IDs.push(core.GUID());
            }

            for (var i = 0, len = IDs.length; i < len; i++) {

                var result = IDs.filter(function(e) {
                    return e === IDs[i];
                });

                expect(result.length).toEqual(1);
            }

        });

    });


    describe("Get elements", function() {

        it ("Should find DOM elements within a given scope", function() {

            var scope = document.getElementById("core-get-elements");
            var result = core.getElements(scope, "div");

            expect(result.length).toEqual(2);

        });

    });


    describe("Get element storage", function() {

        var fixture = document.createElement("div");

        it("Should return an empty object when no related storage is found for the given element", function() {

            var storage = core.getElementStorage(fixture);
            var result = Object.keys(storage);

            expect(result.length).toEqual(0);

        });

        it("Should assign an ID to the given element when no related storage is found", function() {

            var result = fixture.getAttribute("data-gw-id");
            expect(result).toBeTruthy();

        });

        it("Should return a reference to the storage for the given element", function() {

            var storage = core.getElementStorage(fixture);
            storage.foo = "bar";
            var result = core.getElementStorage(fixture);

            expect(result.hasOwnProperty("foo")).toEqual(true);

        });

    });


    describe("Handle element", function() {

        it("Should iterate over each value of a comma-separated string defined on the given element", function() {

            var fixture = document.createElement("div");
            fixture.setAttribute("data-gw-component", "foo,bar,baz");

            core.handleElement(fixture, "data-gw-component", function(el, result) {
                expect(result).toMatch(/foo|bar|baz/);
            });

        });

    });


    describe("Create new component instance", function() {

        var fixture = document.createElement("div");

        it("Should create a new instance when the given module returns a constructor function", function() {

            var instance = function(element) {
                expect(element).toEqual(fixture);
            };

            var moduleWrapper = function() {
                return instance;
            };

            var result = core.newComponent(fixture, moduleWrapper);

            expect(result instanceof instance).toEqual(true);
        });

        it("Should clone and call the 'init' function when the given module returns an object", function() {

            var instance = {
                init: function(element) {
                    expect(element).toEqual(fixture);
                }
            };

            var moduleWrapper = function() {
                return instance;
            };

            var result = core.newComponent(fixture, moduleWrapper);

            expect(Object.getPrototypeOf(result)).toEqual(instance);
        });

    });


    describe("Load component", function() {

        it("Should load the requested module and store the new component instance", function() {

            var fixture = document.createElement("div");
            var result = false;

            spyOn(core, "newComponent").andCallFake(function() {
                result = true;
            });

            runs(function() {
                core.loadComponent(fixture, "foo");
            });

            waitsFor(function() {
                return result;
            }, "Module to load", 500);

            runs(function() {

                var storage = core.getElementStorage(fixture);

                expect(result).toEqual(true);
                expect(core.newComponent).toHaveBeenCalled();
                expect(storage.hasOwnProperty("foo")).toEqual(true);

            });

        });

    });


    describe("Unload component", function() {

        it("Should call the 'teardown' of the given component and remove it from storage", function() {

            var fixture = document.createElement("div");
            var storage = core.getElementStorage(fixture);
            var spy = jasmine.createSpy("spy");

            storage["foo"] = {
                teardown: spy
            };

            core.unloadComponent(fixture, "foo");

            expect(spy).toHaveBeenCalled();
            expect(storage.foo).not.toBeDefined();

        });

    });

});