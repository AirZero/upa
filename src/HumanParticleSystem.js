
HumanParticleSystem.prototype = Object.create(Phaser.Particles.Arcade. Emitter.prototype);
HumanParticleSystem.prototype.constructor = HumanParticleSystem;


function HumanParticleSystem(game, sprite, lifeSpan, frequency, quantity){
	Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0, quantity);
	this.particleClass = HumanParticle;
	this.makeParticles();
	this.setRotation(0,0);
	this.emittedSprite = sprite;
	this.particleLifeSpan = lifeSpan;
	this.gravity = 0;
	this.busy = false;
	
	this.minParticleScale = 0.8;
	this.maxParticleSpeed = 1;
	
	this.minParticleSpeed.x = 0;
	this.minParticleSpeed.y = 0;
	this.maxParticleSpeed.x = 0;
	this.maxParticleSpeed.y = 0;
	
	this.emitFrequency = frequency;
	this.xDestination = 0;
	this.yDestination = 0;
	this.forEach(this.initializeParticle, this, false);
}


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
	
HumanParticleSystem.prototype.getTweenDuration = function(){
	 return this.tweenDuration;
}
	
HumanParticleSystem.prototype.getXDestination = function(){
	 return this.xDestination;
}
	
HumanParticleSystem.prototype.getYDestination = function(){
	return this.yDestination;
}
	
HumanParticleSystem.prototype.setOrigin = function(x,y){
	this.x = x;
	this.y = y;
}

HumanParticleSystem.prototype.stop = function(){
	this.busy = false;
}



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
