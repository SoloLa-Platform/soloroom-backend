// Global Variable
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

(function(){
	'use strict';
	//
	// MeasureSet: 	the set collects all the measure from musicXML
	//				Including find Measure and find MusicNote Function
	var MeasureSet = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('measures'),
		initialize: function (argument) {
			 console.log("measures Collection create!");
		}
	});

	// Tab: the Model of Tab from XML
	app.Tab = Backbone.Model.extend({

		data:{},
		measureSet:{},

		defaults:{

			"videoName":'',
			"url":'parsing',
		},

		initialize: function(){
			console.log('init tabModel!');

			// Create MeasureSet
			this.measureSet = new MeasureSet();
			// this.set("MeasureSet", new MeasureSet());
		},
		getMeasureSet: function () {
			 return this.measureSet;
		},

		// fetch remote alg. result from server by ajax
		fetchRemoteFull: function(tabUrl) {

			if (typeof tabUrl === "undefined"){
				tabUrl = this.defaults.url;
			}else{
				console.log('use tabURL');
			}

			this.ajax = $.ajax({
				url: tabUrl,
				datatype:'json',
				async: 'true',
				success: this.ajaxHandle.bind(this)
			});

		},
		store: function(){

		},
		// This function need to seperate into detail process for preformanace issue
		ajaxHandle: function (result) {

			var data = JSON.parse(result);
			var measures = data['score-partwise'].part.measure;
			console.log(measures);


			// need to get first measure attribute, get the divide
			// this.defaults.division = measures[0].attributes.divisions;
			console.log("total measure: " + measures.length);

			// ** Need to test draw all measure
			for (var i = 0; i < measures.length - 1; i++) {
				// console.log(" measure: "+i);
				// console.log(measures[i]);

				var m_model =  new app.Measure();
				m_model.set({"number": measures[i]['@number']});

				if ( measures[i].hasOwnProperty("attributes") ){
					m_model.setAttr(measures[i].attributes);
					// console.log('has attributes');
				}

				m_model.setMNs(measures[i].note);
				this.measureSet.add(m_model);

			}
			console.log('append finish done');
			// this.tabTree.dump();

		},
		dumpTab: function () {

		},

	});
})();