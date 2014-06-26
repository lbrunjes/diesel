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
	
	event.eventName = eventName;
	event.args = [];
	//loop through arguements and 
	for(var i = 1; i<arguments.length;i++){
		event.args.push(arguements[i])
	}
	
	if (document.createEvent) {
		diesel.container.dispatchEvent(event);
	} else {
		diesel.container.fireEvent("on" + event.eventType, event);
	}


}
diesel.events.bindEvents = function(eventObject){

	//loop throught he object we got and 
	//bind events to the dom from it based on the name given
	// events prefixed with window will bind to the window in all cases
	
	for(event in eventObject){
		if(event && typepf(eventObject[event]) == "function"){
			if(event.indexOf("window") === 0){
				diesel.container.addEventListener(event, 
					eventObject[event]);

			}
			else{
				//remove the window at the start
				window.addEventListener(event.substring(6), 
					eventObject[event]);

			}

		}

	}

}