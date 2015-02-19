
/**
 * Game class defines the games functionality and operations needed for the functionality of the game.
 * Needs to be passed the states provided by the Phasers game to operate properly!
 */

//Constant representing the movement speed of the camera
var CAMERA_MOVEMENT_SPEED = 10;

/**
 * Initializes the inner states of the game
 */
function Game (phaserGame){

	this.phaserGame = phaserGame

	this.gameObjects = [];
	
	this.events = [];
//this.GUIGroup.bringToTop();

	//this.createGroups();
	this.mouseMover = new MouseMovement(phaserGame, CAMERA_MOVEMENT_SPEED);
	this.nations = new Nations(this.phaserGame);
}


/**
 * Loads the data needed for the game to function properly
 */
Game.prototype.preload = function(){
	this.nations.preload();
}


/**
 * Initializes the Layers of the game for properly showing components on the screen.
 * Needs to be called everytime the game is started.
 */
Game.prototype.createGroups =function(){
	this.BackgroundLayer = this.phaserGame.add.group();
	
	this.BackgroundLayer.z = 0;
	this.GameLayer = this.phaserGame.add.group();
	this.GameLayer.z = 1;
	this.TextLayer = this.phaserGame.add.group();
	this.TextLayer.z = 2;
	this.GUILayer = this.phaserGame.add.group();
	this.GUILayer.z = 3;	
}

/**
 * Will clear the Phaser game objects in the game.
 * Does not destroy games' loaded data, only screen components.
 */
Game.prototype.clear = function(){
	if(this.gameObjects.length != 0){
		//for(var i = 0; i < this.gameObjects.length; i++){
		//	this.gameObjects[i].destroy();
		//}
		//this.gameObjects = [];
	}
	this.GUILayer.destroy(true);
	this.BackgroundLayer.destroy(true);
	this.TextLayer.destroy(true);
	this.GameLayer.destroy(true);
	
	for(var i = 0; i < this.events.length; i++){
		this.phaserGame.time.events.remove(this.events[i]);
	}
	this.events = [];
	//this.phaserGame.time.events.stop();
	//this.phaserGame.time.events.removeAll();
}


/**
 * Used to add cleareable objects to the correct queue.
 * @DEPRECATED
 */
Game.prototype.addToObjects = function(obj){
	this.gameObjects[this.gameObjects.length] = obj;
}


/**
 * Creates the components drawn to the game and the GUI elements
 */
Game.prototype.start = function(){
	this.createGroups();
	//this.phaserGame.input.onDown.add(this.clickStar, this);
	//this.events[this.events.length] = 

	this.setWorld();

	
	//this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.times, this.createLands, this);
	this.createLands(25);

	
	this.createGUI();
	this.mouseMover.moveCamera(worldWidth * 0.5, worldHeight *0.4);
}


/**
 * Creates all the gui elements needed for the functionality of the game
 */
Game.prototype.createGUI = function(){
	var thisGame = this;
	var textButton = new TextButton(this.phaserGame, 'Menu', 'button', function(){
		thisGame.clear();
		reMenu();
	}, BASE_STYLE, lvlWidth * 0.1, lvlHeight * 0.1);
	textButton.setFixedToCamera(true);
	
	this.addToObjects(textButton);
	
	this.debugText = this.phaserGame.add.text(600, 50,
	debugOn ? "Debug" : "Build", BASE_STYLE);
	textButton.addToLayer(this.GUILayer);
	this.GUILayer.add(this.debugText);
	this.addToObjects(this.debugText);
	this.debugText.fixedToCamera = true;
}


/**
 * Can be used to count the distance between two points in the game
 */
function countDistance(x1, y1, x2, y2){
	 return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2-y1, 2));
}

/**
 * Calculates if the given coordinates are inside the objects size.
 * Presumes the object is anchored to center.
 * TODO: Solution that works with any anchor setting.
 */
function countIfInside(object, x, y){
	if (object.x - object.width * 0.5 < x &&  x < object.x + object.width * 0.5 &&
		object.y - object.height * 0.5 < y && y < object.y + object.height *0.5){
		return true;
	}
	return false;
}



/**
 * Used for clicking components on the field.
 * @DEPRECATED
 */
Game.prototype.clickStar = function(){

	this.GameLayer.forEach(function(element, index, array){
		var pointer = this.phaserGame.input.activePointer;
		var distance = countIfInside(element, pointer.worldX, pointer.worldY);
		//debugText.text = distance+"was";
		if(distance){
			//this.onNationClick(element);
		}
	});
}


/**
 *  Handler function for handling  the zooming using buttons
 */
Game.prototype.handleZoom = function(event){
	this.zoom(this.phaserGame.input.mouse.wheelDelta);

}


/**
 * Zooms the game objects using the Phasers Cameras scale.
 * Also will change the worlds bounds to keep the gamefield in the same size compared to the zoom amount.
 */
Game.prototype.zoom = function(zoomAmount){
	if(this.phaserGame.camera.scale.x < 0.5 && zoomAmount < 1)
		return;
	this.phaserGame.camera.scale.x *= zoomAmount;
	this.phaserGame.camera.scale.y *= zoomAmount;
	this.phaserGame.world.setBounds(0,0, this.phaserGame.world.width * zoomAmount, this.phaserGame.world.height * zoomAmount);
	if(debugOn)
		this.debugText.text = "X"+this.phaserGame.world.width +"\nY"+this.phaserGame.world.height;
}


/**
 * Updates the games state.
 * For example input and movement on screen will be handled here and the updating of the game state(new events).
 */
Game.prototype.update = function(){
	
	if(this.phaserGame.input.keyboard.isDown("Z".charCodeAt(0)))
		this.zoom(1.05);
	else if(this.phaserGame.input.keyboard.isDown("X".charCodeAt(0)))
		this.zoom(0.95238);
	this.mouseMover.update();
}


/**
 * Sets the worlds size according to the worldWidth and worldHeight and creates background for the game
 */
Game.prototype.setWorld = function(){
	this.phaserGame.world.setBounds(0,0, worldWidth, worldHeight);
	//this.background = this.phaserGame.add.sprite(0,0, 'europe');
	//this.background.width = worldWidth;
	//this.background.height = worldHeight;
	//this.BackgroundLayer.add(this.background);
	//this.addToObjects(this.background);
	this.phaserGame.stage.backgroundColor = '#87CED0';
}



/**
 * Clears the game and returns back to the starting screen of the menu
 */
Game.prototype.returnToMenu = function(){
	this.clear();
	reMenu();

}


/**
 * A slightly easier approach for adding timed event for the game.
 * Uses the phasers events to do this.
 * @param seconds time until the event to tick
 * @param method the function called after the time.
 */
Game.prototype.createTimedEvent = function(seconds, method){
	var timedEvent = this.phaserGame.time.events.add(Phaser.Timer.SECOND * seconds, method, this);
	this.events[this.events.length] = timedEvent;
}

/**
 * A slightly easier approach for adding repeated events for the game.
 * Uses the phasers events to do this.
 * @param seconds time until the event to tick
 * @param times amount of calls for event
 * @param method the function called after the time.
 */
Game.prototype.createRepeatEvent = function(seconds, times, method){
	var timedEvent = this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * seconds, times, method, this);
	this.events[this.events.length] = timedEvent;
}


/**
 * Creates the nations on to the game
 */
Game.prototype.createLands = function(amount){
	this.nations.createNations(this.GameLayer, this.TextLayer);
	
	
	//this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.1, this.createLands, this);
}