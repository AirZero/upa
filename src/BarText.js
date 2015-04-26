
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * Defines a new bartext that is used for showing a bar and a text.
 * The bartext can be set percentually to define a certain percentage shown.
 */
 
BarText.prototype = Object.create(Phaser.Sprite.prototype);
BarText.prototype.constructor = BarText;


/**
 * Constructor that takes the phaser game and the x point that the bar originates from and the end point to which it continues to.
 * Also takes the y coordinate for the bar, the picture for the bar, the text shown for bar and text style.
 */
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


/**
 * Sets fixed to camera to all the corresponding components
 */
BarText.prototype.setFixedToCamera = function(isFixed){
	this.fixedToCamera = isFixed;
	this.text.fixedToCamera = isFixed;
}


/**
 * Sets the size of the bar portion to the given amount. For example if width is 100 and percents 0.20, the size will be 20.
 * percents are given as a decimal.
 */
BarText.prototype.setPercentualSize = function(percents){
	this.width = this.maxWidth * percents;
}


/**
 * Destroys this component and its childrens
 */
BarText.prototype.destroy = function(){
	this.text.destroy();
	Phaser.Sprite.prototype.destroy.call(this);
}


/**
 * Adds this component and its children to the given layer.
 */
BarText.prototype.addToLayer = function(layer){
	layer.add(this);
	layer.add(this.text);
}