
/**
 *
 *
 */

ProgressBar.prototype = Object.create(Phaser.Sprite.prototype);
ProgressBar.prototype.constructor = ProgressBar;
 
 function ProgressBar(x,y, sprite, phaserGame, time, times, method, layerToAdd, backgroundSprite){
	Phaser.Sprite.call(this, phaserGame, x, y, sprite);
	this.x = this.x - this.width * 0.5;
	this.anchor.setTo(0, 0.5);
	var wholeWidth = this.width;
	var interval = time / times;
	this.repeatEvent = phaserGame.time.events.repeat(Phaser.Timer.SECOND * interval, times, function(){
		this.width -= wholeWidth / times;
	}, this);
	this.method = method;
	this.timedEvent = phaserGame.time.events.add(Phaser.Timer.SECOND * time, function(){
		this.timeEnded();
	}, this);
	
	if(backgroundSprite){
	 	this.background = phaserGame.add.sprite(x,y, backgroundSprite);
	}
	
	if(layerToAdd){
		if(this.background)
			layerToAdd.add(this.background);
		layerToAdd.add(this);
	}
 }

 ProgressBar.prototype.timeEnded = function(){
	 this.destroy();
		if(this.method)
			this.method();
 }
 
 
 
 ProgressBar.prototype.destroy = function(){
	 Phaser.Sprite.prototype.destroy.call(this);
 }
 