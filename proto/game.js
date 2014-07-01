/*
This is a prototype for your game object 
that provides a few basic things like  currently pressed keys
drwing hte current screen,



*/
diesel.proto.game = {
	container:"container",
	version:"0.0.1",
	ticks:0,
	font:"monospace",
	fontSize:16,
	width:640,
	height:480,
	settings:{
		screen:"loading",
		dataDirectory:"data/"
	},
		keys:{
		"left":37, 
		"right":39,
		"up":38,
	},
	keysDown:{
		"left":false, 
		"right":false,
		"up":false,
		"down":false	
	},
	events:{
		"draw":function(event){
			game.screens[game.settings.screen].draw(event.args[0]);
		},
		"update":function(event){
			game.ticks++;
			game.screens[game.settings.screen].update(event.args[0]);
		},
		"click":function(evt){
			if(game.screens[game.settings.screen] &&
					game.screens[game.settings.screen].click){

				game.screens[game.settings.screen].click(evt);
			}
			else{
				game.context.vfx.fillText("No Scene: "+game.settings.screen, diesel.mouseX, diesel.mouseY);
				evt.preventDefault();
			}
		},
		"keydown": function(event){
			for(keyname in game.keys){
				if(event.keyCode == game.keys[keyname]){
					game.keysDown[keyname] =true;
					event.preventDefault();
				}
			}
			if(game.screens[game.settings.screen].keydown){
				game.screens[game.settings.screen].keydown(event);
			}
				
		},
		"keyup":function(event){
			for(keyname in game.keys){
				if(event.keyCode == game.keys[keyname]){
					game.keysDown[keyname] =false;
					event.preventDefault();
				}
			}	
			if(game.screens[game.settings.screen].keyup){
				game.screens[game.settings.screen].keyup(event);
			}
		},
		"screenChange":function(event){
			var from = event.args[0], 
				to = event.args[1], 
				transition = event.args[2]|| false;
			console.log(from, to, transition);

			game.screens[from].close();
			if(transition){
				game.screens[transition].reset(from, to);
				game.screens[transition].open();
				game.settings.screen = transition;
			}
			else{
				game.screens[to].reset();
				game.screens[to].open();
				game.settings.screen = to;
			}
		
		},

	},
	screens:{
		"loading":Object.create(diesel.proto.screen,{
			"draw":function(){
				this.clearAllContexts();

				this.fillStyle = "#ffffff";
				var txt = "";
				this.fillTextCentered("Loading", diesel.game.width/2, diesel.game.height/2)
				for(var i =0; i < diesel.loading; i++){
					txt +=".";
				
				}
				this.fillTextCentered(txt, diesel.game.width/2, diesel.game.height/2 +diesel.fontSize);
			},
			"update":function(ticks){
			if (diesel.loading <= 0){
				diesel.events.raiseEvent("screenChange","loading","menu");
			}

		}
		})
	},
	context:{},
	objects:{}
};
