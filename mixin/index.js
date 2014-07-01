
///
// diesel.mixin
///

diesel.mixin.addMixin = function(targetObject, mixin){
	
	var reservedVars = [
		"prototype",
		"overrideExisting",
	], 
	shouldOverride = false|mixin.shouldOverride;

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
