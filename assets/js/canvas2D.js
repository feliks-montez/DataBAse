var canvas2D = function(opt){
  var self = this;
  var canvas = opt.canvas;
  var ctx = canvas.getContext("2d");
  canvas.width = opt.width;
  canvas.height = opt.height;
  if(opt.bg){self.bg = opt.bg}else{self.bg = false}
  
  self.running = true;
  
  self.setBG = function(bg){
    self.bg = bg;
  }
	
	self.drawBG = function(){
	  if(self.bg){
	    if(typeof self.bg == "string"){
	      ctx.fillStyle = self.bg;
			  ctx.fillRect(0,0,canvas.width,canvas.height);
	    }else{
	      ctx.drawImage(self.bg,0,0,canvas.width,canvas.height);
	    }
	  }
	}
	
	self.ents = [];
	self.drawEnts = function(){
		//self.ents.reverse();
	  for(i in self.ents){
	    entity = self.ents[i]
	    if(entity.draw && entity.update != false){ //ok
	        entity.draw();
	    } else {
        delete self.ents[i];
	    }
	  }
	}
	
	self.update = function(){
	  if(self.running){
	    ctx.clearRect(0,0,canvas.width,canvas.height);
	    self.drawBG();
	    self.drawEnts();
	  }
	  //console.log("running");
	  requestAnimationFrame(self.update);
	}
	
	self.Entity = function(opt){
	  var _ent = this;
	  _ent.x = opt.x;
	  _ent.y = opt.y;
	  _ent.width = opt.width;
	  _ent.height = opt.height;
	  _ent.bg = opt.bg;
	  _ent.update = opt.update;
	  
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
	
	self.resetListeners = function(obj, type){
		$(obj).unbind(type);
	}
	
	
	self.start = function(){
	  self.running = true;
	}
	
	self.stop = function(){
	  self.running = false;
	}
	
	self.update();
  return self;
}
