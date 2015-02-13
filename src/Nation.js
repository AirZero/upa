
Nation.prototype = Object.create(Phaser.Sprite.prototype);
Nation.prototype.constructor = Nation;

function Nation(game, x,y, sprite, maxRefugees){
	Phaser.Sprite.call(this, game, 0, 0, sprite);
	this.anchor.setTo(0.5, 0.5);
	this.x = x;
	this.y = y;
	//this.sprite = game.add.sprite(0,0,sprite);
	//this.sprite.anchor.setTo(0.5, 0.5);
	//this.sprite.x = x;
	//this.sprite.y = y;
	this.refugees = 0;
	this.maxRefugees = maxRefugees;
}


Nation.prototype.setWidth = function(width){
	this.width = width;
}

Nation.prototype.setHeight = function(height){
	this.height = height;
}

Nation.prototype.destroy = function(){
	this.destroy();
}

Nation.prototype.tryHousing = function(amount){
	var leftover = this.maxRefugees - this.refugees;
	if(leftover >= amount){
		this.refugees+= amount;
	}
	else {
		leftover =-( this.maxRefugees - this.refugees);
		this.refugees = this.maxRefugees;
	}
	return leftover;
}