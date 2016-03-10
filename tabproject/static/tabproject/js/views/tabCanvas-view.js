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

		initialize: function () {
			
			// temp variable
			this.tabLines = [];
			this.tabWidth = document.getElementById('tab').offsetWidth;
			this.tabHeight = document.getElementById('tab').offsetHeight;
			
			this.render();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			this.intiTabSize();
			this.drawTabLines();
		},
		intiTabSize: function(){
			// init tab width by window width
			$("#tabSVG").attr("width", $(window).width());
			$("#tabSVG").attr("height", this.tabHeight);

		},
		drawTabLines: function(){
			for (var i = 5; i >= 0; i--) {
				console.log('initialize in drawTabLines');
				this.tabLines[i] = this.createTabLines(i, 
					this.tabWidth, this.tabHeight, 0.16);		
				console.log(this.tabLines[i]);
				document.getElementById("tabSVG").appendChild(this.tabLines[i]);
			}
		},

		createTabLines: function(lineNum, w, h, paddingYRadio){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "line");
			var paddingY = h*paddingYRadio;
			var lineDist = (h - paddingY*2) / 5;

			l.setAttributeNS(null,"x1",0);
			l.setAttributeNS(null,"y1",lineNum*lineDist+paddingY);
			l.setAttributeNS(null,"x2",w*2);
			l.setAttributeNS(null,"y2",lineNum*lineDist+paddingY);
			l.setAttributeNS(null,"style", "stroke:rgb(0,0,0);stroke-width:2");
			
			return l;
		}
		
	});
})(jQuery);
