///
//	diesel.sprites
///

diesel.sprites.sprite=function(spriteObject){
	this.w = spriteObject.size[0];
	this.h = spriteObject.size[0];
	
	this.keys = spriteObject.keys;
	this.frames = spriteObject.frames;
	
	this.getSprite = function( name, frame){
		var idx =0;
		if(typeof (name) == "number"  ){
			idx = name *this.frames + frame;
		}
		else{
			if(this.keys[name]!== undefined){
		
				idx = this.keys[name] *this.frames + frame;
			}
		}
		return this.getSpriteByIndex(idx); ;
	}
	this.getSpriteByIndex = function( idx){
		return [this.w * (idx % this.frames),
			this.h * Math.floor(idx / this.frames),
			this.w,this.h] ;
	}
	
	this.id = spriteObject.sprite;
	this.image = new Image();
	this.image.onload = diesel.preloadSuccess;
	this.image.onerror = diesel.preloadError;
	this.image.src = game.settings.dataDirectory + this.id; 
	this.numAnimations = function(){
		return Math.floor(this.image.height/this.h);
	};

};

diesel.sprites.spriteInstance = function(sprite){
	this.frame=0;
	this.frameCount= sprite.frames;
	this.animation="";
	this.sprite = sprite;
	this.draw = function(context, w,h){
	
	if (!w ){
		w =this.sprite.w;
	}
	if(!h){
	 h =this.sprite.h;
	}
		var src = this.sprite.getSprite(this.animation, this.frame);
		context.drawImage(this.sprite.image, 
			src[0],src[1],src[2],src[3],0,0,w,h );
	};
	this.nextFrame =function(){
		this.frame = (this.frame + 1) % this.frameCount;
	};
};