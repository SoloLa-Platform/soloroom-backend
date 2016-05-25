define(
	['backbone', 'backboneLocalstorage'],
	function(Backbone, backboneLocalstorage){
		//
		// MeasureSet Class:
		// 		the set collects all the measure from musicXML
		//		Including find Measure and find MusicNote Function
		var MeasureSet = Backbone.Collection.extend({
			localStorage: new backboneLocalstorage('measures'),
			initialize: function (argument) {
				 console.log("measures Collection create!");
			}

		});
		return MeasureSet;
});