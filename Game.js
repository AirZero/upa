
function Game (phaserGame){

	this.phaserGame = phaserGame
	this.stars = 1;
	this.times = 10;
	this.gameObjects = [];
	this.events = [];
}


Game.prototype.preload = function(){
	
}

Game.prototype.clear = function(){
	if(this.gameObjects.length != 0){
		for(var i = 0; i < this.gameObjects.length; i++){
			this.gameObjects[i].destroy();
		}
		this.gameObjects = [];
	}
	for(var i = 0; i < this.events.length; i++){
		this.phaserGame.time.events.remove(this.events[i]);
	}
	this.events = [];
	//this.phaserGame.time.events.stop();
	//this.phaserGame.time.events.removeAll();
}

Game.prototype.addToObjects = function(obj){
	this.gameObjects[this.gameObjects.length] = obj;
}


Game.prototype.start = function(){
	this.stars = 1;
	this.times = 10;
	//this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.times, this.createStars, this);
	this.createRepeatEvent(0.25, this.times, this.createStars);
	var thisGame = this;
	var textButton = new TextButton(this.phaserGame, 'Menu', 'button', function(){
		thisGame.clear();
		reMenu();
	}, BASE_STYLE, lvlWidth * 0.1, lvlHeight * 0.1);
	this.addToObjects(textButton);
}


Game.prototype.returnToMenu = function(){
	this.clear();
	reMenu();

}

Game.prototype.createTimedEvent = function(seconds, method){
	var timedEvent = this.phaserGame.time.events.add(Phaser.Timer.SECOND * seconds, method, this);
	this.events[this.events.length] = timedEvent;
}

Game.prototype.createRepeatEvent = function(seconds, times, method){
	var timedEvent = this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * seconds, times, method, this);
	this.events[this.events.length] = timedEvent;
}


Game.prototype.createStars = function(){
	for(var i = 0; i < this.stars; i++){
		var star = phaserGame.add.sprite(phaserGame.rnd.integerInRange(0, 800),phaserGame.rnd.integerInRange(0, 600), 'star');
		this.addToObjects(star);
	}
	this.stars++;

	//this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.1, this.createStars, this);
}