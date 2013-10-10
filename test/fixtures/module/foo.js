define(function() {

    var Foo = function(element) {
        this.target = element;
        this.target.setAttribute("foo", true);
    };

    Foo.prototype.teardown = function() {
        this.target.removeAttribute("foo");
    };

    return Foo;

});