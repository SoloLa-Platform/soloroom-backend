// 'async!//www.youtube.com/iframe_api!null:onYouTubeIframeAPIReady'
define(
    ['jquery'],
    function($) {



        // Constructor
        function YTplayer(clock) {
            this.playerClock = clock;
        }
        /* Async. execute by API_manager when it's ready */
        YTplayer.prototype.init = function(YT) {

            var self = this;
            self.player = new YT.Player('ytbIframeAPI', {

                height: '200',
                width: '300',
                videoId: 'ihehC2qtMSY',
                playerVars: {
                    'autohide': 0,
                    'controls': 1,
                    'showinfo': 1
                },
                events: {
                    'onStateChange': self.onPlayerStateChange.bind(self),
                    'onReady': self.onReadyHandler.bind(self)
                }
            });

        };
        YTplayer.prototype.setCurrencyTime = function(t) {
            // console.log( this.infoPrefix+ ' :');
            // console.log( this );
            this.player.seekTo(t, true);
        };
        /* Constant Variable */
        YTplayer.prototype.infoPrefix = "[YTplayer]:";
        /* Variable*/
        YTplayer.prototype.duration = -1;
        YTplayer.prototype.previousState = null;

        /* Callback function */
        YTplayer.prototype.setReadyCallback = function(context, callback) {

            this.readyContext = context;
            this.readyCallback = callback;
        };

        YTplayer.prototype.onReadyHandler = function() {
            var dur = this.player.getDuration();
            this.readyCallback.call(this.readyContext, dur);
        };
        /* UI Event Handler */
        YTplayer.prototype.playStopHandler = function() {

            // console.log('fire playStop button');
            // document.querySelector("#ytbIframeAPI").dispatchEvent(this.player.onStateChange);
            // $("#ytbIframeAPI").trigger( "onStateChange" );

            switch (this.player.getPlayerState()) {

                case YT.PlayerState.PLAYING:
                    this.player.pauseVideo();
                    break;

                case YT.PlayerState.PAUSED:
                case YT.PlayerState.CUED:
                    this.player.playVideo();
                    break;

                default:
                    console.log('undefine YT state');
                    break;
            }

        };
        YTplayer.prototype.backwardHandler = function() {

            switch (this.player.getPlayerState()) {

                case YT.PlayerState.PLAYING:
                case YT.PlayerState.PAUSED:
                    // YT player set to 0
                    this.player.seekTo(0, true);
                    // playerClock Reset
                    this.playerClock.resetTime();

                    console.log(this.infoPrefix + " backward: " + this.player.getCurrentTime());
                    break;

                default:
                    console.log('undefine YT state');
                    break;
            }

        };
        YTplayer.prototype.forwardHandler = function() {

            var t = this.player.getCurrentTime() + this.player.getDuration() / 5;
            switch (this.player.getPlayerState()) {

                case YT.PlayerState.PLAYING:
                    // YT player
                    this.player.seekTo(t, true);
                    // Clock
                    this.playerClock.setTime(parseFloat(t));
                    // console.log(this.infoPrefix+" playing forward: "+ this.player.getCurrentTime());
                    break;

                case YT.PlayerState.PAUSED:
                    // YT player
                    this.player.seekTo(t, true);
                    // Clock
                    this.playerClock.stopTime(parseFloat(t));
                    // console.log(this.infoPrefix+" paused forward: "+ this.player.getCurrentTime());
                    break;

                default:
                    console.log('undefine YT state');
                    break;
            }

        };
        YTplayer.prototype.onPlayerStateChange = function(event) {
            // This section handles the event of user use directly
            // youtube iframe player, the playerClock should be sync
            var t = 0;
            console.log(this.infoPrefix + ' fire onPlayerStateChange');
            console.log(this.infoPrefix + ' Event :' + event.data);
            console.log(this.infoPrefix + ' Previous Event :' + this.previousState);
            console.log(this.infoPrefix + ' Player Time :' + this.player.getCurrentTime());

            // Init: Unstart(-1) -> Buffering(3) -> Playing(1)
            // Play from pause: Pause(2) -> Playing(1)
            // Change on playing (Forward & Backword): Buffering(3) -> Playing(1)
            if (event.data != -1 && event.data != YT.PlayerState.BUFFERING &&
                event.data == YT.PlayerState.PLAYING) {

                console.log(this.infoPrefix + ' :fire yt state change: playing');

                t = this.player.getCurrentTime().toFixed(2);
                this.playerClock.startTime(parseFloat(t));

            }
            // Change on pause: Pause(2) -> Pause(2)
            // Pause on playing: Playing(1) -> Pause(2)
            if (event.data != -1 && event.data != YT.PlayerState.BUFFERING &&
                event.data == YT.PlayerState.PAUSED ||
                event.data == YT.PlayerState.ENDED) {

                console.log(this.infoPrefix + ' fire yt state change: paused');

                // this.player.playVideo();
                t = this.player.getCurrentTime().toFixed(2);
                this.playerClock.stopTime(parseFloat(t));

            }
            this.previousState = event.data;

        };

        return YTplayer;

    });
