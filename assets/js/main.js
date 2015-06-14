var audioBg, c, ctx, CoinWars, mainMenu, map, tileMargin, tileSize, mts = [], btns = [];

$(document).ready(function(){
  console.log("begin");
  c = $("#canvas")[0];
  ctx = c.getContext("2d");
  width = 800;
  height = 600;
		
	drawMainMenu();
	//drawGame();
});

function drawMainMenu(){
  if (! typeof level === 'undefinied'){level.stop();}
  mainMenu = new canvas2D({
	  canvas: c,
	  width: width,
	  height: height
	});
	
	mainMenu.resetListeners("click");
	mainMenu.setBG($("#hyperspace-binary")[0]);
	
	btnPlay = new mainMenu.Button({
	  x: 0,
		y: 100,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: true,
		centerText: false,
		text: "Play"
	});
	mainMenu.click(btnPlay,function(){
		drawGame();
		alert("Play!")
	})
	
	btnHelp = new mainMenu.Button({
	  x: 0,
		y: 200,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: true,
		text: "Help"
	});
	mainMenu.click(btnHelp,function(){
		alert("Help!");
	});
}

function drawGame() {
  mainMenu.stop();
  level = new Level;
}
