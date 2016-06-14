define(
	function () {

	function TabAnimation(selectorId, tabView){

		 	this.obj = document.querySelector( selectorId );
		 	this.tabView = tabView;
	}

	TabAnimation.prototype.viewBox_x = 0;
	TabAnimation.prototype.xStr = "";
	TabAnimation.prototype.padDelta = 5;
	TabAnimation.prototype.playId = 0;


	// Slider moving animation render
 	TabAnimation.prototype.render = function () {

 			this.xStr = String(this.viewBox_x);
	 		this.obj.setAttribute('viewBox', this.xStr+=',0,1440,300');
	 		window.requestAnimationFrame(this.render.bind(this));

 	};
 	// Playing with YT trigger by playStop button
 	TabAnimation.prototype.renderPlaying = function () {

		this.xStr = String(this.viewBox_x);
 		this.obj.setAttribute('viewBox', this.xStr+=',0,1440,300');
 		this.viewBox_x+=this.padDelta;
 		this.playId = window.requestAnimationFrame(this.renderPlaying.bind(this));

 	};
 	TabAnimation.prototype.stopRenderPlaying = function () {

 		window.cancelAnimationFrame( this.playId );
 	};
 	TabAnimation.prototype.getPlayId = function () {

 	};
 	TabAnimation.prototype.setPadSpeed = function (delta) {
 		this.padDelta = delta;
 	};

 	TabAnimation.prototype.setViewBox_x = function (presentage) {
 		 this.viewBox_x = presentage * this.tabView.getTabSVGLength();
 	};

	return TabAnimation;

});

