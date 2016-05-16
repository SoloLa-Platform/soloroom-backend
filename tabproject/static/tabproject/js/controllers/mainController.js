
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

			// Tab
			tabInit: function(){
				// Start Tab Model (fetch musicXML of tab)
				this.tabModel = new app.Tab();
				this.tabModel.fetchRemoteFull();

				// create TabView with TabModel
				this.tabView = new app.TabView( {model:this.tabModel});

				console.log(window.performance.now());
				// ajax complete event binding
				// $(document).bind("ajaxComplete",this.ajaxHandler.bind(this));
			},
			ajaxHandler: function(){
				// allocate all the MN and assign MN view to draw
				this.tabView.allocateInitTab(this.tabModel.getMeasureSet());

				console.log(window.performance.now());
			},

			//============================//
			// The Entry Point of the app //
			//============================//
			startApp: function(){

				// @@ Start daemon for pre-working

				// @@ this part can be improvement by web worker
				this.tabInit();

				// Start ControlPanel

				// Start SearchBar

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