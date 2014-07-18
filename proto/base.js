
///
//	diesel.proto
///

// the most basic in game unit has a position and a size
diesel.proto.objectBase =  function(){

	//attributes

	this.id=false;
	this.name="base Object";
	this.x=0;
	this.y=0;
	this.z=0;
	this.w=0;
	this.h=0;
	this.d=0;
	this.team="none";
	this.color="#666";
	this.selected=false;

	//functions

	this.draw=function(context){
		context.save();
			context.translate(this.x,this.y);
			context.rotate(this.r)
			context.translate(this.w/-2,this.h/-2);
			context.fillStyle = this.color;
			context.fillRect(0,0,this.w,this.h);
		context.restore();
	};
	
	this.update=function(ticks, id){
		if(!this.id || this.id != id){
			this.id = id;
		}
	};

	//helpers

	this.contains=function(x,y,z){
		if(!z){
			z=this.z;  
		}
		return Math.abs(x- this.x) <= this.w/2 	&&
			Math.abs(y - this.y) <= this.h/2 &&
			Math.abs(z-this.z) <= this.d/2;
		
	};
	this.direction=function(x,y,z){ 
		if(!z){
			return Math.atan2(this.x - x, this.y -y);
		}
		else{
			//TODO 3DSupport
			console.log("direction doesnt support 3d yet");
		}

	};
	this.distance= function(x,y,z){
		if(!z){
			z=this.z;
		}
		return Math.sqrt(Math.pow(this.x - x,2)+
			Math.pow(this.y - y,2)+
			Math.pow(this.z - z,2));

	};
	this.distanceSquared= function(x,y,z){
		if(!z){
			z=this.z;
		}
		return Math.pow(this.x - x,2)+
			Math.pow(this.y - y,2)+
			Math.pow(this.z - z,2);

	};
	this.manhattanDistance=function(x,y,z){
		return Math.abs(this.x - x) +
			Math.abs(this.y - y,2)+
			Math.abs(this.z - z);

	};

	this.move=function(ticks, angle, speed){
		this.x -= Math.sin(angle) * ticks *force;
		this.y -= Math.cos(angle) * ticks *force;	
	};
	this.canMove=function(ticks, angle, speed){
		if(!ticks || ticks >1 || angle ===undefined ||!force){
			return false;
		}
		return true;
	};
	this.teleport=function(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z|this.z;

	};
};