define(
	['backbone',
	 'jquery'],

	function (Backbone, $) {

		'use strict';
		console.log('hello from router');
		 var router = Backbone.Router.extend({
		 	routes:{
		 		'': 'index',
		 		'loading': 'loading'
		 	},
		 	index: function (argument) {
		 		 console.log('hello from router index');
		 		 // View doing work
		 	}

		 });
		 return router;
	}
);