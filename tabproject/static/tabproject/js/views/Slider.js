define(['jquery'],
	function ($) {

		// "use strict";

			//  Backup
			// app.progSliderJQuery = function Slider(selector) {
			//  	// Constructor
			//  	console.log('Slider instantiated');

			//  	// Private Properties
			//  	this.pri_selector = selector;

			//  	$(this.pri_selector).slider({
			//  		slide: function(event, ui){
			//  			console.log(ui.value);
			//  		}
			//  	});

			//  	// Bind focus event
			//  	$(this.pri_selector).focus(function(){
			//  		console.log('fire focus');
			//  	});
			// };
			// Developing Version
			// This Construction Method needt to consider the consistency
			// cross different browser
		var slider = function progSliderHtml5 ( selectorId ) {

				console.log('Constructor of prog-slider html5');
				// clear Jquery Style Selector
				// this.selector = selectorId.substring(1, selectorId.length);
				// console.log(selectorId);

				this.obj = document.querySelector(selectorId);
				this.Animation = {};
				// startListener
				this.startMousemoveListener = function () {

					// callback.bind(this);
					this.obj.addEventListener("mousedown", $.proxy(function() {

							console.log('fire mousedown!');

						  	this.obj.addEventListener("mousemove", this.mousemoveHandler.bind(this));
						  	// obj.focus();

					}, this));
					this.obj.addEventListener("mouseup", $.proxy(function() {

							console.log('fire mouseup!');
						  	this.obj.removeEventListener("mousemove", this.mousemoveHandler);


					}, this ));

				};

				// Mouse Moving Event Handler
				this.mousemoveHandler = function () {
					// console.log(this);
					// console.log(this.getValue());
					// console.log(this.getValue()/100);
					this.Animation.setViewBox_x(this.getValue()/100);
					this.Animation.render();
				};
				// Get Presentage Value
				this.getValue = function () {
					 return this.obj.value;
				};
				this.setAnimation = function (animation) {
					 this.Animation = animation;
				};
		};

		return slider;

});

