var Menu = function(opt){
	var self = this;
	var canvas = opt.canvas;
  var ctx = canvas.getContext("2d");
  canvas.height = opt.height;
  canvas.width = opt.width;
	self.opt = opt;
	self.bg = opt.bg;
	self.img = opt.img;
	self.textColor = opt.textColor;
	self.ents = [];
	self.running = true;
	
	self.drawEnts = function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		console.log(self.ents);
		self.drawBG();
		for(ent in self.ents){
      if(self.ents[ent].draw){
        self.ents[ent].draw();
      }else{
        delete self.ents[ent];
        console.log("Entity removed");
      }
    }
    if(self.running == true){
	    window.requestAnimationFrame(self.drawEnts);
	  }
	}
	
	self.drawBG = function(){
			if(self.img){
				ctx.drawImage(self.img,0,0,canvas.width,canvas.height);
			}if(self.bg){
				ctx.fillStyle = self.bg;
				ctx.fillRect(0,0,canvas.width,canvas.height);
			}
		}
	
	self.Entity = function(opt){
		_entity = this;
		_entity.img = opt.img;
		_entity.bg = opt.bg;
		_entity.width = opt.width;
		_entity.height = opt.height;
		_entity.x = opt.x;
		_entity.y = opt.y;
		
		_entity.draw = function(){
			if(_entity.img){
			  console.log("image",_entity.image);
				ctx.drawImage(_entity.img,_entity.x,_entity.y,_entity.width,_entity.height);
			}if(_entity.bg){
				ctx.fillStyle = _entity.bg;
				ctx.fillRect(_entity.x,_entity.y,_entity.width,_entity.height);
			}
		}
		
		_entity.getBounds = function(){
      return [_entity.x,_entity.y,_entity.x+_entity.width,_entity.y+_entity.height];
    }
		
		_entity.checkCoordCollision = function(x,y){
			if(x>=_entity.x && x<=_entity.x+_entity.width && y>=_entity.y && y<=_entity.y+_entity.height){
				return true;
			}else{
				return false;
			}
		}
		return _entity;
	}
	
	self.Button = function(opt){
		_button = new self.Entity(opt);
		_button.text = opt.text;
		
		if(!opt.font){_button.font = "Arial"}else{_button.font = opt.font}
		if(!opt.size){_button.size = 30}else{_button.size = opt.size}
		if(!opt.color){_button.color = "#000"}else{_button.color = opt.color}
		if(!opt.padding){_button.padding = 6}else{_button.padding = opt.padding}
		if(!opt.center){_button.center = false}else{
			_button.center = opt.center;
			if(_button.center){
				_button.x = canvas.width/2-_button.width/2;
			}
		}
		
		_button.draw = function(){
			if(_button.img){
				ctx.drawImage(_button.img,_button.x,_button.y,_button.width,_button.height);
			}if(_button.bg){
				ctx.fillStyle = _button.bg;
				if(_button.center == true){
					ctx.fillRect(_button.x,_button.y,_button.width,_button.height);
				}
				ctx.fillRect(_button.x,_entity.y,_button.width,_button.height);
			}if(_button.text){
				var measure = ctx.measureText(_button.text);
				ctx.fillStyle = _button.color;
				ctx.font = _button.size.toString() + "px " + _button.font;
				if(_button.center == true){
					ctx.fillText(_button.text,_button.x+(_button.width/2-measure.width/2),_button.y+(_button.height/2+_button.size/3));
				}
				ctx.fillText(_button.text,_button.x+(_button.width/2-measure.width/2),_button.y+(_button.height/2+_button.size/3));
			}
		}
		
		self.ents.push(_button);
		return _button;
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
      if(obj.checkCoordCollision(clickedX,clickedY)){
        handler();
      }
    });
  }
	
	self.stop = function(){
		self.running = false;
	}
	
	self.start = function(){
		self.running = true;
	}
	self.drawEnts();
	return self;
}
