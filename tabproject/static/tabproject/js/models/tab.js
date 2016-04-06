// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

(function(){
	'use strict';
	// handle MusicXml
	app.Tab = Backbone.Model.extend({

		tabTree: {},

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
			console.log(measures);


			// need to get first measure attribute, get the divide
			this.defaults.division = measures[0].attributes.divisions;
			console.log("total measure: " + measures.length);


			// Get Unique Tree Id and new a TabTree
			this.tabTree = new app.TabTree();
			console.log('in tab, dump tabTree object');
			console.log(this.tabTree);

			for (var i = 0; i < measures.length - 175; i++) {
				// console.log(" measure: "+i);

				var m = measures[i];
				this.tabTree.append(m);

				for(var j = 0; j< m.note.length - 1; j++){

					// Create a new MN for each note
					var musicnote = new app.MusicNote({

						tabLineNum: m.note[j].notations.technical.string,
						fretNum: m.note[j].notations.technical.fret,
						duration: m.note[j].duration,
						alter: m.note[j].pitch.alter,
						octave: m.note[j].pitch.octave,
						step: m.note[j].pitch.step,
					});

					// collection add MusicNote Model
					app.MusicNotes.add( musicnote );
				}
			}
			console.log('append finish done');
			this.tabTree.dump();

		},
		dumpTab: function () {
			 console.log(this.defaults.tabObj);
		},

	});
})();