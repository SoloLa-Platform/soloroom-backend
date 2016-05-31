define([
	'backbone'

	],function(Backbone){

		'use strict';
		var MusicNote =  Backbone.Model.extend({
		// Data Structure is mapping to MusicXML <note> tag
		// Main 3 compoment are:
		// - <duration>
		// - <notations>
		// - <pitch>
			defaults:{

				"duration": 0,
				"onset": -1, // Custom Defintion
				// Original hierarchy of <notation>
				// - technical
				// 	 - fret
				//   - string
				"tabLineNum": 0,
				"fretNum": 0,

				// Original hierarchy of <pitch>
				// - pitch
				//	 - alter
				//   - octave
				//   - step
				"alter": '',
				"octave": '',
				"step": '',
				"freq": -1, // Custom Defintion

				// Custom Tag for MusicXML
				// it will map to <notation>/<technical>
				"tech": {}
			},
			initialize: function () {

				 // console.log("MN Model Create");
				 // console.log(this.defaults);
			}
		});
		return MusicNote;
});


