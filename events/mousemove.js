
//set the engine x vars
diesel.events.mousemove= function(evt){
	
	var coords = diesel.util.getLocalCoords(evt.pageX, evt.pageY);

	diesel.mouseX = coords.x
	diesel.mouseY = coords.y;
	
};
