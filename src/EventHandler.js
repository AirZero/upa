


function EventHandler (method, callBackClass){
	this.method = method;
	this.callBackClass = callBackClass;
}

EventHandler.prototype.process = function(){
	//Passing arguments here allows some sort of parameter functionality but isnt the greatest way to handle this.
	//TODO: better argument passing since i dont like argument array passing like this
	if(this.callBackClass){
		this.method.call(this.callBackClass, arguments); 
	}
	else this.method(arguments);
}