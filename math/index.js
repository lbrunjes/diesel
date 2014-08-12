
///
// diesel.math
///

diesel.math.clamp = function(val, min, max){
	return Math.min(Math.max(val,min), max);
}


diesel.math.degrees = function(radians){
	return radians * (180/Math.PI);
}

diesel.math.radians = function(degrees){
	return degrees*(Math.PI/180);
}

diesel.math.lerp =function(a,b,c){
	return((b-a)*c)+a;
}