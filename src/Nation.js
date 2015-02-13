
Nation.prototype = Object.create(Phaser.Sprite.prototype);
Nation.prototype.constructor = Nation;

function Nation(game, x,y, text, sprite, maxRefugees){
	Phaser.Sprite.call(this, game, 0, 0, sprite);
	this.createText(game, text, x, y);
	
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


Nation.prototype.createText = function(game, text, x, y){
	this.text = game.add.text(0,0, text, NATION_TEXT_STYLE);
	this.text.anchor.setTo(0.5, 0.5);
	this.text.x = x;
	this.text.y = y;
}


Nation.prototype.destroy = function(){
	this.text.destroy();
	Phaser.Sprite.prototype.destroy.call(this);
}


Nation.prototype.setXandY = function(x,y){
	this.x = x;
	this.y = y;
	this.text.x = x;
	this.text.y = y;
}


Nation.prototype.setWidth = function(width){
	this.width = width;
}

Nation.prototype.setHeight = function(height){
	this.height = height;
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