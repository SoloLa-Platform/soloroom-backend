define(['jquery'],
	function ($) {

		function progSliderHtml5 ( selectorId ) {

				console.log('Constructor of prog-slider html5');
				this.obj = document.querySelector(selectorId);

				// console.log(this.infoPrefix+' :ytPlayer');
				// console.log(ytPlayer);
				// var self = this;
				// ytPlayrt.addEventListener("onReady",
				// 	self.apply( self, selectorId, ytPlayer.getDuration() ), false );

		}
		/* Constant Variable */
		progSliderHtml5.prototype.infoPrefix = "[progSldier]: ";
		progSliderHtml5.prototype.getHtmlNode = function () {
			 return this.obj;
		};
		progSliderHtml5.prototype.initDuration = function ( duration ) {
			this.videoDuration = duration;
			console.log(this.infoPrefix+' : init duration: ' + this.videoDuration);
		};


		// Maintain html5 input value
		progSliderHtml5.prototype.setProgSliderPlayValue = function ( x ) {
			 console.log(this.infoPrefix+' fire setProgSliderPlayValue');
			 this.obj.value = x;
		};
		progSliderHtml5.prototype.setTabAnimation = function (animation) {
			 this.tabAnimation = animation;
		};
		progSliderHtml5.prototype.setYTplayerUpdateFn = function ( context , handler ) {
			 this.ytPlayerFn = handler;
			 this.ytPlayerC = context;
		};
		progSliderHtml5.prototype.setPlayerClockUpdateFn = function ( context , handler ) {
			 this.playerClockFn = handler;
			 this.playerClockC = context;
		};
		progSliderHtml5.prototype.startInputListener = function () {

			this.obj.addEventListener("change", $.proxy(function(event) {
				// console.log( this.infoPrefix+' fire value change' );
				// console.log( this.infoPrefix+' : value:'+this.videoDuration*this.obj.value/100 );
				// console.log( this.infoPrefix +': videoDuration: '+ this.videoDuration );

				this.tabAnimation.setPosition( this.obj.value/100 );
				/* update playerClock */
				this.ytPlayerFn.call( this.ytPlayerC, this.videoDuration*this.obj.value/100 );
				/* update YT player */
				this.playerClockFn.call( this.playerClockC, this.videoDuration*this.obj.value/100);
			}, this));

		};

		/* == Mouse Event need to re-design */
		progSliderHtml5.prototype.startMousemoveListener = function () {

			// callback.bind(this);
			this.obj.addEventListener("mousedown", $.proxy(function() {

					console.log(this.infoPrefix+'fire mousedown!');
				  	this.obj.addEventListener("mousemove", this.mousemoveHandler.bind(this));

			}, this));
			this.obj.addEventListener("mouseup", $.proxy(function() {

					console.log(this.infoPrefix+' :fire mouseup!');
				  	this.obj.removeEventListener("mousemove", this.mousemoveHandler.bind(this), false);
				  	console.log(this.obj.mousemove);

			}, this ));

		};

		// Mouse Moving Event Handler
		progSliderHtml5.prototype.mousemoveHandler = function () {

			console.log(this.infoPrefix+' :mousemoveHandler');
			this.tabAnimation.setViewBox_x( this.obj.value/100 );
			/* update playerClock */
			this.ytPlayerFn.call( this.ytPlaterC, this.videoDuration*this.obj.value/100 );
			/* update YT player */
			this.playerClockFn.call( this.playerClockC, this.videoDuration*this.obj.value/100);
			this.tabAnimation.render();
		};
		// Get Presentage Value
		progSliderHtml5.prototype.getValue = function () {
			 return this.obj.value;
		};

		/* Animation */



		return progSliderHtml5;

});

