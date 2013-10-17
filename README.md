# [Groundwork.JS](https://github.com/i-like-robots/groundwork)

A simple drop-in bootstrap for loading and binding AMD components to your document.

## What's the problem?

Using Groundwork.JS you can avoid common performance and maintainability pitfalls:

1. No more loading and attempting to instantiate all site components at once:

    ```html
    <!-- webpage.html -->
    <script src="js/vendor/jquery.js"></script>
    <script src="js/plugins/tabs.js"></script>
    <script src="js/plugins/slider.js"></script>
    <script src="js/plugins/modalWindow.js"></script>
    <script src="js/plugins/expandableText.js"></script>
    <script src="js/bootstrap.js"></script>
    ```

    ```javascript
    // js/bootstrap.js
    $(function() {
        $('.tabs').tabsPlugin();
        $('.slider').sliderPlugin();
        $('a[rel=modal]').modalWindowPlugin();
        $('.expander').expandableTextPlugin();
    });
    ```

1. No need to manually define views and dependencies:

    ```javascript
    // js/modules/BlogModule.js
    module("blog", ["router"], function(router) {
        router.when("/", {
            controller: "BlogArchiveController"
        });
        router.when("/view/:post", {
            controller: "BlogPostController"
        });
    });

    // js/controllers/BlogArchiveController.js
    controller("BlogPostController", ["plugins/expandableText"], function() {
        $(".expander").expandableTextPlugin();
    });

    // js/controllers/BlogPostController.js
    controller("BlogPostController", ["plugins/slider", "plugins/modalWindow"], function() {
        $(".slider").sliderPlugin();
        $('a[rel=modal]').modalWindowPlugin();
    });
    ```

## What's the solution?

Groundwork.JS is just the glue between your document and JavaScript components, an attribute defines the modules to be loaded and instantiated on demand and is ideal for environments where pages and content can be created or changed without consulting a developer:

```html
<!-- webpage.html -->
<div data-gw-component="slider">
    <ul>
        <li>…</li>
        <li>…</li>
        <li>…</li>
    </ul>
</div>
```

```javascript
// js/components/slider.js
define(function() {

    return {
        init: function() { … },
        next: function() { … },
        prev: function() { … },
        teardown: function() { … }
    };

});
```

Groundwork.JS uses the [AMD format](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailamd) which is well suited to in-browser development and as an aid to creating scalable code.

## Requirements

A JavaScript module loader such as [RequireJS](http://www.requirejs.org/) or [curl.js](https://github.com/cujojs/curl).

## Setup

1. Configure your module loader paths to include a `component` path

    ```javascript
    // RequireJS
    require.config({
        baseUrl: "/assets/dist",
        paths: {
            component: "js/components"
        }
    });

    // curl.js
    curl.config({
        apiName: "require",
        baseUrl: "/assets/dist",
        paths: {
            component: "js/components"
        }
    });
    ```
2. Bootstrap the application

    ```html
    <!-- webpage.html -->
    <script src="js/vendor/require.js" data-main="js/bootstrap"></script>
    ```

    ```javascript
    // js/bootstrap.js
    require(["groundwork"], function(groundwork) {
        groundwork.startup();
    });
    ```

## Support

Groundwork.JS is designed to be resilient and will work in any browser with support for [`querySelector`](http://caniuse.com/#feat=queryselector) and [`Object.create`](http://kangax.github.io/es5-compat-table/#Object.create). IE is therefore supported down to version 8 providing [an appropriate shim](http://javascript.crockford.com/prototypal.html) for the latter is provided.

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
