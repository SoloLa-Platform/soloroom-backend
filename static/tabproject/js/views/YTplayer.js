// 'async!//www.youtube.com/iframe_api!null:onYouTubeIframeAPIReady'
define(
  ['jquery'],
  function($) {

      require(['async!//www.youtube.com/iframe_api!undefined:onYouTubeIframeAPIReady'], function () {

          var player  = new YT.Player('ytbIframeAPI', {
              height: '200',
              width: '300',
              videoId: 'ihehC2qtMSY',
              playerVars: { 'autohide': 1, 'controls': 0 },
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });

          console.log(player);
          // 4. The API will call this function when the video player is ready.
          function onPlayerReady(event) {
            // event.target.playVideo();
          }

          /* Get CurrentTime from Youtube Player */
          var done = false;
          var id;
          function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
              id = triggerInterval();
            }
            if (event.data == YT.PlayerState.PAUSED){
              window.clearInterval( id );
            }
          }
          function triggerInterval(){

          return window.setInterval(function(){
                console.log(player.getCurrentTime().toFixed(1));
              }.bind(this),100);
          }
          /* Request Video duration */
          var url1 = "https://www.googleapis.com/youtube/v3/videos?id=ihehC2qtMSY&key=AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw&part=snippet,contentDetails";
          $.ajax({
              async: false,
              type: 'GET',
              url: url1,
              success: function(data) {
                  if (data.items.length > 0) {
                      var output = getResults(data.items[0]);
                      $('#results').append(output);
                  }
              }
          });

          function startVideo() {
            player.playVideo();
          }
          function stopVideo(){
            player.stopVideo();
          }
          function pauseVideo() {
            player.pauseVideo();
          }

          var playingActive = false;
          var playButton = document.querySelector("#playButton");
          playButton.addEventListener("click", function (argument) {
              if ( playingActive === false ){
                startVideo();
                playingActive = true;
              }else{
                pauseVideo();
                playingActive = false;
              }
          });

          console.log('iFrame Player');
      });
});
