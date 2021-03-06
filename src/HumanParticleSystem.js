
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * HumanParticleSystem inherits the Phasers own particle system and adds on top of that the possibility of sending particles to the given destination.
 * Can handle one sending at a time.
 */


HumanParticleSystem.prototype = Object.create(Phaser.Particles.Arcade. Emitter.prototype);
HumanParticleSystem.prototype.constructor = HumanParticleSystem;

/**
 * Initializes the particle system based on given parameters and basic settings.
 * Handles the inheritance of Emitter class.
 */
function HumanParticleSystem(game, sprite, lifeSpan, frequency, quantity, z){
	z = z || 1;
	Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0, quantity);
	this.particleClass = HumanParticle;
	this.z = z;
	this.makeParticles();
	this.setRotation(0,0);
	this.emittedSprite = sprite;
	this.particleLifeSpan = lifeSpan;
	this.gravity = 0;
	this.busy = false;
	this.active = true;
	this.sentParticles = 0;
	this.onSendFinish = null;
	
	this.minParticleScale = 0.275;
	this.maxParticleScale = 0.3;
	
	this.minParticleSpeed.x = 0;
	this.minParticleSpeed.y = 0;
	this.maxParticleSpeed.x = 0;
	this.maxParticleSpeed.y = 0;
	
	this.emitFrequency = frequency;
	this.xDestination = 0;
	this.yDestination = 0;
	this.forEach(this.initializeParticle, this, false);
}


/**
 * Sets the activity of the particle system and all of its particles.
 */
HumanParticleSystem.prototype.setActive = function(activity){
	this.active = activity;
	this.forEach(function(particle){
		particle.setActive(activity);
	});
	
}


/**
 * Handles the particlesystem state change for finishing one particles tween.
 * Reduces the amount of sent particles and invokes onSendFinish Handlers.
 */
HumanParticleSystem.prototype.particleFinishedTween = function(particle){
	this.sentParticles--;
	if(this.sentParticles == 0){
		if(this.onSendFinish)
			this.onSendFinish.process();
		this.stop();
	}
}


/**
 * Increases the amount of sent particles.
 */
HumanParticleSystem.prototype.addToSentParticles = function(particle){
	this.sentParticles++;
}



/**
 * Initializes the given particle with an onEmit event that allows for the sending of the particle.
 */
HumanParticleSystem.prototype.initializeParticle = function(particle){
	var particleSystemRef = this;
	particle.addOnFinishListener(new EventHandler(this.particleFinishedTween, this));
	particle.onEmit = function(){
		particle.gravity = 0;
		particleSystemRef.addToSentParticles(particle);
		if(particle.destination === null){
			particle.z = this.z;
			particle.setDestination(particleSystemRef.getXDestination(), particleSystemRef.getYDestination());
			particle.send(particleSystemRef.getTweenDuration());				
		}
	};
}

/**
 * Returns the current tweenDuration
 */
HumanParticleSystem.prototype.getTweenDuration = function(){
	 return this.tweenDuration;
}

/**
 * Returns the current x coordinate of the destination
 */
HumanParticleSystem.prototype.getXDestination = function(){
	 return this.xDestination;
}
	
/**
 * Returns the current y coordinate of the destination
 */
HumanParticleSystem.prototype.getYDestination = function(){
	return this.yDestination;
}

/**
 * Sets the origin point of from where the particles are sent from
 */ 
HumanParticleSystem.prototype.setOrigin = function(x,y){
	this.x = x;
	this.y = y;
}

/**
 * Handles the stopping of the particle sending
 */
HumanParticleSystem.prototype.stop = function(){
	this.busy = false;
	this.onSendFinish = null;
}


/**
 * Handles the stopping of the particle sending
 */
HumanParticleSystem.prototype.destroy = function(){
	//Phaser.Particles.Arcade.Emitter.prototype.removeAll.call(this, true, true);
	this.stop();
	Phaser.Particles.Arcade.Emitter.prototype.destroy.call(this);
}


/**
 * Sends particles from the given point to the given point.
 * Sends the given amount and counts that they hit the target point in duration.
 * The amount of sent particles is rounded up to the next integer.
 * Upon completion will call the given eventhandler.
 * If frequency and amount are too compared to the duration, the sending might take 0 seconds.
 */
HumanParticleSystem.prototype.send = function(xStart,yStart, xDest, yDest, amount, duration, eventHandler){
	this.x = xStart || this.x;
	this.y = yStart || this.y;
	this.xDestination = xDest;
	this.yDestination = yDest;
	this.onSendFinish = eventHandler;
	//Lets do this before breaking duration
	//TODO: actually based on the sent particles
	//var timedEvent = this.game.time.events.add(Phaser.Timer.SECOND * duration, function(){
	//	this.stop();
	//	eventHandler.process();
	//}, this);
	//this.events.push(timedEvent);
	
	//Simple rounding. If 1.1 particles would be sent, we send 2
	amount = Math.floor(amount+1);
	
	//Because from here on its in ms
	duration = duration * 1000;
	
	var frequency = this.emitFrequency;
	while(frequency * amount > duration)
		frequency *= 0.5;
	
	//This is done to allow the last invidual to finish in duration
	duration -= frequency * amount;
	this.tweenDuration = duration;
	//Phaser actually has _quantity += quantity, making the amount constantly increase which is definitely not what we want, hence resetting the inner property
	this._quantity = 0;
	this.busy = true;
	this.start(false, 0, frequency, amount);
	

}
