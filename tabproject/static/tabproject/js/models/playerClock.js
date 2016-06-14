define(['backbone'],

	function ( Backbone ) {

		// Clock for storage current playing progress
        var playerClock = Backbone.Model.extend({

          	defaults: {
          		value: 0,
             	tick: 50,
              	id: 0,
                active: false,
                tabAnimation: null,
                progAnimation: null
          	},


            initialize: function() {
                this.on('change:value', this.changeHangle, this );
                this.on('change:active', this.onActiveChanged, this );
            },
            setProgAnimation: function ( animation ) {
                 this.set({ 'progAnimation': animation });
            },
            setTabAnimation: function ( animation ) {
                 this.set({ 'tabAnimation': animation });
            },
            onActiveChanged: function () {
                 console.log('playerClock fire active value change');
                 console.log('active: '+this.get('active'));
                 var tabAnim = this.get('tabAnimation');
                 var progAnim = this.get('progAnimation');
                 console.log( progAnim );

                 if ( this.get('active') === false ){
                    tabAnim.stopRenderPlaying();
                    progAnim.stopRenderPlaying();
                 }else{
                    tabAnim.renderPlaying();
                    progAnim.renderPlaying();
                 }
            },
            changeHangle: function () {
                // console.log('playerClock change fire');
                // this.tabAnimation.renderPlaying();
            },
            setPlayTabAnimation: function ( callback ) {
                 this.tabAnimation = callback;
            },
            startTime: function () {
                this.set({ 'active': true });

                console.log(' clock start !');
            	var self = this;
                var t = self.get('value');
                var tick = self.get('tick');
                var id = setInterval( function () {

                	t = self.get('value');
                	// console.log(tick/1000);
				 	t += (tick/1000) ;
                	self.set({ 'value': t });
                	// console.log(t); // playerClock time show

                },
                tick );
                this.set({ 'id': id });

            },
            setTime: function ( t ) {
                 console.log(' clock set !');
                 this.set({ 'value': t });
            },
            stopTime: function ( correctT ) {

                this.set({ 'active': false });
                console.log(' clock stop !');
                clearInterval( this.get('id') );
                this.set({ 'value': correctT });

            },
            resetTime: function () {
                this.set({ 'value': 0 }) ;
            },

        });

        return playerClock;
	});