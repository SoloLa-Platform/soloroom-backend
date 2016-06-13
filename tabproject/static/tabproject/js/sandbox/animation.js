
// requestAnim shim layer by Paul Irish

// (function (window) {
// 	 window.requestAnimFrame = (function(){
// 		  return  window.requestAnimationFrame       ||
// 		          window.webkitRequestAnimationFrame ||
// 		          window.mozRequestAnimationFrame    ||
// 		          window.oRequestAnimationFrame      ||
// 		          window.msRequestAnimationFrame     ||
// 		          function(/* function */ callback, /* DOMElement */ element){
// 		            window.setTimeout(callback, 1000 / 60);
// 		          };
// 		})(window);
// })();
define(['jquery'],
	function ($) {

	return function(){

		var speed = 5;
		var animReqID = 0;
		var viewBox_x = 0;
		var tabSVG = document.querySelector("#tabSVG");

		function startPlayTab(argument) {
			 /* body... */
		}
		function drawPlay(){

			tabSVG.setAttribute('viewBox', viewBox_x+',0,1440,300');
			viewBox_x+=speed;
			animReqID = window.requestAnimationFrame(drawPlay);
		}
		animReqID = window.requestAnimationFrame(drawPlay);

		function stopPlayTab(){
			window.cancelAnimationFrame.bind( animReqID );
		}
	};

});

