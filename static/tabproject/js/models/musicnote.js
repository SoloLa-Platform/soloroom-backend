// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

// Backbone for musicNote model
(function(){

	'use strict';

	app.MusicNote = Backbone.Model.extend({
		// Data Structure is mapping to MusicXML <note> tag
		// Main 3 compoment are:
		// - <duration>
		// - <notations>
		// - <pitch>
		defaults:{

			"duration": 0,

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

			// Custom Tag for MusicXML
			// it will map to <notation>/<technical>
			"tech": {}
		},
		initialize: function () {

			 // console.log("MN Model Create");
			 // console.log(this.defaults);
		}
	});
})();
