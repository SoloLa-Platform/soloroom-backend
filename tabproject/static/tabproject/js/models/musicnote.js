// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

// Backbone for musicNote model
(function(){

	'use strict';

	app.MusicNote = Backbone.Model.extend({

		defaults:{
			"tabLineNum": 0,
			"fretNum": 0,
			"duration": 0,
			"tech": {}
		},
		initialize: function () {
			 console.log("MN Model Create");
		}
	});
})();
