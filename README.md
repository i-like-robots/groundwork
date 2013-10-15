# [Groundwork.JS](https://github.com/i-like-robots/groundwork)

A simple drop-in bootstrap for loading and binding AMD components to your document.

## What's the problem?

Using Groundwork.JS you can avoid common performance and maintainability pitfalls:

1. Loading and attempting to instantiate all components at once

    ```javascript
    $(function() {
        $('.tabs').tabsPlugin();
        $('.slider').sliderPlugin();
        $('a[rel=modal]').modalWindowPlugin();
        $('.expander').expandableTextPlugin();
    });
    ```

1. Rigidly defining views and dependencies

    ```javascript
    // modules/BlogModule.js
    module("blog", ["router"], function(router) {
        router.when("/", {
            controller: "BlogArchiveController"
        });
        router.when("/view/:post", {
            controller: "BlogPostController"
        });
    });

    // controllers/BlogArchiveController.js
    controller("BlogPostController", ["expandableTextPlugin"], function($scope) {
        $scope.find(".expander").expandableTextPlugin();
    });

    // controllers/BlogPostController.js
    controller("BlogPostController", ["sliderPlugin", "modalWindowPlugin"], function($scope) {
        $scope.find(".slider").sliderPlugin();
        $scope.find('a[rel=modal]').modalWindowPlugin();
    });
    ```

## What's the solution?

Groundwork.JS is just the glue between your document and JavaScript components, an attribute defines the modules to be loaded and instantiated on demand and is ideal for environments where pages and content can be created or changed without consulting a developer:

```html
<!-- webpage.html -->
<div class="slider" data-gw-component="slider-widget">
    <ul>
        <li>…</li>
        <li>…</li>
        <li>…</li>
    </ul>
</div>
```

```javascript
// components/slider-widget.js
define(function() {

    return {
        init: function() { … },
        next: function() { … },
        prev: function() { … },
        teardown: function() { … }
    };

});
```

Groundwork.JS takes advantage of the [AMD format](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailamd) which is well suited to in-browser development and as an aid to creating scalable code.

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

    ```javascript
    require(["groundwork"], function(groundwork) {
        groundwork.startup();
    });
    ```

## Support

Groundwork.JS is designed to be resilient and will work in any browser with support for [`querySelector`](http://caniuse.com/#feat=queryselector) and [`Object.create`](http://kangax.github.io/es5-compat-table/#Object.create). IE is therefore supported down to version 8 providing an [`Object.create`](http://javascript.crockford.com/prototypal.html) shim is provided.

```javascript
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
