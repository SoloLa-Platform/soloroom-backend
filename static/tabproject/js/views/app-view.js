// Global Variable
var app = app || {};

(function(){
	'use strict';

	app.AppView = Backbone.View.extend({
		initialize: function(){
			this.tab = new app.TabView( {model:app.Tab});
		}
	});

})(jQuery);
