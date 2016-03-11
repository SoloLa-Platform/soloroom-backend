/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;


// var tabCanvas = musicNotes[]
$(function () {
	'use strict';
	
	// start from create tab
	var tab = new app.tab();
	new app.tabView({ model:tab });

});
