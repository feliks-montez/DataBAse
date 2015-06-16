var Canvas2D = function(opt){
  var self = this;
  var canvas = opt.canvas;
  var ctx = canvas.getContext("2d");
  canvas.width = opt.width;
  canvas.height = opt.height;
  var padding = opt.padding;
  var bg = opt.bg;
  var map = opt.map;
  var tiles = opt.tiles;
  if(opt.bg){self.bg = opt.bg}else{self.bg = false}
  
  self.running = true;
  self.tiles = [];
  
  self.mapifyCoord = function(px){
    //row = Math.floor((y-((y/tiles.size)*tiles.margin)-padding)/tiles.size);
    //col = Math.floor((x-((x/tiles.size)*tiles.margin)-padding)/tiles.size);
    tile = Math.floor((px-((px/tiles.size)*tiles.margin)-padding)/tiles.size);
    return tile;
  }
  self.pixifyCoord = function(tile){
    //x = Math.floor((col+((col*tiles.size)/tiles.margin)+padding)*tiles.size);
    //y = Math.floor((row+((row*tiles.size)/tiles.margin)+padding)*tiles.size);
    px = tile*(tiles.size+tiles.margin) + padding;
    return px;
  }
  
  self.setBG = function(bg){
    self.bg = bg;
  }
	
	self.drawBG = function(){
	  if(self.bg){
	    if(typeof self.bg == "string"){
	      if (self.bg.length == 6 || self.bg.length == 9) {
	        ctx.globalAlpha = 0.8;
	      }
	      ctx.fillStyle = self.bg;
			  ctx.fillRect(0,0,canvas.width,canvas.height);
	    }else{
	      ctx.drawImage(self.bg,0,0,canvas.width,canvas.height);
	    }
	  }
	}
	
	self.setMap = function(){
    //c.width = tiles.size*map[0].length + tiles.margin*map[0].length + 2*padding;
    //c.height = tiles.size*map.length + tiles.margin*map.length + 2*padding;
    ctx.drawImage(bg,0,0,canvas.width,canvas.height);
    for(row=0;row<map.length;row++){
      for(col=0;col<map[row].length;col++){
        tile = tiles[map[row][col]];
        t = self.Tile({
          color: tile.color,
          stroke: tile.stroke,
          col: col,
          row: row,
          update: false
        });
      }
    }
  }
	
	self.ents = [];
	self.drawEnts = function(){
	  //self.drawMap();
		//self.ents.reverse();
	  for(ent in self.ents){
	    entity = self.ents[ent];
	    if(entity.draw && entity.update != false){ //ok
	        entity.draw();
	    } else {
        delete self.ents[ent];
	    }
	  }
	}
	
	self.update = function(){
	  if(self && self.running){
	    ctx.clearRect(0,0,canvas.width,canvas.height);
	    self.drawBG();
	    self.drawEnts();
	  }
	  //console.log("running");
	  requestAnimationFrame(self.update);
	}
	
	self.Entity = function(opt){
	  var _ent = this;
	  if (opt.x != undefined && opt.y != undefined) {
	    _ent.x = opt.x;
	    _ent.y = opt.y;
	  } else if (opt.row != undefined && opt.col != undefined) {
	    _ent.row = opt.row;
	    _ent.col = opt.col;
	    _ent.x = self.pixifyCoord(opt.col)
	    _ent.y = self.pixifyCoord(opt.row)
	  }
//	  _entity.x = self.pixifyCoord(_entity.col);
//    _entity.y = self.pixifyCoord(_entity.row);
	  _ent.width = opt.width;
	  _ent.height = opt.height;
	  _ent.bg = opt.bg;
	  if (opt.update) {
	    _ent.update = opt.update;
	  } else {
      _ent.update = true
	  }
	  
	  if (opt.onclick) {
	    _ent.onclick = opt.onclick;
	  }
	  
	  _ent.draw = function(){
	    if(_ent.bg){
	      if(typeof _ent.bg == "string"){
	        ctx.fillStyle = _ent.bg;
	        console.log(_ent.x,_ent.y,_ent.width,_ent.height,_ent.bg);
			    ctx.fillRect(_ent.x,_ent.y,_ent.width,_ent.height);
	      }else{
	        ctx.drawImage(_ent.bg,_ent.x,_ent.y,_ent.width,_ent.height);
	      }
	    }
	  }
	  
	  _ent.move = function(ang,dist){
      row = _ent.getPos()[0];
      col = _ent.getPos()[1];
      terrain = map[row][col]; 
      switch(ang){
        case 0:
          newCol = col+1;
          newTerrain = map[row][newCol];
          self.checkAndMove(_ent,ang,dist,row,newCol,newTerrain);
          break;
        case 270:
          newRow = row-1;
          newTerrain = map[newRow][col];
          self.checkAndMove(_ent,ang,dist,newRow,col,newTerrain);
          break;
        case 180:
          newCol = col-1;
          newTerrain = map[row][newCol];
          self.checkAndMove(_ent,ang,dist,row,newCol,newTerrain);
          break;
        case 90:
          newRow = row+1;
          newTerrain = map[newRow][col];
          self.checkAndMove(_ent,ang,dist,newRow,col,newTerrain);
          break;
      }
      self.drawEnts();
    }
	  
	  _ent.getPos = function(){
      row = Math.round((_ent.y-((_ent.y/tiles.size)*tiles.margin))/tiles.size);
      col = Math.round((_ent.x-((_ent.x/tiles.size)*tiles.margin))/tiles.size);
      return [row,col];
    }
    
    _ent.changePos = function(row, col){
      _ent.x = self.pixifyCoord(col);
      _ent.y = self.pixifyCoord(row);
      return [x,y];
    }
		
		_ent.getBounds = function(){
      return [_ent.x,_ent.y,_ent.x+_ent.width,_ent.y+_ent.height];
    }
		
		_ent.checkCoordCollision = function(x,y){
			if(x>=_ent.x && x<=_ent.x+_ent.width && y>=_ent.y && y<=_ent.y+_ent.height){
				return true;
			}else{
				return false;
			}
		}
		
		_ent.destroy = function(){
      _ent.update = false;
    }
    
    if(_ent.update!=false){
      self.ents.push(_ent);
    }
		
	  return _ent;
	}
	
	self.Button = function(opt){ 
		var _button = new self.Entity(opt);
		_button.text = opt.text;

		if(!opt.font){_button.font = "Arial"}else{_button.font = opt.font}
		if(!opt.size){_button.size = 30}else{_button.size = opt.size}
		if(!opt.color){_button.color = "#000"}else{_button.color = opt.color}
		if(!opt.padding){_button.padding = 6}else{_button.padding = opt.padding}
		if(!opt.centerText){_button.centerText = true}else{_button.centerText = opt.centerText}
		if(!opt.center){_button.center = false}else{
			_button.center = opt.center;
			if(_button.center){
				_button.x = canvas.width/2-_button.width/2;
			}
		}
		
		_button.draw = function(){
			if(_button.img){
				ctx.drawImage(_button.img,_button.x,_button.y,_button.width,_button.height);
			}
			
			if(_button.bg){
				ctx.fillStyle = _button.bg;
				if(_button.center == true){
					ctx.fillRect(_button.x,_button.y,_button.width,_button.height);
				}
				
				ctx.fillRect(_button.x,_button.y,_button.width,_button.height);
			} 
			
			if(_button.text){
				var measure = ctx.measureText(_button.text);
				ctx.fillStyle = _button.color;
				ctx.font = _button.size.toString() + "px " + _button.font;
				if(_button.centerText == true){
					ctx.fillText(_button.text,_button.x+(_button.width/2-measure.width/2),_button.y+(_button.height/2+_button.size/3));
				} else {
					ctx.fillText(_button.text,_button.x+_button.padding,_button.y+(_button.height/2+_button.size/3));
				}
			}
		}

		return _button;
	}
	
	self.checkAndMove = function(_entity,ang,dist,row,col,newTerrain){
    //console.log("New terrain:",newTerrain);
    if(tiles[newTerrain].perm=="pass"){
      _entity.x += Math.round(Math.cos((Math.PI/180)*ang)*dist + (tiles.margin*(Math.cos((Math.PI/180)*ang)*dist)/tiles.size));
      _entity.y += Math.round(Math.sin((Math.PI/180)*ang)*dist + (tiles.margin*(Math.sin((Math.PI/180)*ang)*dist)/tiles.size));
    }
    //console.log("New tile:",row,col);
  }
  
  self.Image = function(opt){
    var _image = new self.Entity(opt);
    _image.img = opt.img;
    _image.color = opt.color;
    _image.draw = function(){
    if(_image.color){
      ctx.fillStyle = _image.color;
      ctx.fillRect(_image.x,_image.y,tiles.size,tiles.size);
    }
    //ctx.drawImage(_image.img,self.pixifyCoord(_image.col),self.pixifyCoord(_image.row),tiles.size,tiles.size);
    ctx.drawImage(_image.img,_image.x,_image.y,tiles.size,tiles.size);
    }
    return _image;
  }
  
  self.Audio = function(opt){
    var _audio = this;
    _audio.opt = opt;
    _audio.audio = opt.audio;
    _audio.playOrPause = function(){
      if(_audio.opt.loop==true){
        _audio.audio.loop = true;
      }
      if(_audio.audio.paused){
        _audio.audio.play();
      }else{
        _audio.audio.pause();
      }
    }
    _audio.pause = function(){
      _audio.audio.pause();
    }
    _audio.stop = function(){
      _audio.audio.stop();
    }
    if(_audio.opt.auto==true){
      _audio.playOrPause()
    }
  }
	
	self.Tile = function(opt){
    var _tile = new self.Entity(opt);
    _tile.color = opt.color;
    _tile.img = opt.img;
    _tile.stroke = opt.stroke;
    _tile.draw = function(){
      if(_tile.color){
        ctx.fillStyle = _tile.color;
        ctx.fillRect(_tile.x,_tile.y,tiles.size,tiles.size);
      }
      if(_tile.img){
        ctx.drawImage(_tile.img,_tile.x,_tile.y,tiles.size,tiles.size);
      }
      if(_tile.stroke!=false){
        ctx.lineWidth = tiles.stroke.thickness;
        ctx.strokeStyle = tiles.stroke.color;
        ctx.strokeRect(_tile.x,_tile.y,tiles.size,tiles.size);
      }
    }
    _tile.draw();
    return _tile;
  }
	
	self.keyDown = function(key, handler){
    window.addEventListener("keydown", function(e){
      //console.log(e.keyCode);
      if(e.keyCode == key){handler(e);}
    });
  }
  
  self.getMouseCoords = function(event){
    rect = canvas.getBoundingClientRect();
    x = Math.floor(event.clientX-rect.left);
    y = Math.floor(event.clientY-rect.top);
    return [x,y];
  }
	
	self.resetListeners = function(obj, type){
		$(obj).unbind(type);
	}
	
	
	self.start = function(){
	  self.running = true;
	}
	
	self.stop = function(){
	  self.running = false;
	  self.ents = [];
	  self.tiles = [];
	  self.resetListeners(canvas, 'click');
	}
	
	self.exit = function(){
	  self.stop();
	  $(canvas).unbind("click");
	}
	
	function init() {	  
	  $(canvas).bind("click", function(event) {
	    //console.log("canvas clicked");
	    var coords = self.getMouseCoords(event);
	    var x = coords[0]; 
	    var y = coords[1];
      
	    for (var i = 0; i < self.ents.length; i++) {
	      var entity = self.ents[i];
	      if (entity.onclick) {
	        if (entity.checkCoordCollision(x, y)) {
	          entity.onclick();
	        }
	      }
	    }
	  });
    if (map != undefined){
	    self.setMap();
	  }
	  self.update();
	}
  
  init();
  
  return self;
}
