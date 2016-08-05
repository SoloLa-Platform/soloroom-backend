define([],
	function () {
	 	//
		//  Helper functions
		//
		return {
			convertTime2Cell: function () {
				 /* body... */ 
			},
			convert2Cell: function (x, y, xo, yo, minTimeUnit ) {
				 return { 'x':Math.floor( (x - xo) / minTimeUnit ),
				 	'y': Math.floor( (y - yo) / minTimeUnit )
				 	};
			},
			convert2Draw: function () {

			},
			rawPos: function(x, y){
				return {'x': x, 'y':y};
			},
			newAttribute: function (pos) {
				return {
					"tabLineNum": 0,
					"fretNum": 0,
					"tech": {}
				};
			},
			// this function better to be re-implemented by less objects method
			getMNcellObject: function ( mn, unit ) {
				// console.log( typeof( mn.get("onset")));
				// var xCell = parseFloat( (mn.get("onset")*100/5).toFixed(0) );
				var xCell = this.toCell( mn.get("onset") );
				var yCell = parseInt( mn.get("tabLineNum")) - 1 ;
				var length =  this.toCell( mn.get("duration") );
				// var length =  parseFloat( (mn.get("duration")*100/5).toFixed(0) );
				return {
					'x': xCell,
					'y': yCell,
					'length': length
				};
			},
			toCell: function ( sec ) {
				return parseInt((sec*100/5).toFixed(0));
			}
		};
		//
		// helper function end
		//
});