
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * Can be used to create a dialog with two different options.
 * TODO: Make it more general
 */

 /**
  * Constructor for dialog.
  * Needs atleast the game, text and methods for Yes and No.
  */
function Dialog(game, text, methods, texts, x, y, width, height){
	//TODO: automatic textwrapping
	x = x || lvlWidth * 0.5;
	y = y || lvlHeight * 0.5;
	width = width || lvlWidth * 0.8;
	height = height || lvlHeight * 0.8;
	this.background = game.add.sprite(0,0,'dialogBack');
	this.background.anchor.setTo(0.5,0.5);
	this.background.x = x;
	this.background.y = y;
	this.background.width = width;
	this.background.height = height;
	this.background.fixedToCamera = true;
	var dialog = this;
	this.silencedObjects = [];

	var ySize = (height - y) * 0.40;
	var xSize = (width) * 0.5 * 0.8;
	var yPos = y + height *0.35;
	
	this.text = game.add.text(0, 0, text, NATION_TEXT_STYLE);
	this.text.anchor.setTo(0.5, 0.5);
	this.text.x = x;
	this.text.y = y - height * 0.25;
	this.text.fixedToCamera = true;
	
	this.background.inputEnabled = true;
	this.background.input.priorityID = DIALOG_INPUTPRIORITY;
	this.buttons = [];
	for(var i = 0; i < methods.length; i++){
		var startingPoint = this.background.x - xSize*0.5 * ( methods.length - 1)
		var xPos = startingPoint + ((methods.length -1) - (i * methods.length * 0.5)) * (width) * 0.5 * 0.8;
		var method = methods[i];
		this.buttons.push( this.createButton(game, texts[i], 'button', function(){
			this.processMethodClick(method);
		}, BASE_STYLE, xPos, yPos, xSize, ySize, this));
	}
	
	//TODO: some heavy duty refactoring
	//this.yes = this.createButton(game, yesText, 'button', function(){
	//	methodYes();
	//	dialog.destroy();
	//}, BASE_STYLE, xPosYes, yPos, xSize, ySize);
    //
	//this.no = this.createButton(game, noText, 'button', function(){
	//	methodNo();
	//	dialog.destroy();
	//}, BASE_STYLE, xPosNo, yPos, xSize, ySize);
}


/**
 * Handles the selection of a dialog option. Dialog needs to be destroyed and the eventhandler "processed".
 */
Dialog.prototype.processMethodClick = function(method){
	this.destroy();
	if(method instanceof EventHandler)
		method.process();
	else method();
}



/**
 * Creates a button for the dialog to the given parameters.
 * ThisClass usually is the dialog itself to enter the processMethodClick.
 */
Dialog.prototype.createButton = function(game, text, sprite, method, font,x, y, xSize, ySize, thisClass){
	var button = new TextButton(game, text, 'button', method, font, x, y, thisClass)
	button.setWidth(xSize);
	button.setFixedToCamera(true);
	button.setHeight(ySize);
	button.setInputPriority (DIALOG_INPUTPRIORITY);
	return button;
}


/**
 * Adds dialog and its components to the given layer.
 */
Dialog.prototype.addToLayer = function(layer){
	layer.add(this.background);
	for(var i = 0; i< this.buttons.length; i++){
		this.buttons[i].addToLayer(layer);
	}
	layer.add(this.text);
}



Dialog.prototype.setTexts = function(dialogText, texts){
	this.text.text = dialogText || this.text.text;
	//this.yes.setText(yesText);
	//this.no.setText(yesText);
	for(var i = 0; i< this.buttons.length; i++){
		this.buttons[i].setText(texts[i]);
	}
}


/**
 * Sets the activity of the dialog and its components based on given value
 */
Dialog.prototype.setActive = function(activity){
	for(var i = 0; i< this.buttons.length; i++){
		this.buttons[i].setActive(activity);
	}
}

/**
 * Silences another component to not work as long as this component is not destroyed.
 * Will release the component after destroy is invoked.
 */
Dialog.prototype.silence = function(theSilenced){
	theSilenced.setActive(false);
	this.silencedObjects[this.silencedObjects.length] = theSilenced;
}


/**
 * Destroys all related Phaser components and sets the silenced components free.
 */
Dialog.prototype.destroy = function(){
	this.background.destroy();
	for(var i = 0; i< this.buttons.length; i++){
		this.buttons[i].destroy();
	}
	this.text.destroy();
	for(var i = 0; i < this.silencedObjects.length; i++){
		this.silencedObjects[i].setActive(true);
	}
	this.silencedObjects = [];
}