var app = app || {};

(function () {

	//
	// Class TabTree :
	//
	app.TabTree = function TabTree(jsonData) {
			// ========
			// Property
			// ========
			var measureNodes;
			var rootNode;

			// ===========
			// Constructor
			// ===========
			console.log('TabTree construct');

			this.measureNodes = {};

			// Init TabTree id
			var tid = app.mainController.getInstance().getTabTreeId();
			this.rootNode = {"tid": tid };
		};

	//
	// Class TabTree ProtoType Methods
	//
	app.TabTree.prototype.append = function(m) {
			// console.log(m);
			var id = m["@number"];
			// var id = m.key;
			this.measureNodes[id] = m;
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
