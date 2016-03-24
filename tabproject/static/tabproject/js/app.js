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

//        document.getElementById("mybtn").onclick=function(){changeURL()};
//        function changeURL()
//        {
//            
//            var x=document.getElementById("search");
//            document.getElementById("demo").innerHTML=$("#search").val();
//        }
        $("form").on("submit", function(e){
            e.preventDefault();
            //prepare the request
            
            var Vid=$("#search").val().slice(-11);
            var URLtext="https://www.youtube.com/embed/"+Vid;
            $("#showSearch").append('<div id="searchresult"></div>');
            $("#searchresult").append('<img src=http://img.youtube.com/vi/'+Vid+'/1.jpg>'+URLtext);
            document.getElementById("demo").innerHTML=URLtext;
            document.getElementById("ytbox").src=URLtext;
            document.getElementById('ytbox').contentWindow.location.reload(true);

               
                    //img.youtube.com/vi/NtWnaD6pnpU/0.jpg
        
        });