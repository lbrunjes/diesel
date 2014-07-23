///
// tests for math;
///


//clamp
equal(diesel.math.clamp(-1, 0, 255),0);
equal(diesel.math.clamp(256, 0, 255),255);
equal(diesel.math.clamp(17, 0, 255),17);

//degrees
equal(diesel.math.degrees(Math.PI), 180);
equal(diesel.math.degrees(0), 0);
equal(diesel.math.degrees(Math.PI*2), 360);

//radians
equal(diesel.math.radians(180), Math.PI);
equal(diesel.math.radians(0), 0);
equal(diesel.math.radians(360), Math.PI*2);


