define(
	['jquery', 'test_animation'],
	function ($, Test_animation) {

	var playDashboard = function ( playDbSelector ) {
		// Property
		this.objNodeList = document.querySelectorAll( playDbSelector );
		this.buttons = []; // [key] = value, [id] = NodeObject , store play related buttons
		this.Animation = {};
		this.playingActive = false;


		// Constructor
		for(var i = 0; i < this.objNodeList.length; i++){

			this.buttons[this.objNodeList[i].id] = this.objNodeList[i];
		}
		this.testEl = document.querySelector("#m2");
		this.animateTest = function () {
			 /* body... */
			 $("body").append('<div style="width: 10px;height: 10px;background: orange;">');
		};
		this.startListenPlayButton = function () {

			 this.buttons.playButton.addEventListener("click", $.proxy(function() {

			 	if( this.playingActive === false ){

			 		// this.Animation.setPadSpeed(20);
			 		// console.log(this);
			 		// console.log('active in playDashboard!');

			 		// window.requestAnimationFrame.bind(this, this.Animation.renderPlaying);
			 		// window.requestAnimationFrame.bind(this, this.animateTest);
			 		this.Animation.renderPlaying();
			 		this.playingActive = true;

			 		// Test_animation();
			 		console.log('true');
			 	}else{

			 		this.Animation.stopRenderPlaying();
			 		this.playingActive = false;

			 		// Test_animation().stopPlayTab();
			 		console.log('false!');
			 	}

			 },this ), false);
		};

		this.setAnimation = function (animation) {
			this.Animation = animation;
		};

	};

	return playDashboard;
});