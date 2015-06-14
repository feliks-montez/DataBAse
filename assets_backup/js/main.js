var audioBg, c, ctx, CoinWars, MainMenu, map, tileMargin, tileSize, mts = [], btns = [];

$(document).ready(function(){
  console.log("begin");
  c = $("#canvas")[0];
  ctx = c.getContext("2d");
  width = 600;
  height = 400;
  c.width = width;
  c.height = height;
		
	drawMainMenu();
});

function drawMainMenu(){
	MainMenu = new Menu({
		canvas: c,
		height: height,
		width: width,
		//bg: "#3344dd"
		img: $("#hyperspace-binary")[0]
	});
	
	btnHelp = new MainMenu.Button({
		bg: "#111144",
		width: 300,
		height: 50,
		x: 0,
		y: 0,
		font: "ubuntu",
		text: "How to Play",
		color: "#eee",
		center: true
	});
	
	btnLevels = new MainMenu.Button({
		bg: "#111144",
		width: 300,
		height: 50,
		x: 0,
		y: 50,
		font: "ubuntu",
		text: "Levels",
		color: "#eee",
		center: true
	});
	
	//SET EVENT LISTENERS
	MainMenu.click(btnHelp,function(){
	  Help = new Menu({
		  canvas: c,
		  height: height,
		  width: width,
		  bg: "#3344dd"
		  //img: $("#hyperspace-binary")[0]
	  });
		MainMenu.stop();
	});
	
	MainMenu.click(btnLevels,function(){
	  MainMenu.stop();
	  Game = new NewLevel({
		  height: height,
		  width: width
		});
		
	});
}
