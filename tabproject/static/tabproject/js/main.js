
/*global require*/
// 'use strict';

// Require.js allows us to configure shortcut alias
require.config({

	// baseURI: "static/tabproject/js/main",
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
		// app: {
		// 	deps:[
		// 	'tab_model',
		// 	'tab_view',
		// 	'tab_animation',
		// 	'slider'
		// 	]
		// }
	},
	paths: {
		// Library
		jquery: '../lib/jquery/jquery-2.2.0.min',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone-min',
		backboneLocalstorage: '../lib/backbone.localstorage/backbone.localStorage-min',

		// Developing MVC Javascript module

		//==	Model 	==//
		tab_model: 'models/tab',
		measure_model: 'models/measure',
		musicnote_model: 'models/musicnote',

		//== Collection	==//
		measure_set: 'collections/measureSet',

		//==	View 	==//
		tab_view: 'views/tab-view',
		tab_animation: 'views/tabAnimation',
		measure_view: 'views/measure-view',
		musicnote_view: 'views/musicnote-view',
		slider: 'views/slider',

	}
});

require([
	'backbone',
	'app',
	'routers/router'
], function (Backbone, App, Workspace) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new Workspace();
	Backbone.history.start();

	console.log('hello require JS');
	// Initialize the application view
	// console.log(App);
	new App().getInstance().start();
});