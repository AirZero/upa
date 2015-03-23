

/**
 * A simple class that creates objects to fill from starting x to end x and starting y to end y with the given sprites.
 */
function SpriteList (game, startX, endX, startY, endY, objects, sprite, layer, fillAtStart){
	this.game = game;
	
	this.startX = startX;
	this.endX = endX;
	this.startY = startY;
	this.endY = endY;
	
	this.sprites = [];
	
	this.objects = objects;
	this.sprite = sprite;
	this.layer = layer;
	
	if(fillAtStart){
		for(var i = 0; i < this.objects; i++){
			this.addNewSprite();
		}
	}
	
	
}


/**
 * Destroys all the phaser objects associated with this spriteList and resets memory for the spritelist
 */
SpriteList.prototype.clear = function(){
	this.removeAll();
	this.sprites= [];
}


/**
 * Changes the amount of sprite objects to the given amount
 */
SpriteList.prototype.changeObjectAmount = function(amount){
	//Could be done with only while(this.addNewSprite) and removeSprite
	while(amount > this.sprites.length){
		this.addNewSprite();
	}
	while(amount < this.sprites.length){
		this.removeSprite();
	}
}

/**
 * Removes all of the objects using removeSprite
 */
SpriteList.prototype.removeAll = function(){
	while(this.removeSprite());
}


/**
 * Destroys the last object from the list
 */
SpriteList.prototype.removeSprite = function(){
	if(this.sprites.length == 0) return false;
	this.sprites[this.sprites.length-1].destroy();
	this.sprites.splice(this.sprites.length-1, 1);
	
	return true;
}

/**
 * Adds a new object to the list, if it is not full yet.
 */
SpriteList.prototype.addNewSprite = function(){
	if(this.objects <= this.sprites.length)
		return false;
	var x = this.startX + ((this.endX - this.startX) * this.sprites.length / this.objects);
	var y = this.startY + ((this.endY - this.startY) * this.sprites.length / this.objects);
	var newSprite = this.game.add.sprite(x,y, this.sprite);
	newSprite.anchor.setTo(0.5,0.5);
	newSprite.fixedToCamera = true;
	this.sprites[this.sprites.length] = newSprite;
	if(this.layer)
		this.layer.add(newSprite);
	return true;
	
}