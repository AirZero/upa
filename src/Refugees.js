
/**
 * Class responsible for the refugee data and giving this information out based 
 * on dates
 *
 */

 
 /**
  * Initializes the refugee data ready for the game
  */
function Refugees(game){
	this.game = game;
	this.totalRefugees = 100000;
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
	this.totalRefugees = 100000;
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
	this.game.load.text('refugeeDataCSV', 'assets/data/refugeeData.csv')
	//this.game.load.onLoadComplete.addOnce(this.parseData, this);
}

Refugees.prototype.parseData = function(){
	var textData = this.game.cache.getText('refugeeDataCSV');
	var nationsSplit = textData.split(/\r\n|\r|\n/g);
	var startingYear = 2010;
	for(var i = 0; i < nationsSplit.length; i++){
		var data = nationsSplit[i].split(",");
		
		for(var j = 1; j < data.length; j++){
			var yearly = data[j];
			var left = yearly;
			for(var month = 1; month <= 12; month++){
				var monthly = month !== 12 ? Math.floor(yearly * 0.0833333333333333) : left;
				left -= monthly;
				this.refugeeData.push(new RefugeeMonth(data[0], month, startingYear+ j -1, monthly)); //same as /12
			}
				
		}
	}	

}

Refugees.prototype.start = function(){
	this.parseData();
}


Refugees.prototype.getAllRefugeesOfMonth = function(month, year){
	var data = [];
	for(dataName in this.refugeeData){
		var singleData = this.refugeeData[dataName];
		if(singleData.month === month && singleData.year === year){
			data.push({
				"name": singleData.nationName,
				"amount": singleData.amount
			});
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