define(['backbone'],

	function ( Backbone ) {

		// Clock for storage current playing progress
        var playerClock = Backbone.Model.extend({

          	defaults: {
          		value: 0,
             	tick: 50,
              	id: -1,
                active: false,
                slider: null,
                progSlider: null
          	},
            infoPrefix:'[playerClock]:',

            initialize: function() {
                this.on('change:value', this.changeHangle, this );
                this.on('change:active', this.onActiveChanged, this );
            },
            setProgSlider: function ( slider ) {
                 this.set({ 'progSlider': slider });
            },
            setTabAnimation: function ( animation ) {
                 this.set({ 'tabAnimation': animation });
            },
            onActiveChanged: function () {

                 console.log(this.infoPrefix+'playerClock fire active value change');
                 console.log('active: '+this.get('active'));

                 var tabAnim = this.get('tabAnimation');
                 var progSlider = this.get('progSlider');

                 if ( this.get('active') === false ){
                    tabAnim.stopRenderPlaying();
                    progSlider.stopRenderPlaying();
                 }else{
                    tabAnim.renderPlaying();
                    progSlider.renderPlaying();
                 }
            },
            changeHangle: function () {
                // console.log(this.infoPrefix+': change fire at '+this.get('value'));
            },
            setPlayTabAnimation: function ( callback ) {
                 this.tabAnimation = callback;
            },
            startTime: function ( YT_t ) {

                this.set({ 'active': true });
                var checkId = this.get('id');

                // New a task to run playerClock
                if (  checkId == -1 ){
                    console.log(this.infoPrefix+' clock start !');
                    var self = this;
                    var t = YT_t;
                    var tick = self.get('tick');
                    checkId = setInterval( function () {

                        t += (tick/1000) ;
                        self.set({ 'value': t });
                    },
                    tick );
                    this.set({ 'id': checkId });

                // Task existed
                }else{
                    console.log( this.infoPrefix + ": setInterval thread id: existed");
                    // console.log( this.infoPrefix + ": setInterval thread id: restart a task");
                    // this.stopTime( YT_t );
                    // this.startTime( YT_t );
                }

                console.log( this.infoPrefix + ": setInterval thread id: "+ this.get('id'));

            },
            setTime: function ( t ) {
                 console.log(this.infoPrefix+' clock set !');
                 this.set({ 'value': t });
            },
            stopTime: function ( correctT ) {

                console.log(this.infoPrefix+' clock stop !');
                this.set({ 'active': false });
                clearInterval( this.get('id') );
                this.set({ 'id': -1 });
                this.set({ 'value': correctT });
                console.log(this.infoPrefix+' setInterval thread id: delete!');

            },
            resetTime: function () {
                console.log( this.infoPrefix+' fire resetTime! ');
                this.set({ 'value': 0 }) ;
                this.get('tabAnimation').setPosition( 0 );
                this.get('progSlider').setProgSliderPlayValue( 0 );
                console.log( this.infoPrefix+'resetTime, value: '+String( this.get('value') ) );

            },

        });

        return playerClock;
	});