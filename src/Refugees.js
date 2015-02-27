

function Refugees(){
	this.totalRefugees = 100000;
	
}



Refugees.prototype.reduceTotalRefugees = function(amount){
	this.totalRefugees -= amount;
	//TODO: response to not having any left
	
}


Refugees.prototype.getTotalRefugees = function(){
	return this.totalRefugees;
	
}


Refugees.prototype.preload = function(){
	//TODO: json reading
	
}


Refugees.prototype.getRefugees = function(nationName, month, year){
	return (nationName.length * month * year) * 0.01;
	
}