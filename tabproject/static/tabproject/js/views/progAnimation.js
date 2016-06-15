define(['jquery'],
	function () {
		function progAnimation( progSlider ){
			this.progSlider = progSlider;
		}
		progAnimation.prototype.padDeltaPresentage = 0;
		progAnimation.prototype.playId = 0;
		progAnimation.prototype.playValue = 0;

		// unit of padSpeed is presentage
		progAnimation.prototype.setPadSpeed = function ( delta ) {
			this.padDeltaPresentage = delta;
			console.log(this.padDeltaPresentage);
		};

		progAnimation.prototype.increment = function () {
			 this.playValue += parseFloat(this.padDeltaPresentage);
			 // this.progSlider.setProgressNumValue( this.playValue );
		};
		progAnimation.prototype.stopIncrement = function () {

		};

		progAnimation.prototype.setProgSliderPlayValue = function ( x ) {
			this.playValue = x;
			this.progSlider.setProgSliderPlayValue( x );
		};
		progAnimation.prototype.renderPlaying = function () {
			// console.log( this.playValue );
			// console.log( this.progSlider.obj.value );
			this.increment();
			this.progSlider.obj.value = String(this.playValue);
			this.playId = window.requestAnimationFrame( this.renderPlaying.bind(this) );

		};

		progAnimation.prototype.stopRenderPlaying = function () {
			 window.cancelAnimationFrame( this.playId );
		};
		return progAnimation;
});