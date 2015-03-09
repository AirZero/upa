

NewsFeed.prototype = Object.create(Phaser.Sprite.prototype);
NewsFeed.prototype.constructor = NewsFeed;

function NewsFeed (phaserGame, sprite, height, layerToAddTo, z, x, y){
	x = x || lvlWidth * 0.5;
	y = y || lvlHeight - height * 0.5;
//	this.phaserGame = phaserGame;
	Phaser.Sprite.call(this, phaserGame, x, y, sprite);
	this.anchor.setTo(0.5,0.5);
	this.textStartingPoint = lvlWidth;
	this.textEndingPoint = 0;
	this.width = lvlWidth;
	this.height = height;
	this.textTime = 8;
	this.fixedToCamera = true;
	this.style = BASE_STYLE;
	if(layerToAddTo)
		layerToAddTo.add(this);
	this.layerToAddTo = layerToAddTo;
	this.maximumShowingTimes = 3;
	this.queue = [];
	this.shownTexts = [];
	this.margin = lvlWidth * 0.25;
	
	this.textGroup = this.game.add.group();
	this.textGroup.z = z;
	
}


NewsFeed.prototype.addText = function(title){
	var text = new FeedText(this.game, this.textStartingPoint, 575 , title, this.style);
	text.anchor.setTo(0, 0.5);
	this.queue.push(text);
	//this.layerToAddTo.add(text);
}


NewsFeed.prototype.destroy = function(){
	this.textGroup.destroy();
	this.queue = [];
	this.shownTexts = [];
	Phaser.Sprite.prototype.destroy.call(this);
}

NewsFeed.prototype.setNextMessageToBeShown = function(){
	var nextInRow = this.queue[0];
	this.textGroup.add(nextInRow);
	this.shownTexts[this.shownTexts.length] = (nextInRow);
	nextInRow.timesShown++;
	this.resetForShow(nextInRow);
	this.queue.splice(0,1);
}

NewsFeed.prototype.resetForShow = function(shownMessage){
	shownMessage.cameraOffset.x = this.textStartingPoint;
}



NewsFeed.prototype.update = function(){
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
			if(element.timesShown < this.maximumShowingTimes)
				this.queue.push(element);
		}
	}

}

NewsFeed.prototype.moveTexts = function(element, index, array){
	//TODO: not exactly this.textTime
		
}


