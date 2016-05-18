// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

(function(){
	'use strict';
	// handle MusicXml
	app.tab = Backbone.Model.extend({
		
		defaults:{
			"tabLine":[]
		},

		initialize: function(){
			console.log('init tabModel!');
			
			this.on("testEvnet", function (msg) {
			 console.log('test Event fires '+ name);});
		},
		setOrigin: function(){

		}
		

	});
	
})();