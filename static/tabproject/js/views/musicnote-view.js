var app = app || {};


(function(){
	'use strict';
	app.MusicNoteView = Backbone.View.extend({

		el:'text',
		cells:[],

		initialize: function (para) {
			console.log("MN View create!");
			this.model = para.model;
			this.cells = para.cells;
		},
		render: function () {

		},
		drawFretNum: function (w, h, oy) {
			// draw fret on leftmost cell
			var x = this.cells[0].x*w;
			var y = this.cells[0].y*h-18;

			var fretNum = this.model.get("fretNum");

			var xmlns = "http://www.w3.org/2000/svg";
			var n = document.createElementNS(xmlns, "text");
			var offset = 45;
			var textOffset = 10;
			n.setAttributeNS(null,"x",x);
			n.setAttributeNS(null,"y",y);
			n.setAttributeNS(null,"fill","blue");
			n.textContent = fretNum;
			return n;
		},
		drawDurBar: function () {

		},
		// Testing Function for Dump
		dump: function () {
			console.log(this);
			 // console.log(this.model.toJSON());
		}
	});
})(jQuery);