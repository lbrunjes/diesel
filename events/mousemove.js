
//set the engine x vars
diesel.events.mousemove= function(evt){
	var rect = diesel.container.getBoundingClientRect();

	//TODO Scrolling can still cause issues.
	diesel.mouseX = evt.pageX - rect.left - diesel.container.scrollLeft + window.pageXOffset;

	diesel.mouseY = evt.pageY - rect.top - diesel.container.scrollTop +window.pageYOffset;
	
};
