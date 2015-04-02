
/**
 * Creates a news feed to the bottom of the screen. Can be fed feeds to show on screen.
 */
NewsFeed.prototype = Object.create(Phaser.Sprite.prototype);
NewsFeed.prototype.constructor = NewsFeed;

/**
 * initializes the news feed and all its components
 */
function NewsFeed (phaserGame, sprite, height, layerToAddTo, z, x, y){
	x = x || lvlWidth * 0.5;
	y = y || lvlHeight - height * 0.5;
//	this.phaserGame = phaserGame;
	Phaser.Sprite.call(this, phaserGame, x, y, sprite);
	//this.alpha = 0.85;
	this.anchor.setTo(0.5,0.5);
	this.textStartingPoint = lvlWidth;
	this.textEndingPoint = 0;
	this.width = lvlWidth;
	this.height = height;
	this.textTime = 8;
	//TODO: count this from the offset, cannot be related to y since that does not work with fixedToCamera
	this.offset = 583;
	this.active = true;
	this.fixedToCamera = true;
	this.style = BASE_STYLE;
	if(layerToAddTo)
		layerToAddTo.add(this);
	this.layerToAddTo = layerToAddTo;
	//this.maximumShowingTimes = 3;
	this.queue = [];
	this.shownTexts = [];
	this.margin = lvlWidth * 0.25;
	
	this.textGroup = this.game.add.group();
	this.textGroup.z = z;
	
}


NewsFeed.prototype.setActive = function(activity){
	this.active = activity;
}


/**
 * Adds a new text to the queue to be shown
 */
NewsFeed.prototype.addText = function(title, times){
	times = times || 3;
	var text = new FeedText(this.game, this.textStartingPoint, this.offset , title, this.style, times);
	text.anchor.setTo(0, 0.5);
	this.queue.push(text);
	//this.layerToAddTo.add(text);
}


NewsFeed.prototype.clearQueue = function(){
	this.queue = [];
	for(var i = 0; i < this.shownTexts.length; i++){
		this.shownTexts[i].timesToShow = 0;
	}
}

/**
 * Destroys news feed and all components associated with it
 */
NewsFeed.prototype.destroy = function(){
	this.textGroup.destroy();
	this.queue = [];
	this.shownTexts = [];
	Phaser.Sprite.prototype.destroy.call(this);
}


/**
 * Innerly sents forward the next message in queue
 */
NewsFeed.prototype.setNextMessageToBeShown = function(){
	var nextInRow = this.queue[0];
	this.textGroup.add(nextInRow);
	this.shownTexts[this.shownTexts.length] = (nextInRow);
	nextInRow.timesToShow--;
	this.resetForShow(nextInRow);
	this.queue.splice(0,1);
}

/**
 * Resets message to be able to be shown again
 */
NewsFeed.prototype.resetForShow = function(shownMessage){
	shownMessage.cameraOffset.x = this.textStartingPoint;
}


/**
 * handles the movement and updating of the texts
 */
NewsFeed.prototype.update = function(){
	if(!this.active) return;
	//TODO: only works from right to left atm
	if(this.shownTexts.length < 2 && this.queue.length > 0){
		if(this.shownTexts.length == 1)
		{
			var shown = this.shownTexts[0];
			if(shown.cameraOffset.x + shown.width < lvlWidth - this.margin)
				this.setNextMessageToBeShown();
			
		}
		else this.setNextMessageToBeShown();
		
	}
	var updateTime = this.game.time.physicsElapsed;
	for(var i = 0; i < this.shownTexts.length; i++){
		var element = this.shownTexts[i];
		element.cameraOffset.x += ((this.textEndingPoint - this.textStartingPoint) * updateTime) / this.textTime;
		if(element.cameraOffset.x + element.width <= this.textEndingPoint){
			this.textGroup.remove(element, false);
			this.shownTexts.splice(i, 1);
			if(element.timesToShow > 0)
				this.queue.push(element);
		}
	}

}

/**
 * Nothing
 */
NewsFeed.prototype.moveTexts = function(element, index, array){
	//TODO: not exactly this.textTime
		
}


