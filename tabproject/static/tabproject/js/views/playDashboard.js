define(
	['jquery', 'test_animation'],
	function ($, Test_animation) {

	function playDashboard( buttonIds ) {

		// Property
		this.buttons = []; // [key] = value, [id] = NodeObject , store play related buttons

		// Constructor
		for(var i = 0; i < buttonIds.length; i++){
			this.buttons[buttonIds[i].substring(1, buttonIds[i].length)] = document.querySelector(buttonIds[i]);
		}
		// console.log(this.buttons);
	}
	playDashboard.prototype.playingActive = false;


	playDashboard.prototype.setCallback = function () {
		// { target: #id, context: context, callback: callback }

	};

	playDashboard.prototype.setYTStopPlayCB = function ( context, callback ) {

		this.buttons.playButton.addEventListener("click", function () {
			 console.log('fire playButton');
			 callback.call(context);
		}, false);
	};
	playDashboard.prototype.setYTbackwardCB = function ( context, callback ) {

		this.buttons.backwardButton.addEventListener("click", function () {
			console.log('fire backwardButton');
			 callback.call(context);
		}, false);
	};
	playDashboard.prototype.setYTforwardCB = function ( context, callback ) {

		this.buttons.forwardButton.addEventListener("click", function () {
			console.log('fire forwardButton');
			 callback.call(context);
		}, false);
	};
	playDashboard.prototype.startListenPlayButton = function () {

		this.buttons.playButton.addEventListener("click", $.proxy(function() {

		 	if( this.playingActive === false ){

		 		this.playingActive = true;
		 		this.tabAnimation.renderPlaying();
		 		console.log('playDashboard play animation');

		 	}else{
		 		this.playingActive = false;
		 		this.tabAnimation.stopRenderPlaying();
		 		console.log('playDashboard stop animation!');
		 	}

		 },this ), false);
	};

	playDashboard.prototype.setAnimation = function (animation) {
		this.tabAnimation = animation;
	};

	return playDashboard;
});