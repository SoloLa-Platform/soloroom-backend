define([
	'backbone', 'helper_draw'
	],function(Backbone, Helper_draw){
		'use strict';
		var MusicNoteView = Backbone.View.extend({

			el:'g',
			xmlns: "http://www.w3.org/2000/svg",
			cellObject: {},

			initialize: function ( para ) {
				// console.log("MN View create!");
				// this.model = para.model;
				this.cellObject = para.cells;
			},
			render: function () {

			},
			adjustedXY: function(w, h, startOffset){
				return{ x: this.cells[0].x*w + startOffset,
						y: this.cells[0].y*h - 0.15*h
				};
			},

			drawDurBar: function(w, h, hr) {
				var n = document.createElementNS(this.xmlns, "rect");
				n.setAttributeNS(null,"x", this.cellObject.x*w);
				n.setAttributeNS(null,"y", parseInt(this.cellObject.y+1)*h );
				n.setAttributeNS(null,"rx",1);
				n.setAttributeNS(null,"ry",1);
				n.setAttributeNS(null,"width",this.cellObject.length*w);
				n.setAttributeNS(null,"height",h/hr);
				n.setAttributeNS(null, "style", "fill:rgb(255, 204, 0);stroke-width:1;stroke:rgb(0,0,0);opacity:1;z-index:5;");
				return n;
			},
			drawFretNum: function (w, h ) {
				// draw fret on leftmost cell
				var x = this.cellObject.x * w;
				var y = this.cellObject.y * h;
				var fretNum = this.model.get("fretNum");

				var xmlns = this.xmlns;
				var n = document.createElementNS(xmlns, "text");

				n.setAttributeNS(null,"x",x);
				n.setAttributeNS(null,"y",y);
				n.setAttributeNS(null,"fill","black");
				n.setAttributeNS(null, "font-size", "11");
				n.textContent = fretNum;
				return n;
			},

			/*
				Note Technical Part
			*/
			drawVibrato: function (w, h, startOffset) {
				 return this.createVibrato( this.adjustedXY(w, h, startOffset).x - 15,
				 							this.adjustedXY(w, h, startOffset).y - 115,
				 							this.cells.length );
			},
			createVibrato: function(START_X, START_Y, REPEAT){
				var tempX = START_X;
	            var tempY = START_Y;
	            var vibrGroup = Helper_draw.makeGeneralSVG("g", { class:"vibrato"});

	            for (var i = 0; i < REPEAT; i++){

					tempX = tempX+14;//just move 10px the wave can draw repeat
	                var el = this.createWaveUnit();
	                el.setAttributeNS(null,"transform","translate("+tempX+","+START_Y+") scale(1.5)");
	                vibrGroup.appendChild(el);
				}

				return vibrGroup;
    		},
    		createWaveUnit: function()
    		{

		        var l = document.createElementNS(this.xmlns, "path");
		        l.setAttributeNS(null,"d","M1.6894616662011956,7.0032282624265685 v-1.3336632610539314 l2.2498431613493155,-3.37861359466996 c0.17998745290794518,-0.1504645730419822 0.2805686765917973,-0.22569685956297345 0.29644992243661594,-0.22569685956297345 c0.10058122368385197,0 0.1746937042930058,0.04103579264781347 0.20645619598264325,0.1367859754927109 l1.8475182666139092,2.0928254250384772 c0.0899937264539728,0.11626807916880454 0.19057495013782472,0.19150036568979553 0.29644992243661594,0.22569685956297345 c0.10058122368385197,-0.04103579264781347 0.1746937042930058,-0.08207158529562679 0.20645619598264325,-0.12994667671807558 l1.3975496343440454,-2.0996647238131123 c0.1746937042930058,-0.1504645730419822 0.2805686765917973,-0.22569685956297345 0.31233116828143465,-0.22569685956297345 c0.0899937264539728,0 0.15351870983324778,0.04103579264781347 0.19057495013782472,0.1367859754927109 l1.8475182666139092,2.0928254250384772 c0.10587497229879156,0.14362527426734653 0.20645619598264325,0.23253615833760888 0.2911561738216766,0.2735719509854218 c0.10587497229879156,-0.04787509142244895 0.17998745290794518,-0.10942878039416902 0.21174994459758326,-0.17782176814052456 l1.1857996897464629,-1.8055748765037842 v1.326823962279296 l-2.233961915504497,3.37861359466996 c-0.16939995567806634,0.1504645730419822 -0.2858624252067368,0.22569685956297345 -0.3493874085860116,0.22569685956297345 c-0.07940622922409366,0 -0.13763746398842874,-0.04103579264781347 -0.1746937042930058,-0.12994667671807558 l-1.8316370207690902,-2.1201826201370197 c-0.07940622922409366,-0.10258948161953348 -0.1958686987527644,-0.15730387181661767 -0.3493874085860116,-0.15730387181661767 c-0.08469997783903317,0 -0.13763746398842874,0.020517896323906756 -0.15351870983324778,0.06155368897172005 l-1.4134308801888649,2.1201826201370197 c-0.1323437153734895,0.1504645730419822 -0.24351243628722027,0.22569685956297345 -0.32821241412625346,0.22569685956297345 c-0.07411248060915414,0 -0.1323437153734895,-0.04103579264781347 -0.1746937042930058,-0.12994667671807558 l-1.8316370207690902,-2.1201826201370197 c-0.0952874750689124,-0.12994667671807558 -0.21174994459758326,-0.19833966446443124 -0.3493874085860116,-0.19833966446443124 c-0.07411248060915414,0 -0.1323437153734895,0.0341964938731778 -0.16939995567806634,0.10942878039416902 L1.6894616662011956,7.0032282624265685");
		        return l;
    		},

    		drawHamPull: function (w, h, startOffset, label) {
    			return this.createHamPull( this.adjustedXY(w, h, startOffset).x - 5,
				 							this.adjustedXY(w, h, startOffset).y - 15,
				 							this.cells.length,
				 							label );
    		},
    		createHamPull:function(START_X, START_Y, len, label ){
		        var tempX = START_X;
		        var tempY = START_Y;
		        var hamPullGroup = Helper_draw.makeGeneralSVG("g", { class:"HamPull"});

		        var curve = this.createCurve();//fix array
		        curve.setAttributeNS(null,"transform","translate("+tempX+","+START_Y+") scale("+len+", 1.5)");
		        // label
		        var t = document.createElementNS( this.xmlns, "text");
				t.setAttributeNS(null,"x", tempX + len * 0.6 * 14.4);
				t.setAttributeNS(null,"y", tempY - 3);
				t.setAttributeNS(null,"fill","black");
				t.setAttributeNS(null, "font-size", "11");
				t.textContent = label;

		        hamPullGroup.appendChild(curve);
		        hamPullGroup.appendChild(t);
		        return hamPullGroup;
		        // document.getElementById("tabSVG").appendChild(this.tabLines[i]);//please change here
		    },
		    createCurve: function(){

		        var l = document.createElementNS(this.xmlns, "path");
		        l.setAttributeNS(null,"d","M16.611822921970713,7.508270167501195 Q9.622477525361873,-2.642513691315031 1.9702065037243202,7.858297197115547 Q9.622477525361873,0.1577025455997898 17.274748546999362,7.858297197115547 z");
		        l.setAttributeNS(null,"style", "fill:black;stroke:black;stroke-width:1");
		        return l;
		    },

		    drawBend: function ( w, h, startOffset, semitone ) {
		    	 return this.createBend(this.adjustedXY(w, h, startOffset).x ,
				 						this.adjustedXY(w, h, startOffset).y ,
				 						10,
				 						-30,
				 						semitone );
		    },
		    createBend: function( START_X, START_Y, xOffset, yOffset, semitone ){

				var tempX = START_X + xOffset;
	            var tempY = START_Y + yOffset;//A&B is the right place put the sign
	            var bendGroup = Helper_draw.makeGeneralSVG("g", { class:"bend" });

	            var l = this.createPushUpLine();
	            l.setAttributeNS(null,"transform"," translate("+tempX+","+tempY+")");

	            var t = this.createPushUpTriangel();
	            t.setAttributeNS(null,"transform"," translate("+tempX+","+tempY+")");

	            var st = document.createElementNS( this.xmlns, "text");
				st.setAttributeNS(null,"x", tempX - 10 );
				st.setAttributeNS(null,"y", tempY + 15 );
				st.setAttributeNS(null,"fill","black");
				st.setAttributeNS(null, "font-size", "11");

				if ( semitone == "1.0"){
					st.textContent = "1/2";
				}else if ( semitone == "2.0" ){
					st.textContent = "full";
				}else if ( semitone == "3.0") {
					st.textContent = "3/2";
				}

				bendGroup.appendChild(l);
	            bendGroup.appendChild(t);
	            bendGroup.appendChild(st);
	            return bendGroup;
			},

			createPushUpLine: function(){

				var l = document.createElementNS(this.xmlns, "path");
	            l.setAttributeNS(null,"d","M0.12199706832564083,41.9080236673355 C7.871997068325641,42.4080236673355 7.871997068325641,3.908023667335499 7.871997068325641,3.908023667335499");
	            l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:1;" );
	            l.setAttributeNS(null,"fill","none");

				return l;
			},
	        createPushUpTriangel: function(){

				var l = document.createElementNS(this.xmlns, "path");
                l.setAttributeNS(null,"d","M7.5905558864275235,-0.5478679120540737 L4.5905558864275235,5.452132087945927 L10.590555886427524,5.452132087945927 z");
			    l.setAttributeNS(null,"style","stroke-width:1;" );
                l.setAttributeNS(null,"fill","rgba(0,0,0,1)");
				return l;
			},
			drawRelease: function ( w, h, startOffset, semitone ) {
				 return this.createRelease(this.adjustedXY(w, h, startOffset).x ,
				 						this.adjustedXY(w, h, startOffset).y ,
				 						30,
				 						-30,
				 						semitone );
			},
	        createRelease: function(START_X,START_Y, xOffset, yOffset, semitone ){
				var tempX = START_X + xOffset;
	            var tempY = START_Y + yOffset;
	            var releaseGroup = Helper_draw.makeGeneralSVG("g", { class:"release" });

	            var l = this.createPushDownLine();
	            l.setAttributeNS(null,"transform"," translate("+tempX+","+tempY+")");

	            var t = this.createPushDownTriangel();
	            t.setAttributeNS(null,"transform"," translate("+tempX+","+tempY+")");

	            var st = document.createElementNS( this.xmlns, "text");
				st.setAttributeNS(null,"x", tempX + 10 );
				st.setAttributeNS(null,"y", tempY + 15 );
				st.setAttributeNS(null,"fill","black");
				st.setAttributeNS(null, "font-size", "11");

				if ( semitone == "1.0"){
					st.textContent = "1/2";
				}else if ( semitone == "2.0" ){
					st.textContent = "full";
				}else if ( semitone == "3.0") {
					st.textContent = "3/2";
				}

				releaseGroup.appendChild(l);
	            releaseGroup.appendChild(t);
	            releaseGroup.appendChild(st);

	            return releaseGroup;
			},

			createPushDownLine: function(){

				var l = document.createElementNS(this.xmlns, "path");
            	l.setAttributeNS(null,"d","M1.7898050944010038,0.7112915039062386 C9.539805094401004,1.2112915039062386 9.539805094401004,39.71129150390624 9.539805094401004,39.71129150390624");
            	l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:1;" );
            	l.setAttributeNS(null,"fill","none");

				return l;
			},
	        createPushDownTriangel: function(){

				var l = document.createElementNS(this.xmlns, "path");
	         	l.setAttributeNS(null,"d","M9.562364655378616,40.23110134608382 L11.953896816381556,36.19745742893005 L7.170832494375649,36.19745742893005 z");
				l.setAttributeNS(null,"style","stroke-width:1;" );
	            l.setAttributeNS(null,"fill","rgba(0,0,0,1)");
				return l;
			},
			drawPrebend: function ( w, h, startOffset, semitone ) {
				 return this.createPrebend(this.adjustedXY(w, h, startOffset).x ,
				 						this.adjustedXY(w, h, startOffset).y ,
				 						30,
				 						-30,
				 						semitone );
			},
			createPrebend: function( START_X, START_Y, xOffset, yOffset, semitone ){
				var tempX=START_X;
	            var tempY=START_Y;//A&B is the right place put the sign
	            var prebendGroup = Helper_draw.makeGeneralSVG("g", { class:"release" });

	            var l = this.createPrebendLine( START_X, START_Y );
	            // l.setAttributeNS(null,"transform"," translate("+START_X+","+START_Y+")");
	            var t = this.createPreBendTriangel( START_X, START_Y );
	            // t.setAttributeNS(null,"transform"," translate("+START_X+","+START_Y+")");

	            var st = document.createElementNS( this.xmlns, "text");
				st.setAttributeNS(null,"x", tempX + 10 );
				st.setAttributeNS(null,"y", tempY + 15 );
				st.setAttributeNS(null,"fill","black");
				st.setAttributeNS(null, "font-size", "11");

				if ( semitone == "1.0"){
					st.textContent = "1/2";
				}else if ( semitone == "2.0" ){
					st.textContent = "full";
				}else if ( semitone == "3.0") {
					st.textContent = "3/2";
				}

	            prebendGroup.appendChild(l);
	            prebendGroup.appendChild(t);
	            releaseGroup.appendChild(st);

	            return prebendGroup;
			},

			createPrebendLine: function(){
				var xmlns = "http://www.w3.org/2000/svg";
				var l = document.createElementNS(this.xmlns, "path");
	            var temp;
	            temp = START_Y+27.5;//<path d=" M502,188.7 L499,194.7 L505,194.7 z" style="fill:rgba(0,0,0,1)" stroke="none"></path>
	            l.setAttributeNS(null,"d","M"+START_X+","+temp+" L"+START_X+","+START_Y+"");
	            l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:1;" );
	            l.setAttributeNS(null,"fill","none");

				return l;
			},

	        createPreBendTriangel: function(START_X,START_Y){
				var xmlns = "http://www.w3.org/2000/svg";
				var l = document.createElementNS(this.xmlns, "path");
                l.setAttributeNS(null,"d","M"+START_X+","+START_Y+" L"+(START_X-3)+","+(START_Y+6)+" L"+(START_X+3)+","+(START_Y+6)+" z");
			    l.setAttributeNS(null,"style","stroke-width:1;" );
                l.setAttributeNS(null,"fill","rgba(0,0,0,1)");
				return l;
			},

			// Testing Function for Dump
			dump: function () {
				console.log(this);
				 // console.log(this.model.toJSON());
			}
		});
		return MusicNoteView;
});
