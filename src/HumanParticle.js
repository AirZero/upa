
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
}


/**
 * Handles the moving of the single particle to the destination stored in this object.
 * The movement will take as long as the duration given.
 */
HumanParticle.prototype.send = function(tweenDuration){
	if(this.destination){
		var tween = this.game.add.tween(this).to({ x: this.destination.x, y: this.destination.y}, tweenDuration, Phaser.Easing.Linear.None, true, 0, 0);
		tween.onComplete.addOnce(this.kill, this);
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
 * Resets destination and calls inherited kill method
 */
HumanParticle.prototype.kill = function(){
	this.destination = null;
	Phaser.Particle.prototype.kill.call(this);
}