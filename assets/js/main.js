$(document).ready(function(){
  console.log("begin");
  c = $("#canvas")[0];
  ctx = c.getContext("2d");
  width = 1000;
  height = 600;
  
  game = new Canvas2D({
    canvas: c,
    height: c.height,
    width: c.width
  });
		
	drawMainMenu();
	//drawGame();
});

function drawMainMenu(){
  /*if (! typeof level === "undefined"){
    console.log("exiting level");
    level.exit();
    
  } else if (typeof level === "undefined"){
    console.log('level undefined');
  }*/
  mainMenu = new Canvas2D.Scene({
	  canvas: c,
	  width: width,
	  height: height,
	  bg: $("#hyperspace-binary")[0]
	});
	
	btnPlay = new mainMenu.Button({
	  x: 0,
		y: 100,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: true,
		centerText: false,
		text: "Play",
		onclick: drawGame
	});
	
	btnHelp = new mainMenu.Button({
	  x: 0,
		y: 200,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: true,
		text: "Help",
		onclick: function() {alert("Help!")}
	});
}

function drawGame() {
  mainMenu.exit();
  console.log("start Level")
  level = new Level();
}
