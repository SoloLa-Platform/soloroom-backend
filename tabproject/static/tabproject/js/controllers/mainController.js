
var app = app || {};

app.mainController = (function(){

	// 'use strict';
	// Instance for store reference of controller singleton
	var instance;

	function init(){


		// Private Preporty  //
		var privateVar = 'private var ';
		var tabView = {};

		// tabModel including a tree to store and handle
		var tabModel = {};

		// Global Tree Unique Id
		var treeId = 0;

		// Private Method
		function privateMethod() {
			console.log('I am private method');
		}
		function privateContextTest(){
			console.log(this);
		}
		function privateGetTabModel(){
			return this.tabModel;
		}
		function privateSetTabModel(tabModel){
			this.tabModel = tabModel;
		}
		// ===============
		// Global Function
		// ===============
		// Get Unique Tree Id
		function privateGetTreeId() {
			 return treeId++;
		}
		// Public Preporty and Method
		return {

			publicVar: 'public var',

			// Getter and Setter
			publicSetTabModel:function(tabModel){
				privateSetTabModel(tabModel);
			},
			privilegeGetTabModel: function () {
				 return privateGetTabModel();
			},
			//============================//
			// The Entry Point of the app //
			//============================//
			startApp: function(){

				// @@ Start daemon for pre-working
				// @@ this part can be improvement by web worker

				// Start Tab Model
				this.publicSetTabModel(new app.Tab());

				// Start Tab View
				new app.TabView( {model:this.privilegeGetTabModel()});

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