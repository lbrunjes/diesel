// Diesel built at Wed 25 Jun 2014 07:54:29 PM EDT
/*
diesel.js
A simple js game engine 
lee.brunjes@gmail.com


*/

//the base diesel object must be laoded before we can load items
var diesel = function(){
	

	//setup slots to store components;
	this.data ={};
	this.events={};
	this.math ={};
	this.mixin={};
	this.proto={};
	this.sprites={};
	this.util = {};

	//engine vars
	this.container = document.getElementsByTagName("body")[0];
	this.mouseX;
	this.mouseY;
	
	this.pauseOnBlur = true;
	this.shouldLoop =true;
	this.loopFn =false;

	this.fpsLimit  =100;
	this.lastFrameTime = 1;

	this.loading = 0;

	this.timeStarted=0;
	this.lastFrameStart=0;
	this.lastFrameEnd=0;

	this.dataDirectory = "";

	this.font = "monospace";
	this.fontSize = 16;
	this.game = false;


	//engine functions
	this.init = function(){
		//ensure the browser meets our basic requirements
		diesel.util.setCompatability();

		


	};


	//start should not be called until the dom is loaded.
	this.start = function(game){

		console.log("Diesel, starting");
		diesel.timeStarted = new Date();
		diesel.lastFrameEnd = new Date();
		diesel.lastFrameStart = new Date();

		//load vars into the diesel object from core plugins

		diesel.mixin.addMixin(this, diesel.data);
		diesel.mixin.addMixin(this, diesel.events);
		diesel.mixin.addMixin(this, diesel.math);
		diesel.mixin.addMixin(this, diesel.mixin);
		//proto is not loaded becasue they are stubs to build the game object on.
		diesel.mixin.addMixin(this, diesel.sprites);
		diesel.mixin.addMixin(this, diesel.util);


	
		//load the provided game objects
		if(!game){
			console.log("Diesel, warning:",
				" No game specified. Nothing will happen.");	
		}
		else{
			this.game =game;
			//setup where to look for data
			if(game.dataDirectory){
				//add a trailing slash if it is missing.
				if(game.dataDirectory.lastIndexOf('/') != 
					game.dataDirectory.length-1){
					game.dataDirectory = game.dataDirectory +"/";
				}
				this.dataDirectory = game.dataDirectory;
			}

			//load game assests
			if(game.preload){
				for(var i = 0 ; i < game.preload.length;i++){
					this.util.addPreload(game.preload[i]);
				}
			}


			//deal with the game container
			if(game.container){
				diesel.container = document.getElementById(game.container);
			}
			diesel.container.focus();

			//initialize canvas drawing contexts
			if(!game.context){
				console.log("Diesel, Warning:",
					"No contexts in game.context. No Canvas intilized");
			}
			else{
				for( var canvas in game.context){
					diesel.util.createContext(canvas);
				};
			}

			//bind diesel events
			diesel.events.bindEvents({
				"windowblur":diesel.events.windowblur,
				"windowfocus":diesel.events.windowfocus,
				"windowkeyup":diesel.events.windowkeyup,
				"mousemove":diesel.events.mousemove
			});
			//bind game events
			if(game.events){
				diesel.events.bindEvents(game.events);
			}

			
		}


		}


	};



	this.init();
};

//build the base diesel objects
diesel = new diesel();

///
// diesel.data
///

diesel.data.keyNames =
{
	8:"Backspace",
	9:"Tab",
	13:"Enter",
	16:"Shift",
	17:"Ctrl",
	18:"Alt",
	20:"Caps Lock",
	27:"Escape",
	32:"Space",
	33:"Page Up",
	34:"Page Down",
	35:"End",
	36:"Home",
	37:"Left",
	38:"Up",
	39:"Right",
	40:"Down",
	45:"Insert",
	46:"Delete",
	48:"10",
	49:"1",
	50:"2",
	51:"3",
	52:"4",
	53:"5",
	54:"6",
	55:"7",
	56:"8",
	57:"9",
	112:"F1",
	113:"F2",
	114:"F3",
	115:"F4",
	116:"F5",
	117:"F6",
	118:"F7",
	119:"F8",
	120:"F9",
	121:"F11",
	122:"F11",
	123:"F12",
	144:"Num Lock",
	219:"[",
	220:"|",
	221:"]",
	222:"'"
};

diesel.data.getKeyName = function(keyCode){
	if( diesel.keyNames[keyCode]){
		return diesel. keyNames[keyCode];
	}
	// hope this  is a letter key:)
	return String.fromCharCode(keyCode);
};///
// Diesel.events
///


//generates a dom event in te container
diesel.events.raiseEvent=function(eventName){
	var event;
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(eventName, true, true);
	} else {
		event = document.createEventObject();
		event.eventType = eventName;
	}
	
	event.eventName = eventName;
	event.args = [];
	//loop through arguements and 
	for(var i = 1; i<arguments.length;i++){
		event.args.push(arguements[i])
	}
	
	if (document.createEvent) {
		diesel.container.dispatchEvent(event);
	} else {
		diesel.container.fireEvent("on" + event.eventType, event);
	}


}
diesel.events.bindEvents = function(eventObject){

	//loop throught he object we got and 
	//bind events to the dom from it based on the name given
	// events prefixed with window will bind to the window in all cases
	
	for(event in eventObject){
		if(event && typepf(eventObject[event]) == "function"){
			if(event.indexOf("window") === 0){
				diesel.container.addEventListener(event, 
					eventObject[event]);

			}
			else{
				//remove the window at the start
				window.addEventListener(event.substring(6), 
					eventObject[event]);

			}

		}

	}

}
//set the engine x vars
diesel.events.mousemove= function(evt){
	var rect = diesel.container.getBoundingClientRect();

	//TODO Scrolling can still cause issues.
	diesel.mouseX = evt.pageX - rect.left - diesel.container.scrollLeft + window.pageXOffset;

	diesel.mouseY = evt.pageY - rect.top - diesel.container.scrollTop +window.pageYOffset;
	
};
//save and load events

diesel.events.save = function(name, data){
	if(window.localStorage){
		localStorage[name]= JSON.stringify(data);
		console.log("Diesel, Saved", name);
	}
	else{
		console.log("Diesel:Cannot save, not supported.")
	}
};

diesel.events.load = function(name){
	if(window.localStorage){
		if(localStorage[name]){
			return JSON.parse(localStorage[name]);
		}
		console.log("Diesel: Save not found");
	}
	else{
		console.log("Diesel: Cannot load, Not supported");
	}
	return false;
};

diesel.events.listSaves = function(){
	var saves = [];
	for(save in localStorage){
		saves.push(save);
	}
	return saves;
};

diesel.events.deleteSave = function(name){
	localStorage.removeItem(name);
};
diesel.events.windowblur=function(evt){
	if(diesel.pauseOnBlur){
		diesel.shouldLoop =false;
	}
};

diesel.events.windowfocus=function(evt){
	diesel.shouldLoop = true;
	if(!diesel.nextFrame){
		diesel.lastFrameEnd = new Date();
		diesel.lastFrameStart = new Date();
		diesel.loop();
	}
};

//caches last few keys to allow for keypress combos.
diesel.events.windowkeyup:function(evt){
	diesel.lastKeys.push(evt.keyCode);

	if(!diesel.lastKeys){
		diesel.lastKeys = [];
	}
	if(!diesel.keyCacheLength){
		diesel.keyCacheLength = 5;
	}
	
	if(diesel.lastKeys.length > diesel.keyCacheLength){
		diesel.lastKeys.splice(0,1);
	}
	
	//this is really important
	if(diesel.lastKeys.length ==5){
	if(diesel.lastKeys[0] == 73 &&
		diesel.lastKeys[1] == 68 &&
		diesel.lastKeys[2] == 68 &&
		diesel.lastKeys[3] == 81 &&
		diesel.lastKeys[4] == 68)
	
		console.log("YOU DIRTY RAT");
	
	}
};///
// diesel.mixin
///

diesel.mixin.addMixin = function(targetObject, mixin){
	
	var reservedVars = [
		"prototype",
		"overrideExisting",
	], 
	shouldOverride = false|mixin.shouldOverride;

	//add the mixin vars to the object.
	for(attr in mixin){
		if(mixin && 
			mixin[attr]&&
			(!targetObject[attr]||shouldOverride)){
			//this is a shallow copy we only care really about functions or you are mixining wrong.
			targetObject[attr] = mixin[attr];
		}
	}


}///
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
game.proto.screen = {
	//used to store data for use in the click function {x:i,y:i,w:i,h:i,click:fn}
	"clickZones":[],
	
	//called when the screen is changed
	"reset":function(arg){
		this.clearAllContexts();
	},

	//called to draw teh screen
	"draw":function(ticks){
		var i =1;
		for(canvas in diesel.game.context){
			diesel.game.context[canvas].fillStyle= "#ffffff";
			diesel.game.context[canvas].fillText(canvas, 10, diesel.fontSize *2*i);
		}
	},
	//called the update the state of the things in the scene
	"update":function(ticks){
	},
	
	/*
	
	EVENTS START HERE
	
	*/
	
	//called when the object is clicked
	"click":function(evt){
		for(i in this.clickZones){
			if(this.clickZones[i].x < diesel.mouseX 
				&& this.clickZones[i].x + this.clickZones[i].w > diesel.mouseX 
				&& this.clickZones[i].y < diesel.mouseY
				&& this.clickZones[i].y + this.clickZones[i].h > diesel.mouseY){
					
					this.clickZones[i].click();
				}
			}
	},
	
	//called when a screen is created.
	"open":function(event){
	
	},
	//called when  screen is closed.
	"close":function(evt){
	
	},
	//called at reset
	"reset":function(){

	}
	
	
	
	
	//draws the selected text centred horizontally on a point.
	fillTextCentered:function(ctx, text, x,y){
		var len = ctx.measureText(text).width;
		ctx.fillText(text, x -len/2,y);
	},
	

	"clearAllContexts":function(){
		for(canvas in diesel.game.context){
			diesel.game.context[canvas].clearRect(0,0,
				diesel.game.width, diesel.game.height);
		}
	},
	
	"drawClickZones":function(ctx){
		var fill = ctx.fillStyle;
	
		for(i in this.clickZones){
			ctx.fillRect(this.clickZones[i].x,this.clickZones[i].y,this.clickZones[i].w,this.clickZones[i].h);
			ctx.fillStyle = "#000000";
			if(this.clickZones[i].h >=diesel.fontSize *2){
			ctx.fillText(i, this.clickZones[i].x +this.clickZones[i].w/2,this.clickZones[i].y +this.clickZones[i].h/2);
			
			}
			else{
				ctx.fillText(i, this.clickZones[i].x +this.clickZones[i].w/2,this.clickZones[i].y +this.clickZones[i].h);
			}
			ctx.fillStyle =fill;
		}
	};
};///
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
};///
// diesel.util
///

diesel.util.setCompatability = function(){
	if(!window.console){
		window.console = {"log":function(args){}};
	}
	if(!window.localStorage){
		console.log("Diesel, No Local Storage. Faking...");
		window.localStorage = {};
	}

};

diesel.util.timeBetweenFrames= function(){
	if(diesel.fpsLimit > 0 && diesel.fpsLimit <200){
		return 1000/diesel.fpsLimit;
	}
	//hard limit at 200fps
	return 4;

};

diesel.util.fps =function(){
	if(diesel.lastFrameTime>0){
		return 1000/diesel.lastFrameTime;
	}
	return diesel.fpsLimit;

};

diesel.util.ajax = function(url){
	var xhr = new XMLHttpRequest();
	  
	xhr.open("GET", url,false);
	xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT");

	xhr.send(null);
	if (xhr.status !== 200 && xhr.status !== 0)
	{
		console.log("diesel, Ajax missed", xhr);
		
	}
	else{
		return (xhr.responseText);
	}
};

diesel.util.createContext= function(canvas){
	canvas_el = document.getElementById(canvas)
				
	//create it if it does not exist
	if(!canvas_el){
		canvas_el = document.createElement("canvas");
		canvas_el.id =canvas;
		diesel.container.appendChild(canvas_el);
	}
	if(game.context[canvas] !== "3d" && game.context[canvas] !== "3D"){
		game.context[canvas] = canvas_el.getContext("2d");
	}	
	else{
		try{
			game.context[canvas] = canvas_el.getContext("webgl");
		}
		catch(e){
			console.log("DIESEL, ERROR initializing 3d canvas"+e);
			canvas_el.innerHTML = "Cannot initialize 3d context";
		}
	}
	//TODO preserve aspect ratio
	canvas_el.width = game.width;
	canvas_el.height = game.height;

	if(!game.font){
		console.log("Diesel, Warning, No game.font, using defaults");
		game.font = diesel.font;
	}
	if(!game.fontSize){
		console.log("Diesel, Warning, No game.fontSize, using defaults");
		game.fontSize=diesel.fontSize;
	}

	//debug data to show init;
	game.context[canvas].font = game.fontSize+"px "+game.font ;
				
}