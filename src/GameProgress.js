
/**
 * Is responsible for the games date checks and date based actions
 */

/**
 * Initializes a new game progress and starts with the date 1.9.2011.
 */
function GameProgress(phaserGame){
	this.phaserGame = phaserGame;
	this.monthInterval = 5;
	this.dayInterval = this.monthInterval / 30;
	this.startDate = new GameDate(1,9,2011);
	this.resetDate(); //Initializes this.date also as well as sets it to startdate
	this.lastDayTime = this.phaserGame.time.totalElapsedSeconds();
	this.onTimeChangedEvents = [];
	this.active = true;
}


/**
 * Clears this and all its children
 */
GameProgress.prototype.clear = function(){
	this.onTimeChangedEvents = [];
	//TODO: if other stuff exists
}


/**
 * Sets current date to be as startdate
 */
GameProgress.prototype.resetDate = function(){
	this.date = new GameDate(this.startDate.getDay(),this.startDate.getMonth(), this.startDate.getYear());
}


/**
 * Adds a new event to listen whenever date changes
 */
GameProgress.prototype.addOnTimeChangedEvent = function(method, callBackClass){
	this.onTimeChangedEvents[this.onTimeChangedEvents.length] = new EventHandler(method,callBackClass);
}


/**
 * Sets whether this component is active or not
 */
GameProgress.prototype.setActive = function(activity){
	//TODO: adding the waited time to the current time so there is no jump on update when this is returned to true
	this.active = activity;
}

/**
 * Returns the year
 */
GameProgress.prototype.getYear = function(){
	return this.date.getYear();
}

/**
 * Returns the month
 */
GameProgress.prototype.getMonth = function(){
	return this.date.getMonth();
}

/**
 * Returns the date from the underlying gamedate object
 */
GameProgress.prototype.getDateString = function(){
	return this.date.getDateString();
}

/**
 * Updates the date situation and changes it according to game changes
 */
GameProgress.prototype.update = function(){
	if(!this.active) return;
	var totalTime = this.phaserGame.time.totalElapsedSeconds();
	if(totalTime > this.lastDayTime + this.dayInterval){
		this.lastDayTime = totalTime;
		this.date.progressDay();
		for(methodName in this.onTimeChangedEvents){
			var methodObject = this.onTimeChangedEvents[methodName];
			methodObject.process(this.date.getDay(), this.date.getMonth(), this.date.getYear());
		}

	}
	//
	//if(totalTime >= this.lastMonthTime + this.monthInterval){
	//	this.lastMonthTime = totalTime;
	//	this.date.progressMonth();
    //
	//}
}