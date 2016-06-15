// 'async!//www.youtube.com/iframe_api!null:onYouTubeIframeAPIReady'
define(
            ['jquery'],
    function( $     ) {



          // Constructor
          function YTplayer ( clock ) {
            this.playerClock = clock;
          }
          /* Async. execute by API_manager when it's ready */
          YTplayer.prototype.init = function ( YT ) {

              var self = this;
              self.player = new YT.Player('ytbIframeAPI', {

                  height: '200',
                  width: '300',
                  videoId: 'ihehC2qtMSY',
                  playerVars: { 'autohide': 0, 'controls': 1 },
                  events: {
                    'onStateChange': self.onPlayerStateChange.bind( self ),
                    'onReady': self.onReadyHandler.bind( self )
                  }
              });

          };
          YTplayer.prototype.setCurrencyTime = function ( t ) {
            // console.log( this.infoPrefix+ ' :');
            // console.log( this );
             this.player.seekTo( t, true );
          };
          /* Constant Variable */
          YTplayer.prototype.infoPrefix = "[YTplayer]:";
          /* Variable*/
          YTplayer.prototype.duration = -1;

          /* Callback function */
          YTplayer.prototype.setReadyCallback = function ( context,  callback ) {

             this.readyContext = context;
             this.readyCallback = callback;
          };
          YTplayer.prototype.onReadyHandler = function () {
            var dur = this.player.getDuration();
            console.log( this.infoPrefix + ' :'+ dur );
            console.log( this );
            this.readyCallback.call(this.readyContext, dur);
          };
          /* UI Event Handler */
          YTplayer.prototype.playStopHandler = function () {

              // console.log('fire playStop button');
              // document.querySelector("#ytbIframeAPI").dispatchEvent(this.player.onStateChange);
              // $("#ytbIframeAPI").trigger( "onStateChange" );

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

                  console.log(this.infoPrefix+" backward: "+ this.player.getCurrentTime());
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
                  // console.log(this.infoPrefix+" playing forward: "+ this.player.getCurrentTime());
                  break;

                case YT.PlayerState.PAUSED:
                  // YT player
                  this.player.seekTo(t, true);
                  // Clock
                  this.playerClock.stopTime( parseFloat(t) );
                  // console.log(this.infoPrefix+" paused forward: "+ this.player.getCurrentTime());
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
              // console.log(this.infoPrefix+' fire onPlayerStateChange');
              // console.log(this.infoPrefix+' event type:'+ event.data);

              if ( event.data != -1 && event.data != YT.PlayerState.BUFFERING &&
                    event.data == YT.PlayerState.PLAYING  ){

                  console.log(this.infoPrefix+' :fire yt state change: playing');

                  // this.player.pauseVideo();
                  this.playerClock.startTime();

              }
              if ( event.data != -1 && event.data != YT.PlayerState.BUFFERING &&
                    event.data == YT.PlayerState.PAUSED ){

                  console.log(this.infoPrefix+' fire yt state change: paused');

                  // this.player.playVideo();
                  t = this.player.getCurrentTime().toFixed(1);
                  this.playerClock.stopTime( parseFloat(t) );

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

});
