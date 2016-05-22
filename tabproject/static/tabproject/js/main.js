
/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	
	baseURI: "static/tabproject/js/main",
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../lib/jquery/jquery-2.2.0.min',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone-min',
		backboneLocalstorage: '../lib/backbone.localstorage/backbone.localStorage',

	}
});

require([
	'backbone',
	// 'views/app',
	// 'routers/router'
], function (Backbone, AppView, Workspace) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	// new Workspace();
	Backbone.history.start();

	// Initialize the application view
	// new AppView();
});