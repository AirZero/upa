

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


SpriteList.prototype.clear = function(){
	this.removeAll();
	this.sprites= [];
}


SpriteList.prototype.changeObjectAmount = function(amount){
	//Could be done with only while(this.addNewSprite) and removeSprite
	while(amount > this.sprites.length){
		this.addNewSprite();
	}
	while(amount < this.sprites.length){
		this.removeSprite();
	}
}

SpriteList.prototype.removeAll = function(){
	while(this.removeSprite());
}


SpriteList.prototype.removeSprite = function(){
	if(this.sprites.length == 0) return false;
	this.sprites[this.sprites.length-1].destroy();
	this.sprites.splice(this.sprites.length-1, 1);
	
	return true;
}


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