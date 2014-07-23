var passed = 0, failed = 0;

console.log("Started testing");



var equal =function(x,y){
	if(y===x){
		passed++;
	}
	else{
		failed++;
		console.log(x, "!=", y);
	}
}
var exists =function(x){
	if(!x){
		failed ++;
		alert(x,"doesnt exist, or is false");
	}
	else{
		passed++;
	}
}

exists(diesel);

