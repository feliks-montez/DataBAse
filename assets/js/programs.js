Program = game.Image.extend(function(opt){
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
  }
};
