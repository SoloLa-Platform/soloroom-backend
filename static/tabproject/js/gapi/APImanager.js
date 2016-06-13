define(
			 [ 'backbone', 'gapi_config' ],
	function ( Backbone,   GAPI_config   ) {
		// gapi.load = handle_api_loaded;

		// console.log(Gapi_config.key);


      	// Constructor
		function APIManager(){
		 	this.loadGAPI();
		}

		_.extend( APIManager.prototype, Backbone.Events );

		APIManager.prototype.setLoadedCallback = function ( callback, context ) {
			this.loadedCallback = callback;
			this.callbackContext = context;
		};

		APIManager.prototype.init = function() {

			var self = this;
			 function handleClientLoad() {
				gapi.client.setApiKey(GAPI_config.key);
		  		// gapi.client.load("youtube","v3").then(startSearchBar);
		  		gapi.client.load("youtube","v3").then(self.loadedCallback.bind(self.callbackContext));

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
		APIManager.prototype.checkYT_APIloaded = function (argument) {
			 /* body... */ 
		};
		return APIManager;
});