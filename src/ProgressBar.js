
/**
 * A progress bar class that can be made to indicate passing of time
 *
 */

ProgressBar.prototype = Object.create(Phaser.Sprite.prototype);
ProgressBar.prototype.constructor = ProgressBar;
 
 /**
  * Initializes a new progress bar that will slowly pass by as time passes
  */
 function ProgressBar(x,y, sprite, phaserGame, time, times, method, layerToAdd, backgroundSprite){
	Phaser.Sprite.call(this, phaserGame, x, y, sprite);
	this.x = this.x - this.width * 0.5;
	this.anchor.setTo(0, 0.5);
	//this.timeFromStart = phaserGame.time.totalElapsedSeconds();
	this.wholeWidth = this.width;
	this.times = times;
	var interval = time / times;
	this.repeatEvent = phaserGame.time.events.repeat(Phaser.Timer.SECOND * interval, times, this.updateProgressBarsSize, this);
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

 /**
  * Updates the progress bars size as in makes it smaller based on the amount of times it is supposed to be diminished
  */
 ProgressBar.prototype.updateProgressBarsSize = function(){
	 //TODO: make it work with low fps since with low fps its skipping steps
	this.width -= this.wholeWidth / this.times;
 }
 
 /**
  * When the progress bar has finished, it will call the given method
  */
 ProgressBar.prototype.timeEnded = function(){
	 this.destroy();
		if(this.method)
			this.method();
 }
 
 
 /**
  * Destroys the progress bar and the underlying components
  */
 ProgressBar.prototype.destroy = function(){
	 Phaser.Sprite.prototype.destroy.call(this);
 }
 