


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


GameProgress.prototype.clear = function(){
	this.onTimeChangedEvents = [];
	//TODO: if other stuff exists
}




GameProgress.prototype.resetDate = function(){
	this.date = new GameDate(this.startDate.getDay(),this.startDate.getMonth(), this.startDate.getYear());
}


GameProgress.prototype.addOnTimeChangedEvent = function(method, callBackClass){
	this.onTimeChangedEvents[this.onTimeChangedEvents.length] = new EventHandler(method,callBackClass);
}



GameProgress.prototype.setActive = function(activity){
	//TODO: adding the waited time to the current time so there is no jump on update when this is returned to true
	this.active = activity;
}

GameProgress.prototype.getYear = function(){
	return this.date.getYear();
}


GameProgress.prototype.getMonth = function(){
	return this.date.getMonth();
}


GameProgress.prototype.getDateString = function(){
	return this.date.getDateString();
}


GameProgress.prototype.update = function(){
	if(!this.active) return;
	var totalTime = this.phaserGame.time.totalElapsedSeconds();
	if(totalTime > this.lastDayTime + this.dayInterval){
		this.lastDayTime = totalTime;
		var month = this.date.getMonth();
		this.date.progressDay();
		if(month !== this.date.getMonth){
			for(methodName in this.onTimeChangedEvents){
				var methodObject = this.onTimeChangedEvents[methodName];
				methodObject.process(this.date.getDay(), this.date.getMonth(), this.date.getYear());
			}
		}
	}
	//
	//if(totalTime >= this.lastMonthTime + this.monthInterval){
	//	this.lastMonthTime = totalTime;
	//	this.date.progressMonth();
    //
	//}
}