//save and load events

diesel.events.save = function(name, data){
	if(window.localStorage){
		localStorage[name]= JSON.stringify(data);
		console.log("Diesel, Saved", name);
	}
	else{
		console.log("Diesel:Cannot save, not supported.")
	}
};

diesel.events.load = function(name){
	if(window.localStorage){
		if(localStorage[name]){
			return JSON.parse(localStorage[name]);
		}
		console.log("Diesel: Save not found");
	}
	else{
		console.log("Diesel: Cannot load, Not supported");
	}
	return false;
};

diesel.events.listSaves = function(){
	var saves = [];
	for(save in localStorage){
		saves.push(save);
	}
	return saves;
};

diesel.events.deleteSave = function(name){
	localStorage.removeItem(name);
};