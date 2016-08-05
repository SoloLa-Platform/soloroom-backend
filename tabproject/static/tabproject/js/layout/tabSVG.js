define(
	[],
	function () {
	return {
		/* tabSVG width & height for js generate */
		width: 1440,
		height: 320,

		/* padding in y axis, like css */
		paddingTopRatio: 0.15,
		paddingBottomRatio: 0.15,

		getPaddingTop:function () {
			return this.height * this.paddingTopRatio;
		},

		getPaddingBottom: function () {
			return this.height * this.paddingBottomRatio;
		},

		/* range of tabLine */
		getTabLineSpace: function () {
			var top = this.getPaddingTop();
			var bottom = this.getPaddingBottom();
			return (this.height - top - bottom ) / 5;
		},


		/* TabLine */
		getFirstLineY: function () {
			var top = this.getPaddingTop();
			var space = this.getTabLineSpace();
			return 0 * space + top;
		},
		getSixthLineY: function () {
			var top = this.getPaddingTop();
			var space = this.getTabLineSpace();
			return 5 * space + top;
		},
		/* ratio for cell width to tabSVG width */
		cellWidthRatio: 0.01,
		getCellWidth: function () {
			 return this.width * this.cellWidthRatio;
		},

		/* default length for tabSVG ( second )*/
		getDefaultDuration: function () {
			 return 8 * 60;
		},


	};
});