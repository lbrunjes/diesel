
///
// Diesel.events
///


//generates a dom event in te container
diesel.events.raiseEvent=function(eventName){
	var event;
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(eventName, true, true);
	} else {
		event = document.createEventObject();
		event.eventType = eventName;
	}
	
	if( diesel.debug ){
		console.log("raising event", eventName);
	}
	
	event.eventName = eventName;
	event.args = [];
	//loop through arguements and 
	for(var i = 1; i<arguments.length;i++){
		event.args.push(arguments[i])
	}
	
	if (document.createEvent) {
		diesel.container.dispatchEvent(event);
	} else {
		diesel.container.fireEvent("on" + event.eventType, event);
	}


};

diesel.events.bindEvents = function(eventObject){

	//loop throught he object we got and 
	//bind events to the dom from it based on the name given
	// events prefixed with window will bind to the window in all cases
	
	for(event in eventObject){
		diesel.events.bindEvent(event,eventObject[event]);	
	}
};

diesel.events.bindEvent =function(eventName, functionRef){

	if(!eventName && typeOf(functionRef) !="function"){
		console.log("cannot bind ", event, functionRef)
		return;
	}

	var fallback = !window.addEventListener;
	var container = diesel.container;
	if(eventName.indexOf("window") === 0){
		//remove the window at the start
		container  = window;
		eventName = event.substring(6)
	}
	
	if(fallback){
		container.attachEvent("on"+eventName, functionRef);
	}
	else{
		container.addEventListener(eventName, functionRef, false);
	}
}
