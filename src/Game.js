

const CAMERA_MOVEMENT_SPEED = 10;

function Game (phaserGame){

	this.phaserGame = phaserGame
	
	this.stars = 5;
	this.times = 10;
	this.gameObjects = [];
	
	this.events = [];
//this.GUIGroup.bringToTop();

	//this.createGroups();
	this.mouseMover = new MouseMovement(phaserGame, CAMERA_MOVEMENT_SPEED);
}


Game.prototype.preload = function(){
	
}


Game.prototype.createGroups =function(){
	this.BackgroundLayer = this.phaserGame.add.group();
	this.BackgroundLayer.z = 0;
	this.GameLayer = this.phaserGame.add.group();
	this.GameLayer.z = 1;
	this.GUILayer = this.phaserGame.add.group();
	this.GUILayer.z = 2;	
}


Game.prototype.clear = function(){
	if(this.gameObjects.length != 0){
		//for(var i = 0; i < this.gameObjects.length; i++){
		//	this.gameObjects[i].destroy();
		//}
		//this.gameObjects = [];
	}
	this.GUILayer.destroy(true);
	this.BackgroundLayer.destroy(true);
	this.GameLayer.destroy(true);
	
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
	this.createGroups();
	this.phaserGame.input.onDown.add(this.clickStar, this);
	//this.events[this.events.length] = 

	this.setWorld();
	this.stars = 1;
	this.times = 10;

	
	//this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.times, this.createStars, this);
	this.createRepeatEvent(0.25, this.times, this.createStars);

	
	this.createGUI();
}


Game.prototype.createGUI = function(){
	var thisGame = this;
	var textButton = new TextButton(this.phaserGame, 'Menu', 'button', function(){
		thisGame.clear();
		reMenu();
	}, BASE_STYLE, lvlWidth * 0.1, lvlHeight * 0.1);
	textButton.setFixedToCamera(true);
	
	this.addToObjects(textButton);
	
	this.debugText = this.phaserGame.add.text(600, 50, "Debug", BASE_STYLE);
	textButton.addToLayer(this.GUILayer);
	this.GUILayer.add(this.debugText);
	this.addToObjects(this.debugText);
	this.debugText.fixedToCamera = true;
}


function countDistance(x1, y1, x2, y2){
	 return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2-y1, 2));
}


function countIfInside(object, x, y){
	if (object.x < x &&  x < object.x + object.width &&
		object.y < y && y < object.y + object.height)
		return true;
	return false;
}


Game.prototype.clickStar = function(){
	var debugText = this.debugText;	
	this.GameLayer.forEach(function(element, index, array){
		var pointer = this.phaserGame.input.activePointer;
		var distance = countIfInside(element, pointer.worldX, pointer.worldY);
		//debugText.text = distance+"was";
		if(distance){
			element.width *= 1.2;
			element.height *= 1.2;
		}
	});
}



Game.prototype.update = function(){
	
	this.mouseMover.update();
}

Game.prototype.setWorld = function(){
	this.phaserGame.world.setBounds(0,0, worldWidth, worldHeight);
	this.background = this.phaserGame.add.sprite(0,0, 'europe');
	this.BackgroundLayer.add(this.background);
	this.addToObjects(this.background);
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
		var star = phaserGame.add.sprite(phaserGame.rnd.integerInRange(0, worldWidth),phaserGame.rnd.integerInRange(0, worldHeight), 'star');
		this.addToObjects(star);
		star.inputEnabled = true;
		this.GameLayer.add(star);
	}
	this.stars++;
	//this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.1, this.createStars, this);
}