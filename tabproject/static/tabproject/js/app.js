define([
			'backbone',
			'jquery',
			'tab_model',
			'tab_view',
			'tab_animation',
			'slider',
			'playDashboard',
			'api_manager',
			'search_bar'
		],
	function (Backbone, $, Tab_model, Tab_view, Tab_animation, Slider, PlayDashboard, API_manager, Search_bar) {

	'use strict';
	var app = function(){

		// 'use strict';
		// Instance for store reference of controller singleton
		var instance;

		function init(){
			//
			// Public Preporty and Method
			//
			return {
				// API_manager
				api_manager: {},

				tabView: {},// tabView
				tabModel: {},// tabModel including a tree to store and handle
				tabAnimation: {},

				// progSilderJQuery: {}, // slider view
				progSilderHtml5: {}, // slider view
				playDashboard: {},
				searchBar: {},

				// Tab
				tabInit: function(){
					// Start Tab Model (fetch musicXML of tab)
					this.tabModel = new Tab_model();
					this.tabModel.fetchRemoteFull("data");

					// // create TabView with TabModel
					this.tabView = new Tab_view( {model:this.tabModel});

					// console.log(window.performance.now());
					// // ajax complete event binding
					$(document).bind("ajaxComplete",this.ajaxHandler.bind(this));
				},
				ajaxHandler: function(){
					// allocate all the MN and assign MN view to draw

					// console.log('@ajaxHandler');
					this.tabView.allocateInitTab(this.tabModel.getMeasureSet());
					// this.tabView.allocateInitTabTech(this.tabModel.getMeasureSet());

					// console.log(window.performance.now());
					// console.log(this.tabView.getTabSVGLength());
				},

				//============================//
				// The Entry Point of the app //
				//============================//
				start: function(){

					// (Caution: api_manager depend on SearchBar, Exection order cannot be violated)
					// Start SearchBar
					this.SearchBar = new Search_bar();

					// @@ API
					this.api_manager = new API_manager();
					this.api_manager.setLoadedCallback(this.SearchBar.init, this.SearchBar);

					// @@ this part can be improvement by web worker
					this.tabInit();
					this.tabAnimation = new Tab_animation("#tabSVG", this.tabView);

					//
					// Start ControlPanel (Pure View)
					//

					// # Progress Slider
					this.progSilderHtml5 = new Slider("#prog-sliderHtml5");
					this.progSilderHtml5.setAnimation(this.tabAnimation);
					this.progSilderHtml5.startMousemoveListener();

					/* Play Dashboard */
					this.playDashboard = new PlayDashboard(".playDashboard a");
					this.playDashboard.setAnimation(this.tabAnimation);
					this.playDashboard.startListenPlayButton();


					// Start MIDI player
				},
				getTabTreeId: function () {
					return privateGetTreeId();
				}
			};

		}
		return{
				// Get instane of Singleton if exists
				getInstance: function () {
					 if (!instance){
					 		// console.log('mainController to be init');
					 		instance = init();
					 	}
						return instance;
				}
		};

	};
	return app;
});

