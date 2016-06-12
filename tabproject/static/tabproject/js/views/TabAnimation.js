define(
	function () {

	var tabAnimation = function TabAnimation(selectorId, tabView){

		 	this.obj = document.querySelector(selectorId);

		 	this.viewBox_x = 0;
		 	this.xStr = "";
		 	this.padDelta = 20;
		 	this.tabView = tabView;

		 	this.animReqID = 0;
		 	// moving animation render
		 	this.render = function () {
		 		// @ I guess access the object too fast causing retriving undefined object
	 			this.xStr = String(this.viewBox_x);
		 		this.obj.setAttribute('viewBox', this.xStr+=',0,1440,300');
		 		window.requestAnimationFrame.bind(this, this.render);

		 	};
		 	this.renderPlaying = function () {

	 			console.log(this);
	 			console.log('active in tabAnimation!');

	 			this.xStr = String(this.viewBox_x);
		 		this.obj.setAttribute('viewBox', this.xStr+=',0,1440,300');
		 		this.viewBox_x+=this.padDelta;
		 		this.animReqID = window.requestAnimationFrame.bind(this, this.renderPlaying);


		 	};
		 	this.stopRenderPlaying = function (argument) {
		 		window.cancelAnimationFrame.bind( this, this.animReqID );
		 		// this.padDelta = 0;
		 	};
		 	this.setPadSpeed = function (delta) {
		 		this.padDelta = delta;
		 	};

		 	this.setViewBox_x = function (presentage) {
		 		 // 0.5 scaling is for fixing over viewbox range
		 		 this.viewBox_x = presentage * this.tabView.getTabSVGLength() * 0.70;
		 	};

	};
	return tabAnimation;

});

