
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
