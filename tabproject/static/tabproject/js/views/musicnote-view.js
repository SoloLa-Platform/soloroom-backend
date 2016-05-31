define([
	'backbone'
	],function(Backbone){
		'use strict';
		var MusicNoteView = Backbone.View.extend({

			el:'g',
			cells:[],
			xmlns: "http://www.w3.org/2000/svg",

			initialize: function (para) {
				// console.log("MN View create!");
				this.model = para.model;
				this.cells = para.cells;
			},
			render: function () {

			},
			getSVGGroup:function () {
				  return document.createElementNS(this.xmlns, "g");
			},
			drawFretNum: function (w, h, oy, startOffset) {
				// draw fret on leftmost cell
				var x = this.cells[0].x*w + startOffset;
				var y = this.cells[0].y*h - 15;
				var fretNum = this.model.get("fretNum");

				var xmlns = this.xmlns;
				var n = document.createElementNS(xmlns, "text");

				n.setAttributeNS(null,"x",x);
				n.setAttributeNS(null,"y",y);
				n.setAttributeNS(null,"fill","black");
				n.setAttributeNS(null, "font-size", "11");
				n.textContent = fretNum;
				return n;
			},
			drawDurBar: function (w, h, startOffset) {

				var x = this.cells[0].x*w + startOffset;
				var y = this.cells[0].y*h - 0.55*h;
				var xmlns = this.xmlns;
				var n = document.createElementNS(xmlns, "rect");
				n.setAttributeNS(null,"x",x);
				n.setAttributeNS(null,"y",y);
				n.setAttributeNS(null,"rx",5);
				n.setAttributeNS(null,"ry",5);
				n.setAttributeNS(null,"width",this.cells.length*w);
				n.setAttributeNS(null,"height",h/2.5);

				n.setAttributeNS(null, "style", "fill:rgb(255, 204, 0);stroke-width:1;stroke:rgb(0,0,0);opacity:1;z-index:5;");
				return n;
			},
			// Testing Function for Dump
			dump: function () {
				console.log(this);
				 // console.log(this.model.toJSON());
			}
		});
		return MusicNoteView;
});
