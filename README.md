# Groundwork.JS

A simple drop-in bootstrap for loading and binding AMD components to your document.

## Why Groundwork.JS

Groundwork.JS exists to try and fill the gap between your HTML document and JavaScript by introducing convention and a simple API. With Groundwork.JS there is no need to include all your scripts when not all of them will be required specify and no need to specify which components to load on each page. Groundwork.JS is ideal for CMS environments where pages or page content can be changed on-the-fly.

No more including and attempting to instantiate all of your components at once:

```javascript
$(function() {
    $('.tabs').tabsPlugin();
    $('.slider').sliderPlugin();
    $('a[rel=modal]').modalWindowPlugin();
    $('.expander').expandableTextPlugin();
});
```

No need for rigidly defined views or nested logical steps:

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
controller("BlogPostController", ["slider"], function($scope, slider) {
    $scope.find(".expander").expandableTextPlugin();
});

// controllers/BlogPostController.js
controller("BlogPostController", ["slider"], function($scope, slider) {
    $scope.find(".slider").sliderPlugin();
    $scope.find('a[rel=modal]').modalWindowPlugin();
});
```

Groundwork.JS is just the glue between your document and JavaScript components, an attribute defines the modules to be loaded on demand:

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
