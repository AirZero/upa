
/**
 * A little bit tweaked text class with the times shown attribute.
 * Its better to have a class anyways
 */

FeedText.prototype = Object.create(Phaser.Text.prototype);
FeedText.prototype.constructor = FeedText;

/**
 * Initializes a new FeedText with the given attributes
 */
function FeedText(game, x, y, title, style){
	Phaser.Text.call(this, game, x, y, title, style);
	this.fixedToCamera = true;
	
	this.timesShown = 0;
	
}