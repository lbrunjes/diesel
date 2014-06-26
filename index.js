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

