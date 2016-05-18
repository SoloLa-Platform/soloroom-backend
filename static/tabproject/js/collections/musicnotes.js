var app = app || {};

(function(){
	'use strict';

	var MusicNotes = Backbone.Collection.extend({

		localStorage: new Backbone.LocalStorage('musicNotes'),
		initialize: function (argument) {
			 console.log("MN Collection create!");
		}
	});
	// Create our global collection of **MusicNotes**.
	app.MusicNotes = new MusicNotes();

})();