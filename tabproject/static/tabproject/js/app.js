/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;


// var tabCanvas = musicNotes[]
$(function () {
	'use strict';

	// start from create tab
	new app.AppView();

});


        $("form").on("submit", function(e){
        e.preventDefault();
        //prepare the request
            var x=$("#search").val().slice(-11);
            document.getElementById("demo").innerHTML="https://www.youtube.com/embed/"+x;
            document.getElementById("ytbox").src="https://www.youtube.com/embed/"+x;
            document.getElementById('ytbox').contentWindow.location.reload(true);
        });