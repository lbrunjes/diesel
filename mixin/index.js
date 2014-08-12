
///
// diesel.mixin
///

diesel.mixin.addMixin = function(targetObject, mixin, overide){
	if(diesel.debug){
		console.log("adding", mixin, "to", targetObject);

	}

	if(!mixin){
		return;
	}


	var reservedVars = [
		"prototype",
		"overrideExisting",
	], 
	shouldOverride = mixin.shouldOverride||overide ||false;

	//add the mixin vars to the object.
	for(attr in mixin){
		if(mixin && 
			mixin[attr]&&
			(!targetObject[attr]||shouldOverride)){
			//this is a shallow copy we only care really about functions or you are mixining wrong.
			targetObject[attr] = mixin[attr];
		}
	}
}
