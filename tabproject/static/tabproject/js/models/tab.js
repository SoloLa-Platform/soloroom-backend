// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

(function(){
	'use strict';
	// handle MusicXml
	app.Tab = Backbone.Model.extend({

		defaults:{
			"url":'parsing',
			division: 0
		},

		initialize: function(){
			console.log('init tabModel!');
			this.requestTabJSON(this.defaults.url);
		},
		requestTabJSON: function(tabUrl) {
			// var addMN = this.retriveMusicNote;

				this.ajax = $.ajax({

				url: tabUrl,
				datatype:'json',
				async: 'true',
				success: this.ajaxHandle.bind(this)
				});
		},
		ajaxHandle: function (result) {

			console.log('check context in ajaxHandle');
			console.log(this);

			var data = JSON.parse(result);
			var measures = data['score-partwise'].part.measure;

			// need to get first measure attribute, get the divide
			this.defaults.division = measures[0].attributes.divisions;
			console.log("total measure: " + measures.length);

			for (var i = 0; i < measures.length - 170; i++) {
				// console.log(" measure: "+i);
				var m = measures[i];
				for(var j = 0; j< m.note.length - 1; j++){
					// console.log(m.note[j].notations.technical.string);
					// console.log(m.note[j].notations.technical.fret);
					// console.log(m.note[j].duration);
					// console.log("note: "+j);
					var s = m.note[j].notations.technical.string;
					var f = m.note[j].notations.technical.fret;
					var d = m.note[j].duration;
					// Create a new MN for each note
					var musicnote = new app.MusicNote( {
						tabLineNum: s,
						fretNum: f,
						duration: d
					} );

					// collection add MusicNote Model
					app.MusicNotes.add( musicnote );
				}
			}
			console.log(app.MusicNotes);

		},
		dumpTab: function () {
			 console.log(this.defaults.tabObj);
		},

	});
})();