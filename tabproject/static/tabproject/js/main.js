
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
	},
	paths: {
		// Library
		jquery: '../lib/jquery/jquery-2.2.0.min',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone-min',
		backboneLocalstorage: '../lib/backbone.localstorage/backbone.localStorage-min',

		// RequireJS plugin
		text: '../lib/requirejs-plugin/text',
		async: '../lib/requirejs-plugin/async',
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
		playDashboard: 'views/playDashboard',
		search_bar: 'views/searchBar', // This module depend on Google API
		yt_player: 'views/YTplayer',

		/* == Internet Resource == */
		/* Google API */
		gapi_config: 'gapi/config',

		/* Api mananger */
		api_manager: 'gapi/APImanager',
		/* Helper function for view*/
		helper_draw: 'helpers/draw',

		/* Testing Animation */
		test_animation: 'sandbox/animation',


		/* Templates */
		search_result: 'templates/searchResult'
	}
});

require([
	'backbone',
	'app',
	'routers/router',
	'yt_player'
], function ( Backbone, App, Workspace, YT_player ) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()


	new Workspace();
	Backbone.history.start();
	

	// console.log('hello require JS');
	// Initialize the application view
	// console.log(App);
	new App().getInstance().start();


});