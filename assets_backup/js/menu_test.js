var c, ctx, MainMenu, btns = [];

$(document).ready(function(){
  console.log("begin");
  c = $("#canvas")[0];
  ctx = c.getContext("2d");
	console.log(ctx);
	MainMenu = new Menu({
		canvas: c,
    height: 600,
    width: 800,
		bg: "#116611"
	});
	
	btnMultiplayer = new MainMenu.Button({
		bg: "#339933",
		width: 100,
		height: 50,
		x: 0,
		y: 0
	});
	
	btnLevelNetwork = new MainMenu.Button({
		bg: "#933",
		width: 100,
		height: 50,
		x: 100,
		y: 100
	});
});


