

BarText.prototype = Object.create(Phaser.Sprite.prototype);
BarText.prototype.constructor = BarText;


function BarText(phaserGame, xStart, xEnd, y, sprite, text, style){
	Phaser.Sprite.call(this, phaserGame, xStart, y, sprite);
	this.anchor.setTo(0, 0.5);
	this.maxWidth = xEnd - xStart;
	this.width = this.maxWidth;
	this.start = xStart;
	this.end = xEnd;
	
	this.text = phaserGame.add.text(this.x + this.width*0.5, y, text, style);
	this.text.anchor.setTo(0.5,0.5);
	
	this.setFixedToCamera(true);

}


BarText.prototype.setFixedToCamera = function(isFixed){
	this.fixedToCamera = isFixed;
	this.text.fixedToCamera = isFixed;
}


BarText.prototype.setPercentualSize = function(percents){
	this.width = this.maxWidth * percents;
}


BarText.prototype.destroy = function(){
	this.text.destroy();
	Phaser.Sprite.prototype.destroy.call(this);
}


BarText.prototype.addToLayer = function(layer){
	layer.add(this);
	layer.add(this.text);
}