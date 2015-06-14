Level = function(){
  console.log("level");
  c = $("#canvas")[0];
  ctx = c.getContext("2d");
  
  /*map = [
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
      [1,1,1,0,1,1,1,1,1,0,1,1]
    ];
  if((Math.round($(document).height()-150)/map.length) <= Math.round(($(document).width()-150)/map[0].length)){
    tileSize = Math.round(($(document).height()-150)/map.length);
  }else{
    tileSize = Math.round(($(document).width()-150)/map[0].length);
  }
  CoinWars = new TileGame({
    canvas: c,
    height: c.height,
    width: c.width,
    bgImg: $("#hyperspace-binary")[0],
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
  
  CoinWars.drawMap();
  
  Program = function(opt){
    _program = new CoinWars.Image({
      img: opt.img,
      color: opt.color,
      col: opt.col,
      row: opt.row
    });
		_program.moves = opt.moves;
		_program.range = opt.range;
		_program.maxSize = opt.maxSize;
    _program.curRow = function(){return _program.getPos()[0];}
    _program.curCol = function(){return _program.getPos()[1];}
    trail = function(){
       
    }
		_program.moveTiles = function(){
		  moveTiles = [];
			for(tRow in map){
				for(tCol in map[tRow]){
					rowDif = Math.abs(tRow-_program.curRow());
					colDif = Math.abs(tCol-_program.curCol());
					if(rowDif+colDif <= _program.moves){
					  if(map[tRow][tCol] != 0){ //&& tRow != _program.curRow() && tCol != _program.curCol()){
						  moveTiles.push([parseInt(tRow),parseInt(tCol)]);
						}
					}
				}
			}
			return moveTiles;
		}
		_program.attackTiles = function(){
		  attackTiles = [];
			for(tRow in map){
				for(tCol in map[tRow]){
					rowDif = Math.abs(tRow-_program.curRow());
					colDif = Math.abs(tCol-_program.curCol());
					if(rowDif+colDif <= _program.range){
					  if(map[tRow][tCol] != 0){// && [tRow,tCol] != [_program.curRow(),_program.curCol()]){
						  attackTiles.push([parseInt(tRow),parseInt(tCol)]);
						}
					}
				}
			}
			return attackTiles;
	  }
    _program.ajacentTiles = function(){return {
      upTile: map[_program.curRow()-1][_program.curCol()],
      downTile: map[_program.curRow()+1][_program.curCol()],
      leftTile: map[_program.curRow()][_program.curCol()-1],
      rightTile: map[_program.curRow()][_program.curCol()+1]
    }}
		_program.setMoveListener = function(){
			for(mt in mts){
				mTile = mts[mt];
				CoinWars.click(mTile, function(){
					_program.changePos(mTile.getPos[0],mTile.getPos[1]);
					console.log(mTile.getPos()[0],mTile.getPos()[1]);
				});
			}
		}
    return _program;
  }
  
  /*audioBg = new CoinWars.Audio({
    audio: $("#audio-bg")[0],
    auto: true, 
    loop: true
  });*/
  
  /*evergreen = new CoinWars.Image({
    img: $("#evergreen")[0],
    x: 5*tileSize + 5*tileMargin + padding,
    y: 5*tileSize + 5*tileMargin + padding
  });*/
  
  
  
  spawnBlue1 = new CoinWars.Image({
    img: $("#spawn-blue")[0],
    col: 0,
    row: 0
  });
  spawnBlue2 = new CoinWars.Image({
    img: $("#spawn-blue")[0],
    col: 0,
    row: 1
  });
  spawnBlue3 = new CoinWars.Image({
    img: $("#spawn-blue")[0],
    col: 0,
    row: 2
  });
  
  spawnRed1 = new CoinWars.Image({
    img: $("#spawn-red")[0],
    col: map[0].length-1,
    row: map.length-1
  });
  spawnRed2 = new CoinWars.Image({
    img: $("#spawn-red")[0],
    col: map[0].length-1,
    row: map.length-2
  });
  spawnRed3 = new CoinWars.Image({
    img: $("#spawn-red")[0],
    col: map[0].length-1,
    row: map.length-3
  });
  
  chrome = new Program({
    img: $("#chrome")[0],
    color: "rgba(160,220,50,255)",
    moves: 2,
    range: 1,
    maxSize: 4,
    col: 1,
    row: 1
    //x: CoinWars.pixifyCoord(1),
    //y: CoinWars.pixifyCoord(1)
  });
  
  //$(c).click(function(){for(mt in mts){mts[mt].destroy();delete mts[mt];}});
  CoinWars.keyDown(32, function(){audioBg.playOrPause();})
  CoinWars.keyDown(37, function(){chrome.move(180,tileSize);});
  CoinWars.keyDown(39, function(){chrome.move(0,tileSize);});
  CoinWars.keyDown(38, function(){chrome.move(270,tileSize);});
  CoinWars.keyDown(40, function(){chrome.move(90,tileSize);});
  CoinWars.keyDown(68, function(){for(mt in mts){mts[mt].destroy();delete mts[mt];}});
  CoinWars.click(chrome, function(){
    for(mTile in chrome.moveTiles()){
      mt = new CoinWars.Tile({row:chrome.moveTiles()[mTile][0],col:chrome.moveTiles()[mTile][1],color:"rgba(255,255,255,.7)"});
      mts.push(mt);
			chrome.setMoveListener();
    }
  });
	
//	MainMenu = new Menu({
//		bg: "33ff33",
//	});
}


