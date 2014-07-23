///
// tests for math/
///


var x = diesel.math.clamp(-1, 0, 255);
equal(x,0);

x = diesel.math.clamp(256, 0, 255);
equal(x,255);

x = diesel.math.clamp(17, 0, 255);
equal(x,17);

//

