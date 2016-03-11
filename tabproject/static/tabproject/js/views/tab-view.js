/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.tabView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#tab',

		events:{
			"mousedown" : "showMouseDownPos"
		},
		initialize: function () {
			
			// temp tabLine
			this.tabLines = [];
			this.width = $("#tab").width();
			this.height = $("#tab").height();
			this.origin =  this.origin2int($("#tab"));
			console.log(this.origin);

			// tabLine top and bottom padding
			this.paddingYratio = 0.16;
			this.paddingY = this.calPaddingY(this.height, this.paddingYratio);
			this.tabLineSpace = this.calTabLineSpace(this.height, this.paddingY);
			
			// tab unit cell, cell height = distance between line 
			this.widthRatio = 0.02;
			this.cellWidth = this.calUnitCellWidht(this.width, this.widthRatio);
			console.log('cellWidth:'+this.cellWidth);
			this.cellHeight = this.tabLineSpace;
			

			this.intiTabSize($(window).width(), this.height);
			this.drawTabLines();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			
		},
		intiTabSize: function(w, h){
			// init tab width by window width
			$("#tabSVG").attr("width", w);
			$("#tabSVG").attr("height", h);
		},
		origin2int: function (o){
			return { 'x': Math.ceil($("#tab").offset().left),
				'y': Math.ceil(o.offset().top) };
		},
		// layout calculation
		calTabLineSpace: function (h, paddingY) {
			 return (h - paddingY*2) / 5;
		},
		calPaddingY: function (h, ratio) {
			 return h * ratio;
		},
		calUnitCellWidht: function (w, ratio) {
			 return w * ratio;
		},

		// TabLine Svg Drawing Function
		drawTabLines: function(){
			for (var i = 0; i < 6; i++) {
				// console.log('initialize in drawTabLines');
				this.tabLines[i] = this.createTabLine(i, 
					this.width, this.paddingY, this.tabLineSpace);		
				document.getElementById("tabSVG").appendChild(this.tabLines[i]);
			}
		},
		
		createTabLine: function(lineNum, w, paddingY, tabLineSpace){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "line");

			l.setAttributeNS(null,"x1",0);
			l.setAttributeNS(null,"y1",lineNum*tabLineSpace+paddingY);
			l.setAttributeNS(null,"x2",w*2);
			l.setAttributeNS(null,"y2",lineNum*tabLineSpace+paddingY);
			l.setAttributeNS(null,"style", "stroke:rgb(0,0,0);stroke-width:2");
			l.setAttributeNS(null,"class","tabLine");
			return l;
		},
	
		// Tab Event Listening
		coordinateConvert: function (x, y) {
			 return { 'x':Math.floor( (x-this.origin.x) / this.cellWidth ),
			 	'y': Math.floor( (y-this.origin.y) / this.cellHeight )
			 	};
		},
		showMouseDownPos: function(event){
			console.log("mouse down at X:" + event.pageX +
		 		" Y:"+ event.pageY);
			var p = this.coordinateConvert( event.pageX, event.pageY );
			console.log("cell x:" + p.x + " y:"+ p.y);
		}
		

	});
})(jQuery);
