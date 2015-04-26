
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * Makes a new pause window. Works only with the current game
 */
function PauseWindow (game, phaserGame,continuable, restartable, showNationList, sentRefugeesObject,highestRefugeeAmounts, layer, text){
	if(continuable === undefined)
		continuable = true;
	if(restartable === undefined)
		restartable = true;
	if(showNationList === undefined)
		showNationList = true;
	
	this.game = game;
	this.phaserGame = phaserGame;
	this.continuable = continuable;
	this.restartable = restartable;
	this.showNationList = showNationList;
	this.texts = [];
	this.layer = layer;
	this.silencedObjects = [];
	
	this.background = new Phaser.Sprite(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.5, 'dialogBack');
	this.background.anchor.setTo(0.5, 0.5);
	this.background.width = lvlWidth *0.9;
	this.background.height = lvlHeight * 0.9;
	this.background.fixedToCamera = true;
	this.layer.add(this.background);
	var startingY = lvlHeight * 0.2;
	var endingY = lvlHeight * 0.6;
	

	if(showNationList)
		this.showNationRefugeeList(continuable, restartable, showNationList, startingY, endingY, highestRefugeeAmounts, text);
	else
		this.showRefugeesAdded(continuable, restartable, showNationList, sentRefugeesObject);

	//this.switchSidesButton = this.game.createTextButton("V", ,, this.layer, lvlWidth * 0.07, lvlWidth * 0.07, this);
	this.switchSidesButton = this.phaserGame.add.button(lvlWidth * 0.85, lvlHeight *0.2, 'switch', this.reDoPauseWindow, this, 1,0,2,3);
	this.switchSidesButton.fixedToCamera = true;
	this.switchSidesButton.width = lvlWidth * 0.07;
	this.switchSidesButton.height = this.switchSidesButton.width;
	this.switchSidesButton.anchor.setTo(0.5, 0.5);
	
	this.layer.add(this.switchSidesButton);
	
	var buttonWidth = this.background.width * 0.25;
	var buttonY = endingY + this.background.height * 0.25;
	//75% of the space remaining after list and until end of space
	var buttonHeight = (this.background.y + this.background.height * 0.5 - endingY) * 0.25;
	if(this.restartable){
		this.restartButton = this.game.createTextButton("Aloita alusta", this.game.restart,  this.background.x + buttonWidth, buttonY, this.layer, buttonWidth, buttonHeight);
	}
	if(this.continuable){		
		this.textButton = this.game.createTextButton("Jatka",  this.continueClicked,this.background.x - buttonWidth , buttonY, this.layer, buttonWidth, buttonHeight, this);
	}

}


/**
 * Handles clicking of continue
 */
PauseWindow.prototype.continueClicked = function(){
	for(var i = 0; i < this.silencedObjects.length; i++){
		this.silencedObjects[i].setActive(true);
	}
	this.silencedObjects = [];
	this.destroy();
	
}


/**
 * Destroys this window and its components
 */
PauseWindow.prototype.destroy = function(){
	for(var i = 0; i < this.texts.length; i++){
		this.texts[i].destroy();
	}
	if(this.textButton)
		this.textButton.destroy();
	if(this.restartButton)
		this.restartButton.destroy();
	if(this.switchSidesButton)
		this.switchSidesButton.destroy();
	this.background.destroy();
}


/**
 * Redos the current pausewindow with showNationList swapped.
 */
PauseWindow.prototype.reDoPauseWindow = function(){
	this.destroy();
	
	this.game.openPauseWindow(this.continuable, this.restartable, !this.showNationList);
}


/**
 * Adds the texts and buttons for the pause window when showing the refugee amounts.
 */
PauseWindow.prototype.showRefugeesAdded = function(continuable, restartable, showNationList, sentRefugeesObject){

	var refugeeTitle = "Olet pelastanut yhteensä: ";
	
	var refugeeText = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight* 0.1, refugeeTitle, NATION_TEXT_STYLE);
	refugeeText.anchor.setTo(0.5,0.5);
	refugeeText.fixedToCamera = true;
	this.layer.add(refugeeText);
	this.texts[this.texts.length] = refugeeText;
	
	var refs = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.18, ""+sentRefugeesObject.refugees, BIG_WHITE_STYLE);
	refs.anchor.setTo(0.5,0.5);
	refs.fixedToCamera = true;
	this.layer.add(refs);
	this.texts[this.texts.length] = refs;

	var syriansText3 = new Phaser.Text(this.phaserGame, refs.x + refs.width * 0.5 +30, refs.y, "syyrialaista", NATION_TEXT_STYLE);
	syriansText3.anchor.setTo(0,0.5);
	syriansText3.fixedToCamera = true;
	this.layer.add(syriansText3);
	this.texts[this.texts.length] = syriansText3;
	
	var real = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.30, "Todellisuudessa "+this.game.gameProgress.getDateString() +" Eurooppaan\n oli paennut syyriasta:", NATION_TEXT_STYLE);
	real.anchor.setTo(0.5,0.5);
	real.fixedToCamera = true;
	this.layer.add(real);
	this.texts[this.texts.length] = real;
	
	var realAmount = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.44, this.game.maxEuropeanRefugees, BIG_WHITE_STYLE);
	realAmount.anchor.setTo(0.5,0.5);
	realAmount.fixedToCamera = true;
	this.layer.add(realAmount);
	this.texts[this.texts.length] = realAmount;

	var syriansText = new Phaser.Text(this.phaserGame, realAmount.x + realAmount.width * 0.5 +30, realAmount.y, "ihmistä", NATION_TEXT_STYLE);
	syriansText.anchor.setTo(0,0.5);
	syriansText.fixedToCamera = true;
	this.layer.add(syriansText);
	this.texts[this.texts.length] = syriansText;

	var realNeighboursText = new Phaser.Text(this.phaserGame, lvlWidth * 0.50, lvlHeight * 0.57, "Syyrian naapurimaihin oli paennut\n 31.12.2013:", NATION_TEXT_STYLE);
	realNeighboursText.anchor.setTo(0.5,0.5);
	realNeighboursText.fixedToCamera = true;
	this.layer.add(realNeighboursText);
	this.texts[this.texts.length] = realNeighboursText;
	
	var realAmountNeighbours = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.7, "2414102", BIG_WHITE_STYLE);
	realAmountNeighbours.anchor.setTo(0.5,0.5);
	realAmountNeighbours.fixedToCamera = true;
	this.layer.add(realAmountNeighbours);
	this.texts[this.texts.length] = realAmountNeighbours;
	
	
	var syriansText2 = new Phaser.Text(this.phaserGame, realAmountNeighbours.x + realAmountNeighbours.width * 0.5 +30, realAmountNeighbours.y, "ihmistä", NATION_TEXT_STYLE);
	syriansText2.anchor.setTo(0,0.5);
	syriansText2.fixedToCamera = true;
	this.layer.add(syriansText2);
	this.texts[this.texts.length] = syriansText2;

	var sourceText = new Phaser.Text(this.phaserGame, lvlWidth * 0.82, lvlHeight * 0.75, "Lähde: UNHCR", REALLY_SMALL_STYLE);
	sourceText.anchor.setTo(0.5,0.5);
	sourceText.fixedToCamera = true;
	this.layer.add(sourceText);
	this.texts[this.texts.length] = sourceText;
	
}


/**
 * Made to be able to silence other components.
 */
PauseWindow.prototype.silence = function(theSilenced){
	theSilenced.setActive(false);
	this.silencedObjects[this.silencedObjects.length] = theSilenced;
}


/**
 * Show the list of the refugees
 */
PauseWindow.prototype.showNationRefugeeList = function(continuable, restartable, showNationList, startingY, endingY, highestRefugeeAmounts,text){
	var margin = 10;
	
	if(text){
		this.text = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.12, text, NATION_TEXT_STYLE);
		this.text.anchor.setTo(0.5,0.5);
		this.text.fixedToCamera = true;
		this.layer.add(this.text);
		this.texts[this.texts.length] = this.text;
	}
	
	var highestAmount = highestRefugeeAmounts[0].getRefugees();
	
	for(var i = 0; i < highestRefugeeAmounts.length; i++){
		var nation = highestRefugeeAmounts[i];
		var y = startingY + (endingY - startingY) * i / 10 + i*margin;
		var barText = new BarText(this.phaserGame, lvlWidth * 0.2, lvlWidth *0.8, y, 'solidBar', nation.actualName +":"+nation.getRefugees()+"/"+nation.getMaxRefugees()+" pakolaista", NATION_TEXT_STYLE);
		barText.addToLayer(this.layer);
		if(highestAmount != 0)
			barText.setPercentualSize(nation.getRefugees() / highestAmount);
		this.texts[this.texts.length] = barText;
	}

}