define(['jquery'],
	function ($) {
		/* Constructor */
		function progSliderHtml5 ( selectorId ) {
				console.log('Constructor of prog-slider html5');
				this.obj = document.querySelector(selectorId);
		}
		progSliderHtml5.prototype.initDuration = function ( duration ) {
			this.videoDuration = duration;
			console.log(this.infoPrefix+' : init duration: ' + this.videoDuration);
		};
		progSliderHtml5.prototype.setTabAnimation = function (animation) {
			 this.tabAnimation = animation;
		};
		/* Constant Variable */
		progSliderHtml5.prototype.infoPrefix = "[progSldier]: ";

		/* Public Variable */
		progSliderHtml5.prototype.padDelta = 0; // padding rate ( pixel/sec )
		progSliderHtml5.prototype.playId = 0; // id for record requestAnimation thread
		progSliderHtml5.prototype.playValue = 0; // currecnt progress value ( presentage )

		/*						*/
		/* 	Setter & Getter 	*/
		/*						*/
		progSliderHtml5.prototype.setPadSpeed = function ( delta ) {
			this.padDeltaPresentage = delta;
			console.log(this.padDeltaPresentage);
		};

		progSliderHtml5.prototype.getHtmlNode = function () {
			 return this.obj;
		};
		progSliderHtml5.prototype.getValue = function () {
			 return this.obj.value;
		};
		// Maintain html5 input value
		progSliderHtml5.prototype.setProgSliderPlayValue = function ( x ) {
			 console.log(this.infoPrefix+' fire setProgSliderPlayValue');
			 this.obj.value = x;
			 this.playValue = x;
		};

		progSliderHtml5.prototype.increment = function () {
			 this.playValue += parseFloat(this.padDeltaPresentage);
		};

		/*							*/
		/* input value change event */
		/*							*/
		progSliderHtml5.prototype.startInputListener = function () {


			this.obj.addEventListener("change", $.proxy(function(event) {
				console.log( this.infoPrefix+' fire value change' );
				console.log( this.infoPrefix+' fire value change: ' + this.obj.value/100 );
				// console.log( this.infoPrefix+' : value:'+this.videoDuration*this.obj.value/100 );
				// console.log( this.infoPrefix +': videoDuration: '+ this.videoDuration );

				// Need to maintain yt player & playerClock state
				
				this.tabAnimation.setPosition( this.obj.value/100 );
				/* update playerClock */
				this.ytPlayerUpateFn.call( this.ytPlayerC, this.videoDuration*this.obj.value/100 );
				/* update YT player */
				this.playerClockUpdateFn.call( this.playerClockC, this.videoDuration*this.obj.value/100);
			}, this));

		};
		progSliderHtml5.prototype.setYTplayerUpdateFn = function ( context , handler ) {
			 this.ytPlayerUpateFn = handler;
			 this.ytPlayerC = context;
		};
		progSliderHtml5.prototype.setPlayerClockUpdateFn = function ( context , handler ) {
			 this.playerClockUpdateFn = handler;
			 this.playerClockC = context;
		};
		/*							*/
		/*  Mouse Event Trigger 	*/
		/*							*/
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
		/*							  */
		/* Mouse Moving Event Handler */
		/*							  */
		progSliderHtml5.prototype.mousemoveHandler = function () {

			console.log(this.infoPrefix+' :mousemoveHandler');
			this.tabAnimation.setViewBox_x( this.obj.value/100 );
			/* update playerClock */
			this.ytPlayerFn.call( this.ytPlaterC, this.videoDuration*this.obj.value/100 );
			/* update YT player */
			this.playerClockFn.call( this.playerClockC, this.videoDuration*this.obj.value/100);
			this.tabAnimation.render();
		};

		/*	   					*/
		/* 		Animation 		*/
		/*						*/
		progSliderHtml5.prototype.renderPlaying = function () {
			// console.log( this.playValue );
			// console.log( this.progSlider.obj.value );
			this.increment();
			this.progSlider.obj.value = String(this.playValue);
			this.playId = window.requestAnimationFrame( this.renderPlaying.bind(this) );
		};
		progSliderHtml5.prototype.stopRenderPlaying = function () {
			 window.cancelAnimationFrame( this.playId );
		};

		return progSliderHtml5;

});

