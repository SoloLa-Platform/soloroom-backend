var app = app || {};

(function () {
	//
	// Class MeasureNode :
	//
	app.MeasureNode = function MeasureNode (mData){

		// ========
		// Property
		// ========
		var m;
		var number;
		var time;
		var musicNoteNodes = {};

	 	// ===========
		// Constructor
		// ===========
		console.log('MeasureNode construct');
		this.m = mData;

		// Init. measure id
		this.number = this.m["@number"];

		// Init. Time Signature Data
		if (this.m.attributes.time !== "undefined"){
			this.time = mData.time;
		}

	};

	//
	// Class MeasureNode ProtoType Methods
	//

	app.MeasureNode.prototype.append = function(mn){
		this.musicNoteNodes = new app.MusicNote( {
			tabLineNum: s,
			fretNum: f,
			duration: d
		});
	};

})();