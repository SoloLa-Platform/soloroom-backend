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

        $("#searchForm").on("submit", function(e){
            e.preventDefault();
            //prepare the request !=null
            
            
            var Vid=$("#search").val().slice(32);
           if(Vid=null){     
                var URLtext="https://www.youtube.com/embed/"+Vid;
                $("#videoresult").append('<div><img src=https://img.youtube.com/vi/'+Vid+'/1.jpg>'+URLtext+'</div>');
                /*$("#videoresult").append('<img src=https://img.youtube.com/vi/'+Vid+'/1.jpg>'+URLtext);*/
                document.getElementById("demo").innerHTML=URLtext;
                document.getElementById("ytbox").src=URLtext;
                document.getElementById('ytbox').contentWindow.location.reload(true);
            };
               
                    //img.youtube.com/vi/NtWnaD6pnpU/0.jpg_tplawesome(data, [{ "videoid":Vid}])
        
        });
$(function(){
    $( "#searchForm2" ).delegate( "#keyword", "focus blur", function() {
         $("#videoresult").slideToggle("slow");
    });
});

$(function(){
    $("#searchForm2").on("submit", function(e){
        e.preventDefault();
        //prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#keyword").val()).replace(/%20/g, "+"),
            maxResults: 4,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        });
        // execute the request
       request.execute(function(response) {
           var results = response.result;
           $("#videoresult_btn").empty();
           $.each(results.items,function(index,item){
               
               $("#videoresult_btn").append('<div class="res_btn" id="'+item.id.videoId+'"><img src=https://img.youtube.com/vi/'+item.id.videoId+'/1.jpg>'+item.snippet.title+'</div>');
               
               /*$.get("./tpl/item.html", function(data) {
                $("#videoresult").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
                
                '<div><img src=https://img.youtube.com/vi/'+item.id.videoId+'/1.jpg>'+item.snippet.title+'</div>'
                */
               //$("#results").append(item.id.videoId+""+item.snippet.title+"<br>");
           });
       });
          
    });
});


$(function(){
    $(".res_btn").click(function(){
        var vid="pJI1q1JGhbc";
        var URLtext="https://www.youtube.com/embed/"+vid;
        document.getElementById("ytbox").src=URLtext;
        document.getElementById('ytbox').contentWindow.location.reload(true);
            
    });
});

        function init(){
            gapi.client.setApiKey("AIzaSyA831jpqrfz8EShm673XANf-fktA-u-1Pw");
            gapi.client.load("youtube","v3",function(){
                    //api is ready
            });
        }
        
        /*
            animate
        
        $(function () {
	       document.getElementById('search').click = function() {
               $("#videoresult").slideUp("slow", function() {
                    //$( this ).css("top","290px");
               });
           }


        });*/