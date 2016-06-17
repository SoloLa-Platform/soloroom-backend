define([
			'backbone',
			'jquery',
			'tab_model',
			'tab_view',
			'tab_animation',

			'prog_slider',
			'prog_animation',
			'playDashboard',
			'api_manager',
			'search_bar',

			'yt_player',
			'player_clock'
		],
	function (	Backbone,
				$,
				Tab_model,
				Tab_view,
				Tab_animation,

				ProgSlider,
				Prog_animation,
				PlayDashboard,
				API_manager,
				Search_bar,

				YT_player,
				Player_clock ) {

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

				progSliderHtml5: {}, // slider view

				playDashboard: {},
				searchBar: {},

				ytPlayer: {},
				playerClock: {},

				// Tab
				tabInit: function(){
					// Start Tab Model (fetch musicXML of tab)
					this.tabModel = new Tab_model();
					this.tabModel.fetchRemoteFull("data");

					// // create TabView with TabModel
					this.tabView = new Tab_view({ model: this.tabModel });

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


					// PlayerClock for handle timing & playing event
					this.playerClock = new Player_clock();

					/*
					//  Caution:SearchBar and ytPlayer to be instantiated after api_manager
					//			load GAPI, YT then call the callback
					//			Therefore, the order of api_manager and SearchBar, ytPlayer can
					//			Not be violated!
					*/
					/*  SearchBar */
					this.SearchBar = new Search_bar(); // Does Not real instantiation
					/*  progress Slider (html5) */
					this.progSliderHtml5 = new ProgSlider("#prog-sliderHtml5");
					/*  Youtube iFrame Player */
					this.ytPlayer = new YT_player( this.playerClock ); // Does Not real instantiation
					this.ytPlayer.setReadyCallback( this.progSliderHtml5 , this.progSliderHtml5.initDuration );

					// Google API & Youtube API
					this.api_manager = new API_manager();
					this.api_manager.setGapiLoadedCallback( this.SearchBar, this.SearchBar.init ); // Instantilize SearchBar
					this.api_manager.setYTLoadedCallback( this.ytPlayer, this.ytPlayer.init );  // Instantilize ytPlayer

					// @@ this part can be improvement by web worker
					this.tabInit();
					this.tabAnimation = new Tab_animation("#tabSVG", this.tabView);
					this.playerClock.setTabAnimation( this.tabAnimation );


					//
					// Start ControlPanel (Pure View)
					//

					/*  Progress Slider Setting */
					this.progSliderHtml5.setTabAnimation( this.tabAnimation );
					this.progSliderHtml5.setPlayerClockUpdateFn( this.playerClock, this.playerClock.setTime  );
					this.progSliderHtml5.setYTplayerUpdateFn( this.ytPlayer, this.ytPlayer.setCurrencyTime );

					// this.progSliderHtml5.startMousemoveListener();
					this.progSliderHtml5.startInputListener();

					/*  Progress Slider Animation */
					this.progSliderHtml5.setPadSpeed( 0.1 ); // set animation moving speed (presentage)
					// this.playerClock.setProgAnimation( this.progSliderHtml5 ); // bind to playerClock

					/* Play Dashboard */
					this.playDashboard = new PlayDashboard(
						['#backwardButton',
						'#playButton',
						'#forwardButton']);
					this.playDashboard.bindYTStopPlayCB(this.ytPlayer, this.ytPlayer.playStopHandler);
					this.playDashboard.bindYTbackwardCB(this.ytPlayer, this.ytPlayer.backwardHandler);
					this.playDashboard.bindYTforwardCB(this.ytPlayer, this.ytPlayer.forwardHandler);


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

