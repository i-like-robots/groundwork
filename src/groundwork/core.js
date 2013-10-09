define("groundwork/core", ["groundwork/sandbox"], function(sandbox) {

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
         * Handle element
         * @param {Object} element
         * @param {String} attribute
         * @param {Function} callback
         */
        handleElement: function(element, attribute, callback) {
            var i, len;
            var componentList = element.getAttribute(attribute).split(",");

            for (i = 0, len = componentList.length; i < len; i++) {
                callback(element, componentList[i]);
            }
        },


        /**
         * New component
         * @param  {Object} element
         * @param  {Function|Object} definition
         * @return {Function|Object}
         */
        newComponent: function(element, definition) {
            var rawModule = definition(sandbox);
            var instance;

            if (rawModule.call) {
                instance = new rawModule(element);
            }
            else {
                instance = Object.create(rawModule);

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

            if (store[componentName] && store[componentName].hasOwnProperty("teardown")) {
                store[componentName].teardown();
            }

            store[componentName] = undefined;
        }

    };


    return exports;

});