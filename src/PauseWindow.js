

function PauseWindow (game, phaserGame,continuable, restartable, showNationList, sentRefugeesObject,highestRefugeeAmounts, layer){
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
		this.showNationRefugeeList(continuable, restartable, showNationList, startingY, endingY, highestRefugeeAmounts);
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



PauseWindow.prototype.continueClicked = function(){
	for(var i = 0; i < this.silencedObjects.length; i++){
		this.silencedObjects[i].setActive(true);
	}
	this.silencedObjects = [];
	this.destroy();
	
}


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


PauseWindow.prototype.reDoPauseWindow = function(){
	this.destroy();
	
	this.game.openPauseWindow(this.continuable, this.restartable, !this.showNationList);
}


PauseWindow.prototype.showRefugeesAdded = function(continuable, restartable, showNationList, sentRefugeesObject){

	var refugeeTitle = continuable ? "Olet sijoittanut yhteensä: " : "Sijoitit yhteensä: ";
	
	var refugeeText = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight* 0.1, refugeeTitle, NATION_TEXT_STYLE);
	refugeeText.anchor.setTo(0.5,0.5);
	refugeeText.fixedToCamera = true;
	this.layer.add(refugeeText);
	this.texts[this.texts.length] = refugeeText;
	
	var refs = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.25, ""+sentRefugeesObject.refugees, BIG_WHITE_STYLE);
	refs.anchor.setTo(0.5,0.5);
	refs.fixedToCamera = true;
	this.layer.add(refs);
	this.texts[this.texts.length] = refs;
	
	var real = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.45, "Todellisuudessa "+this.game.gameProgress.getDateString() +" mennessä\nEurooppaan on tullut noin:", NATION_TEXT_STYLE);
	real.anchor.setTo(0.5,0.5);
	real.fixedToCamera = true;
	this.layer.add(real);
	this.texts[this.texts.length] = real;
	
	var realAmount = new Phaser.Text(this.phaserGame, lvlWidth * 0.5, lvlHeight * 0.6, this.game.maxEuropeanRefugees, BIG_WHITE_STYLE);
	realAmount.anchor.setTo(0.5,0.5);
	realAmount.fixedToCamera = true;
	this.layer.add(realAmount);
	this.texts[this.texts.length] = realAmount;
	
}


PauseWindow.prototype.silence = function(theSilenced){
	theSilenced.setActive(false);
	this.silencedObjects[this.silencedObjects.length] = theSilenced;
}


PauseWindow.prototype.showNationRefugeeList = function(continuable, restartable, showNationList, startingY, endingY, highestRefugeeAmounts){
	var margin = 10;
	
	var highestAmount = highestRefugeeAmounts[0].getRefugees();
	
	for(var i = 0; i < highestRefugeeAmounts.length; i++){
		var nation = highestRefugeeAmounts[i];
		var y = startingY + (endingY - startingY) * i / 10 + i*margin;
		var barText = new BarText(this.phaserGame, lvlWidth * 0.2, lvlWidth *0.8, y, 'solidBar', nation.name +":"+nation.getRefugees()+" pakolaista", NATION_TEXT_STYLE);
		barText.addToLayer(this.layer);
		if(highestAmount != 0)
			barText.setPercentualSize(nation.getRefugees() / highestAmount);
		this.texts[this.texts.length] = barText;
	}

}

