

var CAMERA_MOVEMENT_SPEED = 10;

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

	
	//this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.times, this.createLands, this);
	this.createLands(25);

	
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
	if (object.x - object.width * 0.5 < x &&  x < object.x + object.width * 0.5 &&
		object.y - object.height * 0.5 < y && y < object.y + object.height *0.5){
		return true;
	}
	return false;
}


Game.prototype.clickStar = function(){
	var debugText = this.debugText;	
	this.GameLayer.forEach(function(element, index, array){
		var pointer = this.phaserGame.input.activePointer;
		var distance = countIfInside(element, pointer.worldX, pointer.worldY);
		//debugText.text = distance+"was";
		if(distance){
			if(element.scale.x >3)
				return;
			element.scale.x *= 1.2;
			element.scale.y *= 1.2;
		}
	});
}

Game.prototype.handleZoom = function(event){
	this.zoom(this.phaserGame.input.mouse.wheelDelta);

}


Game.prototype.zoom = function(zoomAmount){
	if(this.phaserGame.camera.scale.x < 0.5 && zoomAmount < 1)
		return;
	this.phaserGame.camera.scale.x *= zoomAmount;
	this.phaserGame.camera.scale.y *= zoomAmount;
	this.phaserGame.world.setBounds(0,0, this.phaserGame.world.width * zoomAmount, this.phaserGame.world.height * zoomAmount);
this.debugText.text = "X"+this.phaserGame.world.width +"\nY"+this.phaserGame.world.height;
}


Game.prototype.update = function(){
	
	if(this.phaserGame.input.keyboard.isDown("Z".charCodeAt(0)))
		this.zoom(1.05);
	else if(this.phaserGame.input.keyboard.isDown("X".charCodeAt(0)))
		this.zoom(0.95238);
	this.mouseMover.update();
}

Game.prototype.setWorld = function(){
	this.phaserGame.world.setBounds(0,0, worldWidth, worldHeight);
	this.background = this.phaserGame.add.sprite(0,0, 'europe');
	this.background.width = worldWidth;
	this.background.height = worldHeight;
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


Game.prototype.createLands = function(amount){
	for(var i = 0; i < amount; i++){
		var x = phaserGame.rnd.integerInRange(0, worldWidth);
		var y = phaserGame.rnd.integerInRange(0, worldHeight);
		var nation = new Nation(this.phaserGame,x , y, 'land');
		this.addToObjects(nation);
		nation.sprite.inputEnabled = true;
		this.GameLayer.add(nation.sprite);
	}
	//this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.1, this.createLands, this);
}