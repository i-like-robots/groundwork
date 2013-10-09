define("groundwork", ["groundwork/core"], function(core) {


    /**
     * Default options
     * @type {Object}
     */
    var defaults = {
        scope:     document,
        attribute: "data-gw-component"
    };


    /**
     * Sandbox to inject into component instances
     * @type {Object}
     */
    var sandbox = {};


    /**
     * Loaded elements
     * @type {NodeList}
     */
    var elements = [];


    /**
     * Public interface
     * @type {Object}
     */
    var exports = {


        /**
         * Set configuration options
         * @param  {Object} config
         * @return {Object}
         */
        config: function(config) {
            this.options = {
                scope:     config.scope     || defaults.scope,
                attribute: config.attribute || defaults.attribute
            };

            return this;
        },


        /**
         * Startup
         * @return {Object}
         */
        startup: function() {
            var i, len, element;

            // Set default options if .config() has not been called
            if (!this.options) {
                this.options = Object.create(defaults);
            }

            elements = core.getElements(this.options.scope, "[" + this.options.attribute + "]");

            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                core.handleElement(element, this.options.attribute, core.loadComponent);
            }

            return this;
        },


        /**
         * Shutdown
         * @return {Object}
         */
        shutdown: function() {
            var i, len, element;

            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                core.handleElement(element, this.options.attribute, core.unloadComponent);
            }

            return this;
        },


        /**
         * Get component
         * @param  {Object} element
         * @param  {String} componentName
         * @return {Object|Function}
         */
        getComponent: function(element, componentName) {
            return core.getElementStorage(element)[componentName];
        }

    };


    return exports;

});