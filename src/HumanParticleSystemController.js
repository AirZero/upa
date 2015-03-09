


function HumanParticleSystemController(game, particleSystems, sprite, frequency, totalSprites, z){
	
	this.particleSystems = [];
	for(var i = 0; i < particleSystems; i++){
		var system = new HumanParticleSystem(game, sprite, 0, frequency, totalSprites / particleSystems);
		system.z = z;
		this.particleSystems[this.particleSystems.length] = system;
	}
	
}


HumanParticleSystemController.prototype.setOrigin = function(x, y){
	for(var i = 0; i < this.particleSystems.length; i++){
		this.particleSystems[i].setOrigin(x,y);
	}
}

HumanParticleSystemController.prototype.send = function(xStart,yStart, xDest, yDest, amount, duration, eventHandler){
	for(var i = 0; i < this.particleSystems.length; i++){
		if(!this.particleSystems[i].busy){
			this.particleSystems[i].send(xStart, yStart, xDest, yDest, amount, duration, eventHandler);
			return true;
		}
	}
	return false;	
}