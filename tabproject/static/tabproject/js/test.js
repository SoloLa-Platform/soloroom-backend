// Class TabLine
// function TabLine(tabWidth, tabWidth, lineNum){

// 	// private
// 	this.lineNum;
// 	this.tabWidth = tabWidth;
// 	this.tabHeight = tabHeight;
// 	// constructor
// 	var xmlns = "http://www.w3.org/2000/svg";
// 	var l = document.createElementNS(xmlns, "line");
// 	var offset = 45;

// 	l.setAttributeNS(null,"x1",0);
// 	l.setAttributeNS(null,"y1",offset+(lineNum)*60);
// 	l.setAttributeNS(null,"x2",tabWidth);
// 	l.setAttributeNS(null,"y2",offset+(lineNum)*60);
// 	l.setAttributeNS(null,"style", "stroke:rgb(0,0,0);stroke-width:2");
// 	this.inti = function(){
// 		alert(test);
// 	}
// }

// writeNote method
// TabLine.prototype.writeNote = function(fretNum, x, lineNum){

// }
// tabLine[0] => String 1, other is same
// tabLines is GLOBAL VARIABL
tabLines = []; 
INSTRUMETN_STRING_NUM = 6;

// TODO tabLines become Class 
// 1. design method for coordinate convertion
// 2. create contain in tabline for note
// 3. testing velocity in 

$(document).ready(function() {
	
	console.log("in test for inti");

	var tabWidth = $("#tab").width();
	var tabHeight = $("#tab").height();

	$("svg").attr("width",tabWidth*2);
	$("svg").attr("height",tabHeight);
	

	for (var i = INSTRUMETN_STRING_NUM - 1; i >= 0; i--) {
		tabLines[i] = createTabLines(i, tabWidth*2, tabHeight);		
		document.getElementById("tabSVG").appendChild(tabLines[i]);
	};

	// Test Write Note
	var n = writeNote(15, 300, 1);
	document.getElementById("tabSVG").appendChild(n);

	var n2 = writeNote(15, 300, 2);
	document.getElementById("tabSVG").appendChild(n2);

	var n3 = writeNote(15, 600, 3);
	document.getElementById("tabSVG").appendChild(n3);

	var end = writeNote("End", 2600, 0);
	end.setAttributeNS(null, "id", "end");
	document.getElementById("tabSVG").appendChild(end);

	// $("#tab").mouseover(function(){
		
	// })
	var toggle = false;
	$("#playStop").click(function(){
		

		$("#playStop").text("Stop");
		$("#end").velocity("scroll", {
			container: $("#tab"),
			axis: "x" ,
			duration: 10000,
			offset: 2650 
		});
	});
	// Test Velocity Packet
	// $("#tab").velocity({ x: tabWidth },
	// 						{ duration:5000, easing: "linear"});
	
});
	

function createTabLines(lineNum, tabWidth, tabHeight){
	var xmlns = "http://www.w3.org/2000/svg";
	var l = document.createElementNS(xmlns, "line");
	var offset = 45;

	l.setAttributeNS(null,"x1",0);
	l.setAttributeNS(null,"y1",offset+(lineNum)*60);
	l.setAttributeNS(null,"x2",tabWidth);
	l.setAttributeNS(null,"y2",offset+(lineNum)*60);
	l.setAttributeNS(null,"style", "stroke:rgb(0,0,0);stroke-width:2");
	
	return l;
}
function writeNote(fretNum, x, lineNum){
	var xmlns = "http://www.w3.org/2000/svg";
	var n = document.createElementNS(xmlns, "text");
	var offset = 45;
	var textOffset = 10;
	n.setAttributeNS(null,"x",x);
	n.setAttributeNS(null,"y",textOffset+offset+(lineNum)*60);
	n.setAttributeNS(null,"fill","blue");
	n.textContent = fretNum;

	return n;
}