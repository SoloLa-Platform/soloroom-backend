
define(['text!templates/searchResult.tpl'],
  function( rearchResultTpl ){

    function SearchBar(){
      // this.init();
    }
    SearchBar.prototype.init = function () {

      var self = this;
       function checkYoutubeAPIloaded() {
         if (gapi && gapi.client.youtube) {

                console.log('Youtube API setup done! Start to init SearchBar');

                self.initUrlBarEvent();
                self.initKeywordBarEvnet();
                self.initKeywordAnimation();
                self.initResultAnimation();
                self.enableInputs();
              }
              // else {
              //   id = setTimeout(checkYoutubeAPIloaded, 100);
              // }
        }
        checkYoutubeAPIloaded();
    };

    SearchBar.prototype.enableInputs = function () {
        $("#urlInput").attr("disabled", false);
        $("#keyword").attr("disabled", false);
        $("#searchbtn2").attr("disabled", false);
        $("#urlSearchBtn").attr("disabled", false);
    };

    SearchBar.prototype.initUrlBarEvent = function () {
       // Url Search and replace youtube video
        $("#urlSearchForm").on("submit", function(e){
            e.preventDefault();
            var ytUrlPrefix = $("#urlInput").val().substring(0,32);
            var vid = $("#urlInput").val().substring(32,43);

            if( ytUrlPrefix == "https://www.youtube.com/watch?v=" ){

                var URLtext="https://www.youtube.com/embed/" + vid;
                document.getElementById("demo").innerHTML = URLtext;
                document.getElementById("ytbox").src = URLtext;
                document.getElementById('ytbox').contentWindow.location.reload(true);
            }else{

              $("#urlInput").attr('placeholder', 'invalid url!');
              $("#urlInput").val("");
               $("#urlInput").addClass("invalid");
            }
        });
    };
    SearchBar.prototype.initKeywordBarEvnet = function () {

       var self = this;
       // Keyword Search
        $("#searchForm2").on("submit", function(e){
            e.preventDefault();

            // Setup Request
            var request = gapi.client.youtube.search.list({
                // Search Parameter (Need to be tone)
                part: "snippet",
                type: "video",
                q: $("#keyword").val().replace(/%20/g, "+"),
                videoCategoryID: "Music",
                maxResults: 10,
                order: "viewCount",
                publishedAfter: "2000-01-01T00:00:00Z"
            });

            // Popup Searched Result
           request.execute(function(response) {

               var results = response.result;
               $("#videoresult_btns").empty();

               var tpl = _.template( rearchResultTpl );
               var html = '';
               $.each( results.items,

                  function( index, item ){
                      html += tpl({
                            videoId: item.id.videoId,
                            title:item.snippet.title
                      });
               });
               $("#videoresult_btns").html(html);
           });
           self.initResultSelectedHandle();

        });
    };
    SearchBar.prototype.initResultSelectedHandle = function () {

          $("#videoresult_btns").delegate( ".res_btn", "click", function(event){

                var vid = $(event.target).attr("id");
                console.log(event.target);
                console.log("vid"+vid);

                $("#videoresult").animate({width:'toggle'}, 100);
                var URLtext="https://www.youtube.com/embed/" + vid;
                document.getElementById("ytbIframeAPI").src = URLtext;
                document.getElementById('ytbIframeAPI').contentWindow.location.reload(true);

                // $("#videoresult").slideToggle("fast");
           });
    };
     SearchBar.prototype.initKeywordAnimation = function (){

        var disStatus = document.getElementById("videoresult").style.display;

        $( "#searchForm2").delegate( "#keyword", "focus", function() {

            disStatus = document.getElementById("videoresult").style.display;
            if(disStatus != "block"){
              $("#videoresult").animate({width:'toggle'}, 100);
                // $("#videoresult").slideToggle("fast");

            }

        });

    };
    SearchBar.prototype.initResultAnimation = function (){
       $("#videoresult").delegate("#closeButton","mousedown",function(){
            disStatus = "none";
            console.log('fire close button mousedown');
            $("#videoresult").animate({width:'toggle'}, 100);
            // $("#videoresult").slideToggle("fast");
            $("#videoresult_btns").empty();
        });
    };
    return SearchBar;
});
