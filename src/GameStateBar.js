

GameStateBar.prototype = Object.create(Phaser.Sprite.prototype);
GameStateBar.prototype.constructor = GameStateBar;

function GameStateBar(phaserGame, sprite, stateBall, x, y, width, height){
	Phaser.Sprite.call(this, phaserGame, x, y, sprite);
	this.anchor.setTo(0.5,0.5);
	this.width = width;
	this.left = this.x - this.width * 0.5;
	this.height = height;
	this.fixedToCamera = true;

	this.createStateBall(stateBall);
	
	this.margin = this.width * 0.1;
	this.percents = 0;
	this.lowPercent = 0.4;
	this.active = true;
	
	this.onTooLongLowHandlers = [];
	this.maxTimeOnLow = 125;
	this.lowTime = 0;
	this.lastUpdate = phaserGame.time.totalElapsedSeconds();
}


GameStateBar.prototype.setMaxLowTime = function(time, pityTime){
	this.maxTimeOnLow = time;
	if(this.lowTime >= this.maxTimeOnLow)
		this.lowTime -= pityTime;
}


GameStateBar.prototype.clear = function(){
	this.onTooLongLowHandlers = [];
}

GameStateBar.prototype.addOnTooLowHandler = function(handler){
	this.onTooLongLowHandlers[this.onTooLongLowHandlers.length] = handler;
}

GameStateBar.prototype.createStateBall = function(stateBall){
	this.ball = new Phaser.Sprite(this.game, this.x, this.y, stateBall);
	this.ball.width = 35;
	this.ball.height = 35;
	this.ball.fixedToCamera = true;
	this.ball.anchor.setTo(0.5,0.5);
}


GameStateBar.prototype.getPercent = function(){
	return this.percents;
}


GameStateBar.prototype.addToLayer = function(layerToAddTo){
	layerToAddTo.add(this);
	layerToAddTo.add(this.ball);
}


GameStateBar.prototype.setActive = function(activity){
	this.lastUpdate = this.game.time.totalElapsedSeconds();
	this.active = activity;
}


GameStateBar.prototype.refugeeAmountChanged = function(percents){
	this.percents = percents;
	this.ball.cameraOffset.x = this.left + this.margin + (this.width - this.margin * 2 )* (percents);
	if(percents < this.lowPercent)
		this.tint = 0xFF1C1C;
	else this.tint = 0xFFFFFF;
}


GameStateBar.prototype.invokeOnTooLowListeners = function(){
	for(var i = 0; i < this.onTooLongLowHandlers.length; i++){
		this.onTooLongLowHandlers[i].process();
	}
}


GameStateBar.prototype.update = function(){
	if(!this.active) return;
	var totalElapsed = this.game.time.totalElapsedSeconds();
	var difference =  totalElapsed - this.lastUpdate;
	this.lastUpdate = totalElapsed;
	if(this.percents <= this.lowPercent){
		//To escape the problem of focus not being on screen
		if(difference > 0.5)
			return;
		this.lowTime += difference;
		if(this.lowTime >= this.maxTimeOnLow)
			this.invokeOnTooLowListeners();
	}
	else{
		this.lowTime = 0;
		if(this.maxTimeOnLow > 100)
			this.maxTimeOnLow = 15;
	}
		
}
