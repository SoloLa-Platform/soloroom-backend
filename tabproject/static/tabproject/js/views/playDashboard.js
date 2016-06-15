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
	playDashboard.prototype.infoPrefix = "[playDashboard]:";
	playDashboard.prototype.bindYTStopPlayCB = function ( context, callback ) {

		var self = this;
		this.buttons.playButton.addEventListener("click", function () {
			 console.log(self.infoPrefix+' fire playButton');
			 callback.call(context);
		}, false);
	};
	playDashboard.prototype.bindYTbackwardCB = function ( context, callback ) {

		this.buttons.backwardButton.addEventListener("click", function () {
			console.log(this.infoPrefix+' fire backwardButton');
			 callback.call(context);
		}, false);
	};
	playDashboard.prototype.bindYTforwardCB = function ( context, callback ) {

		this.buttons.forwardButton.addEventListener("click", function () {
			console.log(this.infoPrefix+' fire forwardButton');
			 callback.call(context);
		}, false);
	};

	return playDashboard;
});