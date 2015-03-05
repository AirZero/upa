

FeedText.prototype = Object.create(Phaser.Text.prototype);
FeedText.prototype.constructor = FeedText;

function FeedText(game, x, y, title, style){
	Phaser.Text.call(this, game, x, y, title, style);
	this.fixedToCamera = true;
	
	this.timesShown = 0;
	
}