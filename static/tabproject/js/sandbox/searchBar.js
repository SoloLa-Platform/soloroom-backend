
function handleAPILoaded(){

      gapi.client.setApiKey("AIzaSyDb7YrcXiIUZ9_egPvtFkQ9SWjOEyYJJ_E");
      gapi.client.load("youtube","v3").then(startSearchBar);
        //console.log(gapi.client);
      // console.log('hello! handleAPILoaded');
}
function startSearchBar(){

  console.log('hello! Google API!');
  // Url Search and replace youtube video
    $("#searchForm").on("submit", function(e){
        e.preventDefault();
        //prepare the request !=null

        if($("#search").val().substring(0,32)=="https://www.youtube.com/watch?v="){

            var Vid=$("#search").val().substring(32,43);
            var URLtext="https://www.youtube.com/embed/"+Vid;
            document.getElementById("demo").innerHTML=URLtext;
            document.getElementById("ytbox").src=URLtext;
            document.getElementById('ytbox').contentWindow.location.reload(true);
        }
    });
    // Keyword Search
    $("#searchForm2").on("submit", function(e){
        e.preventDefault();
        //prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",

            q: $("#keyword").val().replace(/%20/g, "+"),
            //encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            videoCategoryID: "Music",
            maxResults: 20,
            order: "viewCount",
            publishedAfter: "2000-01-01T00:00:00Z"
        });
        // execute the request
       request.execute(function(response) {
           var results = response.result;

           $("#videoresult_btn").empty();
           $.each(results.items,function(index,item){
              //
              // Caution: This part should be refactor by underscore.js template
              //
               $("#videoresult_btn").append('<div class="res_btn" id="'+item.id.videoId+'" style="cursor :pointer;">'+
                  '<tr><td><img src=https://img.youtube.com/vi/'+item.id.videoId+'/1.jpg id="'+item.id.videoId+'" ></td >'+
                  '<td style="line-height: 100px;text-align: center;">'+item.snippet.title+'</td> </div>');

               $(".res_btn").css({"background-color":"#e6e6e6"});
               $(".res_btn").mouseover(function(event){$(event.target).css({"background-color":"#FFDEAD","position": "relative","top": "2px","left": "2px"});});
               $(".res_btn").mouseout(function(event){$(event.target).css({"background-color":"#e6e6e6","position":"relative","top": "0px","left": "0px"});});

           });
       });

    });
    var disStatus = document.getElementById("videoresult").style.display;

    $( "#searchForm2").delegate( "#keyword", "click", function() {

      disStatus = document.getElementById("videoresult").style.display;
      if(disStatus!="block"){
          $("#videoresult").slideToggle("fast");
      }

    });

    $("#videoresult").delegate("button","click",function(){
        $("#videoresult").slideToggle("slow");
    });
    $(function resultchoice() {
      $("#videoresult_btn").delegate(".res_btn","click",function(event){
            var Vid;
            Vid=$(event.target).attr("id");
            console.log(Vid);

            var URLtext="https://www.youtube.com/embed/"+Vid;
            document.getElementById("ytbox").src=URLtext;
            document.getElementById('ytbox').contentWindow.location.reload(true);

       });
    });
}



