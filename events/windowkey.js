
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
};