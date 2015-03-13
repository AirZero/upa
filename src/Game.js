
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

	this.events = [];
//this.GUIGroup.bringToTop();
	this.selectedNation = null;
	this.selectedTint = 0x029999;
	//this.unselectedTint = 0xFFFFFF;
	this.maximumSelectedNations = 5;
	this._selectedNations = 0;
	this.selectedNationListener = null;
	
	//this.selectedNations = 0;
	//this.createGroups();
	//TODO: component type of adding of children would be efficient in the long run with loads of components and scripts.. something like components.add(new MouseMovement) and then the all basic functions are evoked if they exist. Easier for code, more stressful for the engine
	this.mouseMover = new MouseMovement(phaserGame, CAMERA_MOVEMENT_SPEED);
	this.nations = new Nations(this.phaserGame);
	var theGame = this;
	this.nations.addOnNationClickHandler(new EventHandler(this.onNationClick, this));
	this.gameProgress = new GameProgress(this.phaserGame);
	this.gameEventHandler = new GameEventHandler(this.phaserGame);
	this.refugeeProblemHandler = new RefugeeProblemHandler(this.phaserGame);
	this.refugees = new Refugees();
	this.nextZ = 0;
	
	this.moveOnMap = true;
	
}



Object.defineProperty(Game.prototype, 'selectedNations',{
	get: function(){
		return this._selectedNations;
	},	
	set: function(value){
		this._selectedNations = value;
		if(this.selectedNationListener)
			this.selectedNationListener.process();
	}
});



/**
 * Loads the data needed for the game to function properly
 */
Game.prototype.preload = function(){
	this.nations.preload();
	this.refugees.preload();
	this.gameEventHandler.preload();
}


/**
 * Initializes the Layers of the game for properly showing components on the screen.
 * Needs to be called everytime the game is started.
 */
Game.prototype.createGroups =function(){
	this.BackgroundLayer = this.phaserGame.add.group();
	
	//TODO: maybe an array for Layers would be more useable
	this.BackgroundLayer.z = this.getNextAvailableZ();
	this.GameLayer = this.phaserGame.add.group();
	this.GameLayer.z = this.getNextAvailableZ();
	this.particleLayerZs = []; 
	for(var i = 0; i < this.maximumSelectedNations; i++){
		this.particleLayerZs[this.particleLayerZs.length] = this.getNextAvailableZ();
	}
	this.BarLayer = this.phaserGame.add.group();
	this.BarLayer.z = this.getNextAvailableZ();
	this.TextLayer = this.phaserGame.add.group();
	this.TextLayer.z = this.getNextAvailableZ();
	this.GUILayer = this.phaserGame.add.group();
	this.GUILayer.z = this.getNextAvailableZ();	
	this.UpperGUILayer = this.phaserGame.add.group();
	this.UpperGUILayer.z = this.getNextAvailableZ();
}


Game.prototype.getNextAvailableZ = function(){
	return this.nextZ++;
}


Game.prototype.reMenu = function(){
	this.clear();
	reMenu();
}


/**
 * Will clear the Phaser game objects in the game.
 * Does not destroy games' loaded data, only screen components.
 */
Game.prototype.clear = function(){
	this.GUILayer.destroy(true);
	this.UpperGUILayer.destroy(true);
	this.BackgroundLayer.destroy(true);
	this.TextLayer.destroy(true);
	this.GameLayer.destroy(true);
	this.gameProgress.clear();
	this.refugeeProblemHandler.clear();
	this.refugees.clear();
	this.gameEventHandler.clear();
	this.humanParticleSystem.clear();
	this.progressList.clear();
	this.selectedNationListener = null;
	
	for(var i = 0; i < this.events.length; i++){
		this.phaserGame.time.events.remove(this.events[i]);
	}
	this.events = [];
	//this.phaserGame.time.events.stop();
	//this.phaserGame.time.events.removeAll();
	this.selectNations = 0;
}



/**
 * Creates the components drawn to the game and the GUI elements
 */
Game.prototype.start = function(){
	this.createGroups();
	//this.phaserGame.input.onDown.add(this.clickStar, this);
	//this.events[this.events.length] = 
	this.moveOnMap = playerPrefs.getNumber("moveMap") === 1 ? true :false;
	
	this.setWorld();

	this.resetDate();
	
	//this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.times, this.createLands, this);
	this.createLands(25);

	
	this.createGUI();
	this.initializeParticleSystem();
	this.addEvents();
	this.updateRefugeeAmount();
	this.mouseMover.moveCamera(worldWidth * 0.4, worldHeight *0.27);
}


Game.prototype.resetDate = function(){
	this.gameProgress.resetDate(); //More event based stuff would make less remembering to the start and clears
}


/**
 * Creates all the gui elements needed for the functionality of the game
 */
Game.prototype.createGUI = function(){
	//Here could have been a simple interface kind of solution for these
	var thisGame = this;
	var textButton = new TextButton(this.phaserGame, 'Menu', 'button', this.reMenu, BASE_STYLE, lvlWidth * 0.1, lvlHeight * 0.1, this);
	textButton.setFixedToCamera(true);
	
	//this.addToObjects(textButton);
	
	var feedHeight = lvlHeight * 0.1
	
	var infoLabel = this.phaserGame.add.sprite(0, lvlHeight - feedHeight, 'infoLabel');
	infoLabel.anchor.setTo(0,1);
	infoLabel.fixedToCamera = true;
	this.GUILayer.add(infoLabel);
	
	this.refugeeText = this.phaserGame.add.text(infoLabel.x +20, infoLabel.y - infoLabel.height *0.3, "", NATION_TEXT_STYLE);
	this.updateRefugeeAmount();
	this.refugeeText.fixedToCamera = true;
	this.GUILayer.add(this.refugeeText);
	
	this.newsFeed = new NewsFeed(this.phaserGame, 'textFeed', feedHeight, this.GUILayer, this.getNextAvailableZ());
	
	this.progressList = new SpriteList(this.phaserGame, infoLabel.x+20, infoLabel.x + infoLabel.width *0.5, infoLabel.y - infoLabel.height * 0.6, infoLabel.y - infoLabel.height * 0.6, 5, 'progress', this.GUILayer, true);
	this.selectedNationListener = new EventHandler(this.updateProgressList, this);
	
	
	this.debugText = this.phaserGame.add.text(600, 50, debugOn ? "Debug" : "Build", BASE_STYLE);
	this.debugText.fixedToCamera = true;
	
	
	
	this.dateText = this.phaserGame.add.text(lvlWidth * 0.5, lvlHeight * 0.1, "Date:"+this.gameProgress.getDateString(), BASE_STYLE);
	this.dateText.anchor.setTo(0.5, 0.5);
	

	this.dateText.fixedToCamera = true;
	
	textButton.addToLayer(this.GUILayer);
	this.GUILayer.add(this.debugText);
	this.GUILayer.add(this.dateText);
}


Game.prototype.updateProgressList = function(){
	this.progressList.changeObjectAmount(this.maximumSelectedNations - this.selectedNations);
}


Game.prototype.initializeParticleSystem = function(){
	this.humanParticleSystem = new HumanParticleSystemController(this.phaserGame, this.maximumSelectedNations, 'hunam', 50, 500, this.particleLayerZs);
	this.humanParticleSystem.setOrigin(1000,1000); //TODO: Syrians location here
	
}

Game.prototype.addEvents = function(){
	this.gameProgress.addOnTimeChangedEvent(this.gameEventHandler.checkForEventsOnTimeChange, this.gameEventHandler);
	this.gameProgress.addOnTimeChangedEvent(this.dayChangedForRefugeeProblemHandler, this);
	this.refugeeProblemHandler.addProblemHandler(this.handleNewProblem, this);
	
	this.gameProgress.addOnTimeChangedEvent(this.refreshDateText, this);
	this.gameEventHandler.addOnEventProcessingHandler(this.processGameEvent, this);
	this.refugees.addOnRefugeeAmountChange(this.updateRefugeeAmount, this);
}

Game.prototype.handleNewProblem = function(args){
	var problem = args[0];
	
	this.newsFeed.addText(problem.name + " has occurred with death toll of "+problem.deathToll, 1);
	this.refugees.kill(problem.deathToll);
}


Game.prototype.dayChangedForRefugeeProblemHandler = function(){
	//This helps to give the amount of refugees + future needed parameters.
	//No anon function because this is neater
	this.refugeeProblemHandler.dayChanged(this.refugees.getTotalRefugees());
}

Game.prototype.updateRefugeeAmount = function(){
	this.refugeeText.text = "Refugees left: "+this.refugees.getTotalRefugees();
}


Game.prototype.processGameEvent = function(args){
	var event = args[0];
	for(effect in event.effects){
		this.completeEffect(event.effects[effect]);
	}
}

Game.prototype.completeEffect = function(effect){
	//TODO: this would really benefit from some kind of real language etc.
	switch(effect.effectName){
		case "addRefugees":
			this.refugees.changeTotalRefugees(effect.data);
			break;
		case "addMaxRefugees":
			this.increaseMaxRefugeeAmounts(effect.data);
			break;
		case "endGame":
			this.endGame();
			break;
		case "story":
			this.addDialog(effect.data);
			break;
		case "feed":
			this.addFeedData(effect.data);
			break;
		default:
			break;
	}
}


Game.prototype.endGame = function(){
	this.createTimedEvent(2, this.reMenu);
}


Game.prototype.increaseMaxRefugeeAmounts = function(data){
	if(isNaN(data)){
		if(data === "relative"){
			var refugeeData = this.refugees.getAllRefugeesOfMonth(this.gameProgress.getMonth(), this.gameProgress.getYear());
			this.nations.increaseMaxRefugeeAmountsByData(refugeeData);
		}
	}
	else this.nations.increaseMaxRefugeeAmounts(data);
}


/**
 * Writes the given text into the newsfeed of the game
 * @param text string to be written to the newsFeed
 */
Game.prototype.addFeedData = function(text){
	this.newsFeed.addText(text);
}


Game.prototype.silenceGame = function(silencer){
	silencer.silence(this.gameProgress);
	silencer.silence(this.newsFeed);
	silencer.silence(this.nations);
	silencer.silence(this.humanParticleSystem);
}


/**
 * Adds a dialog to the game with given text and yes/no functions and texts
 */
Game.prototype.addDialog = function(text, method, buttonText){
	//Initialize if not given
	method = method || function(){};
	buttonText = buttonText || "Ok";
	
	var dialog = new Dialog(this.phaserGame, text, [method], [buttonText]);
//	dialog.setTexts(null, yesText, noText);
	dialog.addToLayer(this.UpperGUILayer);
	this.silenceGame(dialog);
	//dialog.silence(this.gameProgress);
	//dialog.silence(this.newsFeed);
	//dialog.silence(this.nations);
}

/**
 * Is used to innerly refresh date text whenever date changes
 */
Game.prototype.refreshDateText = function(){
	this.dateText.text = "Date:"+this.gameProgress.getDateString();
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
 * Resets selected nation and starts the housing process with startHousing
 */
Game.prototype.nationSelectedForMoving = function(nation){
	this.selectNation(null);
	
	this.startHousing(nation);
}


/**
 * Start the housing process for given nation
 */
Game.prototype.startHousing = function(nation){
	if(nation.getInProcess() || this.selectedNations >= this.maximumSelectedNations)
		return;
	//TODO: make pretty
	nation.setInProcess(true);
	this.selectedNations++;
	var amount = this.getRefugeeAmount(nation);
	var processLength = 4;
	
	//So that the function can be handled properly, if theres no function(), then the tryHousing is called directly
	//var nationsReference = this;
	//var bar = new ProgressBar(nation.x, nation.y-lvlHeight*0.05, 'bar', this.phaserGame, processLength, 20, function(){nationsReference.finishHousing(nation, amount);}, this.BarLayer);
	this.humanParticleSystem.send(1500, 1000, nation.x, nation.y, amount * 0.02, processLength, new EventHandler(function(){
		this.finishHousing(nation, amount);
	}, this)); //Because no divisions when avoidable!
	
}

/**
 * Calculates the refugee amount for the given nation based on the current month and year
 */
Game.prototype.getRefugeeAmount = function(nation){

	var month = this.gameProgress.getMonth();
	var year = this.gameProgress.getYear();
	
	var amount = this.refugees.getRefugees(nation.name, month, year);
	amount = 2000;
	//TODO:Loading from a file
	return amount;
}


/**
 * Stops the housing process for the given nation, houses the given amount into the nation
 */
Game.prototype.finishHousing = function(nation, amount){
	this.selectedNations--;
	nation.setInProcess(false);
	var space = nation.tryHousing(amount);
	//amount +space because space is negative if not enough space
	amount = space > 0 ? amount : amount + space;
	this.refugees.reduceTotalRefugees(amount);
	if(this.refugees.getTotalRefugees() < 0){
		this.debugText.text = "You won the game!";
	}
}


/**
 * Handles the inner process of nation clicking 
 */
Game.prototype.onNationClick = function(args){
	var nation = args[0];
	var pointer = this.phaserGame.input.activePointer;
	
	//Doubleclick made optional
	//TODO: if this is all needed to set double click on/off without drag
	if(playerPrefs.getNumber("doubleClickOn") >0){
		if (pointer.msSinceLastClick < TIME_FOR_DOUBLECLICK * 1000 && this.selectedNation === nation){
			this.nationSelectedForMoving(this.selectedNation);	
		}
		else this.selectNation(nation);
	}
	else{
		this.nationSelectedForMoving(nation);
	}
}


/**
 * Sets the given nation selected and resets any nations that were selected prior to it
 */
Game.prototype.selectNation = function(nation){
	if(this.selectedNation){
		this.selectedNation.tintNormal();
	}
	if(nation !== null)
		nation.tintNormal();
 
	this.selectedNation = nation;	
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
	//TODO:Playtest on or off
	if(this.moveOnMap)
		this.mouseMover.update();
	this.gameProgress.update();
	//Not sure if needs invoking but when added through group is not automatically called?
	this.newsFeed.update();
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