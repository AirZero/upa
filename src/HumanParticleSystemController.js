
/**
 * Human particle system controller will handle the unison workings of several
 * humanParticleSystems so that multiple particlesystems can work at the same time
 */

 /**
  * Initializes the particle systems based on the amount given with given sprites and frequencies. Will divide the total sprites to all of the particleSystems
  */
function HumanParticleSystemController(game, particleSystems, sprite, frequency, totalSprites, z){
	
	this.particleSystems = [];
	for(var i = 0; i < particleSystems; i++){
		var system = new HumanParticleSystem(game, sprite, 0, frequency, totalSprites / particleSystems);
		system.z = z;
		this.particleSystems[this.particleSystems.length] = system;
	}
	
}

/**
 * Sets the origin point of all particle systems to the given point
 */
HumanParticleSystemController.prototype.setOrigin = function(x, y){
	for(var i = 0; i < this.particleSystems.length; i++){
		this.particleSystems[i].setOrigin(x,y);
	}
}


HumanParticleSystemController.prototype.clear = function(){
	for(var i = 0; i < this.particleSystems.length; i++){
		this.particleSystems[i].destroy();
	}
	this.particleSystems = [];
}



/**
 * Allocates one of the available particle systems to send particles with the given parameters. Returns true if particle system was allocated and false if one was not available
 */
HumanParticleSystemController.prototype.send = function(xStart,yStart, xDest, yDest, amount, duration, eventHandler){
	for(var i = 0; i < this.particleSystems.length; i++){
		if(!this.particleSystems[i].busy){
			this.particleSystems[i].send(xStart, yStart, xDest, yDest, amount, duration, eventHandler);
			return true;
		}
	}
	return false;	
}