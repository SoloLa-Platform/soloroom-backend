var app = app || {};
(function ($) {
    drawWAVE: function(START_X,START_Y,REPEAT){
			var tempX;
            var tempY;
            tempX = START_X;
            tempY = START_Y;//to fix real add Y
            for (var i = 0; i < REPEAT; i++) 
            {
				// console.log('initialize in drawTabLines');
				tempX = tempX+i*10;//just move 10px the wave can draw repeat 
                this.tabLines[i] = this.WAVEDRAW();
                this.tabLines[i].setAttributeNS(null,"transform","translate("+temp+","+START_Y+")");
				document.getElementById("tabSVG").appendChild(this.tabLines[i]);//please change here
			}
    },


    WAVEDRAW: function()
    {
        var xmlns = "http://www.w3.org/2000/svg";
        var l = document.createElementNS(xmlns, "path");
        l.setAttributeNS(null,"d","M1.6894616662011956,7.0032282624265685 v-1.3336632610539314 l2.2498431613493155,-3.37861359466996 c0.17998745290794518,-0.1504645730419822 0.2805686765917973,-0.22569685956297345 0.29644992243661594,-0.22569685956297345 c0.10058122368385197,0 0.1746937042930058,0.04103579264781347 0.20645619598264325,0.1367859754927109 l1.8475182666139092,2.0928254250384772 c0.0899937264539728,0.11626807916880454 0.19057495013782472,0.19150036568979553 0.29644992243661594,0.22569685956297345 c0.10058122368385197,-0.04103579264781347 0.1746937042930058,-0.08207158529562679 0.20645619598264325,-0.12994667671807558 l1.3975496343440454,-2.0996647238131123 c0.1746937042930058,-0.1504645730419822 0.2805686765917973,-0.22569685956297345 0.31233116828143465,-0.22569685956297345 c0.0899937264539728,0 0.15351870983324778,0.04103579264781347 0.19057495013782472,0.1367859754927109 l1.8475182666139092,2.0928254250384772 c0.10587497229879156,0.14362527426734653 0.20645619598264325,0.23253615833760888 0.2911561738216766,0.2735719509854218 c0.10587497229879156,-0.04787509142244895 0.17998745290794518,-0.10942878039416902 0.21174994459758326,-0.17782176814052456 l1.1857996897464629,-1.8055748765037842 v1.326823962279296 l-2.233961915504497,3.37861359466996 c-0.16939995567806634,0.1504645730419822 -0.2858624252067368,0.22569685956297345 -0.3493874085860116,0.22569685956297345 c-0.07940622922409366,0 -0.13763746398842874,-0.04103579264781347 -0.1746937042930058,-0.12994667671807558 l-1.8316370207690902,-2.1201826201370197 c-0.07940622922409366,-0.10258948161953348 -0.1958686987527644,-0.15730387181661767 -0.3493874085860116,-0.15730387181661767 c-0.08469997783903317,0 -0.13763746398842874,0.020517896323906756 -0.15351870983324778,0.06155368897172005 l-1.4134308801888649,2.1201826201370197 c-0.1323437153734895,0.1504645730419822 -0.24351243628722027,0.22569685956297345 -0.32821241412625346,0.22569685956297345 c-0.07411248060915414,0 -0.1323437153734895,-0.04103579264781347 -0.1746937042930058,-0.12994667671807558 l-1.8316370207690902,-2.1201826201370197 c-0.0952874750689124,-0.12994667671807558 -0.21174994459758326,-0.19833966446443124 -0.3493874085860116,-0.19833966446443124 c-0.07411248060915414,0 -0.1323437153734895,0.0341964938731778 -0.16939995567806634,0.10942878039416902 L1.6894616662011956,7.0032282624265685");
        return l;
    },
        
    DrawHammer:function(START_X,START_Y)//the scale var need to add 
    {
        var tempX;
        var tempY;
        tempX = START_X;
        tempY = START_Y;//to fix real add Y
        // console.log('initialize in drawTabLines');
        this.tabLines[i] = this.Hammer();//fix array
        this.tabLines[i].setAttributeNS(null,"transform","translate("+temp+","+START_Y+")");
        document.getElementById("tabSVG").appendChild(this.tabLines[i]);//please change here	
    },
        
    Hammer: function(){
        var xmlns = "http://www.w3.org/2000/svg";
        var l = document.createElementNS(xmlns, "path");
        l.setAttributeNS(null,"d","M16.611822921970713,7.508270167501195 Q9.622477525361873,-2.642513691315031 1.9702065037243202,7.858297197115547 Q9.622477525361873,0.1577025455997898 17.274748546999362,7.858297197115547 z");
        l.setAttributeNS(null,"style", "fill:black;stroke:black;stroke-width:1"); 
			
        return l;
    },
        
    DrawPushUp: function(START_X,START_Y){
			var tempX=START_X+A;
            var tempY=START_Y+B;//A&B is the right place put the sign
            var i=1;
            temp = 100+i*10;
            this.tabLines[i] = this.PushUpLine();
            this.tabLines[i].setAttributeNS(null,"transform"," translate("+START_X+","+START_Y+")");
            this.tabLines[i+1] = this.PushUpTriangel();
            this.tabLines[i+1].setAttributeNS(null,"transform"," translate("START_X","+START_Y+")");
            document.getElementById("tabSVG").appendChild(this.tabLines[i]);
            document.getElementById("tabSVG").appendChild(this.tabLines[i+1]);
		},

		PushUpLine: function(){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "path");
            var l = document.createElementNS(xmlns, "path");
            l.setAttributeNS(null,"d","M0.12199706832564083,41.9080236673355 C7.871997068325641,42.4080236673355 7.871997068325641,3.908023667335499 7.871997068325641,3.908023667335499");
            l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:1;" );
            l.setAttributeNS(null,"fill","none");
               
			return l;
		},
        PushUpTriangel: function(){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "path");
                var l = document.createElementNS(xmlns, "path");
                l.setAttributeNS(null,"d","M7.5905558864275235,-0.5478679120540737 L4.5905558864275235,5.452132087945927 L10.590555886427524,5.452132087945927 z");
			    l.setAttributeNS(null,"style","stroke-width:1;" );
                l.setAttributeNS(null,"fill","rgba(0,0,0,1)");
			return l;
		},
    DrawPushDown: function(START_X,START_Y){
			var tempX=START_X+A;
            var tempY=START_Y+B;//A&B is the right place put the sign
            var i=1;
            temp = 100+i*10;
            this.tabLines[i] = this.PushUpLine();
            this.tabLines[i].setAttributeNS(null,"transform"," translate("+START_X+","+START_Y+")");
            this.tabLines[i+1] = this.PushUpTriangel();
            this.tabLines[i+1].setAttributeNS(null,"transform"," translate("START_X","+START_Y+")");
            document.getElementById("tabSVG").appendChild(this.tabLines[i]);
            document.getElementById("tabSVG").appendChild(this.tabLines[i+1]);
		},

		PushDownLine: function(){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "path");
            var l = document.createElementNS(xmlns, "path");
            l.setAttributeNS(null,"d","M1.7898050944010038,0.7112915039062386 C9.539805094401004,1.2112915039062386 9.539805094401004,39.71129150390624 9.539805094401004,39.71129150390624");
            l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:1;" );
            l.setAttributeNS(null,"fill","none");

			return l;
		},
        PushDownTriangel: function(){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "path");
                var l = document.createElementNS(xmlns, "path");
                l.setAttributeNS(null,"d","M9.562364655378616,40.23110134608382 L11.953896816381556,36.19745742893005 L7.170832494375649,36.19745742893005 z");
			    l.setAttributeNS(null,"style","stroke-width:1;" );
                l.setAttributeNS(null,"fill","rgba(0,0,0,1)");
			return l;
		},
        DrawPreBend: function(START_X,START_Y){
			var tempX=START_X;
            var tempY=START_Y;//A&B is the right place put the sign
            var i=1;
            temp = 100+i*10;
            this.tabLines[i] = this.PreBend(START_X,START_Y);
            this.tabLines[i+1] = this.PreBendTriangel(START_X,START_Y);
            //this.tabLines[i+1].setAttributeNS(null,"transform"," translate("START_X","+START_Y+")");
            document.getElementById("tabSVG").appendChild(this.tabLines[i]);
            document.getElementById("tabSVG").appendChild(this.tabLines[i+1]);
		},

		PreBend: function(){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "path");
            var l = document.createElementNS(xmlns, "path");
            var temp;
            temp = START_Y+27.5;//<path d=" M502,188.7 L499,194.7 L505,194.7 z" style="fill:rgba(0,0,0,1)" stroke="none"></path>
            l.setAttributeNS(null,"d","M"+START_X+","temp" L"START_X","+START_Y+"");
            l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:1;" );
            l.setAttributeNS(null,"fill","none");
               
			return l;
		},
            
        PreBendTriangel: function(START_X,START_Y){
			var xmlns = "http://www.w3.org/2000/svg";
			var l = document.createElementNS(xmlns, "path");
                var l = document.createElementNS(xmlns, "path");
                l.setAttributeNS(null,"d","M"+START_X+","+START_Y+" L"+(START_X-3)+","+(START_Y+6)+" L"+(START_X+3)+","+(START_Y+6)+" z");
			    l.setAttributeNS(null,"style","stroke-width:1;" );
                l.setAttributeNS(null,"fill","rgba(0,0,0,1)");
			return l;
		},
            
        drawSlidLines: function(START_X,START_Y,END_X,END_Y,TYPE_line){
			var temp_X;
            var temp_Y;
            var temp_X2;
            var temp_Y2;
            var i=1;
            temp_X = START_X;//slid in only end of point
            temp_Y = START_Y;//slid out only start of point
            temp_X2 = END_X;//slid between 2 node you need to send start & end point
            temp_Y2 = END_Y;
            switch(TYPE_line)
            {
                case 1://sild in from high
                    temp_X = temp_X2 - 32 ;
                    temp_Y = temp_Y2 - 10 ;
                    break;
                case 2://sild in from low
                    temp_X = temp_X2 - 32 ;
                    temp_Y = temp_Y2 + 10 ;
                    break;
                case 3://sild out from low
                    temp_X2 = temp_X + 32 ;
                    temp_Y2 = temp_Y - 10 ;
                    break;
                case 4://sild out from high
                    temp_X2 = temp_X + 32 ;
                    temp_Y2 = temp_Y + 10 ;
                    break;
                case 5:
                    break;
            }
            this.tabLines[i] = this.SildlLine(START_X,START_Y,END_X,END_Y);
            document.getElementById("tabSVG").appendChild(this.tabLines[i]);
		},
            
        SildlLine: function(START_X,START_Y,END_X,END_Y){
			var xmlns = "http://www.w3.org/2000/svg";
            var l = document.createElementNS(xmlns, "line");
            l.setAttributeNS(null,"x1",START_X);
            l.setAttributeNS(null,"y1",START_Y);
            l.setAttributeNS(null,"x2",END_X);
            l.setAttributeNS(null,"y2",END_Y);
            l.setAttributeNS(null,"style","stroke:rgba(0,0,0,1); stroke-width:2;" );
            l.setAttributeNS(null,"fill","none");
            return l;
		},
 }