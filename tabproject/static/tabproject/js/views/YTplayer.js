// 'async!//www.youtube.com/iframe_api!null:onYouTubeIframeAPIReady'
define(
            ['jquery'],
    function( $     ) {



          // Constructor
          function YTplayer ( clock ) {
            this.playerClock = clock;
          }

          YTplayer.prototype.init = function ( YT ) {

              var self = this;
              self.player = new YT.Player('ytbIframeAPI', {

                  height: '200',
                  width: '300',
                  videoId: 'ihehC2qtMSY',
                  playerVars: { 'autohide': 0, 'controls': 0 },
                  events: {
                    'onStateChange': self.onPlayerStateChange.bind(self)
                  }
              });
              // console.log(this.player);
              // this.duration = this.player.getDuration();
              // console.log('duration: ' + this.duration);
          };
          // Check the fire YT state chanage from click event
          YTplayer.prototype.playDashboardClicked = false;

          YTplayer.prototype.playStopHandler = function () {

              console.log('fire playStop button');
              // document.querySelector("#ytbIframeAPI").dispatchEvent(this.player.onStateChange);
              // $("#ytbIframeAPI").trigger( "onStateChange" );
              this.playDashboardClicked = true;
              switch (this.player.getPlayerState()) {

                case YT.PlayerState.PLAYING:
                  // YT player
                  this.player.pauseVideo();
                  // playerClock Maintain
                  // var t = this.player.getCurrentTime().toFixed(1);
                  // this.playerClock.stopTime( parseFloat(t) );
                  break;

                case YT.PlayerState.PAUSED:
                case YT.PlayerState.CUED:
                  // YT player
                  this.player.playVideo();
                  // playerClock Maintain
                  // this.playerClock.startTime();
                  break;

                default:
                  console.log('undefine YT state');
                  break;
              }

          };
          YTplayer.prototype.backwardHandler = function () {

              switch (this.player.getPlayerState()) {

                case YT.PlayerState.PLAYING:
                case YT.PlayerState.PAUSED:
                  // YT player set to 0
                  this.player.seekTo( 0, true );
                  // playerClock Reset
                  this.playerClock.resetTime();

                  console.log("backward: "+ this.player.getCurrentTime());
                  break;

                default:
                  console.log('undefine YT state');
                  break;
              }

          };
           YTplayer.prototype.forwardHandler = function () {

              var t = this.player.getCurrentTime() + this.player.getDuration()/5;
              switch (this.player.getPlayerState()) {

                case YT.PlayerState.PLAYING:
                  // YT player
                  this.player.seekTo(t, true);
                  // Clock
                  this.playerClock.setTime( parseFloat(t) );
                  console.log("playing forward: "+ this.player.getCurrentTime());
                  break;

                case YT.PlayerState.PAUSED:
                  // YT player
                  this.player.seekTo(t, true);
                  // Clock
                  this.playerClock.stopTime( parseFloat(t) );
                  console.log("paused forward: "+ this.player.getCurrentTime());
                  break;

                default:
                  console.log('undefine YT state');
                  break;
              }

          };

          YTplayer.prototype.onPlayerStateChange = function (event) {
              // This section handles the event of user use directly
              // youtube iframe player, the playerClock should be sync
              var t = 0;
              console.log('fire onPlayerStateChange');
              console.log('[event type]:'+ event.data);

              if ( event.data != -1 && event.data != YT.PlayerState.BUFFERING &&
                    event.data == YT.PlayerState.PLAYING  ){

                  console.log('fire yt state change: playing');

                  // this.player.pauseVideo();
                  this.playerClock.startTime();

                  // Clean flag
                  // this.playDashboardClicked = false;
              }
              if ( event.data != -1 && event.data != YT.PlayerState.BUFFERING &&
                    event.data == YT.PlayerState.PAUSED ){

                  console.log('fire yt state change: paused');

                  // this.player.playVideo();
                  t = this.player.getCurrentTime().toFixed(1);
                  this.playerClock.stopTime( parseFloat(t) );

                  // Clean flag
                  // this.playDashboardClicked = false;

              }

          };
          // YTplayer.prototype.requestVideoDuration = function ( vid ) {
          //    /* Request Video duration */
          //     var url1 = "https://www.googleapis.com/youtube/v3/videos?id="+vid+
          //     "&key="+GAPI_config.key+"&part=snippet,contentDetails";
          //     $.ajax({
          //         async: false,
          //         type: 'GET',
          //         url: url1,
          //         success: function(data) {
          //             if (data.items.length > 0) {
          //                 console.log( getResults(data.items[0]) );
          //             }
          //         }
          //     });
          // };
          return YTplayer;


          // var playingActive = false;
          // var playButton = document.querySelector("#playButton");
          // playButton.addEventListener("click", function (argument) {
          //     if ( playingActive === false ){
          //       startVideo();
          //       playingActive = true;
          //     }else{
          //       pauseVideo();
          //       playingActive = false;
          //     }
          // });


});
