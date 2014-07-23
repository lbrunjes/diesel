
///
//	diesel.sockets.base
///

if(!diesel.sockets){
diesel.sockets ={};
}

diesel.sockets.base = function(url, protocols){

	this.socket = new WebSocket(url, protocol);
	
	this.init = function(){
		this.socket.onerror = this.onerror;
		this.socket.onmessage = this.onmessage;
	};

	this.onmessage = function(data){
		if(diesel.debug){
			console.log("message:", data);
		}
		var msg = JSON.parse(data);
		if(diesel.game &&
			diesel.game.messages[msg.type] &&
			diesel.game.messages[msg.type].receive ){
			diesel.game.messages[msg.type].receive(msg);
		}
		else{
			console.log("message type unknown",msg.type,"discarding", msg);
		}
	};

	this.onerror = function(data){
		if(diesel.debug){
			console.log("error:", data);
		}

		//TODO

	};

	this.send = function(message){
		this.socket.send(message);

	};

	this.init();


}