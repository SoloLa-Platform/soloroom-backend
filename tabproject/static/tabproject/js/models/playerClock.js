define(['backbone'],

	function ( Backbone ) {

		// Clock for storage current playing progress
        var playerClock = Backbone.Model.extend({

          	defaults: {
          		value: 0,
             	tick: 50,
              	id: 0,
                tabAnimation: null
          	},


            initialize: function() {
                this.on('change:value', this.changeHangle, this );
            },
            changeHangle: function () {
                console.log('playerClock change fire');
                // this.tabAnimation.renderPlaying();
            },
            setPlayTabAnimation: function ( callback ) {
                 this.tabAnimation = callback;
            },
            startTime: function () {

                console.log(' clock start !');
            	var self = this;
                var t = self.get('value');
                var tick = self.get('tick');
                var id = setInterval( function () {

                	t = self.get('value');
                	// console.log(tick/1000);
				 	t += (tick/1000) ;
                	self.set({ 'value': t });
                	// console.log(t);

                },
                tick );
                this.set({ 'id': id });

            },
            setTime: function ( t ) {
                 console.log(' clock set !');
                 this.set({ 'value': t });
            },
            stopTime: function ( correctT ) {
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