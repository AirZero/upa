/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */
 
 /**
  * Makes the game state bar  that handles the game state and losing of the game.
  */

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
	this.shaken = 0;
	this.shakeCount = 0;
	this.shakeLength = 5;
	this.fadeDirection = -0.01;
	
	this.onTooLongLowHandlers = [];
	this.maxTimeOnLow = 125;
	this.lowTime = 0;
	this.lastUpdate = phaserGame.time.totalElapsedSeconds();
}


/**
 * Sets the max low time allowed before losing game. PityTime is the time given to player if the losing time is already at hand.
 */
GameStateBar.prototype.setMaxLowTime = function(time, pityTime){
	this.maxTimeOnLow = time;
	if(this.lowTime >= this.maxTimeOnLow){
		this.lowTime = this.maxTimeOnLow;
		this.lowTime -= pityTime;
		
	}
}


/**
 * Clears this components handlers
 */
GameStateBar.prototype.clear = function(){
	this.onTooLongLowHandlers = [];
}

/**
 * Adds a new handler to listen for the state of being too low for too long.
 */
GameStateBar.prototype.addOnTooLowHandler = function(handler){
	this.onTooLongLowHandlers[this.onTooLongLowHandlers.length] = handler;
}


/**
 * Creates the state ball used for showing the state.
 */
GameStateBar.prototype.createStateBall = function(stateBall){
	this.ball = new Phaser.Sprite(this.game, this.x, this.y, stateBall);
	this.ball.width = 35;
	this.ball.height = 35;
	this.ball.fixedToCamera = true;
	this.ball.anchor.setTo(0.5,0.5);
}


/**
 * Returns the current percent situation in the game.
 */
GameStateBar.prototype.getPercent = function(){
	return this.percents;
}


/**
 * Adds the components to the given layer.
 */
GameStateBar.prototype.addToLayer = function(layerToAddTo){
	layerToAddTo.add(this);
	layerToAddTo.add(this.ball);
}


/**
 * Sets the activity of the bar and its components
 */
GameStateBar.prototype.setActive = function(activity){
	this.lastUpdate = this.game.time.totalElapsedSeconds();
	this.active = activity;
}


/**
 * Handles the change of refugee amounts in the state.
 */
GameStateBar.prototype.refugeeAmountChanged = function(percents){
	this.percents = percents;
	this.ball.cameraOffset.x = this.left + this.margin + (this.width - this.margin * 2 )* (percents);
	
	//if(percents < this.lowPercent)
	//	this.tint = 0xFF1C1C;
	//else this.tint = 0xFFFFFF;
}


/**
 * Invokes all the listeners for being on low.
 */
GameStateBar.prototype.invokeOnTooLowListeners = function(){
	for(var i = 0; i < this.onTooLongLowHandlers.length; i++){
		this.onTooLongLowHandlers[i].process();
	}
}


/**
 * Update used for moving the stateball
 */
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
		var dir = this.shaken >= 0 ? 1 : -1;
		if(this.shakeCount > 3){
			dir *= -1;
			this.shakeCount = 0;
		}
		this.shaken = this.shakeLength * (this.lowTime /this.maxTimeOnLow) * dir;
		this.ball.cameraOffset.y += this.shaken;
		this.shakeCount++;
		
		
		this.alpha += this.fadeDirection;
		if(this.alpha < 0.01)
			this.fadeDirection *= -1;
		if(this.alpha > 0.99)
			this.fadeDirection *= -1;
		
	
		if(this.lowTime >= this.maxTimeOnLow)
			this.invokeOnTooLowListeners();
	}
	else{
		this.alpha = 1;
		this.fadeDirection = Math.min(this.fadeDirection, this.fadeDirection * -1);
		this.lowTime = 0;
		if(this.maxTimeOnLow > 100)
			this.maxTimeOnLow = 15;
	}
		
}
