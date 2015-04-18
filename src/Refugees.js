
/**
 * Class responsible for the refugee data and giving this information out based 
 * on dates
 *
 */

 var STARTING_REFUGEES = 0;
 
 /**
  * Initializes the refugee data ready for the game
  */
function Refugees(game){
	this.game = game;
	this.totalRefugees = STARTING_REFUGEES;
	this.onRefugeeAmountChange = [];
	this.deaths = 0;
	
	this.refugeeData =[	];
	
}


/**
 * Adds listener for changes in the refugee amounts
 */
Refugees.prototype.addOnRefugeeAmountChange = function(method, callBackclass){
	this.onRefugeeAmountChange.push(new EventHandler(method, callBackclass));
}


Refugees.prototype.kill = function(amount){
	this.deaths += amount;
	this.reduceTotalRefugees(amount);
}

/**
 * Clears this class and event its data
 */
Refugees.prototype.clear = function(){
	this.onRefugeeAmountChange = [];
	this.totalRefugees = STARTING_REFUGEES;
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
 * Changes the amount of refugees with the amount without checks
 */
Refugees.prototype.changeTotalTo = function(amount){
	this.totalRefugees = amount;
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
		this.changeTotalTo(0);
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
	this.game.load.text('refugeeDataCSV', 'assets/data/refugeeData.csv')
	//this.game.load.onLoadComplete.addOnce(this.parseData, this);
}

Refugees.prototype.parseData = function(){
	var textData = this.game.cache.getText('refugeeDataCSV');
	var nationsSplit = textData.split(/\r\n|\r|\n/g);
	var startingYear = 2010;
	for(var i = 1; i < nationsSplit.length; i++){
		var data = nationsSplit[i].split(",");
		var earlierYear = 0;
		for(var j =0; j < data.length -1; j++){
			var yearly = (data[data.length - 1 - j] - earlierYear );
			var left = yearly;
			for(var month = 1; month <= 12; month++){
				var monthly = month !== 12 ? Math.floor(yearly * 0.0833333333333333) : left;
				left -= monthly;
				this.refugeeData.push(new RefugeeMonth(data[0], month, startingYear+ j, monthly)); //same as /12
			}
			earlierYear = yearly;
		}
	}	

}

Refugees.prototype.getAllPassedData = function(month, year){
	var data = [];
	var refMonth = 1;
	var refYear = 2010;
	while(refMonth !== month || refYear !== year){
		data = data.concat(this.getAllRefugeesOfMonth(refMonth, refYear));
		refMonth++;
		if(refMonth > 12){
			refMonth = 1;
			refYear++;
		}
	}
	return data;
}

Refugees.prototype.start = function(){
	this.parseData();
}


Refugees.prototype.getAllRefugeesOfMonth = function(month, year){
	var data = [];
	for(var i = 0; i < this.refugeeData.length; i++){
		var singleData = this.refugeeData[i];
		if(singleData.month === month && singleData.year === year){
			data.push({
				"name": singleData.nationName,
				"amount": singleData.amount
			});
			this.refugeeData.splice(i, 1);
		}
	}
	
	return data;
	
}


/**
 * Returns the amount of refugees that were sent to given nation at certain month of a year
 */
Refugees.prototype.getRefugees = function(nationName, month, year){
	return (nationName.length * month * year) * 0.01;
	
}