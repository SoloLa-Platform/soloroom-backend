define(['backbone'],

	function ( Backbone ) {

		// Clock for storage current playing progress
        var playerClock = Backbone.Model.extend({

          	defaults: {
          		value: 0,
             	tick: 50,
              	id: -1,
                active: false,
                tabAnimation: null
                // progAnimation: null
          	},
            infoPrefix:'[playerClock]:',

            initialize: function() {
                this.on('change:value', this.changeHangle, this );
                this.on('change:active', this.onActiveChanged, this );
            },
            // setProgAnimation: function ( animation ) {
            //      this.set({ 'progAnimation': animation });
            // },
            setTabAnimation: function ( animation ) {
                 this.set({ 'tabAnimation': animation });
            },
            onActiveChanged: function () {

                 console.log(this.infoPrefix+'playerClock fire active value change');
                 console.log('active: '+this.get('active'));

                 var tabAnim = this.get('tabAnimation');
                 // var progAnim = this.get('progAnimation');

                 if ( this.get('active') === false ){
                    tabAnim.stopRenderPlaying();
                    // progAnim.stopRenderPlaying();
                 }else{
                    tabAnim.renderPlaying();
                    // progAnim.renderPlaying();
                 }
            },
            changeHangle: function () {
                console.log(this.infoPrefix+': change fire at '+this.get('value'));
            },
            setPlayTabAnimation: function ( callback ) {
                 this.tabAnimation = callback;
            },
            startTime: function () {
                this.set({ 'active': true });
                var checkId = this.get('id');

                if (  checkId == -1 ){
                    console.log(this.infoPrefix+' clock start !');
                    var self = this;
                    var t = self.get('value');
                    var tick = self.get('tick');
                    checkId = setInterval( function () {

                        t = self.get('value');
                        // console.log(tick/1000);
                        t += (tick/1000) ;
                        self.set({ 'value': t });
                        // console.log(t); // playerClock time show
                    },
                    tick );
                    this.set({ 'id': checkId });
                }else{
                    console.log( this.infoPrefix + ": setInterval thread id: existed");
                }

                console.log( this.infoPrefix + ": setInterval thread id:"+ this.get('id'));

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

            },
            resetTime: function () {
                console.log( this.infoPrefix+' fire resetTime! ');
                this.set({ 'value': 0 }) ;
                this.get('tabAnimation').setPosition( 0 );
                // this.get('progAnimation').setProgSliderPlayValue( 0 );
                console.log( this.infoPrefix+'resetTime, value: '+String( this.get('value') ) );

            },

        });

        return playerClock;
	});