
diesel.util.loadSuccess = function(){
	diesel.loading--;
	if(diesel.loading<=0){
		diesel.start();
	}

};

diesel.util.loadError = function(evt){
	console.log("Diesel, ERROR, loading an item.",
			"this will likely cause errors later", evt);
		diesel.loading--;
		if(diesel.loading<=0){
			diesel.start();
		}
	}
};

diesel.util.addLoad = function(file){

	if(file.image){
		if(!diesel.imageCache[file.image]){
			var img = new Image();
			img.id = file.image;
			diesel.imageCache[file.image] = img;
			diesel.loading++;
				
			img.onerror = diesel.preloadError;
			img.onload = diesel.preloadSuccess;
			img.src=game.settings.dataDirectory+file.image;
		}
	}
	if(file.sound){
		if(!diesel.soundCache[file.sound]){

			var snd = new Audio();
			snd.id = file.sound;
			diesel.soundCache[file.sound] = snd;
			diesel.loading++;

			snd.addEventListener("loadeddata", diesel.preloadError);
			snd.addEventListener("onerror", diesel.preloadError);
			snd.src=game.settings.dataDirectory+file.sound;
		}
	}
	if(file.sprite){
		if(!diesel.spriteCache[file.sprites]){
			diesel.loading++;
			var spr = new diesel.sprite(file);
			diesel.spriteCache[file.sprite] = spr;
		}
	}
};
