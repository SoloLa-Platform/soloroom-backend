define(['text!templates/searchResult.tpl'],
    function(searchResultTpl) {

        // Constructor
        function SearchBar() {

        }

        //
        /* Public Function */
        //

        /* Waiting for Refactoring Zone : Start */
        /* Reason : UI and Operation Seperation */
        SearchBar.prototype.enableInputs = function() {
            // enableInputs:  enable html inputs and submits of SearchBar
            $("#urlInput").attr("disabled", false);
            $("#keyword").attr("disabled", false);
            $("#searchbtn2").attr("disabled", false);
            $("#urlSearchBtn").attr("disabled", false);
        };

        SearchBar.prototype.disableInputs = function() {
                // enableInputs:  disable html inputs and submits of SearchBar
                $("#urlInput").attr("disabled", true);
                $("#keyword").attr("disabled", true);
                $("#searchbtn2").attr("disabled", true);
                $("#urlSearchBtn").attr("disabled", true);
        };
        /* Waiting for Refactoring Zone : End */

        SearchBar.prototype.test = function () {
                console.log("test function in prototype");
        };
        SearchBar.prototype.init = function () {

            console.log("SearchBar.init");
            // init:
            //    Initialize the searchbar before gapi is loaded
            //    this function is called(trigger) by API mananger

            this.checkYoutubeAPIloaded();
        };
        SearchBar.prototype.checkYoutubeAPIloaded = function () {
            if (gapi && gapi.client.youtube) {
                console.log('Youtube data API loaded! Start to init SearchBar');
                this.initUrlBarEvent();
                this.initKeywordBarEvnet();
                this.initKeywordAnimation();
                this.initResultAnimation();
                this.enableInputs();
            }
            else {
              id = setTimeout(checkYoutubeAPIloaded, 100);
            }
        };
        SearchBar.prototype.initUrlBarEvent = function () {
            // initUrlBarEvent:
            //    delegate the submit button event
            //    1. Parse the url to retrive vid then fuse out a formatted vid
            //    2. Trigger reloading youtube iframe

            /* Waiting for Refactoring Zone : Start */
            /* Reason : UI and Operation Seperation */
            $("#urlSearchForm").on("submit", function(e) {
                e.preventDefault();
                var ytUrlPrefix = $("#urlInput").val().substring(0, 32);
                var vid = $("#urlInput").val().substring(32, 43);

                if (ytUrlPrefix == "https://www.youtube.com/watch?v=") {

                    var URLtext = "https://www.youtube.com/embed/" + vid;
                    document.getElementById("demo").innerHTML = URLtext;
                    document.getElementById("ytbox").src = URLtext;
                    document.getElementById('ytbox').contentWindow.location.reload(true);
                } else {

                    $("#urlInput").attr('placeholder', 'invalid url!');
                    $("#urlInput").val("");
                    $("#urlInput").addClass("invalid");
                }
            });
            /* Waiting for Refactoring Zone : End */
        };
        SearchBar.prototype.initKeywordBarEvnet = function () {

                // Keyword Search
                console.log("this:", this);
                var self = this;
                /* Waiting for Refactoring Zone : Start */
                /*
                    Reason : UI and Operation Seperation
                    Paramterize the youtube search configure
                */
                $("#keywordSearchForm").on("submit", function(e) {
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

                        var tpl = _.template(searchResultTpl);
                        var html = '';
                        $.each(results.items,

                            function(index, item) {
                                html += tpl({
                                    videoId: item.id.videoId,
                                    title: item.snippet.title
                                });
                            });
                        $("#videoresult_btns").html(html);
                    });
                    self.initResultSelectedHandle();
                });
                /* Waiting for Refactoring Zone : End */
            };
            SearchBar.prototype.initResultSelectedHandle = function () {
                /* initResultSelectedHandle:
                        Delegate event handle for search result clicking
                        send clicked video vid and fuse the url
                        reload youtube iframe
                */

                /* Waiting for Refactoring Zone : Start */
                /* Reason : UI and Operation Seperation: */
                $("#videoresult_btns").delegate(".res_btn", "click", function(event) {

                    var vid = $(event.target).attr("id");
                    console.log(event.target);
                    console.log("vid" + vid);

                    $("#videoresult").animate({
                        width: 'toggle'
                    }, 100);
                    var URLtext = "https://www.youtube.com/embed/" + vid;
                    // document.getElementById("ytbIframeAPI").src = URLtext;
                    // document.getElementById('ytbIframeAPI').contentWindow.location.reload(true);
                    console.log("haha");
                    // Post a
                    $.ajax({
                        url: 'keywordSearch',
                        method: 'GET'
                    }).done(function( data ){

                        console.log('ajax result ',data);
                    });
                });
                /* Waiting for Refactoring Zone : End */
            };
            SearchBar.prototype.initKeywordAnimation = function () {
                /*
                    initKeywordAnimation:
                        delegate focus event for toggle animation
                */
                /* Waiting for Refactoring Zone : Start */
                /* Reason : UI and Operation Seperation: */
                var disStatus = document.getElementById("videoresult").style.display;
                $("#keywordSearchForm").delegate("#keyword", "focus", function() {
                    disStatus = document.getElementById("videoresult").style.display;
                    if (disStatus != "block") {
                        $("#videoresult").animate({
                            width: 'toggle'
                        }, 100);
                        // $("#videoresult").slideToggle("fast");
                    }
                });
                /* Waiting for Refactoring Zone : End */
            };
            SearchBar.prototype.initResultAnimation = function () {
                /*
                    initResultAnimation:
                        delegate focus event for toggle animation
                */
                /* Waiting for Refactoring Zone : Start */
                /* Reason : UI and Operation Seperation: */
                $("#videoresult").delegate("#closeButton", "mousedown", function() {
                    disStatus = "none";
                    console.log('fire close button mousedown');
                    $("#videoresult").animate({
                        width: 'toggle'
                    }, 100);
                    // $("#videoresult").slideToggle("fast");
                    $("#videoresult_btns").empty();
                });
                /* Waiting for Refactoring Zone : End */
            };

        return SearchBar;
    });
