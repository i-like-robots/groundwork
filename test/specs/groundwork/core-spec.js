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


    describe("Create new component instance", function() {

        var fixture = document.createElement("div");

        it("Should create a new instance when the given module returns a constructor function", function() {

            var component = function(element) {
                expect(element).toEqual(fixture);
            };

            var result = core.newComponent(fixture, component);

            expect(result instanceof component).toEqual(true);
        });

        it("Should clone and call the 'init' function when the given module returns an object", function() {

            var component = {
                init: function(element) {
                    expect(element).toEqual(fixture);
                }
            };

            var result = core.newComponent(fixture, component);

            expect(Object.getPrototypeOf(result)).toEqual(component);
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
            var spy_1 = jasmine.createSpy("spy");
            var spy_2 = jasmine.createSpy("spy");

            var Mock = function() {};
            Mock.prototype.teardown = spy_1;

            storage["foo"] = {
                teardown: spy_2
            };

            storage["bar"] = new Mock();

            core.unloadComponent(fixture, "foo");
            core.unloadComponent(fixture, "bar");

            expect(spy_1).toHaveBeenCalled();
            expect(spy_2).toHaveBeenCalled();
            expect(storage.foo).not.toBeDefined();
            expect(storage.bar).not.toBeDefined();

        });

    });

});