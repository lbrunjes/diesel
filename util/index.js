///
// diesel.util
///



diesel.util.timeBetweenFrames= function(){
	if(diesel.fpsLimit > 0 && diesel.fpsLimit <200){
		return 1000/diesel.fpsLimit;
	}
	//hard limit at 200fps
	return 4;

};


diesel.util.getLocalCoords = function(x,y){
	//TODO fix for scrolling/nesting
	var rect = diesel.container.getBoundingClientRect();
	return {
	"x":x - rect.left - diesel.container.scrollLeft + window.pageXOffset,
	"y":y - rect.top - diesel.container.scrollLeft + window.pageYOffset
	};
}

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

diesel.util.createContext= function(canvas ,value){
	var canvas_el = document.getElementById(canvas),
	ctx = null;
				
	//create it if it does not exist
	if(!canvas_el){
		canvas_el = document.createElement("canvas");
		canvas_el.id =canvas;
		diesel.container.appendChild(canvas_el);
	}
	if( value !== "3d" && value !== "3D"){
		ctx = canvas_el.getContext("2d");
	}	
	else{
		try{
			ctx = canvas_el.getContext("webgl");
		}
		catch(e){
			console.log("DIESEL, ERROR initializing 3d canvas"+e);
			canvas_el.innerHTML = "Cannot initialize 3d context";
		}
	}
	//TODO preserve aspect ratio
	
	canvas_el.width = diesel.game.width;
	canvas_el.height = diesel.game.height;

	if(!diesel.game.font){
		console.log("Diesel, Warning, No game.font, using defaults");
		diesel.game.font = diesel.font;
	}
	if(!diesel.game.fontSize){
		console.log("Diesel, Warning, No game.fontSize, using defaults");
		diesel.game.fontSize=diesel.fontSize;
	}
	//debug data to show init;
	ctx.font = diesel.game.fontSize+"px "+diesel.game.font ;
	

	

	return ctx;
				
}

diesel.util.registerKey= function(keyName, keyCode){
	if(diesel.data.keyNames[keyName] && diesel.data.keyNames[keyName] != keyCode){
		keyCode = diesel.data.keyNames[keyName];
	}

	diesel.game.keys[keyName] = keyCode;
	diesel.game.keysDown[keyName] = false;
}

diesel.util.shuffle = function(array){
	if(!array){
		return [];
	}
	var temp, j;
	for(var i = array.length -1; i >0 ;i--){
		j= Math.floor(i * Math.random());
		temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}

	return array;

}
