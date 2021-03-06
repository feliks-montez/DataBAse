ActionsMenu = function(){
  c.width = width;
  c.height = height;
  
  var actionsMenu = new canvas2D({
	  canvas: c,
	  width: width,
	  height: height,
	  bg: "#111ff"
	});
	
	Menu.resetListeners("click");
	Menu.setBG($("#hyperspace-binary")[0]);
	
	btnPlay = new Menu.Button({
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
	Menu.click(btnPlay,function(){
		drawGame();
		alert("Play!")
	})
	
	btnHelp = new Menu.Button({
	  x: 0,
		y: 200,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: true,
		text: "Help"
	});
	Menu.click(btnHelp,function(){
		alert("Help!");
	});
}
