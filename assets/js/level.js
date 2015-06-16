var mts = [];
var ats = [];

Level = function(){
  console.log("level");
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
    ];
  if((Math.round($(document).height()-150)/map.length) <= Math.round(($(document).width()-150)/map[0].length)){
    var tileSize = Math.round(($(document).height()-150)/map.length);
  }else{
    var tileSize = Math.round(($(document).width()-150)/map[0].length);
  }
  game = new Canvas2D({
    canvas: c,
    height: c.height,
    width: c.width,
    bg: $("#hyperspace-binary")[0],
    padding: padding = 20,
    map: map,
    /*tiles: {
      stroke: {color:"rgba(0,0,0,.3)",thickness:3},
      margin: tileMargin = 0,
      size: tileSize,
      0: {perm:"block",img:$("#evergreen")[0],color:"rgba(40,200,40,255)"},
      1: {perm:"pass",color:"rgba(180,255,150,255)"},
      2: {perm:"pass",color:"rgba(130,130,0,255)"},
      3: {perm:"block",color:"rgba(60,60,160,255)"}
    }*/
    tiles: {
      stroke: {color:"rgba(0,0,0,.3)",thickness:3},
      margin: tileMargin = 3,
      size: tileSize,
      0: {perm:"block",color:"rgba(0,0,0,0)",stroke:false},
      1: {perm:"pass",color:"rgba(200,200,200,.8)"},
      2: {perm:"pass",color:"rgba(150,255,150,.8)"}
    }
  });
  
  Program = function(opt){
    var _program = new game.Image(opt);
    _program.width = tileSize;
    _program.height = tileSize;
		_program.moves = opt.moves;
		_program.range = opt.range;
		_program.maxSize = opt.maxSize;
    _program.curRow = function(){return _program.getPos()[0];}
    _program.curCol = function(){return _program.getPos()[1];}
    var trail = function(){
       
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
    /*_program.adjacentTiles = function(){return {
      upTile: map[_program.curRow()-1][_program.curCol()],
      downTile: map[_program.curRow()+1][_program.curCol()],
      leftTile: map[_program.curRow()][_program.curCol()-1],
      rightTile: map[_program.curRow()][_program.curCol()+1]
    }};
    
    _program.adjacentTiles = function(){
      var adjacentTiles = [];
      adjacentTiles.push([_program.curRow()-1,_program.curCol()]);
      adjacentTiles.push([_program.curRow()+1,_program.curCol()]);
      adjacentTiles.push([_program.curRow(),_program.curCol()-1]);
      adjacentTiles.push([_program.curRow(),_program.curCol()+1]);
      return adjacentTiles;
    };*/
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
      for (var i=0; i<mts.length; i++) {
        var mt = mts[i];
        var index = game.ents.indexOf(mt);
        if (index > -1) {
          game.ents.splice(index, 1);
        }
      }
      mts = [];
      
      for(var i=0; i<_program.moveTiles().length; i++){
        var moveTile = new game.Tile({
          row: _program.moveTiles()[i][0],
          col: _program.moveTiles()[i][1],
          width: tileSize,
          height: tileSize,
          color: "rgba(255,255,255,.5)",
        });
        mts.push(moveTile);
      }
    };
    
    _program.drawAdjacentTiles = function(){
      for (var i=0; i<ats.length; i++) {
        var at = ats[i];
        var index = game.ents.indexOf(at);
        if (index > -1) {
          game.ents.splice(index, 1);
        }
      }
      ats = [];
      
      if (_program.movesLeft > 0) {
        for(var i=0; i<_program.adjTiles().length; i++) {
          var adjTile = new game.Tile({
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
      }
    }
    
    _program.onclick = function() {
      console.log(_program.movesLeft);
      _program.movesLeft = _program.moves;
      _program.drawMoveTiles();
      _program.drawAdjacentTiles();
    };
    
    return _program;
  }
  
  /*audioBg = new game.Audio({
    audio: $("#audio-bg")[0],
    auto: true, 
    loop: true
  });*/
  
  /*var evergreen = new game.Image({
    img: $("#evergreen")[0],
    x: 5*tileSize + 5*tileMargin + padding,
    y: 5*tileSize + 5*tileMargin + padding
  });*/
  
  
  
  var spawnBlue1 = new game.Image({
    img: $("#spawn-blue")[0],
    bg: "#66ff66",
    col: 0,
    row: 0
  });
  var spawnBlue2 = new game.Image({
    img: $("#spawn-blue")[0],
    col: 0,
    row: 1
  });
  var spawnBlue3 = new game.Image({
    img: $("#spawn-blue")[0],
    col: 0,
    row: 2
  });
  
  var spawnRed1 = new game.Image({
    img: $("#spawn-red")[0],
    col: map[0].length-1,
    row: map.length-1
  });
  var spawnRed2 = new game.Image({
    img: $("#spawn-red")[0],
    col: map[0].length-1,
    row: map.length-2
  });
  var spawnRed3 = new game.Image({
    img: $("#spawn-red")[0],
    col: map[0].length-1,
    row: map.length-3
  });
  
  var chrome = new Program({
    img: $("#chrome")[0],
    color: "rgba(160,220,50,255)",
    moves: 2,
    range: 2,
    maxSize: 2,
    col: 1,
    row: 1
  });
  
  var processor = new Program({
    img: $("#processor")[0],
    color: "rgba(250,100,50,255)",
    moves: 3,
    range: 1,
    maxSize: 1,
    col: 10,
    row: 7
  });
  
  var hadoop = new Program({
    img: $("#hadoop")[0],
    color: "rgba(60,60,220,255)",
    moves: 2,
    range: 1,
    maxSize: 30,
    col: 6,
    row: 3
  });
  
  //$(c).click(function(){for(mt in mts){mts[mt].destroy();delete mts[mt];}});
  game.keyDown(32, function(){audioBg.playOrPause();})
  game.keyDown(37, function(){chrome.move(180,tileSize);});
  game.keyDown(39, function(){chrome.move(0,tileSize);});
  game.keyDown(38, function(){chrome.move(270,tileSize);});
  game.keyDown(40, function(){chrome.move(90,tileSize);});
  game.keyDown(68, function(){for(mt in mts){mts[mt].destroy();delete mts[mt];}});
	
  var mainMenuBtn = new game.Button({
    x: canvas.width - 200,
		y: 0,
		width: 200,
		height: 50,
		color: "#eee",
		bg: "#111",
		center: false,
		centerText: false,
		text: "Menu",
		onclick: function(){
		  game.exit();
		  drawMainMenu();
		}
	});
}


