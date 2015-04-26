
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * Class that represents the human particles sent innerly in the program.
 * Inherits the particle class and adds functionality for sending the particles to given points by HumanParticleSystems
 */

HumanParticle.prototype = Object.create(Phaser.Particle.prototype);
HumanParticle.prototype.constructor = HumanParticle;

/**
 * Initializes destination and calls the inherited class
 */
function HumanParticle (game, x, y){
	 Phaser.Particle.call(this, game, x, y, 'hunam');
	 this.destination = null;
	 this.tween = null;
	 this.onFinishListener = null;
	 this.active = true;
}


/**
 * Adds a listener for finishing movement.
 */
HumanParticle.prototype.addOnFinishListener = function(listener){
	//TODO: multiple ones
	this.onFinishListener = listener;
}


/**
 * Sets the activity of the particle and stops the movement/starts it depending on the given activity.
 */
HumanParticle.prototype.setActive = function(activity){
	this.active = activity;
	if(this.tween){
		this.tween.isPaused = !activity;
	}
}



/**
 * Handles the moving of the single particle to the destination stored in this object.
 * The movement will take as long as the duration given.
 */
HumanParticle.prototype.send = function(tweenDuration){
	if(this.destination){
		this.tween = this.game.add.tween(this).to({ x: this.destination.x, y: this.destination.y}, tweenDuration, Phaser.Easing.Linear.None, true, 0, 0);
		this.tween.onComplete.addOnce(this.finishMoving, this);
		this.tween.isPaused = !this.active;
	}
}

/**
 * Sets the destination of this object to the given x and y coordinates
 */
HumanParticle.prototype.setDestination = function(x, y){
	if(this.destination === null)
		this.destination = { x: x, y: y};
}


/**
 * Resets the tween and destroys the particle
 */
HumanParticle.prototype.destroy = function(){
	this.resetTweenAndDestination();
	Phaser.Particle.prototype.destroy.call(this);
}


/**
 * Resets the tween in operation and the destination.
 */
HumanParticle.prototype.resetTweenAndDestination = function(){
	if(this.tween)
		this.tween.stop();
	this.tween = null;
	this.destination = null;
}


/**
 * Finish moving and reset particle
 */
HumanParticle.prototype.finishMoving = function(){
	if(this.onFinishListener)
		this.onFinishListener.process();
	this.kill();
}


/**
 * Resets destination and calls inherited kill method
 */
HumanParticle.prototype.kill = function(){
	this.resetTweenAndDestination();
	Phaser.Particle.prototype.kill.call(this);
}