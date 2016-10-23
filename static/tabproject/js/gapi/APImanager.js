define(
			 [ 'backbone', 'gapi_config' ],
	function ( Backbone,   GAPI_config   ) {
		// gapi.load = handle_api_loaded;

		// console.log(Gapi_config.key);


      	// Constructor
		function APIManager(){
		 	this.loadGAPI();
		 	this.loadYTAPI();
		}

		_.extend( APIManager.prototype, Backbone.Events );

		APIManager.prototype.setGapiLoadedCallback = function (  context, callback ) {
			this.gapiCB = callback;
			this.gapiCBContext = context;
		};
		APIManager.prototype.setYTLoadedCallback = function ( context, callback ) {
			this.ytCB = callback;
			this.ytCBContext = context;
		};

		APIManager.prototype.init = function() {

			var self = this;
			 function handleClientLoad() {
				gapi.client.setApiKey(GAPI_config.key);
		  		gapi.client.load("youtube","v3").then(self.gapiCB.bind(self.gapiCBContext));

		  	}
		  	handleClientLoad();

		};

		APIManager.prototype.loadGAPI = function() {

			if (typeof gapi !== 'undefined') {
    			return this.init();
  			}

			var self = this;
			require(['https://apis.google.com/js/client.js?onload=define'], function (argument) {

				// Poll until gapi is ready
				var id;
			    function checkGAPI() {

			      if (gapi && gapi.client) {
			        clearTimeout(id);

			        self.init();

			      } else {
			        id = setTimeout(checkGAPI, 100);
			      }
			    }
				checkGAPI();
			});


		};
		APIManager.prototype.loadYTAPI = function () {

				var self = this;
			  	require(['async!//www.youtube.com/iframe_api!undefined:onYouTubeIframeAPIReady'], 

			  		function () {
			  			console.log('Youtube iFrame Player API loaded!');
				  		self.YT = YT;

				  		// Poll until gapi is ready
						var id;
					    function checkYTAPI() {

							if ( YT ) {
						        clearTimeout(id);
						        self.YT = YT;

						        self.ytCB.call( self.ytCBContext,  self.YT );
							} else {
							    id = setTimeout(checkGAPI, 100);
							}
						}
						checkYTAPI();

				 });
		};

		APIManager.prototype.getYTAPI = function () {

			 return this.YT;

		};
		return APIManager;
});