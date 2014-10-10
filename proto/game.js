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
			game.screens[game.activeScreen].draw(event.args[0]);
		},
		"update":function(event){
			game.ticks++;
			game.screens[game.activeScreen].update(event.args[0]);
		},
		"click":function(evt,x,y){
			if(game.screens[game.activeScreen] &&
					game.screens[game.activeScreen].click){

				game.screens[game.activeScreen].click(evt,x,y);
			}
			
		},
		"windowkeydown": function(event){
			for(keyname in game.keys){
				if(event.keyCode == game.keys[keyname]){
					game.keysDown[keyname] =true;
					event.preventDefault();
				}
			}
			if(game.screens[game.activeScreen].keydown){
				game.screens[game.activeScreen].keydown(event);
			}
				
		},
		"windowkeyup":function(event){
			for(keyname in game.keys){
				if(event.keyCode == game.keys[keyname]){
					game.keysDown[keyname] =false;
					event.preventDefault();
				}
			}	
			if(game.screens[game.activeScreen].keyup){
				game.screens[game.activeScreen].keyup(event);
			}
		},
		"screenChange":function(event){
			var from = event.args[0], 
				to = event.args[1], 
				transition = event.args[2]|| false;
			console.log("screen changed",from, to, transition);

			game.screens[from].close();
			if(transition){
				game.screens[transition].reset(from, to);
				game.screens[transition].open();
				game.activeScreen = transition;
			}
			else{
				game.screens[to].reset();
				game.screens[to].open();
				game.activeScreen = to;
			}
		
		},
		"startup":function(evt){

			if(game.startup){
				game.startup();
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
