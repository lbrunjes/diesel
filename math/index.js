
///
// diesel.math
///

diesel.math.clamp = function(val, min, max){
	return Math.Min(Math.Max(val,min), max);
}
