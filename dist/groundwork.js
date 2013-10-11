define("groundwork/core",function(){var a={},b={GUID:function(){return"xxxx-xxxx-xxxx".replace(/[x]/g,function(){return Math.ceil(10*Math.random()).toString()})},getElements:function(a,b){return a.querySelectorAll(b)},getElementStorage:function(b){var c=b.getAttribute("data-gw-id");return c||(c=this.GUID(),a[c]={},b.setAttribute("data-gw-id",c)),a[c]},newComponent:function(a,b){var c;return b.call?c=new b(a):(c=Object.create(b),c.hasOwnProperty("init")&&c.init(a)),c},loadComponent:function(a,b){var c=this,d=this.getElementStorage(a);d.hasOwnProperty(b)||window.require(["component/"+b],function(e){d[b]=c.newComponent(a,e)})},unloadComponent:function(a,b){var c=this.getElementStorage(a);c[b]&&c[b].hasOwnProperty("teardown")&&c[b].teardown(),c[b]=void 0}};return b}),define("groundwork",["groundwork/core"],function(a){var b={scope:document,attribute:"data-gw-component"},c={config:function(a){return this.options={scope:a.scope||b.scope,attribute:a.attribute||b.attribute},this},startup:function(){var c,d,e,f;for(this.options||(this.options=Object.create(b)),this.elements=a.getElements(this.options.scope,"["+this.options.attribute+"]"),c=0,d=this.elements.length;d>c;c++)for(e=this.elements[c],f=e.getAttribute(this.options.attribute).split(","),t=0,len_t=f.length;len_t>t;t++)a.loadComponent(e,f[t]);return this},shutdown:function(){var b,c,d,e,f;for(b=0,c=this.elements.length;c>b;b++){d=this.elements[b],e=a.getElementStorage(d);for(f in e)e.hasOwnProperty(f)&&a.unloadComponent(d,f)}return this},getComponent:function(b,c){return a.getElementStorage(b)[c]}};return c});