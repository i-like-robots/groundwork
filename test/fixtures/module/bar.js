define(function() {

    return function(sandbox) {

        return {
            init: function(element) {
                this.target = element;
                this.target.setAttribute("bar", true);
            },
            teardown: function() {
                this.target.removeAttribute("bar");
            }
        };

    };

});