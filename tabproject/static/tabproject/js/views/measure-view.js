var app = app || {};
(function () {

	'use strict';
	app.MeasureView = Backbone.View.extend({

		// musicnotesView:[],
		el:"g",
		MNViews:[],
		initialize: function () {
			// add each view of ecah musicnote
			// console.log('create measure View');

		},
		addMView: function (v) {
			 this.MNViews.push(v);
		},
		getMNViewsArray: function () {
			 return this.MNViews;
		}


	});
})(jQuery);