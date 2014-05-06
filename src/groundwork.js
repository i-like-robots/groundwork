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
         * @param  {Object} scope
         * @return {Object}
         */
        startup: function(scope) {
            var i, len, elements, componentList;

            // Set default options if .config() has not been called
            if (!this.options) {
                this.options = Object.create(defaults);
            }

            elements = this.getElements(scope);

            for (i = 0, len = elements.length; i < len; i++) {
                componentList = elements[i].getAttribute(this.options.attribute).split(",");
                core.loadElement(elements[i], componentList);
            }

            return this;
        },


        /**
         * Shutdown
         * @param  {Object} scope
         * @return {Object}
         */
        shutdown: function(scope) {
            var i, len, elements;

            elements = this.getElements(scope);

            for (i = 0, len = elements.length; i < len; i++) {
                core.unloadElement(elements[i]);
            }

            return this;
        },


        /**
         * Reload
         * @param  {Object} scope
         * @return {Array}
         */
        getElements: function(scope) {
            return (scope || this.options.scope).querySelectorAll("[" + this.options.attribute + "]");
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