var app = app || {};

(function () {


	//
	// Class TabTree :
	//
	app.TabTree = function TabTree(jsonData) {
			// ========
			// Property
			// ========
			var measures;
			var rootNode;
			var attributes;
			// ===========
			// Constructor
			// ===========
			console.log('TabTree construct');


			// Init TabTree id
			var tid = app.mainController.getInstance().getTabTreeId();

			this.rootNode = {"tid": tid };
			this.attributes = {};
			// apply Measures Class (inherit Backbone collection)
			// this.measures = new app.Measures();
			console.log(this.measures);
		};

	//
	// Class TabTree ProtoType Methods
	//
	app.TabTree.prototype.appendMeasure = function(m) {
			// console.log(m);
			// this.measures.add(new app.Measure(m));
			// var id = m_model["@number"];
			// var id = m.key;
			// this.measureNodes[id] = m;

			// New a measure model and add to Measures Collection
	};

	app.TabTree.prototype.dump = function() {
		console.log(this);
	};



	// Testing SandBox
	(function() {

		 // var tt = new app.TabTree();
		 // // console.log(tt);
		 // var m = {'key':123};
		 // tt.append(m);
		 // console.log(tt);
	})();
})();
