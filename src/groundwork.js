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
            var i, t, len, len_t, elements, componentList;

            // Set default options if .config() has not been called
            if (!this.options) {
                this.options = Object.create(defaults);
            }

            elements = (scope || this.options.scope).querySelectorAll("[" + this.options.attribute + "]");

            for (i = 0, len = elements.length; i < len; i++) {
                componentList = elements[i].getAttribute(this.options.attribute).split(",");

                for (t = 0, len_t = componentList.length; t < len_t; t++) {
                    core.loadComponent(elements[i], componentList[t]);
                }
            }

            return this;
        },


        /**
         * Shutdown
         * @param  {Object} scope
         * @return {Object}
         */
        shutdown: function(scope) {
            var i, len, elements, activeComponents, componentName;

            elements = (scope || this.options.scope).querySelectorAll("[" + this.options.attribute + "]");

            for (i = 0, len = elements.length; i < len; i++) {
                activeComponents = core.getElementStorage(elements[i]);

                if (! activeComponents) {
                    continue;
                }

                for (componentName in activeComponents) {
                    if (activeComponents.hasOwnProperty(componentName)) {
                        core.unloadComponent(elements[i], componentName);
                    }
                }
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