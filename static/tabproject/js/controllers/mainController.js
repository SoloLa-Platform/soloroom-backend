
var app = app || {};

app.mainController = (function(){

	// 'use strict';
	// Instance for store reference of controller singleton
	var instance;

	function init(){

		// Private Preporty  //

		// Global Tree Unique Id
		var treeId = 0;

		// Private Method
		function privateContextTest(){
			console.log(this);
		}

		function privateGetTreeId() {
			 return treeId++;
		}

		//
		// Public Preporty and Method
		//
		return {

			tabView: {},// tabView
			tabModel: {},// tabModel including a tree to store and handle
			tabAnimation: {},

			progSilderJQuery: {}, // slider view
			progSilderHtml5: {}, // slider view

			// Tab
			tabInit: function(){
				// Start Tab Model (fetch musicXML of tab)

				this.tabModel = new app.Tab();
				this.tabModel.fetchRemoteFull();

				// // create TabView with TabModel
				this.tabView = new app.TabView( {model:this.tabModel});

				// console.log(window.performance.now());
				// // ajax complete event binding
				$(document).bind("ajaxComplete",this.ajaxHandler.bind(this));
			},
			ajaxHandler: function(){
				// allocate all the MN and assign MN view to draw
				this.tabView.allocateInitTab(this.tabModel.getMeasureSet());
				this.tabView.drawTabLines();
				console.log(window.performance.now());
				// console.log(this.tabView.getTabSVGLength());
			},

			//============================//
			// The Entry Point of the app //
			//============================//
			startApp: function(){

				// @@ Start daemon for pre-working

				// @@ this part can be improvement by web worker
				this.tabInit();
				this.tabAnimation = new app.TabAnimation("#tabSVG", this.tabView);

				//
				// Start ControlPanel (Pure View)
				//
				// # Progress Slider
				this.progSilderHtml5 = new app.progSliderHtml5("#prog-sliderHtml5");
				this.progSilderHtml5.setAnimation(this.tabAnimation);
				this.progSilderHtml5.startMousemoveListener();
				// Start SearchBar (Pure View)

				// Start MIDI player
			},
			getTabTreeId: function () {
				return privateGetTreeId();
			}
		};

	}

	return {

		// Get instane of Singleton if exists
		getInstance: function () {
			 if (!instance){
			 	// console.log('mainController to be init');
			 	instance = init();
			 }
			 return instance;
		}
	};

})();