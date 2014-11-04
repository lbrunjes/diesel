//the base diesel object must be laoded before we can load items
var diesel = function(){
	this.version="0.7.1";

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
	
	this.fpsLimit  =30;
	this.debug =false;
	this.pauseOnBlur = true;
	this.shouldLoop =true;
	this.loopFn =false;

	
	this.lastFrameTime = 1;
	this.frameCount =0;

	this.loading = 0;

	this.timeStarted=0;
	this.lastFrameStart=0;
	this.lastFrameEnd=0;

	this.dataDirectory = "";

	this.font = "monospace";
	this.fontSize = 16;
	
	this.game = false;

	this.nextFrame=false;

	//engine functions that dont require full engine or the dom to be loaded.
	this.init = function(){
		//ensure the browser meets our basic requirements
		this.setCompatability();

		


	};


	//start should not be called until the dom is loaded.
	this.start = function(game){
		console.log("Diesel, starting v"+this.version);

		diesel.timeStarted = new Date();
		diesel.lastFrameEnd = new Date();
		diesel.lastFrameStart = new Date();

		//read url frangments
		diesel.util.url.read();

		diesel.container = document.getElementsByTagName("body")[0];
	
		
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
			if(game.container && document.getElementById(game.container)){
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
					game.context[canvas] = diesel.util.createContext(canvas, game.context[canvas]);
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

			diesel.events.raiseEvent("startup");

			diesel.loop();

		}




	};

	this.loop =function(){
		var frameStart = new Date();
		var timePassed = (frameStart - diesel.lastFrameStart)/1000;
		
		//spit out events
		diesel.raiseEvent("draw",timePassed);
		diesel.raiseEvent("update",timePassed);
		
		//Adjust internal counters and timers
		diesel.frameCount++;
		diesel.lastFrameStart = frameStart;
		diesel.lastFrameEnd = new Date();
		diesel.lastFrameTime = diesel.lastFrameEnd -frameStart;
		
		//allow the loop to continue
		if(diesel.shouldLoop){
			diesel.nextFrame =setTimeout(diesel.loop, 
				Math.abs(diesel.util.timeBetweenFrames()  - diesel.lastFrameTime)+1);
		}
		else{
			diesel.nextFrame = false;
		}

	};

	this.setCompatability = function(){
		if(!window.console){
			window.console = {"log":function(args){}};
		}
		if(!window.localStorage){
			console.log("Diesel, No Local Storage. Faking...");
			window.localStorage = {};
		}
	};

	this.init();
};

//build the base diesel objects
diesel = new diesel();

