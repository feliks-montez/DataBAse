var Canvas2D = function(opt){
  var self = this;
  var canvas = opt.canvas;
  var ctx = canvas.getContext("2d");
  canvas.width = opt.width;
  canvas.height = opt.height;
  
  self.running = true;
  self.scenes = [];
	
	self.drawScenes = function(){
	  //self.drawMap();
		//self.ents.reverse();
	  for(i in self.scenes){
	    var scene = self.scenes[i];
	    if(scene.draw && scene.update != false){ //ok
	        scene.draw();
	    } else {
        self.scenes.splice(i, 1);
	    }
	  }
	}
	
	self.update = function(){
	  if(self && self.running){
	    ctx.clearRect(0,0,canvas.width,canvas.height);
	    self.drawScenes();
	  }
	  //console.log("running");
	  requestAnimationFrame(self.update);
	}
	
	
	
	self.Base = Class.extend(function(opt){
	  var _base = this;
    this.constructor = function(opt){
	    var opt = opt || {};
	    _base.id = opt.id;
	    _base.x = opt.x || 0;
	    _base.y = opt.y || 0;
	    _base.width = opt.width || c.width;
	    _base.height = opt.height || c.height;
	    _base.bg = opt.bg;
	    _base.update = opt.update || true;
	    _base.onclick = opt.onclick || _base.onclick || undefined;
		  _base.type = opt.type || _base.type;
	    //return _base;
    }
    
    _base.move = function(ang,dist){
      row = _base.getPos()[0];
      col = _base.getPos()[1];
      terrain = map[row][col]; 
      switch(ang){
        case 0:
          newCol = col+1;
          newTerrain = map[row][newCol];
          self.checkAndMove(_base,ang,dist,row,newCol,newTerrain);
          break;
        case 270:
          newRow = row-1;
          newTerrain = map[newRow][col];
          self.checkAndMove(_base,ang,dist,newRow,col,newTerrain);
          break;
        case 180:
          newCol = col-1;
          newTerrain = map[row][newCol];
          self.checkAndMove(_base,ang,dist,row,newCol,newTerrain);
          break;
        case 90:
          newRow = row+1;
          newTerrain = map[newRow][col];
          self.checkAndMove(_base,ang,dist,newRow,col,newTerrain);
          break;
      }
      self.drawEnts();
    }
    
	
	  _base.getBounds = function(){
      return [_base.x,_base.y,_base.x+_base.width,_base.y+_base.height];
    }
	
	  _base.destroy = function(){
      _base.update = false;
    }
    
    _base.draw = function(){
      if(_base.bg){
        if(typeof _base.bg == "string"){
          ctx.fillStyle = _base.bg;
          //console.log(_base.x,_base.y,_base.width,_base.height,_base.bg);
		      ctx.fillRect(_base.x,_base.y,_base.width,_base.height);
        }else{
          ctx.drawImage(_base.bg,_base.x,_base.y,_base.width,_base.height);
        }
      }
    }
	});
	
	self.Scene = self.Base.extend(function(opt) {
	  var _scene = this;
	  this.constructor = function(opt) {
	    this.super(opt);
	    _scene.type = opt.type || "group";
      _scene.padding = opt.padding;
      _scene.bg = opt.bg || false;
      _scene.map = opt.map;
      _scene.tile = opt.tile;
      _scene.tiles = [];
	    _scene.ents = [];
	    _scene.absx = (_scene.scene || _scene).x || _scene.x;
	    _scene.absy = _scene.y;
	    
	    if(_scene.update!=false){
        self.scenes.push(_scene);
      }
      
      if (_scene.map){
        _scene.setMap();
      }
	    
	    return _scene;
    }
    
    _scene.drawEnts = function(){
      //_scene.drawMap();
	    //_scene.ents.reverse();
      for(var ent=0; ent<_scene.ents.length; ent++){
        entity = _scene.ents[ent];
        if(entity.draw && entity.update != false){ //ok
            entity.draw();
        } else {
          _scene.ents.splice(ent, 1);
        }
      }
    }
	    
    _scene.Entity = self.Base.extend(function(opt) {
      var _ent = this;
      this.constructor = function(opt) {
        var opt = opt || {};
        this.super(opt);
        _ent.scene = _scene
        if (_ent.scene.type == "tiles") {
          if (opt.row != undefined && opt.col != undefined) {
            _ent.x = _scene.pixifyCoord(opt.col);
            _ent.y = _scene.pixifyCoord(opt.row);
            _ent.row = opt.row;
            _ent.col = opt.col;
          } else if (opt.x != undefined && opt.y != undefined) {
            _ent.x = opt.x;
            _ent.y = opt.y;
            _ent.row = _scene.mapifyCoord(opt.y);
            _ent.col = _scene.mapifyCoord(opt.x);
          } else {
            _ent.x = 0;
            _ent.y = 0;
          }
        } else {
          _ent.x = opt.x || 0;
          _ent.y = opt.y || 0;
        }
        
        if(_ent.update!=false){
          _scene.ents.push(_ent);
        }
        return _ent;
      }
      
      
      
      _ent.draw = function(opt) {
        var opt = opt || {};
        _ent.x = opt.x || _ent.x;
        _ent.y = opt.y || _ent.y;
        _ent.absx = _ent.x + _ent.scene.absx;
        _ent.absy = _ent.y + _ent.scene.absy;
      }
      
      _ent.getPos = function(){
        row = Math.round((_ent.y-((_ent.y/_ent.scene.tile.size)*_ent.scene.tile.margin))/_ent.scene.tile.size);
        col = Math.round((_ent.x-((_ent.x/_ent.scene.tile.size)*_ent.scene.tile.margin))/_ent.scene.tile.size);
        return [row,col];
      }
      
//      _ent.getGridPos = function(){
//        row = Math.round((_ent.y-((_ent.y/tiles.size)*tiles.margin))/tiles.size);
//        col = Math.round((_ent.x-((_ent.x/tiles.size)*tiles.margin))/tiles.size);
//        return [row,col];
//      }
      
      _ent.changePos = function(row, col){
        _ent.row = row;
        _ent.col = col;
        _ent.x = _scene.pixifyCoord(col);
        _ent.y = _scene.pixifyCoord(row);
        return [x,y];
      }
      
//      _ent.changeGridPos = function(row, col){
//        _ent.row = row;
//        _ent.col = col;
//        _ent.x = _scene.pixifyCoord(col);
//        _ent.y = _scene.pixifyCoord(row);
//        return [x,y];
//      }
      
      _ent.checkCoordCollision = function(x,y){
        var absx = _ent.x + _ent.scene.x;
        var absy = _ent.y + _ent.scene.y;
		    if(x>=absx && x<=absx+_ent.width && y>=absy && y<=absy+_ent.height){
			    return true;
		    }else{
			    return false;
		    }
	    }
    });
    
    _scene.Text = _scene.Entity.extend(function(opt) {
      var _text = this;
      this.constructor = function(opt) {
        this.super(opt);
        _text.text = opt.text || "";
	      _text.font = opt.font || "Arial";
	      _text.size = opt.size || 30;
	      _text.color = opt.color;
	      _text.padding = opt.padding || 6;
	      _text.centerText = opt.centerText || false;
	      _text.center = opt.center || false;
	      _text.width = opt.width;
	      _text.height = opt.height;
	      
	      return _text;
      }
      
      _text.draw = function(opt){
        this.super.draw(opt);
        var measure = ctx.measureText(_text.text)
        _text.width = _text.width || measure.width + _text.padding*2 || measure.width;
        _text.height = _text.height || _text.size + _text.padding*2 || _text.size;
        if(_text.center == true){
		      _text.absx = _text.scene.x + _text.scene.width/2 - _text.width/2;
	      }
        ctx.fillStyle = _text.color;
        ctx.font = _text.size.toString() + "px " + _text.font;
        //ctx.fillText(_text.text,absx+_text.padding,absy+(_text.height/2+_text.size/3));
        ctx.fillText(_text.text,_text.absx+_text.padding,_text.absy+(_text.height/2+_text.size/3));
      }
    });
    
    _scene.Button = _scene.Text.extend(function(opt){
      var _button = this;
      this.constructor = function(opt) {
        //console.log(opt);
        this.super(opt);
	      _button.text = opt.text || "";
	      if(_button.center){
		      _button.x = _button.scene.width/2-_button.width/2;
	      }
	      
	      return _button;
	    }
	    
	    _button.draw = function(opt){
        this.super.draw(opt);
        
        if(_button.bg){
          if (typeof _button.bg == "string") {
	          ctx.fillStyle = _button.bg;
	          ctx.fillRect(_button.absx,_button.absy,_button.width,_button.height);
	        } else {
            if(_button.color){
              ctx.fillStyle = _button.color;
              ctx.fillRect(_button.absx,_button.absy,width,height);
            }
            ctx.drawImage(_button.bg,_button.absx,_button.absy,_button.width,_button.height);
          }
        }
        
        if(_button.img){
	        ctx.drawImage(_button.img,_button.absx,_button.absy,_button.width,_button.height);
        } 

        if(_button.text != ""){
	        var measure = ctx.measureText(_button.text);
	        ctx.fillStyle = _button.color;
	        ctx.font = _button.size.toString() + "px " + _button.font;
	        if(_button.centerText == true){
		        ctx.fillText(_button.text,_button.absx+(_button.width/2-measure.width/2),_button.absy+(_button.height/2+_button.size/3));
	        } else {
		        ctx.fillText(_button.text,_button.absx+_button.padding,_button.absy+(_button.height/2+_button.size/3));
	        }
        }
      }
    });
    
    _scene.Image = _scene.Entity.extend(function(opt){
      var _image = this
      this.constructor = function(opt) {
        this.super(opt);
        _image.img = opt.img;
        _image.color = opt.color;
        if (_image.scene.type == "tiles") {
          _image.width = _image.scene.tile.size;
          _image.height = _image.scene.tile.size;
        }
        return _image;
      }
      
      _image.draw = function(opt){
        this.super.draw(opt);
        if(_image.color){
          ctx.fillStyle = _image.color;
          ctx.fillRect(_image.absx,_image.absy,_image.width,_image.height);
        }
        ctx.drawImage(_image.img,_image.absx,_image.absy,_image.width,_image.height);
      }
    });
    
    _scene.List = self.Scene.extend(function(opt) {
      var _list = this;
      this.constructor = function(opt) {
        this.super(opt);
        _list.type = "list";
        _list.scene = _scene;
        _list.items = opt.items || [];
        
        return _list;
      }
      
      _list.drawItems = function(){
//        var yOffset = 1;
        //var lastItem = undefined;
        for(var i=0; i<_list.items.length; i++){
          item = _list.items[i];
          item.scene = _list;
//          item.x = _list.absx;
//          item.y = _list.absy + item.height * yOffset - item.height;
          //if (lastItem != undefined) {var y = lastItem.height * y + _list.padding;}
          if(item.draw && item.update != false){ //ok
              item.draw({x: 0, y: item.height * i});
          } else {
            _list.items.splice(i, 1);
          }
//          yOffset++;
        }
      }
      
      _list.draw = function(opt) {
        var opt = opt || {};
        _list.x = opt.x || _list.x;
        _list.y = opt.y || _list.y;
        _list.absx = _list.x + _list.scene.absx;
        _list.absy = _list.y + _list.scene.absy;
        if(_list.bg){
          if (typeof _list.bg == "string") {
	          ctx.fillStyle = _list.bg;
	          ctx.fillRect(_list.absx,_list.absy,_list.width,_list.height);
	        } else {
            if(_list.color){
              ctx.fillStyle = _list.color;
              ctx.fillRect(_list.absx,_list.absy,_list.width,_list.height);
            }
            ctx.drawImage(_list.bg,_list.absx,_list.absy,_list.width,_list.height);
          }
        }
        _list.drawItems();
      }
      
      _list.destroy = function() {
        for (var i=0; i<_list.items.length; i++) {
          _list.items[i].destroy();
        }
        _list.items = [];
        _list.update = false;
      }
    });
    
    _scene.Group = self.Scene.extend(function(opt) {
      var _group = this;
      this.constructor = function(opt) {
        this.super(opt);
        _group.type = "group";
        _group.scene = _scene;
        _group.absx = _group.x + _group.scene.absx,
        _group.absy = _group.y + _group.scene.absy;
        
        return _group;
      }
    });
    
    _scene.Tile = _scene.Entity.extend(function(opt){
      var _tile = this
      this.constructor = function(opt) {
        this.super(opt);
        _tile.color = opt.color;
        _tile.img = opt.img;
        _tile.stroke = opt.stroke;
        _tile.width = _scene.tile.size;
        _tile.height = _scene.tile.size;
        _tile.type = "tile";
        //_tile.draw();
        //return _tile;
      }
        
      _tile.draw = function(opt){
        this.super.draw(opt);
        
        
        if(_tile.color){
          ctx.fillStyle = _tile.color;
          ctx.fillRect(_tile.absx,_tile.absy,_tile.width,_tile.height);
        }
        if(_tile.img){
          ctx.drawImage(_tile.img,_tile.absx,_tile.absy,_tile.width,_tile.height);
        }
        if(_tile.stroke!=false){
          ctx.lineWidth = _tile.scene.tile.stroke.thickness;
          ctx.strokeStyle = _tile.scene.tile.stroke.color;
          ctx.strokeRect(_tile.absx,_tile.absy,_tile.width,_tile.height);
        }
      }
    });
      
    _scene.drawBG = function(){
      if(_scene.bg){
        if(typeof _scene.bg == "string"){
          if (_scene.bg.length == 6 || _scene.bg.length == 9) {
            ctx.globalAlpha = 0.8;
          }
          ctx.fillStyle = _scene.bg;
		      ctx.fillRect(0,0,canvas.width,canvas.height);
        }else{
          ctx.drawImage(_scene.bg,0,0,canvas.width,canvas.height);
        }
      }
    }
    
    _scene.checkCoordCollision = function(x,y){
		  if(x>=_scene.absx && x<=_scene.absx+_scene.width && y>=_scene.absy && y<=_scene.absy+_scene.height){
			  return true;
		  }else{
			  return false;
		  }
	  }
    
    _scene.mapifyCoord = function(px){
      //row = Math.floor((y-((y/tiles.size)*tiles.margin)-padding)/tiles.size);
      //col = Math.floor((x-((x/tiles.size)*tiles.margin)-padding)/tiles.size);
      tile = Math.floor((px-((px/_scene.tile.size)*_scene.tile.margin)-_scene.padding)/_scene.tile.size);
      return tile;
    }
    _scene.pixifyCoord = function(tile){
      //x = Math.floor((col+((col*tiles.size)/tiles.margin)+padding)*tiles.size);
      //y = Math.floor((row+((row*tiles.size)/tiles.margin)+padding)*tiles.size);
      px = tile*(_scene.tile.size+_scene.tile.margin) + _scene.padding;
      return px;
    }

    _scene.setMap = function(){
      //c.width = tiles.size*map[0].length + tiles.margin*map[0].length + 2*padding;
      //c.height = tiles.size*map.length + tiles.margin*map.length + 2*padding;
      for(var row=0; row<_scene.map.length; row++){
        for(var col=0; col<_scene.map[row].length; col++){
          var tile = _scene.tile[_scene.map[row][col]];
          var t = new _scene.Tile({
            color: tile.color,
            stroke: tile.stroke,
            col: col,
            row: row,
            update: false
          });
          _scene.tiles.push(t);
        }
      }
    }
      
    _scene.draw = function(opt) {
//      _scene.absx = _scene.x;
//	    _scene.absy = _scene.y;
	    
	    var opt = opt || {};
      _scene.x = opt.x || _scene.x;
      _scene.y = opt.y || _scene.y;
      
      _scene.scene = _scene.scene || {};
      _scene.absx = _scene.x + (_scene.scene.absx || 0);
      _scene.absy = _scene.y + (_scene.scene.absy || 0);
    
      if(_scene.bg){
        if(typeof _scene.bg == "string"){
          ctx.fillStyle = _scene.bg;
          //console.log(_scene.x,_scene.y,_scene.width,_scene.height,_scene.bg);
		      ctx.fillRect(_scene.absx,_scene.absy,_scene.width,_scene.height);
        }else{
          ctx.drawImage(_scene.bg,_scene.absx,_scene.absx,_scene.width,_scene.height);
        }
      }
      _scene.drawEnts();
    }
    
    _scene.destroy = function() {
      for (var i=0; i<_scene.ents.length; i++) {
        _scene.ents[i].destroy();
      }
      _scene.ents = [];
      _scene.update = false;
    }
	});
	
	self.checkAndMove = function(_ent,ang,dist,row,col,newTerrain){
    //console.log("New terrain:",newTerrain);
    if(tiles[newTerrain].perm=="pass"){
      _ent.x += Math.round(Math.cos((Math.PI/180)*ang)*dist + (tiles.margin*(Math.cos((Math.PI/180)*ang)*dist)/tiles.size));
      _ent.y += Math.round(Math.sin((Math.PI/180)*ang)*dist + (tiles.margin*(Math.sin((Math.PI/180)*ang)*dist)/tiles.size));
    }
    //console.log("New tile:",row,col);
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
	  self.scenes = [];
	  self.resetListeners(canvas, 'click');
	}
	
	self.exit = function(){
	  self.stop();
	  $(canvas).unbind("click");
	}
	
	function init() {
	  $(canvas).bind("click", function(event) {
	    self.checkingEvents = true;
	    var onclickEnts = [];
//	    console.log("canvas clicked");
	    var coords = self.getMouseCoords(event);
	    var x = coords[0]; 
	    var y = coords[1];
      
	    for (var i=0; i<self.scenes.length; i++) {
	      var scene = self.scenes[i];
	      if (scene.checkCoordCollision(x, y)) {
	        console.log(scene.type);
	        if (scene.onclick) {
	          onclickEnts.push(scene);
	        }
	        for (var j=0; j<scene.ents.length; j++) {
	          var ent = scene.ents[j]
	          if (ent.checkCoordCollision(x, y)) {
	            console.log(ent);
	            if (ent.onclick) {
	              onclickEnts.push(ent);
	            }
	          }
	        }
        }
	    }
	    self.checkingEvents = false;
	    for (var i=0; i<onclickEnts.length; i++) {
	      var ent = onclickEnts[i];
	      ent.onclick({target: ent});
	    }
	  });
	  self.update();
	}
  
  init();
  
  return self;
}
