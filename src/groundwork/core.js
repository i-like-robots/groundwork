define("groundwork/core", function() {

    "use strict";

    /**
     * Component instances
     * @type {Object}
     */
    var storage = {};

    /**
     * Public interface
     * @type {Object}
     */
    var exports = {

        storage: {},

        /**
         * GUID
         * Creates a pseudo-unique ID.
         * @return {String}
         */
        GUID: function() {
            return "xxxx-xxxx-xxxx".replace(/[x]/g, function(i) {
                return Math.ceil(Math.random() * 10).toString();
            });
        },

        /**
         * Get element storage
         * @param  {Object} element
         * @return {Object}
         */
        getElementStorage: function(element) {
            var ID = element.getAttribute("data-gw-id");

            if (!ID) {
                ID = this.GUID();
                storage[ID] = {
                    element: element,
                    components: {}
                };

                element.setAttribute("data-gw-id", ID);
            }

            return storage[ID].components;
        },

        /**
         * New component
         * @param  {Object} element
         * @param  {Function|Object} Definition
         * @return {Function|Object}
         */
        newComponent: function(element, Definition) {
            var instance;

            if (Definition.call) {
                instance = new Definition(element);
            }
            else {
                instance = Object.create(Definition);

                if (instance.hasOwnProperty("init")) {
                    instance.init(element);
                }
            }

            return instance;
        },

        /**
         * Load component
         * @param  {Object} element
         * @param  {String} componentName
         */
        loadComponent: function(element, componentName) {
            var self = this;
            var store = this.getElementStorage(element);

            if (! store.hasOwnProperty(componentName)) {
                window.require(["component/" + componentName], function(definition) {
                    store[componentName] = self.newComponent(element, definition);
                });
            }
        },

        /**
         * Load element
         * @param  {Object} element
         * @param  {Array} componentList
         */
        loadElement: function(element, componentList) {
            var i, len;

            for (i = 0, len = componentList.length; i < len; i++) {
                this.loadComponent(element, componentList[i]);
            }
        },

        /**
         * Unload component
         * @param  {Object} element
         * @param  {String} componentName
         */
        unloadComponent: function(element, componentName) {
            var store = this.getElementStorage(element);

            if (store[componentName] && store[componentName].teardown && store[componentName].teardown.call) {
                store[componentName].teardown();
            }

            delete store[componentName];
        },

        /**
         * Unload element
         * @param  {Object} element
         */
        unloadElement: function(element) {
            var store, componentName;

            store = this.getElementStorage(element);

            for (componentName in store) {
                if (store.hasOwnProperty(componentName)) {
                    this.unloadComponent(element, componentName);
                }
            }
        },

        /**
         * Prune
         */
        prune: function() {
            var element, elementID;

            for (elementID in storage) {
                element = storage[elementID].element;

                if (!document.documentElement.contains(element)) {
                    this.unloadElement(element);
                }
            }
        }

    };

    return exports;

});