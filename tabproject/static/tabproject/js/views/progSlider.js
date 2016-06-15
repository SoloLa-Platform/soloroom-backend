define(['jquery'],
	function ($) {

		function progSliderHtml5 ( selectorId ) {

				console.log('Constructor of prog-slider html5');

				this.obj = document.querySelector(selectorId);
		}
		progSliderHtml5.prototype.infoPrefix = "[progSldier]: ";

		progSliderHtml5.prototype.setProgSliderPlayValue = function ( x ) {
			 console.log(this.infoPrefix+' fire setProgSliderPlayValue');
			 this.obj.value = x;
		};
		// progSliderHtml5.prototype.progressNumValue = 0;

		// progSliderHtml5.prototype.getProgressNumValue = function () {
		// 	return this.progressNumValue;
		// };
		// progSliderHtml5.prototype.setProgressNumValue = function ( v ) {
		// 	this.progressNumValue = v;
		// };

		/* == Mouse Event need to re-design */
		progSliderHtml5.prototype.startMousemoveListener = function () {

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
		progSliderHtml5.prototype.mousemoveHandler = function () {
			// console.log(this);
			// console.log(this.getValue());
			// console.log(this.getValue()/100);
			this.Animation.setViewBox_x(this.getValue()/100);
			this.Animation.render();
		};
		// Get Presentage Value
		progSliderHtml5.prototype.getValue = function () {
			 return this.obj.value;
		};
		progSliderHtml5.prototype.setAnimation = function (animation) {
			 this.Animation = animation;
		};
		return progSliderHtml5;

});

