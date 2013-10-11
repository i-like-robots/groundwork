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
         * @return {Object}
         */
        startup: function() {
            var i, len, element, componentList;

            // Set default options if .config() has not been called
            if (!this.options) {
                this.options = Object.create(defaults);
            }

            this.elements = core.getElements(this.options.scope, "[" + this.options.attribute + "]");

            for (i = 0, len = this.elements.length; i < len; i++) {
                element = this.elements[i];
                componentList = element.getAttribute(this.options.attribute).split(",");

                for (t = 0, len_t = componentList.length; t < len_t; t++) {
                    core.loadComponent(element, componentList[t]);
                }
            }

            return this;
        },


        /**
         * Shutdown
         * @return {Object}
         */
        shutdown: function() {
            var i, len, element, activeComponents, componentName;

            for (i = 0, len = this.elements.length; i < len; i++) {
                element = this.elements[i];
                activeComponents = core.getElementStorage(element);

                for (componentName in activeComponents) {
                    if (activeComponents.hasOwnProperty(componentName)) {
                        core.unloadComponent(element, componentName);
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