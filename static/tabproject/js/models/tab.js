// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

(function(){
	'use strict';
	// handle MusicXml
	app.Tab = Backbone.Model.extend({

		// tabTree: {},

		defaults:{
			"url":'parsing',
			division: 0
		},

		initialize: function(){
			console.log('init tabModel!');
			this.requestTabJSON(this.defaults.url);
		},
		requestTabJSON: function(tabUrl) {

				this.ajax = $.ajax({
					url: tabUrl,
					datatype:'json',
					async: 'true',
					success: this.ajaxHandle.bind(this)
				});
		},
		ajaxHandle: function (result) {

			// console.log('check context in ajaxHandle');
			// console.log(this);

			var data = JSON.parse(result);
			var measures = data['score-partwise'].part.measure;
			console.log(measures);


			// need to get first measure attribute, get the divide
			// this.defaults.division = measures[0].attributes.divisions;
			console.log("total measure: " + measures.length);

			// ** Need to test draw all measure
			for (var i = 0; i < measures.length - 170; i++) {
				console.log(" measure: "+i);
				console.log(measures[i]);

				var m_model =  new app.Measure();
				m_model.set({"number": measures[i]['@number']});

				if ( measures[i].hasOwnProperty("attributes") ){

					m_model.setAttr(measures[i].attributes);
					console.log('has attributes');
				}

				m_model.setMNs(measures[i].note);
				app.Measures.add(m_model);

			}
			console.log('append finish done');
			// this.tabTree.dump();

		},
		dumpTab: function () {

		},

	});
})();