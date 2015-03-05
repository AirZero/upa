
HumanParticleSystem.prototype = Object.create(Phaser.Particles.Arcade. Emitter.prototype);
HumanParticleSystem.prototype.constructor = HumanParticleSystem;


function HumanParticleSystem(game, sprite, lifeSpan, frequency, quantity){
	Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0, quantity);
	this.makeParticles(sprite);
	this.emittedSprite = sprite;
	this.particleLifeSpan = lifeSpan;
	this.emitFrequency = frequency;
	this.emittedQuantity = quantity;
	
}

HumanParticleSystem.prototype.setOrigin = function(x,y){
	this.x = x;
	this.y = y;
}


HumanParticleSystem.prototype.send = function(xStart,yStart, xDest, yDest, amount){
	//TODO based heavily on example at http://www.html5gamedevs.com/topic/5448-emitte-particles-from-one-point-to-another/ Redo it to be more functional here
	var particleSystemReference = this;
	//this.x = xStart;
	//this.y = yStart;
	this.start(false, this.particleLifeSpan, this.emitFrequency, amount);
	setTimeout(function(){
		particleSystemReference.forEach(function(particle){
			particle.gravity = 0;
			var tween = particleSystemReference.game.add.tween(particle).to({ x: xDest, y: yDest}, particleSystemReference.particleLifeSpan, Phaser.Easing.Linear.None, true, 0, false);
			tween.onComplete.addOnce(function(){ particle.kill();}, particleSystemReference);
		}, this, false);
	}, 100);
}
