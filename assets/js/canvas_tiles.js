var TileGame = function(opt){
  var self = this;
  var canvas = opt.canvas;
  var ctx = canvas.getContext("2d");
  canvas.height = opt.height;
  canvas.width = opt.width;
  var padding = opt.padding;
  var bgImg = opt.bgImg;
  var map = opt.map;
  var tiles = opt.tiles;
  
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
  
  self.tiles = [];
  
  /*self.drawTile = function(x,y,t){
    if(t.color){
      ctx.fillStyle = t.color;
      ctx.fillRect(x,y,tiles.size,tiles.size);
    }
    if(t.img){
      ctx.drawImage(t.img,x,y,tiles.size,tiles.size);
    }
    ctx.lineWidth = tiles.stroke.thickness;
    ctx.strokeStyle = tiles.stroke.color
    ctx.strokeRect(x,y,tiles.size,tiles.size);
    
  }*/
  
  self.drawMap = function(){
    c.width = tiles.size*map[0].length + tiles.margin*map[0].length + 2*padding;
    c.height = tiles.size*map.length + tiles.margin*map.length + 2*padding;
    ctx.drawImage(bgImg,0,0,canvas.width,canvas.height);
    for(row=0;row<map.length;row++){
      for(col=0;col<map[row].length;col++){
        tile = tiles[map[row][col]];
        
        /*for(tile in tiles){
          
          if(map[row][col] == tile){
            //CoinWars.drawTile(col*tiles.size+col*tiles.margin+padding,row*tiles.size+row*tiles.margin+padding,tiles[tile]);*/
            t = self.Tile({
              color: tile.color,
              stroke: tile.stroke,
              col: col,
              row: row,
              update: false
            });
          //}
        //}
      }
    }
  }
  
  self.ents = [];
  self.drawEnts = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    self.drawMap();
    for(ent in self.ents){
      if(self.ents[ent].draw && self.ents[ent].update != false){
        self.ents[ent].draw();
      }else{
        delete self.ents[ent];
        console.log("Entity removed");
      }
    }
    
  }
  
  self.Entity = function(opt){
    var _entity = this;
    _entity.opt = opt;
    _entity.row = opt.row;
    _entity.col = opt.col;
    //_entity.x = opt.x;
    //_entity.y = opt.y;
    _entity.x = self.pixifyCoord(_entity.col);
    _entity.y = self.pixifyCoord(_entity.row);
    _entity.update = opt.update;
    _entity.getPos = function(){
      row = Math.round((_entity.y-((_entity.y/tiles.size)*tiles.margin))/tiles.size);
      col = Math.round((_entity.x-((_entity.x/tiles.size)*tiles.margin))/tiles.size);
      return [row,col];
    }
    _entity.move = function(ang,dist){
      row = _entity.getPos()[0];
      col = _entity.getPos()[1];
      terrain = map[row][col]; 
      switch(ang){
        case 0:
          newCol = col+1;
          newTerrain = map[row][newCol];
          self.checkAndMove(_entity,ang,dist,row,newCol,newTerrain);
          break;
        case 270:
          newRow = row-1;
          newTerrain = map[newRow][col];
          self.checkAndMove(_entity,ang,dist,newRow,col,newTerrain);
          break;
        case 180:
          newCol = col-1;
          newTerrain = map[row][newCol];
          self.checkAndMove(_entity,ang,dist,row,newCol,newTerrain);
          break;
        case 90:
          newRow = row+1;
          newTerrain = map[newRow][col];
          self.checkAndMove(_entity,ang,dist,newRow,col,newTerrain);
          break;
      }
      self.drawEnts();
    }
    _entity.destroy = function(){
      entity.update = false;
    }
    
    if(_entity.update!=false){
      self.ents.push(_entity);
    }
    self.drawEnts;
    return _entity;
  }
  
  self.checkAndMove = function(_entity,ang,dist,row,col,newTerrain){
    console.log("New terrain:",newTerrain);
    if(tiles[newTerrain].perm=="pass"){
      _entity.x += Math.round(Math.cos((Math.PI/180)*ang)*dist + (tiles.margin*(Math.cos((Math.PI/180)*ang)*dist)/tiles.size));
      _entity.y += Math.round(Math.sin((Math.PI/180)*ang)*dist + (tiles.margin*(Math.sin((Math.PI/180)*ang)*dist)/tiles.size));
    }
    console.log("New tile:",row,col);
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
  
  self.keyDown = function(key, handler){
    window.addEventListener("keydown", function(e){
      //console.log(e.keyCode);
      if(e.keyCode == key){handler(e);}
    });
  }
  
  self.getMouseCoords = function(event){
    rect = canvas.getBoundingClientRect();
    x = Math.floor(event.pageX-rect.left);
    y = Math.floor(event.pageY-rect.top);
    return [x,y];
  }
  
  self.click = function(obj, handler){
    canvas.addEventListener("click", function(event){
      clickedX = self.getMouseCoords(event)[0];
      clickedY = self.getMouseCoords(event)[1];
      clickedRow = self.mapifyCoord(clickedY);
      clickedCol = self.mapifyCoord(clickedX);
      console.log("Clicked Tile:",[clickedRow,clickedCol]);
      if(obj.getPos()[0]==clickedRow && obj.getPos()[1]==clickedCol){
        handler();
      }
    });
  }
  
  setInterval(self.drawEnts, 1000/60);
  return self;
}
