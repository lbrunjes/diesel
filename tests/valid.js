var passed = 0, failed = 0;

console.log("Started testing");

if(!diesel){
	failed ++;
	alert("diesel doesnt exist!");
}
else{
	passed++;
}