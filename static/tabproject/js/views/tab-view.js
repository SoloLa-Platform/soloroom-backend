define([
    'backbone',
    'measure_view',
    'musicnote_view',
    'helper_draw',
    'helper_coordinate',
    'tab_layout'
], function(Backbone, Measure_view, MusicNote_view, Helper_draw, Helper_coordinate, Tab_layout) {


    'use strict';
    var tab_view = Backbone.View.extend({

        // Property
        el: '#tab',


        minTimeUnit: 0.05, // second
        tabSVGLength: -1,

        tabLines: [],

        measureViewSet: {}, // Collection for measure view

        events: {
            "mousedown": "showMouseDownPos"
        },
        initialize: function() {

            // temp tabLine
            this.$tabSVG = $("#tabSVG");

            this.width = Tab_layout.width;
            this.height = Tab_layout.height;
            this.origin = this.origin2int($("#tab"));

            // tabSVG top and bottom padding
            this.paddingTop = Tab_layout.getPaddingTop();
            this.paddingBottom = Tab_layout.getPaddingBottom();
            this.tabLineSpace = Tab_layout.getTabLineSpace(); // vertical length between tabline

            this.firstLineY = Tab_layout.getFirstLineY();
            this.sixthLineY = Tab_layout.getSixthLineY();

            // tab unit cell, cell height = distance between line
            this.cellWidth = Tab_layout.getCellWidth();
            this.cellHeight = this.tabLineSpace;

            this.intiTabSize(Tab_layout.width, Tab_layout.height);

            /* Default Set the SVG Length as 5 mins Youtube */
            this.tabSVGLength = Helper_coordinate.toCell(Tab_layout.getDefaultDuration()) * this.cellWidth;
            // this.drawVirtualLine(); // ** move to each measure

            //
            // Event Handler
            //
            // this.listenTo(app.MusicNotes, "add", this.addOneMN);
            // this.listenTo(app.Measures, "add", this.addOneMeasure);


        },
        render: function() {

        },
        intiTabSize: function(w, h) {
            // init tab width by window width
            $("#tabSVG").attr("width", w);
            $("#tabSVG").attr("height", h);
        },
        setTabSVGLength: function(sec) {
            this.tabSVGLength = Helper_coordinate.toCell(sec) * this.cellWidth;
        },
        /* Calculate the SVG tab length from alg result */
        // calTabSVGLength: function () {

        // 	var allNodes =document.querySelectorAll("svg .measure .note");
        // 	var lastIdx = allNodes.length - 1;
        // 	// console.log(allNodes[lastIdx].querySelector("rect").getAttribute("x"));
        // 	// console.log(allNodes[lastIdx].querySelector("rect").getAttribute("width"));
        // 	// console.log(allNodes[0].querySelector("rect").getAttribute("x"));

        // 	/* Find x of first muscinote and x of last musicnote*/
        // 	this.tabSVGLength = parseFloat(allNodes[lastIdx].querySelector("rect").getAttribute("x"))  +
        // 		parseFloat (allNodes[lastIdx].querySelector("rect").getAttribute("width")) -
        // 		parseFloat (allNodes[0].querySelector("rect").getAttribute("x"));

        // 	this.tabSVGLength += 2*this.startOffset;

        // },
        getTabSVGLength: function() {
            return this.tabSVGLength;
        },
        //
        // This is initilization helper function
        //
        origin2int: function(o) {
            return {
                'x': Math.ceil($("#tab").offset().left),
                'y': Math.ceil(o.offset().top)
            };
        },

        // Draw time line
        drawTimeAxis: function(argument) {
            var tabSVG = document.getElementById("tabSVG");
            var y = this.sixthLineY + 0.5 * this.cellHeight;
            var timeAxis = this.createHorizonalLine(
                0,
                y,
                this.tabSVGLength,
                y,
                "stroke:rgb(28, 28, 74);stroke-width:5",
                "timeAxis"
            );
            tabSVG.appendChild(timeAxis);
        },
        // TabLine Svg Drawing Function
        drawTabLines: function() {
            var tabSVG = document.getElementById("tabSVG");
            var firstGroup = document.querySelector("svg #m1");

            for (var i = 0; i < 6; i++) {
                // console.log('initialize in drawTabLines');
                this.tabLines[i] = this.createHorizonalTabLine(
                    i, this.tabSVGLength, this.paddingTop, this.tabLineSpace);
                tabSVG.insertBefore(this.tabLines[i], firstGroup);
            }
        },

        createHorizonalTabLine: function(lineNum, w, paddingY, tabLineSpace) {
            console.log(w);
            return this.createHorizonalLine(0,
                lineNum * tabLineSpace + paddingY,
                w,
                lineNum * tabLineSpace + paddingY,
                "stroke:rgb(0,0,0);stroke-width:2",
                "tabLine"
            );
        },
        createHorizonalLine: function(x1, y1, x2, y2, style, className) {

            var xmlns = "http://www.w3.org/2000/svg";
            var l = document.createElementNS(xmlns, "line");

            l.setAttributeNS(null, "x1", x1);
            l.setAttributeNS(null, "y1", y1);
            l.setAttributeNS(null, "x2", x2);
            l.setAttributeNS(null, "y2", y2);
            l.setAttributeNS(null, "style", style);
            l.setAttributeNS(null, "class", className);
            return l;
        },
        //
        // Draw Virtual Line for cell alignment (this function should move to measure mnv)
        //
        drawVirtualLine: function() {

            var HorLineNums = Math.ceil(this.width / this.cellWidth);
            console.log(HorLineNums);
            for (var i = 0; i < HorLineNums; i++) {
                document.getElementById("tabSVG")
                    .appendChild(this
                        .createVerticalLine(i, this.firstLineY, this.sixthLineY));
            }
        },
        createVerticalLine: function(i, firstLineY, sixthLineY) {
            var xmlns = "http://www.w3.org/2000/svg";
            var l = document.createElementNS(xmlns, "line");
            var x = i * this.cellWidth;
            var color = 'rgb(0,0,0)';
            var sw = 0.1;
            // if( i % 16 === 0){
            // 	sw = 0.8;
            // 	color = 'rgb(100, 100, 100)';
            // }
            l.setAttributeNS(null, "x1", x);
            l.setAttributeNS(null, "y1", firstLineY - this.cellHeight / 2);
            l.setAttributeNS(null, "x2", x);
            l.setAttributeNS(null, "y2", sixthLineY + this.cellHeight / 2);
            l.setAttributeNS(null, "style", "stroke:" + color + ";stroke-width:" + sw);
            l.setAttributeNS(null, "class", "virtualLine");
            return l;
        },

        showMouseDownPos: function(event) {
            console.log("mouse down at X:" + event.pageX + " Y:" + event.pageY);
            var rawPos = Helper_coordinate.rawPos(event.pageX, event.pageY);
            var pos = Helper_coordinate.convert2Cell(event.pageX, event.pageY,
                this.origin.x, this.origin.y, this.minTimeUnit);

            console.log("cell X: " + pos.x + " cell Y: " + pos.y);

            // Create MusicNote Model and Views
            // var musicnote = new app.MusicNote( this.newAttribute(rawPos) );
            // var mnv = new app.MusicNoteView( {
            // model: musicnote,
            // xCellNum: pos.x,
            // yCellNum: pos.y - this.origin.y} );
            // mnv.dump();

            // draw MusicNote to SVG
            // this.$tabSVG.append(mnv.drawFretNum());

            // collection add MusicNote Model
            // app.MusicNotes.add( musicnote );
        },
        // High coupling function, shoulb be in controller
        // Take every mn model in measure to create mapping view
        // add to document & render
        allocateInitTab: function(measureSet) {


            // console.log('in allocateInitTab');
            var df = document.createDocumentFragment();

            var l = measureSet.length;
            for (var i = 0; i < l; i++) { // loop for measure in whole tab

                var mv = new Measure_view({
                    model: measureSet.at(i)
                });
                var mGroup = Helper_draw.makeGeneralSVG("g", {
                    id: "m" + (i + 1),
                    class: "measure"
                });

                var l2 = measureSet.at(i).get("MNsArray").length; // loop for musicnote in each measure
                for (var j = 0; j < l2; j++) {

                    // organize the tab structure by grouping notes in measure
                    var mnCellObject = Helper_coordinate.getMNcellObject(measureSet.at(i).get("MNsArray")[j], this.minTimeUnit);
                    // console.log( mnCellObject );
                    var mnv = new MusicNote_view({
                        model: measureSet.at(i).get("MNsArray")[j],
                        cells: mnCellObject // dependency in tab View
                    });
                    mv.addMView(mnv);

                    // Create MN view svg duration & fret
                    // Append to SVG

                    var mnGroup = Helper_draw.makeGeneralSVG("g", {
                        id: "n" + (j + 1),
                        class: "note",
                        onset: measureSet.at(i).get("MNsArray")[j].get('onset'),
                        duration: measureSet.at(i).get("MNsArray")[j].get('duration'),
                        cellX: mnCellObject.x,
                        cellDuration: mnCellObject.length
                    });

                    mnGroup.appendChild(mnv.drawDurBar(this.cellWidth, this.cellHeight, 2.5));
                    mnGroup.appendChild(mnv.drawFretNum(this.cellWidth, this.cellHeight));
                    // Create MN veiw technical
                    // var tech = measureSet.at(i).get("MNsArray")[j].get("tech");
                    // if (tech){
                    // 	// console.log('m: '+(i+1)+ " n:"+(j+1));
                    // 	// console.log(tech);
                    // 	mnGroup.appendChild( this.drawTech(mnv, tech) );
                    // }
                    mGroup.appendChild(mnGroup);

                }
                df.appendChild(mGroup);
                mGroup = null;
            }
            document.getElementById("tabSVG").appendChild(df);

            // this.calTabSVGLength();
            this.drawTabLines();
            // this.drawTimeAxis();
        },
        drawTech: function(mnv, tech) {
            // var techGroup = Helper_draw.makeGeneralSVG("g", {class:"tech"});
            //  if (tech.vibrato){
            //  	techGroup.appendChild( mnv.drawVibrato(this.cellWidth, this.cellHeight, this.startOffset) );
            //  }

            //  if ( tech.pullOff && tech.pullOff === "1.0" ){
            //  	techGroup.appendChild( mnv.drawHamPull(this.cellWidth, this.cellHeight, this.startOffset, 'p') );
            //  }else if ( tech.hammerOn && tech.hammerOn === "1.0") {
            //  	techGroup.appendChild( mnv.drawHamPull(this.cellWidth, this.cellHeight, this.startOffset, 'h') );
            //  }

            //  if ( tech.prebend ){
            //  	techGroup.appendChild(mnv.drawPrebend(this.cellWidth, this.cellHeight, this.startOffset, tech.prebend ));
            //  }else if ( tech.bend ) {
            //  	techGroup.appendChild(mnv.drawBend(this.cellWidth, this.cellHeight, this.startOffset, tech.bend ));
            //  }
            //  if ( tech.release ){
            //  	techGroup.appendChild(mnv.drawRelease(this.cellWidth, this.cellHeight, this.startOffset, tech.release ));
            //  }

            //  return techGroup;
        },

        addOneMN: function(mn) {
            // console.log('fire MN collection add!');
            // console.log(mn.toJSON());
            // var mnv = new app.MusicNoteView({model: mn} );
            // mnv.dump();
            // this.$tabSVG.append(mnv.drawFretNum());
        },
        //
        // Measures Collection Handle
        //
        addOneMeasure: function(m) {
            // console.log('fire add one measure');
            // console.log(m);
        }

    });
    return tab_view;
});
