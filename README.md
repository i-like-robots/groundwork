# GroundworkJS

A simple bootstrap for loading and binding DOM elements to JavaScript modules in an understandable way. A simple glue between the HTML and scripts that act upon it. For more information check out [Introducing GroundworkJS](http://maketea.co.uk/2013/11/05/introducing-groundwork-js.html).

```html
<!-- webpage.html -->
<div data-gw-component="widget/slider">
    <ul>
        <li>…</li>
        <li>…</li>
        <li>…</li>
    </ul>
</div>
```

```javascript
// js/component/widget/slider.js
define(function() {

    return {
        init: function(element) { … },
        next: function() { … },
        prev: function() { … },
        teardown: function() { … }
    };

});
```

GroundworkJS utilises [AMD compatible modules](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailamd) which are well suited to in-browser development and as an aid to creating scalable code.

## Requirements

A JavaScript module loader such as [RequireJS](http://www.requirejs.org/) or [curl.js](https://github.com/cujojs/curl).

## Setup

1. Configure the module loader to include a `component` path

    ```javascript
    // RequireJS
    require.config({
        baseUrl: "/assets",
        paths: {
            component: "js/component"
        }
    });

    // curl.js
    curl.config({
        apiName: "require",
        baseUrl: "/assets",
        paths: {
            component: "js/component"
        }
    });
    ```
2. Bootstrap the application

    ```html
    <!-- RequireJS -->
    <script src="vendor/require.js" data-main="js/bootstrap"></script>

    <!-- curl.js -->
    <script src="vendor/curl.js" data-curl-run="js/bootstrap.js"></script>
    ```

    ```javascript
    // js/bootstrap.js
    require(["groundwork"], function(groundwork) {
        groundwork.startup();
    });
    ```

## API

### `startup([scope])`

Initialises all components within <var>scope</var>.

### `shutdown([scope])`

Teardown all component instances within <var>scope</var>.

### `reload()`

Teardown then re-initialise all components. Also cleans up component instances for elements no longer on the page.

### `getComponentInstance(element, componentName)`

Returns the ìnstance of <var>componentName</var> on <var>element</var>.

## Browser support

GroundworkJS is designed to be resilient and will work in any browser with support for [`querySelector`](http://caniuse.com/#feat=queryselector) and [`Object.create`](http://kangax.github.io/es5-compat-table/#Object.create). IE is therefore supported down to version 8 providing [an appropriate shim](http://javascript.crockford.com/prototypal.html) for the latter is provided.

```javascript
// js/bootstrap.js
require(["groundwork"], function(groundwork) {

    // Cut the mustard
    // <http://responsivenews.co.uk/post/18948466399/cutting-the-mustard>
    if (! window.querySelector) {
        return;
    }

    // Object.create() shim
    // <http://javascript.crockford.com/prototypal.html>
    if (typeof Object.create !== "function") {
        Object.create = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    groundwork.startup();

});
```
