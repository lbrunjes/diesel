///
//	diesel.proto
///

// the most basic in game unit has a position and a size
diesel.proto.objectBase =  {

	//attributes

	id:false,
	name:"base Object",
	x:0,
	y:0,
	z:0,
	w:0,
	h:0,
	d:0,
	team:"none",
	color:"#666",
	selected:false,

	//functions

	draw:function(context){
		context.save();
			context.translate(this.x,this.y);
			context.rotate(this.r)
			context.translate(this.w/-2,this.h/-2);
			context.fillStyle = this.color;
			context.fillRect(0,0,this.w,this.h);
		context.restore();
	},
	drawDetail:function(context){
		var i =2, type;
		var fill = context.fillStyle;
		context.fillStyle = "rgba(255,255,255,.25)";
		for(key in this){
			type =typeof this[key]
			if( type ==="string" || type ==="number" ){
				i++;
				context.fillText(key + " = "+this[key],
				 x, y + i* diesel.fontSize);
			}
			
		}
		context.fillStyle = fill;
	},
	update:function(ticks, id){
		if(!this.id || this.id != id){
			this.id = id;
		}
	},

	//helpers

	contains:function(x,y,z){
		if(!z){
			z=this.z;
		}
		return Math.abs(x- this.x) <= this.w/2 	&&
			Math.abs(y - this.y) <= this.h/2 &&
			Math.abs(z-this.z) <= this.d/2;
		
	},
	direction:function(x,y,z){ 
		if(!z){
			return Math.atan2(this.x - x, this.y -y);
		}
		else{
			//TODO 3DSupport
			console.log("direction doesnt support 3d yet");
		}

	},
	distance: function(x,y,z){
		if(!z){
			z=this.z;
		}
		return Math.sqrt(Math.pow(this.x - x,2)+
			Math.pow(this.y - y,2)+
			Math.pow(this.z - z,2));

	},
	distanceSquared: function(x,y,z){
		if(!z){
			z=this.z;
		}
		return Math.pow(this.x - x,2)+
			Math.pow(this.y - y,2)+
			Math.pow(this.z - z,2);

	},
	manhattanDistance:function(x,y,z){
		return Math.abs(this.x - x) +
			Math.abs(this.y - y,2)+
			Math.abs(this.z - z,

	},

	move:function(ticks, angle, speed){
		this.x -= Math.sin(angle) * ticks *force;
		this.y -= Math.cos(angle) * ticks *force;	
	},
	canMove:function(ticks, angle, speed){
		if(!ticks || ticks >1 || angle ===undefined ||!force){
			return false;
		}
		return true;
	},
	teleport:function(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z|this.z;

	}




};