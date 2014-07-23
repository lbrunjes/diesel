
///
// diesel.math
///

diesel.math.clamp = function(val, min, max){
	return Math.Min(Math.Max(val,min), max);
}


diesel.math.degrees = function(radians){
	return radians * (180/Math.PI);
}

diesel.math.radians = function(degrees){
	return degrees*(Math.PI/180);
}

