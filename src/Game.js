
function Game (phaserGame){

	this.phaserGame = phaserGame
	this.stars = 5;
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
	this.addToObjects(this.debugText);
	this.debugText.fixedToCamera = true;
}


const CAMERA_MOVEMENT_SPEED = 5;


Game.prototype.moveCamera = function(x, y){
	this.phaserGame.camera.x += x;
	this.phaserGame.camera.y += y;
	
	//this.debugText.text = pointer.screenX+ " . "+pointer.screenY;
}


Game.prototype.update = function(){
	var pointer = this.phaserGame.input.activePointer;
	if (this.phaserGame.input.mousePointer.isDown)
    {
		//const lvlMiddleX = lvlWidth * 0.5;
		//const lvlMiddleY = lvlHeight * 0.5;
		var x = (pointer.x - 0.5 * lvlWidth) / lvlWidth ;
		x = x*2; //Koska lvlWidthin jälkeen on -0.5 *viiva* 0.5 x:n arvo 
		var y = (pointer.y - 0.5 * lvlHeight) / lvlHeight ;
		y = y *2;
		this.debugText.text = x+ " . "+y;

        this.moveCamera(x * CAMERA_MOVEMENT_SPEED, y * CAMERA_MOVEMENT_SPEED);
    }

}


Game.prototype.setWorld = function(){
	this.phaserGame.world.setBounds(0,0, worldWidth, worldHeight);
	this.background = this.phaserGame.add.sprite(0,0, 'europe');
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
	}
	this.stars++;
	//this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.1, this.createStars, this);
}