
/**
 * Class responsible for the refugee data and giving this information out based 
 * on dates
 *
 */

 
 /**
  * Initializes the refugee data ready for the game
  */
function Refugees(){
	this.totalRefugees = 100000;
	this.onRefugeeAmountChange = [];
	
}


/**
 * Adds listener for changes in the refugee amounts
 */
Refugees.prototype.addOnRefugeeAmountChange = function(method, callBackclass){
	this.onRefugeeAmountChange.push(new EventHandler(method, callBackclass));
}

/**
 * Clears this class and event its data
 */
Refugees.prototype.clear = function(){
	this.onRefugeeAmountChange = [];
}


/**
 * Changes the amount of refugees with the amount without checks
 */
Refugees.prototype.changeTotalRefugees = function(amount){
	this.totalRefugees += amount;
	for(handler in this.onRefugeeAmountChange){
		this.onRefugeeAmountChange[handler].process(amount);
	}
	
	return this.totalRefugees;
}

/**
 * Tries to reduce the total refugee amount by given amount
 * Returns the amount of not fitted refugees
 */
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


/**
 * Returns the amount of total refugees left to be housed
 */
Refugees.prototype.getTotalRefugees = function(){
	return this.totalRefugees;
	
}


/**
 * Handles the preloading of data for refugees class
 */
Refugees.prototype.preload = function(){
	//TODO: json reading
	
}


/**
 * Returns the amount of refugees that were sent to given nation at certain month of a year
 */
Refugees.prototype.getRefugees = function(nationName, month, year){
	return (nationName.length * month * year) * 0.01;
	
}