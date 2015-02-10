

function Nation(game, x,y, sprite, maxRefugees){
	this.sprite = game.add.sprite(0,0,sprite);
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.x = x;
	this.sprite.y = y;
	this.refugees = 0;
	this.maxRefugees = maxRefugees;
}


Nation.prototype.destroy = function(){
	this.sprite.destroy();
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