
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
function HumanParticleSystem(game, sprite, lifeSpan, frequency, quantity){
	Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0, quantity);
	this.particleClass = HumanParticle;
	this.makeParticles();
	this.setRotation(0,0);
	this.emittedSprite = sprite;
	this.particleLifeSpan = lifeSpan;
	this.gravity = 0;
	this.busy = false;
	this.active = true;
	
	this.minParticleScale = 0.9;
	this.maxParticleScale = 1;
	
	this.minParticleSpeed.x = 0;
	this.minParticleSpeed.y = 0;
	this.maxParticleSpeed.x = 0;
	this.maxParticleSpeed.y = 0;
	
	this.emitFrequency = frequency;
	this.xDestination = 0;
	this.yDestination = 0;
	this.forEach(this.initializeParticle, this, false);
}


HumanParticleSystem.prototype.setActive = function(activity){
	this.active = activity;
	this.forEach(function(particle){
		particle.setActive(activity);
	});
	
}



/**
 * Initializes the given particle with an onEmit event that allows for the sending of the particle.
 */
HumanParticleSystem.prototype.initializeParticle = function(particle){
	var particleSystemRef = this;
	 particle.onEmit = function(){
		particle.gravity = 0;
		if(particle.destination === null){
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
}


/**
 * Handles the stopping of the particle sending
 */
HumanParticleSystem.prototype.destroy = function(){
	//Phaser.Particles.Arcade.Emitter.prototype.removeAll.call(this, true, true);
	Phaser.Particles.Arcade.Emitter.prototype.destroy.call(this);
}


/**
 * Sends particles from the given point to the given point.
 * Sends the given amount and counts that they hit the target point in duration.
 * Upon completion will call the given eventhandler.
 * If frequency and amount are too compared to the duration, the sending might take 0 seconds.
 */
HumanParticleSystem.prototype.send = function(xStart,yStart, xDest, yDest, amount, duration, eventHandler){
	this.x = xStart;
	this.y = yStart;
	this.xDestination = xDest;
	this.yDestination = yDest;
	//Lets do this before breaking duration
	this.game.time.events.add(Phaser.Timer.SECOND * duration, function(){
		this.stop();
		eventHandler.process();
	}, this);
	
	//Because from here on its in ms
	duration = duration*1000;
	//This is done to allow the last invidual to finish in duration
	duration -= this.emitFrequency * amount;
	this.tweenDuration = duration;
	//Phaser actually has _quantity += quantity, making the amount constantly increase which is definitely not what we want, hence resetting the inner property
	this._quantity = 0;
	this.busy = true;
	this.start(false, 0, this.emitFrequency, amount);
	

}
