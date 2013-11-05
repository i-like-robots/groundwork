define("groundwork/core", function() {

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

        /**
         * GUID
         * Creates a pseudo-unique ID.
         * @return {String}
         */
        GUID: function() {
            return 'xxxx-xxxx-xxxx'.replace(/[x]/g, function(i) {
                return Math.ceil(Math.random() * 10).toString();
            });
        },

        /**
         * Get Elements
         * @param  {Object} scope
         * @param  {String} selector
         * @return {NodeList}
         */
        getElements: function(scope, selector) {
            return scope.querySelectorAll(selector);
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
                storage[ID] = {};
                element.setAttribute("data-gw-id", ID);
            }

            return storage[ID];
        },


        /**
         * New component
         * @param  {Object} element
         * @param  {Function|Object} definition
         * @return {Function|Object}
         */
        newComponent: function(element, definition) {
            var instance;

            if (definition.call) {
                instance = new definition(element);
            }
            else {
                instance = Object.create(definition);

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
         * Unload component
         * @param  {Object} element
         * @param  {String} componentName
         */
        unloadComponent: function(element, componentName) {
            var store = this.getElementStorage(element);

            if (store[componentName] && store[componentName].teardown && store[componentName].teardown.call) {
                store[componentName].teardown();
            }

            store[componentName] = undefined;
        }

    };


    return exports;

});