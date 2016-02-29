

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

	var n2 = writeNote(8, 600, 2);
	document.getElementById("tabSVG").appendChild(n2);

	var n3 = writeNote(7, 900, 3);
	document.getElementById("tabSVG").appendChild(n3);

	var n4 = writeNote(7, 1500, 0);
	document.getElementById("tabSVG").appendChild(n4);

	var n5 = writeNote(7, 1500, 1);
	document.getElementById("tabSVG").appendChild(n5);

	var n6 = writeNote(9, 1800, 2);
	document.getElementById("tabSVG").appendChild(n6);
	
	var end = writeNote("End", 2600, 0);
	end.setAttributeNS(null, "id", "end");
	document.getElementById("tabSVG").appendChild(end);

	// $("#tab").mouseover(function(){
		
	// })
	
	// $("#playStop").click(function(){
		

	// 	$("#playStop").text("Stop");
	// 	$("#end").velocity("scroll", {
	// 		container: $("#tab"),
	// 		axis: "x" ,
	// 		duration: 10000,
	// 		offset: 2650 
	// 	});
	// });
	

	var playing = false;
	var x = 0;
	var delta_x = 2.5;
	var update_rate = 10; // 60 fps 1000/60 ~= 17
	$("#viewbox-play").click(function() {
		
		var tabSVG = document.getElementsByTagName("svg")[0];
		console.log(playing);
		if( playing == false){
			
			playing = true;
			updateAction = setInterval(
				function(){
					var xStr = x.toString();
					tabSVG.setAttribute('viewBox', xStr+=',0,640,400');
					x+=delta_x;
					
			}, update_rate);
			$(this).text("stop");
		}else{
			clearInterval(updateAction);
			$(this).text("play");
			playing = false;
		}
		
	});
	$("#update_rate").change(function(){
		console.log("#update_rate");
		clearInterval(updateAction);
		$(this).text("play");
		playing = false;
		
		update_rate=$(this).val();
	});
	$("#delta_x").change(function(){
		console.log("#delta_x");
		clearInterval(updateAction);
		$(this).text("play");
		playing = false;
		
		update_rate=$(this).val();
	});
	
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