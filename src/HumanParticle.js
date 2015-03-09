

HumanParticle.prototype = Object.create(Phaser.Particle.prototype);
HumanParticle.prototype.constructor = HumanParticle;

function HumanParticle (game, x, y){
	 Phaser.Particle.call(this, game, x, y, 'hunam');
	 this.destination = null;
}




HumanParticle.prototype.send = function(tweenDuration){
	if(this.destination){
		var tween = this.game.add.tween(this).to({ x: this.destination.x, y: this.destination.y}, tweenDuration, Phaser.Easing.Linear.None, true, 0, 0);
		tween.onComplete.addOnce(this.kill, this);
	}
}


HumanParticle.prototype.setDestination = function(x, y){
	if(this.destination === null)
		this.destination = { x: x, y: y};
}



HumanParticle.prototype.kill = function(){
	this.destination = null;
	Phaser.Particle.prototype.kill.call(this);
}