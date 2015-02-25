

function Refugees(){
	
	
}

Refugees.prototype.preload = function(){
	//TODO: json reading
	
}


Refugees.prototype.getRefugees = function(nationName, month, year){
	return (nationName.length * month * year) * 0.01;
	
}