


function GameDate(day, month, year){
	this.day = day;
	this.month = month;
	this.year = year;
	this.divider = ".";
}


GameDate.prototype.progress = function(days, months, years){
	//Initialize them as 0 so this can be called with days only or month and days or days and month and years
	months = months || 0;
	years = years || 0;
	
	months += days / 30; //TODO: getting days based on different months
	months = Math.floor(months);
	days = days % 30;
	
	years += months / 12;
	years = Math.floor(years);
	months = months % 12;
	
	if(months > 12 || days > 30)
		this.progress(days, month, years);
	else{
		this.year += years;
		this.month += months
		this.day += days;
		if (this.month > 12 || this.day > 30){
			this.month += this.day / 30; //TODO: getting days based on different months
			this.month = Math.floor(this.month);
			this.day = this.day % 30;
			
			this.year += this.month / 12;
			this.year = Math.floor(this.year);
			this.month = this.month % 12;
			
		}
	}
}


GameDate.prototype.progressYear = function(){
	this.progress(0,0,1);
}

GameDate.prototype.progressDay = function(){
	this.progress(1);
}


GameDate.prototype.progressMonth = function(){
	this.progress(0,1);
}


GameDate.prototype.getDay = function(){
	return this.day;
}


GameDate.prototype.getMonth = function(){
	return this.month;
}


GameDate.prototype.getYear = function(){
	return this.year;
}

GameDate.prototype.getDateString = function(){
	var date = ""+this.day+this.divider +this.month+this.divider+this.year;
	return date;
}


GameDate.prototype.getDate = function(){
	//TODO: basic date object
	return null;
}