

function Refugees(){
	this.totalRefugees = 100000;
	this.onRefugeeAmountChange = [];
	
}


Refugees.prototype.addOnRefugeeAmountChange = function(method, callBackclass){
	this.onRefugeeAmountChange.push(new EventHandler(method, callBackclass));
}

Refugees.prototype.clear = function(){
	this.onRefugeeAmountChange = [];
}


Refugees.prototype.changeTotalRefugees = function(amount){
	this.totalRefugees += amount;
	for(handler in this.onRefugeeAmountChange){
		this.onRefugeeAmountChange[handler].process(amount);
	}
	
	return this.totalRefugees;
}


Refugees.prototype.reduceTotalRefugees = function(amount){
	if(amount <= this.totalRefugees){
		this.changeTotalRefugees(-amount);
		return 0;
	}
	else{
		var over = amount - this.totalRefugees;
		this.totalRefugees = 0;
		return over;
	}
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