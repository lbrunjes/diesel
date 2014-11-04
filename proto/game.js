/*
This is a prototype for your game object 
that provides a few basic things like  currently pressed keys
drwing hte current screen,



*/
diesel.proto.game =  function(){
	this.container="container";
	this.version="0.0.1";
	this.ticks=0;
	this.font="monospace";
	this.fontSize=16;
	this.width=640;
	this.height=480;
	this.activeScreen="loading";
	this.dataDirectory="data/";
	
	this.keys={
		"left":37, 
		"right":39,
		"up":38,
		"down":40
	};
	this.keysDown={
		"left":false, 
		"right":false,
		"up":false,
		"down":false	
	};
	this.events={
		"draw":function(event){
			diesel.game.screens[diesel.game.activeScreen].draw(event.args[0]);
		},
		"update":function(event){
			diesel.game.ticks++;
			diesel.game.screens[diesel.game.activeScreen].update(event.args[0]);
		},
		"click":function(evt,x,y){
			if(diesel.game.screens[diesel.game.activeScreen] &&
					diesel.game.screens[diesel.game.activeScreen].click){

				diesel.game.screens[diesel.game.activeScreen].click(evt,x,y);
			}
			
		},
		"windowkeydown": function(event){
			for(keyname in diesel.game.keys){
				if(event.keyCode == diesel.game.keys[keyname]){
					diesel.game.keysDown[keyname] =true;
					event.preventDefault();
				}
			}
			if(diesel.game.screens[diesel.game.activeScreen].keydown){
				diesel.game.screens[diesel.game.activeScreen].keydown(event);
			}
				
		},
		"windowkeyup":function(event){
			for(keyname in diesel.game.keys){
				if(event.keyCode == diesel.game.keys[keyname]){
					diesel.game.keysDown[keyname] =false;
					event.preventDefault();
				}
			}	
			if(diesel.game.screens[diesel.game.activeScreen].keyup){
				diesel.game.screens[diesel.game.activeScreen].keyup(event);
			}
		},
		"screenChange":function(event){
			var from = event.args[0], 
				to = event.args[1], 
				transition = event.args[2]|| false;
			console.log("screen changed",from, to, transition);

			diesel.game.screens[from].close();
			if(transition){
				diesel.game.screens[transition].reset(from, to);
				diesel.game.screens[transition].open();
				diesel.game.activeScreen = transition;
			}
			else{
				diesel.game.screens[to].reset();
				diesel.game.screens[to].open();
				diesel.game.activeScreen = to;
			}
		
		},
		"startup":function(evt){

			if(diesel.game.startup){
				diesel.game.startup();
				console.log("diesel, starting up the game");
			}
			else{
				console.log("no startup found");
			}
		}

	};
	this.screens={};
	this.context={};
	this.objects={};
};
