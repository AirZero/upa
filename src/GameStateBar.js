

GameStateBar.prototype = Object.create(Phaser.Sprite.prototype);
GameStateBar.prototype.constructor = GameStateBar;

function GameStateBar(phaserGame, sprite, stateBall, x, y, width, height){
	Phaser.Sprite.call(this, phaserGame, x, y, sprite);
	this.anchor.setTo(0.5,0.5);
	this.width = width;
	this.left = this.x - this.width * 0.5;
	this.height = height;
	this.fixedToCamera = true;
	this.ball = new Phaser.Sprite(phaserGame, this.x, this.y, stateBall);
	this.ball.width = 35;
	this.ball.height = 35;
	this.ball.fixedToCamera = true;
	this.ball.anchor.setTo(0.5,0.5);
	this.margin = this.width * 0.1;
}

GameStateBar.prototype.getPercent = function(){
	return this.percents;
}


GameStateBar.prototype.addToLayer = function(layerToAddTo){
	layerToAddTo.add(this);
	layerToAddTo.add(this.ball);
}


GameStateBar.prototype.refugeeAmountChanged = function(percents){
	this.percents = percents;
	this.ball.cameraOffset.x = this.left + this.margin + (this.width - this.margin * 2 )* (percents);
	if(percents < 0.35)
		this.tint = 0xFF1C1C;
	else this.tint = 0xFFFFFF;
}