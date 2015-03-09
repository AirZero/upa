
/**
 * A class that extends some properties for the javascripts Date. 
 * Like different eventhandlers and allows easy progressing of the day
 */

function GameDate(day, month, year){
	this.date = new Date(year, month, day);
	//this.day = day;
	//this.month = month;
	//this.year = year;
	this.divider = ".";
}

/**
 * Progressess time by the given days, months and years. Only days must be given as a number.
 */
GameDate.prototype.progress = function(days, months, years){
	//Initialize them as 0 so this can be called with days only or month and days or days and month and years
	months = months || 0;
	years = years || 0;
	this.date.setDate(this.date.getDate() +days);
	this.date.setMonth(this.date.getMonth() +months);
	this.date.setFullYear(this.date.getFullYear() +years);
	//months += days / 30; //TODO: getting days based on different months
	//months = Math.floor(months);
	//days = days % 30;
	//
	//years += months / 12;
	//years = Math.floor(years);
	//months = months % 12;
	//
	//if(months > 12 || days > 30)
	//	this.progress(days, months, years);
	//else{
	//	this.year += years;
	//	this.month += months
	//	this.day += days;
	//	if (this.month > 12 || this.day > 30){
	//		this.month += this.day / 30; //TODO: getting days based on different months
	//		this.month = Math.floor(this.month);
	//		this.day = this.day % 30;
	//		
	//		this.year += this.month / 13;
	//		this.year = Math.floor(this.year);
	//		this.month = (this.month % 13 === 0) ? 1 : this.month % 13;
	//		
	//	}
	//}
}


/**
 * Progresses year forward by one.
 */
GameDate.prototype.progressYear = function(){
	this.progress(0,0,1);
}

/**
 * Progresses day forward by one.
 */
GameDate.prototype.progressDay = function(){
	this.progress(1);
}

/**
 * Progresses month forward by one.
 */
GameDate.prototype.progressMonth = function(){
	this.progress(0,1);
}


/**
 * returns current day
 */
GameDate.prototype.getDay = function(){
	return this.date.getDate();
}

/**
 * returns current month
 */
GameDate.prototype.getMonth = function(){
	return this.date.getMonth()+1;
}

/**
 * returns current year
 */
GameDate.prototype.getYear = function(){
	return this.date.getFullYear();
}


/**
 * returns this date as a string with always 2 digits and differentiated by the "divider" object.
 */
GameDate.prototype.getDateString = function(){
	//TODO: check if this is horribly slow
	var day = ""+this.getDay();
	var month = ""+this.getMonth();
	var date = (day.length == 2 ? day : "0"+day) +this.divider +
			(month.length == 2 ? month : "0"+month)+this.divider +
			this.getYear();
	return date;
}


GameDate.prototype.getDate = function(){
	//TODO: basic date object
	return null;
}