///
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