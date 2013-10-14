# Groundwork.JS

A simple drop-in bootstrap for loading and binding AMD components to your document.

With Groundwork.JS there is no need to include all your scripts and repeatedly search the DOM:

```javascript
$(function() {
	$('.slider').sliderPlugin();
});
```

Groundwork.JS is flexible and doesn't require rigidly defined views or nested logical steps:

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

// controllers/BlogPostController.js
controller("BlogPostController", ["slider"], function($scope, slider) {
	$scope.find(".slider").sliderPlugin();
});
```

Groundwork.JS is just the glue between your document and JavaScript components, an attribute defines the modules to be loaded on demand:

```html
<div class="slider" data-gw-component="slider-widget">
	<ul>
		<li>…</li>
		<li>…</li>
		<li>…</li>
	</ul>
</div>
```

```javascript
define(function() {

	return {
		init: function() { … },
		next: function() { … },
		prev: function() { … },
		teardown: function() { … }
	};

});
```

Groundwork.js defines a simple API and introduces convention to your website JavaScript.