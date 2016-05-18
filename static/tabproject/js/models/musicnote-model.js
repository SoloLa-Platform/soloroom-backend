// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

// Backbone for musicNote model
(function(){
	'use strict';
	
	app.MusicNode = Backbone.Model.extend({		
		defaults:{
			fretValue:-1,
			stringNum:-1,
			chronon:-1, // gridded quatum for view
			tech:{}
		}
	});
})();
