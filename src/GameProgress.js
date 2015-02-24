


function GameProgress(phaserGame){
	this.phaserGame = phaserGame;
	this.monthInterval = 5;
	this.date = new GameDate(1, 1, 2000);
	this.lastMonthTime = this.phaserGame.time.totalElapsedSeconds();
	this.onTimeChanged = null;
	this.active = true;
	
}

GameProgress.prototype.setActive = function(activity){
	this.active = activity;
}

GameProgress.prototype.getDateString = function(){
	return this.date.getDateString();
}


GameProgress.prototype.update = function(){
	if(!this.active) return;
	var totalTime = this.phaserGame.time.totalElapsedSeconds();
	if(totalTime >= this.lastMonthTime + this.monthInterval){
		this.lastMonthTime = totalTime;
		this.date.progressMonth();
		if(this.onTimeChanged)
			this.onTimeChanged();
	}
}