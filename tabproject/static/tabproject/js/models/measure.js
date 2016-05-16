var app = app || {};

(function () {
	"use strict";
	app.Measure = Backbone.Model.extend({
		// ===========
		// Properties
		// ===========
		defaults: {
			// Measure Attribues
			number:0,
			divisions:0,
			time_beat_type:0,
			time_beats:0,
			// tuning
			staff_tuning_1:"E",
			staff_tuning_2:"B",
			staff_tuning_3:"G",
			staff_tuning_4:"D",
			staff_tuning_5:"A",
			staff_tuning_6:"E",

			// Notes
			mnsArray:[]

			// Beats
		},
		initialize: function(){


		},
		setMNs: function(notes){
			var l = notes.length;
			for(var j = 0; j < l; j++){

					// console.log("MN:"+j);
					if (notes[j].hasOwnProperty("rest")){
						console.log('rest');
						this.defaults.mnsArray.push(new app.MusicNote({
								duration: notes[j].duration,
							})
						);
					}
					else{
						// Create a new MN for each note
						this.defaults.mnsArray.push(new app.MusicNote({

								tabLineNum: notes[j].notations.technical.string,
								fretNum: notes[j].notations.technical.fret,
								duration: notes[j].duration,
								alter: notes[j].pitch.alter,
								octave: notes[j].pitch.octave,
								step: notes[j].pitch.step,
							})
						);

						// console.log(musicnote);
					}
			}
		},
		setAttr: function (a) {

			// if( typeof a !== "undefined" ){
				// console.log('in undefined');
				this.defaults.divisions = a.divisions;
				this.defaults.time_beat_type = a.time["beat-type"];
				this.defaults.time_beats = a.time.beats;
				for (var i = 0; i < 6; i++) {
				 	this.defaults['staff_tuning_'+(i+1).toString()] = a["staff-details"]["staff-tuning"][i]["tuning-step"];
				}
			// }
		},
		dump: function() {
			 console.log(this);
		}

	});


})();