var mts = [];
var ats = [];
var atkts = [];
var selectedProgram;

Level = function(){
  //console.log("level");
  c = $("#canvas")[0];
  ctx = c.getContext("2d");
  
  /*var map = [
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [3,3,3,2,2,3,3,2,2,3,3,3],
      [3,3,3,2,2,3,3,2,2,3,3,3],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0]
    ];*/
  var map = [
      [1,1,1,1,1,1,0,0,1,1,0,1],
      [1,1,1,0,1,1,1,0,0,1,1,1],
      [1,0,1,1,1,1,1,1,0,1,1,1],
      [1,1,1,1,1,0,1,1,1,1,1,1],
      [0,1,1,1,1,0,1,1,1,1,1,1],
      [0,1,1,1,1,0,1,1,1,1,1,1],
      [0,1,1,1,1,1,0,1,1,1,1,1],
      [1,1,0,1,1,1,0,1,1,1,1,1],
      [1,1,1,0,1,1,1,1,1,0,1,1]
    ]
    
    var map = [
      [1,1,1,1,1,1,0,0,1,1,0,1],
      [1,1,1,0,1,1,1,0,0,1,1,1],
      [1,0,1,1,1,1,1,1,0,1,1,1],
      [1,1,1,1,1,0,1,1,1,1,1,1],
      [0,1,1,1,1,0,1,1,1,1,1,1],
      [0,1,1,1,1,0,1,1,1,1,1,1],
      [0,1,1,1,1,1,0,1,1,1,1,1],
      [1,1,0,1,1,1,0,1,1,1,1,1],
      [1,1,1,0,1,1,1,1,1,0,1,1]
    ]
  
  if((Math.round($(document).height()-150)/map.length) <= Math.round(($(document).width()-150)/map[0].length)){
    var tileSize = Math.round(($(document).height()-150)/map.length);
  }else{
    var tileSize = Math.round(($(document).width()-150)/map[0].length);
  }
  
  gameScene = new game.Scene({
    type: "tiles",
    //bg: $("#hyperspace-binary")[0],
    bg: $("#electric-path")[0],
    padding: padding = 20,
    map: map,
    width: c.width - 200,
    /*tiles: {
      stroke: {color:"rgba(0,0,0,.3)",thickness:3},
      margin: tileMargin = 0,
      size: tileSize,
      0: {perm:"block",img:$("#evergreen")[0],color:"rgba(40,200,40,255)"},
      1: {perm:"pass",color:"rgba(180,255,150,255)"},
      2: {perm:"pass",color:"rgba(130,130,0,255)"},
      3: {perm:"block",color:"rgba(60,60,160,255)"}
    }*/
    tile: {
      stroke: {color:"rgba(0,0,0,.3)",thickness:3},
      margin: tileMargin = 3,
      size: tileSize,
      0: {perm:"block",color:"rgba(0,0,0,0)",stroke:false},
      1: {perm:"pass",color:"rgba(200,200,200,.8)"},
      2: {perm:"pass",color:"rgba(150,255,150,.8)"}
    }
  });
  
  Program = gameScene.Image.extend(function(opt){
    var _program = this;
    this.constructor = function(opt) {
      this.super(opt);
      _program.width = tileSize;
      _program.height = tileSize;
	    _program.moves = opt.moves;
	    _program.range = opt.range;
	    _program.damage = opt.damage;
	    _program.maxSize = opt.maxSize;
	    _program.size = opt.size || 1;
      _program.curRow = function(){return _program.getPos()[0];}
      _program.curCol = function(){return _program.getPos()[1];}
      return _program;
    }
    
    _program.sectors = function() {
      
    }
    
    _program.moveTiles = function(){
      var moveTiles = [];
	    for(tRow in map){
		    for(tCol in map[tRow]){
			    rowDif = Math.abs(tRow-_program.curRow());
			    colDif = Math.abs(tCol-_program.curCol());
			    if(rowDif+colDif <= _program.movesLeft && rowDif+colDif != 0){
			      if(map[tRow][tCol] != 0){ //&& tRow != _program.curRow() && tCol != _program.curCol()){
				      moveTiles.push([parseInt(tRow),parseInt(tCol)]);
				    }
			    }
		    }
	    }
	    return moveTiles;
    }
    _program.attackTiles = function(){
      var attackTiles = [];
	    for(tRow in map){
		    for(tCol in map[tRow]){
			    rowDif = Math.abs(tRow-_program.curRow());
			    colDif = Math.abs(tCol-_program.curCol());
			    if(rowDif+colDif <= _program.range && rowDif+colDif != 0){
			      if(map[tRow][tCol] != 0){// && [tRow,tCol] != [_program.curRow(),_program.curCol()]){
				      attackTiles.push([parseInt(tRow),parseInt(tCol)]);
				    }
			    }
		    }
	    }
	    return attackTiles;
    }
    
    _program.adjTiles = function(){
      var adjTiles = [];
	    for(tRow in map){
		    for(tCol in map[tRow]){
			    rowDif = Math.abs(tRow-_program.curRow());
			    colDif = Math.abs(tCol-_program.curCol());
			    if(rowDif+colDif <= 1 && rowDif+colDif != 0){
			      if(map[tRow][tCol] != 0){ //&& tRow != _program.curRow() && tCol != _program.curCol()){
				      adjTiles.push([parseInt(tRow),parseInt(tCol)]);
				    }
			    }
		    }
	    }
	    return adjTiles;
    }
    
    _program.drawMoveTiles = function() {
      _program.clearMoveTiles();
      for(var i=0; i<_program.moveTiles().length; i++){
        var moveTile = new gameScene.Tile({
          row: _program.moveTiles()[i][0],
          col: _program.moveTiles()[i][1],
          width: tileSize,
          height: tileSize,
          color: "rgba(255,255,255,.5)",
        });
        mts.push(moveTile);
      }
    };
    
    _program.clearMoveTiles = function(){
      for (var i=0; i<mts.length; i++) {
        var mt = mts[i];
        var index = gameScene.ents.indexOf(mt);
        if (index > -1) {
          gameScene.ents.splice(index, 1);
        }
      }
      mts = [];
    };
    
    _program.drawAdjacentTiles = function(){
      _program.clearAdjacentTiles();
      if (_program.movesLeft > 0) {
        for(var i=0; i<_program.adjTiles().length; i++) {
          var adjTile = new gameScene.Tile({
            row: _program.adjTiles()[i][0],
            col: _program.adjTiles()[i][1],
            width: tileSize,
            height: tileSize,
            color: "rgba(255,255,255,.5)",
            onclick: function(){
              _program.changePos(this.row, this.col);
              _program.movesLeft--;
              if (_program.movesLeft >= 0) {
                _program.drawMoveTiles();
                _program.drawAdjacentTiles();
              }
            }
          });
          ats.push(adjTile);
        }
      } else {
        _program.drawAttackTiles();
      }
    }
    
    _program.clearAdjacentTiles = function(){
      for (var i=0; i<ats.length; i++) {
        var at = ats[i];
        var index = gameScene.ents.indexOf(at);
        if (index > -1) {
          gameScene.ents.splice(index, 1);
        }
      }
      ats = [];
    };
    
    _program.drawAttackTiles = function(){
      _program.clearMoveTiles();
      _program.clearAdjacentTiles();
      _program.clearAttackTiles();
      for(var i=0; i<_program.attackTiles().length; i++) {
        var atkTile = new gameScene.Tile({
          row: _program.attackTiles()[i][0],
          col: _program.attackTiles()[i][1],
          width: tileSize,
          height: tileSize,
          color: "rgba(255,60,60,.5)",
          onclick: function(){
            attack(this);
          }
        });
        atkts.push(atkTile);
      }
    }
    
    _program.clearAttackTiles = function(){
      for (var i=0; i<atkts.length; i++) {
        var atkt = atkts[i];
        var index = gameScene.ents.indexOf(atkt);
        if (index > -1) {
          gameScene.ents.splice(index, 1);
        }
      }
      atkts = [];
    };
    
    _program.onclick = function() {
      if (atkts.length == 0) { // no attack tiles
        if (selectedProgram == _program) {
          _program.drawAttackTiles();
        } else {
          selectedProgram = _program
          _program.movesLeft = _program.moves;
          _program.drawMoveTiles();
          _program.drawAdjacentTiles();
        }
      } else { // attack tiles present
        if (selectedProgram == _program) {
          _program.clearAttackTiles();
          selectedProgram = null;
        }
      }
    };
  });

  /*Chrome = Program.extend(function(opt) {
    this.constructor = function(opt) {
      this.super(opt);
      this.img = $("#chrome")[0];
      this.color = opt.team || "rgba(160,220,50,255)";
      this.moves = 1;
      this.range = 2;
      this.damage = 1;
      this.maxSize = 2;
    }
  });

  Hadoop = Program.extend(function(opt) {
    this.constructor = function(opt) {
      this.super(opt);
      this.img = $("#hadoop")[0];
      this.color = opt.team || "rgba(60,60,220,255)";
      this.moves = 2;
      this.range = 1;
      this.damage = 2;
      this.maxSize = 30;
    }
  });

  Processor = Program.extend(function(opt) {
    this.constructor = function(opt) {
      this.super(opt);
      this.img = $("#processor")[0];
      this.color = opt.team || "rgba(250,100,50,255)";
      this.moves = 3;
      this.range = 1;
      this.damage = 1;
      this.maxSize = 1;
    }
  });*/

  var programs = {
    'chrome': {
      img: $("#chrome")[0],
      color: "rgba(160,220,50,255)",
      moves: 1,
      range: 2,
      damage: 1,
      maxSize: 2,
      col: 1,
      row: 1
    },
    'processor': {
      img: $("#processor")[0],
      color: "rgba(250,100,50,255)",
      moves: 3,
      range: 1,
      damage: 1,
      maxSize: 1,
      col: 10,
      row: 7
    },
    'hadoop': {
      img: $("#hadoop")[0],
      color: "rgba(60,60,220,255)",
      moves: 2,
      range: 1,
      damage: 2, // = number of sectors
      maxSize: 30,
      size: 2,
      col: 6,
      row: 3
    },
    'ubuntu': {
      img: $("#ubuntu")[0],
      color: "rgba(100,40,100,255)",
      moves: 2,
      range: 2,
      damage: 1, // = number of sectors
      maxSize: 3,
      size: 1,
      col: 6,
      row: 3
    },
    'apple': {
      img: $("#apple")[0],
      color: "rgba(255,255,255,255)",
      moves: 0,
      range: 3,
      damage: 1, // = number of sectors
      maxSize: 1,
      size: 1,
      col: 6,
      row: 3
    }
  };
  
  var attack = function(tile) {
    var row = tile.row;
    var col = tile.col;
    for (var i=0; i<gameScene.ents.length; i++) {
      var ent = gameScene.ents[i];
      //console.log(ent);
      if (ent.size && ent.row == row && ent.col == col) {
        ent.size -= selectedProgram.damage;
        if (ent.size <= 0) {
          ent.destroy();
        }
      }
    }
    selectedProgram.clearAttackTiles();
    selectedProgram = null;
  };
    
  var selectSpawn = function(spawn) {
    spawnMenu = new game.Scene({
      type: "menu",
      x: canvas.width/2 - 150,
      y: canvas.height/2 - 200,
      width: 300,
      height: 400,
      bg: "#111"
    });
    var title = new spawnMenu.Text({
      text: "Select Program",
      x: 0,
      y: 0,
      center: true,
      padding: 8,
      color: "#fff"
    });
    
    var listItems = [];
    
    for (p in programs) {
      var item = new spawnMenu.Group({
        id: p,
        x: 0,
        y: 0,
        width: 300,
        height: 60,
        onclick: function(event) {
          var opt = programs[event.target.id];
          opt.row = spawn.row;
          opt.col = spawn.col;
          var program = new Program(opt);
          spawnMenu.destroy();
          programList.destroy();
          spawn.destroy();
        }
      });
      
      var img = new item.Image({
        id: p,
        x: 0,
        y: 0,
        width: 55,
        height: 55,
        img: programs[p].img
      });
      
      var text = new item.Text({
        text: p,
        color: "#fff",
        x: 60,
        y: 0
      });
      
      listItems.push(item);
    }
    
    programList = new spawnMenu.List({
      x: 0,
      y: 60,
      width: 300,
      items: listItems
    });
    
    var returnProgramKey = function(key) {
      return key;
    }
  };
  
  /*audioBg = new game.Audio({
    audio: $("#audio-bg")[0],
    auto: true, 
    loop: true
  });*/
  
  var Spawn = gameScene.Image.extend(function(opt) {
    var _spawn = this;
    this.constructor = function(opt) {
      this.super(opt);
      _spawn.team = opt.team || "blue";
      if (_spawn.team == "blue") {
        _spawn.img = $("#spawn-blue")[0];
      } else if (_spawn.team == "red") {
        _spawn.img = $("#spawn-red")[0];
      }
    }
    
    _spawn.onclick = function() {
      selectSpawn(this);
    }
  });
  
  
  var spawnBlue1 = new Spawn({
    team: "blue",
    col: 1,
    row: 0
  });
  var spawnBlue2 = new Spawn({
    team: "blue",
    col: 0,
    row: 1
  });
  var spawnBlue3 = new Spawn({
    team: "blue",
    col: 0,
    row: 2
  });
  
  var spawnRed1 = new Spawn({
    team: "red",
    col: map[0].length-1,
    row: map.length-1
  });
  var spawnRed2 = new Spawn({
    team: "red",
    col: map[0].length-1,
    row: map.length-2
  });
  var spawnRed3 = new Spawn({
    team: "red",
    col: map[0].length-1,
    row: map.length-3
  });
  
  game.keyDown(32, function(){audioBg.playOrPause();})
  game.keyDown(37, function(){chrome.move(180,tileSize);});
  game.keyDown(39, function(){chrome.move(0,tileSize);});
  game.keyDown(38, function(){chrome.move(270,tileSize);});
  game.keyDown(40, function(){chrome.move(90,tileSize);});
  
  sideMenu = new game.Scene({
    type: "menu",
    x: width-200,
    y: 0,
    width: 200,
    height: height,
    bg: "#111"
  });
	
  var mainMenuBtn = new sideMenu.Button({
    x: 0,
		y: 0,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: false,
		centerText: false,
		text: "Main Menu",
		onclick: function(){
		  gameScene.destroy();
		  sideMenu.destroy();
		  drawMainMenu();
		}
	});
	
	var attackBtn = new sideMenu.Button({
    x: 0,
		y: 50,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: false,
		centerText: false,
		text: "Attack",
		onclick: function(){
		  selectedProgram.clearMoveTiles();
		  selectedProgram.clearAdjacentTiles();
		  selectedProgram.drawAttackTiles();
		}
	});
	
	var moveBtn = new sideMenu.Button({
    x: 0,
		y: 100,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: false,
		centerText: false,
		text: "Move",
		onclick: function(){
		  selectedProgram.clearAttackTiles();
		  selectedProgram.drawMoveTiles();
      selectedProgram.drawAdjacentTiles();
		}
	});
}
