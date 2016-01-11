

// tabLine[0] => String 1, other is same
// tabLines is GLOBAL VARIABL
tabLines = []; 
INSTRUMETN_STRING_NUM = 6;

// TODO tabLines become Class 
// 1.design method for coordinate convertion
// 2.create contain in tabline for note

$(document).ready(function() {
	
	console.log("in test for inti");

	var tabWidth = $("#tab").width();
	var tabHeight = $("#tab").height();

	$("svg").attr("width",tabWidth);
	$("svg").attr("height",tabHeight);
	

	for (var i = INSTRUMETN_STRING_NUM - 1; i >= 0; i--) {
		tabLines[i] = createTabLines(i, tabWidth, tabHeight);		
		document.getElementById("tabSVG").appendChild(tabLines[i]);
	};

	// Test Write Note
	var n = writeNote(15, 30, 1);
	document.getElementById("tabSVG").appendChild(n);

	// Test Vekicity Packet
	$("svg text").velocity({ x: tabWidth },
							{ duration:5000, easing: "linear"});
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