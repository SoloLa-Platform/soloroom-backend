var app = app || {};


(function(){
	'use strict';
	app.MusicNoteView = Backbone.View.extend({

		el:'text',
		// model:app.MusicNote,

		initialize: function () {
			console.log("MN View create!");
			// this.drawFretNum('0',300, 0);
		},
		render: function () {

		},
		dump: function () {
			 console.log(this.model.toJSON());
		},
		drawFretNum: function () {
			var x = this.model.get("xCellNum");
			var y = this.model.get("yCellNum");
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
		}
	});
})(jQuery);