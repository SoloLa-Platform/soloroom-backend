define(['jquery'],
	function () {
		function progAnimation( progSlider ){
			this.progSlider = progSlider;
		}
		progAnimation.prototype.padDeltaPresentage = 0;
		progAnimation.prototype.playId = 0;
		progAnimation.prototype.playValue = 0;
		progAnimation.prototype.infoPrefix = "[progAnimation]";
		// unit of padSpeed is presentage
		progAnimation.prototype.setPadSpeed = function ( delta ) {
			this.padDeltaPresentage = delta;
			console.log(this.padDeltaPresentage);
		};
		progAnimation.prototype.startListenProgInputChange = function () {
			var self = this;
			this.progSlider.getHtmlNode().addEventListener("change", function () {
				console.log( self.infoPrefix+' : fire change' );
				 // self.playValue = parseFloat(self.progSlider.value);
			}, false );
		};
		progAnimation.prototype.increment = function () {
			 this.playValue += parseFloat(this.padDeltaPresentage);
			 // this.progSlider.setProgressNumValue( this.playValue );
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