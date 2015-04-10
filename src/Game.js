
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
	
	//TODO: how bad is it that these are here?
	this.europeanRefugees = 0;
	this.maxEuropeanRefugees = 0;
	
	//this.selectedNations = 0;
	//this.createGroups();
	//TODO: component type of adding of children would be efficient in the long run with loads of components and scripts.. something like components.add(new MouseMovement) and then the all basic functions are evoked if they exist. Easier for code, more stressful for the engine
	this.mouseMover = new MouseMovement(phaserGame, CAMERA_MOVEMENT_SPEED);
	this.nations = new Nations(this.phaserGame);
	this.nations.addOnNationClickHandler(new EventHandler(this.onNationClick, this));
	this.gameProgress = new GameProgress(this.phaserGame);
	this.gameEventHandler = new GameEventHandler(this.phaserGame);
	this.refugeeProblemHandler = new RefugeeProblemHandler(this.phaserGame);
	this.refugees = new Refugees(this.phaserGame);
	this.nextZ = 0;
	
	this.tutorialEvents = [];
	
	this.disableSounds = playerPrefs.getNumber("disableSounds") === 1;
	
	this.moveOnMap = true;
	
}


/**
 * Defines property selectedNations and on set calls the selectedNationListener if one exists
 * //TODO: array of listeners
 */
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
	//Because particle system is just hellbent on not going background if not done here
	this.initializeParticleSystem();
	this.BarLayer = this.phaserGame.add.group();
	this.BarLayer.z = this.getNextAvailableZ();
	this.TextLayer = this.phaserGame.add.group();
	this.TextLayer.z = this.getNextAvailableZ();
	this.GUILayer = this.phaserGame.add.group();
	this.GUILayer.z = this.getNextAvailableZ();
	this.UpperGUILayer = this.phaserGame.add.group();
	this.UpperGUILayer.z = this.getNextAvailableZ();
	this.TutorialLayer = this.phaserGame.add.group();
	this.TutorialLayer.z = this.getNextAvailableZ();
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
	this.gameStateBar.clear();
	this.gameEventHandler.clear();
	this.humanParticleSystem.clear();
	this.progressList.clear();
	this.selectedNationListener = null;
	this.music.stop();
	this.music.destroy();
	this.fullSound.destroy();
	this.processLength = 4;
	
	for(var i = 0; i < this.events.length; i++){
		this.phaserGame.time.events.remove(this.events[i]);
	}
	this.events = [];
	//this.phaserGame.time.events.stop();
	//this.phaserGame.time.events.removeAll();
	this._selectedNations = 0;
	this.europeanRefugees = 0;
	this.maxEuropeanRefugees = 0;
}



/**
 * Creates the components drawn to the game and the GUI elements
 */
Game.prototype.start = function(){
	this.createGroups();
	this.refugees.start();
	this.processLength = 4;

	this.initializeSounds();
	
	//this.phaserGame.input.onDown.add(this.clickStar, this);
	//this.events[this.events.length] = 
	this.moveOnMap = playerPrefs.getNumber("moveMap") === 1 ? true :false;
	
	this.setWorld();

	this.resetDate();
	
	//this.phaserGame.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.times, this.createLands, this);
	this.createLands();
//	this.initializeRefugeeSpriteListController();
	
	this.initializeGameStateBar();

	var data = this.refugees.getAllPassedData(this.gameProgress.getMonth(), this.gameProgress.getYear());
	this.increaseMaxRefugeeAmountsInNations(data);
	
	this.createGUI();

	
	//this.initializeParticleSystem();
	this.addEvents();
	this.updateRefugeeAmount();
	this.mouseMover.moveCamera(worldWidth * 0.45, worldHeight *0.33);

	//Lets tint all of the nations with the current colors before starting
	this.nations.increaseMaxRefugeeAmountsByData(0);
	this.defineSyria();
	this.waitForPlayer();
}


Game.prototype.initializeGameStateBar = function(){
	this.gameStateBar = new GameStateBar(this.phaserGame, 'bar', 'ball', lvlWidth * 0.5, lvlHeight * 0.8, lvlWidth, lvlHeight * 0.07);
	this.gameStateBar.addToLayer(this.UpperGUILayer);
}

Game.prototype.initializeSounds = function(){
	this.fullSound = new Phaser.Sound(this.phaserGame, 'error', 0.7);
	this.music = new Phaser.Sound(this.phaserGame, 'music');
}


Game.prototype.defineSyria = function(){
	var nation = this.nations.getNationByName("Syyria");
	nation.setActive(false);
	nation.tint = 0x990000;
	this.humanParticleSystem.setOrigin(nation.x,nation.y);
}


Game.prototype.waitForPlayer = function(){
	this.shadeButton = new TextButton(this.phaserGame, 'Aloita peli klikkaamalla ruutua', 'shade', 
	this.tweenToCenter, BASE_STYLE, lvlWidth*0.5, lvlHeight*0.3, this, 0, 0, 0, 0);
	
	this.createTutorial();
	
	//var syria = this.nations.getNationByName("Syyria");
	//syria.tint = 0x990000;
	//syria.setActive(false);
	
	this.shadeButton.setFixedToCamera(true);
	this.shadeButton.setWidth(lvlWidth);
	this.shadeButton.setHeight(lvlHeight);
	this.shadeButton.addToLayer(this.UpperGUILayer);
	this.silenceGame(this.shadeButton);

	this.newsFeed.setActive(true);
	
	this.newsFeed.addText("Voit aloittaa pelin klikkaamalla karttaa", 999);
	this.newsFeed.addText("Maita klikkaamalla pakolaisia siirtyy kyseiseen maahan", 999);
	
	
}


Game.prototype.createTutorial = function(){


	var info = this.createTutorialElement('info', lvlWidth * 0.75,lvlHeight * 0.70, 0);
	var text = this.createTutorialText("Täältä näet pakolaisten määrän", info.x, info.y -50);
	var arr = this.createTutorialElement('arrow', info.x, info.y + info.height, 90);
	
	var fullInfo = this.createTutorialText("Kokonäytön tila", lvlWidth* 0.24, lvlHeight * 0.25);
	var musicInfo = this.createTutorialText("Äänet päälle ja pois", lvlWidth *0.25, lvlHeight * 0.4);
	
	
	var timedEvent = this.phaserGame.time.events.add(Phaser.Timer.SECOND * 5, this.addPlaneTutorial, this);
	this.tutorialEvents[this.tutorialEvents.length] = timedEvent;
	
	var timedEvent2 = this.phaserGame.time.events.add(Phaser.Timer.SECOND * 9, function(){
		this.addStateTutorial();
		info.destroy();
		text.destroy();
		arr.destroy();
	}, this);
	this.tutorialEvents[this.tutorialEvents.length] = timedEvent2;
	
}


Game.prototype.addStateTutorial = function(){
	var text = this.createTutorialText("Pyri pitämään tämä palkki vihreänä", lvlWidth * 0.6, lvlHeight * 0.7);
	var arrow = this.createTutorialElement('arrow', text.x, text.y+30, 90);
	
	this.newsFeed.clearQueue();
	this.newsFeed.addText("Syyriassa on alkanut vuosikymmenen pahin sisällissota.", 100);
	this.newsFeed.addText("Kansainvälinen yhteisö on voimaton ja inhimillinen kärsimys lisääntyy.", 100);
	this.newsFeed.addText("Ihmiset joutuvat jättämään kotinsa.",100);
	this.newsFeed.addText("Sinulle on annettu tehtäväksi auttaa pakolaisia löytämään oleskelupaikka Euroopasta.",100);
	this.newsFeed.addText("Toiset maat ovat vastaanottavaisempia kuin toiset.", 100);
}


Game.prototype.addPlaneTutorial = function(){
	var text =this.createTutorialText("Näin monta sijoitusta \nvoi tapahtua kerrallaan", lvlWidth * 0.2, lvlHeight * 0.7);
	this.createTutorialElement('arrow', text.x+50, text.y+ 45, 45);
}

Game.prototype.createTutorialText = function(text, x, y){
	var text = new Phaser.Text(this.phaserGame, x, y, text, SMALL_STYLE);
	text.fixedToCamera = true;
	text.anchor.setTo(0.5,0.5);
	this.TutorialLayer.add(text);
	return text;
}


Game.prototype.createTutorialElement = function(sprite, x,y, angle){
	var sprite = new Phaser.Sprite(this.phaserGame, x, y , sprite);
	sprite.angle = angle;
	sprite.anchor.setTo(0.5,0.5);
	sprite.fixedToCamera = true;
	this.TutorialLayer.add(sprite);
	return sprite;
}


Game.prototype.tweenToCenter = function(){
	this.shadeButton.setActive(false);
	for(var i = 0; i < this.tutorialEvents.length; i++){
		this.phaserGame.time.events.remove(this.tutorialEvents[i]);
	}
	this.tutorialEvents = [];
	this.TutorialLayer.destroy();
	var tween = this.phaserGame.add.tween(this.phaserGame.camera).to({ x: worldWidth * 0.38, y: worldHeight *0.28});
	tween.onComplete.addOnce(this.destroyShade, this);
	tween.start();
	if(!this.disableSounds)
		this.music.play();
	//this.mouseMover.moveCameraTo(worldWidth * 0.38, worldHeight *0.27);
}


Game.prototype.destroyShade = function(){
	this.shadeButton.destroy();
	
	this.newsFeed.clearQueue();
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
	textButton.addToLayer(this.UpperGUILayer);
	//this.addToObjects(textButton);
	
	//TODO: button factory
	var buttonX = textButton.button.x - textButton.button.width * 0.25;
	var fullScreenButtonHeight = textButton.button.height * 0.5;
	var fullScreenButton = new Phaser.Button(this.phaserGame, buttonX, textButton.button.y + textButton.button.height * 0.5 + fullScreenButtonHeight,
	'fullscreenButton', this.goFullScreen, this, 1, 0, 2, 3);
	fullScreenButton.fixedToCamera =(true);
	fullScreenButton.anchor.setTo(0.5, 0.5);
	fullScreenButton.width =(textButton.button.width * 0.5);
	fullScreenButton.height =(fullScreenButtonHeight);
	this.UpperGUILayer.add(fullScreenButton);
	//fullScreenButton.addToLayer(this.UpperGUILayer);
	
	var musicButton = new Phaser.Button(
		this.phaserGame, buttonX, fullScreenButton.y + fullScreenButtonHeight *1.5,'fullscreenButton',
		this.handleMusicSwitch, this, 1,0,2,3
	);
	musicButton.fixedToCamera = true;
	musicButton.anchor.setTo(0.5, 0.5);
	musicButton.width = fullScreenButton.width;
	musicButton.height = fullScreenButtonHeight; //Same size
	this.UpperGUILayer.add(musicButton);
	
	
	var feedHeight = lvlHeight * 0.07;
	
	
	
	var infoLabel = this.phaserGame.add.sprite(0, lvlHeight - feedHeight, 'infoLabel');
	infoLabel.anchor.setTo(0,1);
	infoLabel.width = lvlWidth;
	infoLabel.fixedToCamera = true;
	this.GUILayer.add(infoLabel);
	
	var logo = new Phaser.Sprite(this.phaserGame, 0, infoLabel.y, 'logo');
	logo.anchor.setTo(0,1);
	logo.height = infoLabel.height * 0.95; //0.95 to make it fit inside
	logo.width = lvlWidth * 0.2;
	logo.fixedToCamera = true;
	this.GUILayer.add(logo);
	//this.refugeeText = this.phaserGame.add.text(infoLabel.x +20, infoLabel.y - infoLabel.height *0.3, "", NATION_TEXT_STYLE);
	//this.refugeeText.fixedToCamera = true;
	//this.GUILayer.add(this.refugeeText);
	
	//this.updateRefugeeAmount();
	
	this.newsFeed = new NewsFeed(this.phaserGame, 'textFeed', feedHeight, this.GUILayer, this.getNextAvailableZ());
	
	var progressListX = logo.x + logo.width + 30;
	var progressListEndX = progressListX + infoLabel.width *0.25;
	var progressListY = infoLabel.y - infoLabel.height * 0.6;
	
	//TODO: can be count without 50 and 20?

	
	this.progressList = new SpriteList(this.phaserGame, progressListX,progressListEndX , progressListY, progressListY, 5, 'progress', this.GUILayer, true);
	this.selectedNationListener = new EventHandler(this.updateProgressList, this);
	
	
	this.initializeRefugeeSpriteListController(
	infoLabel.x + infoLabel.width * 0.65, infoLabel.y - infoLabel.height * 0.95 //Start in relatio the infolabels location
	, lvlWidth, infoLabel.y - infoLabel.height * 0.1); //and end so too, the bar will end at screens right border
	//this.debugText = this.phaserGame.add.text(600, 50, debugOn ? "Debug" : "Build", BASE_STYLE);
	//this.debugText.fixedToCamera = true;
	
	
	
	this.dateText = this.phaserGame.add.text(lvlWidth * 0.5, lvlHeight * 0.1, "Pvm:"+this.gameProgress.getDateString(), BASE_STYLE);
	this.dateText.anchor.setTo(0.5, 0.5);
	

	this.dateText.fixedToCamera = true;
	
	
	//this.GUILayer.add(this.debugText);
	this.GUILayer.add(this.dateText);
}


Game.prototype.increaseMaxRefugeeAmounts


Game.prototype.handleMusicSwitch = function(){
	var soundsOff =  playerPrefs.getNumber("disableSounds") === 1;
	soundsOff = !soundsOff;//Reverse the state
	playerPrefs.set("disableSounds", soundsOff ? 1 : 0); 
	if(soundsOff)
		this.music.stop();
	else
		this.music.play('', 0, 1, true, true);
	//this.music.isPlaying = !soundsOff;
	this.disableSounds = soundsOff;
}


Game.prototype.initializeRefugeeSpriteListController = function(x, y, endX, endY){
	this.refugeeSpriteListController = new RefugeeSpriteListController(this.phaserGame,
	[
		{ //TODO: width and height could be done better
			"ratio": 1,
			"layer": this.UpperGUILayer,
			"represents": 1000,
			"width": 15,
			"height": 15,
			"maxSprites": 32
		},
		{
			"ratio": 2,
			"layer": this.UpperGUILayer,
			"represents": 32000,
			"width": 50,
			"height": 30,
			"maxSprites": 10
		}
	], x, endX, y, endY);
	
}


/**
 * Changes the game into fullscreen mode
 */
Game.prototype.goFullScreen = function(){
	this.phaserGame.scale.startFullScreen();
}


/**
 * Keeps the progress list up to date
 */
Game.prototype.updateProgressList = function(){
	this.progressList.changeObjectAmount(this.maximumSelectedNations - this.selectedNations);
}

/**
 * Initializes the particle system controller and sets the origin
 */
Game.prototype.initializeParticleSystem = function(){
	this.humanParticleSystem = new HumanParticleSystemController(this.phaserGame, this.maximumSelectedNations, 'hunam', 50, 500, this.particleLayerZs);
	//var nation = this.nations.getNationByName("Syyria");
	//this.humanParticleSystem.setOrigin(nation.x,nation.y);

	//this.humanParticleSystem.setOrigin(1500,1500);
}

Game.prototype.addEvents = function(){
	this.gameProgress.addOnTimeChangedEvent(this.gameEventHandler.checkForEventsOnTimeChange, this.gameEventHandler);
	this.gameProgress.addOnTimeChangedEvent(this.dayChangedForRefugeeProblemHandler, this);
	this.refugeeProblemHandler.addProblemHandler(this.handleNewProblem, this);
	
	this.gameProgress.addOnTimeChangedEvent(this.refreshDateText, this);
	this.gameEventHandler.addOnEventProcessingHandler(this.processGameEvent, this);
	this.refugees.addOnRefugeeAmountChange(this.updateRefugeeAmount, this);
	
	this.gameStateBar.addOnTooLowHandler(new EventHandler(this.loseGame, this));
}

Game.prototype.handleNewProblem = function(args){
	var problem = args[0];
	//TODO: probably will be left out
	this.newsFeed.addText(problem.name + " aiheutti kuoleman "+problem.deathToll +" pakolaiselle", 1);
	this.refugees.kill(problem.deathToll);
}


Game.prototype.dayChangedForRefugeeProblemHandler = function(){
	//This helps to give the amount of refugees + future needed parameters.
	//No anon function because this is neater
	this.refugeeProblemHandler.dayChanged(this.refugees.getTotalRefugees());
}

Game.prototype.updateRefugeeAmount = function(){
	//this.refugeeText.text = "Refugees left: "+this.refugees.getTotalRefugees();
	var totalRefugees = this.refugees.getTotalRefugees();
	//var percents = this.nations.getPercents();
	//this.gameStateBar.refugeeAmountChanged(percents);
	this.refugeeSpriteListController.refugeeAmountChanged(totalRefugees);
	if(totalRefugees <= 0){
		this.winGame();
	}
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
		case "setLosingTime":
		//TODO: needs checking?
			this.setLosingTime(parseFloat(effect.data));
			break;
		case "setProcessTime":
			this.setProcessTime(parseFloat(effect.data));
			break;
		default:
			break;
	}
}


Game.prototype.setProcessTime = function(time){
	this.processLength = time;
}


Game.prototype.setLosingTime = function(time){
	this.gameStateBar.setMaxLowTime(time, 2);
}


Game.prototype.loseGame = function(){
	var dialog  = new Dialog(this.phaserGame, "Et pystynyt sijoittamaan tarpeeksi nopeasti\npakolaisia maihin, yritä uudelleen!",
				[new EventHandler(this.reMenu, this)], ["Okei"]);
	dialog.addToLayer(this.UpperGUILayer);
	this.silenceGame(dialog);
}


Game.prototype.winGame = function(){
	var dialog = new Dialog(this.phaserGame, "Olet saanut sijoitettua kaikki pakolaiset\n"
				  +"Suoritit sen "+this.gameProgress.getDateString()+"!\n"
				  +"Onneksi olkoon!",
				  [new EventHandler(this.reMenu, this)], ["Ok"]);
//	dialog.setTexts(null, yesText, noText);
	dialog.addToLayer(this.UpperGUILayer);
	this.silenceGame(dialog);
				  
}


Game.prototype.updateGameStateBar = function(){
	//Now based on total but faster than with percents based on nations
	var percents = this.maxEuropeanRefugees == 0 ? 100 : this.europeanRefugees / this.maxEuropeanRefugees;
	this.gameStateBar.refugeeAmountChanged(percents);
}


Game.prototype.increaseMaxRefugeeAmountsInNations = function(data){
	var total = this.nations.increaseMaxRefugeeAmountsByData(data);
	this.maxEuropeanRefugees += total;
	this.updateGameStateBar();
}



Game.prototype.endGame = function(){
	this.createTimedEvent(2, this.reMenu);
}


Game.prototype.increaseMaxRefugeeAmounts = function(data){
	if(isNaN(data)){
		if(data === "relative"){
			var refugeeData = this.refugees.getAllRefugeesOfMonth(this.gameProgress.getMonth(), this.gameProgress.getYear());
			this.increaseMaxRefugeeAmountsInNations(refugeeData);
		}
	}
	else this.nations.increaseMaxRefugeeAmounts(data);
}


/**
 * Writes the given text into the newsfeed of the game
 * @param text string to be written to the newsFeed
 */
Game.prototype.addFeedData = function(text, amount){
	amount = amount || 1;
	this.newsFeed.addText(text, amount);
}


Game.prototype.silenceGame = function(silencer){
	silencer.silence(this.gameProgress);
	silencer.silence(this.newsFeed);
	silencer.silence(this.nations);
	silencer.silence(this.mouseMover);
	silencer.silence(this.humanParticleSystem);
	silencer.silence(this.gameStateBar);
	this.defineSyria();
}


/**
 * Adds a dialog to the game with given text and yes/no functions and texts
 */
Game.prototype.addDialog = function(text, method, buttonText){
	//Initialize if not given
	method = method || function(){};
	buttonText = buttonText || "Ok";
	
	var dialog = new Dialog(this.phaserGame, text, [new EventHandler(method)], [buttonText]);
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
	this.dateText.text = "Päivä:"+this.gameProgress.getDateString();
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
	if(nation.getInProcess() || nation.isFull() || this.selectedNations >= this.maximumSelectedNations){
		if(!this.disableSounds)
			this.fullSound.play();
		return;
	}
	//TODO: make pretty
	nation.setInProcess(true);
	this.selectedNations++;
	var amount = this.getRefugeeAmount(nation);

	
	//So that the function can be handled properly, if theres no function(), then the tryHousing is called directly
	//Too lazy to change design and the origin is set right earlier hence undefineds
	this.humanParticleSystem.send(undefined, undefined, nation.x, nation.y, amount * 0.02, this.processLength, new EventHandler(function(){
		this.finishHousing(nation, amount);
	}, this)); //Because no divisions when avoidable!
	
}

/**
 * Calculates the refugee amount for the given nation based on the current month and year
 */
Game.prototype.getRefugeeAmount = function(nation){

	//var month = this.gameProgress.getMonth();
	//var year = this.gameProgress.getYear();
	
	var amount = Math.floor(1000 + nation.getMaxRefugees() * 0.1);
	amount = nation.countHowManyWouldFit(amount);
	
	
	return amount;
}


/**
 * Stops the housing process for the given nation, houses the given amount into the nation
 */
Game.prototype.finishHousing = function(nation, amount){
	this.selectedNations--;
	nation.setInProcess(false);
	amount = nation.tryHousing(amount);
	
	this.europeanRefugees +=amount;
	this.updateGameStateBar();
	
	this.createFloatingText(nation.x, nation.y, ""+amount);
	
	this.refugees.reduceTotalRefugees(amount);
}

Game.prototype.createFloatingText = function(x, y, textTitle){
	var text = this.phaserGame.add.text(x, y, textTitle, SMALL_STYLE);
	var tween = this.phaserGame.add.tween(text).to({ x: text.x, y: text.y - lvlHeight * 0.1}, 500, Phaser.Easing.Linear.None, 0);
	//TODO: check if this actually eats huge amounts of memory!
	tween.onComplete.addOnce(function(){
		text.destroy();
	});
	tween.start();
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
}


/**
 * Updates the games state.
 * For example input and movement on screen will be handled here and the updating of the game state(new events).
 */
Game.prototype.update = function(){
	
	//if(this.phaserGame.input.keyboard.isDown("Z".charCodeAt(0)))
	//	this.zoom(1.05);
	//else if(this.phaserGame.input.keyboard.isDown("X".charCodeAt(0)))
	//	this.zoom(0.95238);
	//TODO:Playtest on or off
	if(this.moveOnMap)
		this.mouseMover.update();
	this.gameProgress.update();
	this.gameStateBar.update();
	//if(nation)
	//	this.debugText.text = ""+nation.maxRefugees;
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
Game.prototype.createLands = function(){
	this.nations.createNations(this.GameLayer, this.TextLayer);
	
	
	//this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.1, this.createLands, this);
}