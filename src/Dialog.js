/**
 * Can be used to create a dialog with two different options.
 * TODO: Make it more general
 */


 /**
  * Constructor for dialog.
  * Needs atleast the game, text and methods for Yes and No.
  */
function Dialog(game, text, methodYes, methodNo, x, y, width, height, yesText, noText){
	x = x || lvlWidth * 0.5;
	y = y || lvlHeight * 0.5;
	width = width || lvlWidth * 0.8;
	height = height || lvlHeight * 0.8;
	yesText = yesText || 'Kyllä';
	noText = noText || 'Ei';
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
	var xPosYes = x - width * 0.25;
	var xPosNo = x + width * 0.25;
	var yPos = y + height *0.35;
	
	this.text = game.add.text(0, 0, text, BASE_STYLE);
	this.text.anchor.setTo(0.5, 0.5);
	this.text.x = x;
	this.text.y = y - height * 0.25;
	this.text.fixedToCamera = true;
	
	this.background.inputEnabled = true;
	this.background.input.priorityID = DIALOG_INPUTPRIORITY;
	
	//TODO: some heavy duty refactoring
	this.yes = this.createButton(game, yesText, 'button', function(){
		methodYes();
		dialog.destroy();
	}, BASE_STYLE, xPosYes, yPos, xSize, ySize);

	this.no = this.createButton(game, noText, 'button', function(){
		methodNo();
		dialog.destroy();
	}, BASE_STYLE, xPosNo, yPos, xSize, ySize);
}


Dialog.prototype.createButton = function(game, text, sprite, method, font,x, y, xSize, ySize){
	var button = new TextButton(game, text, 'button', method, font, x, y)
	button.setWidth(xSize);
	button.setFixedToCamera(true);
	button.setHeight(ySize);
	button.setInputPriority (DIALOG_INPUTPRIORITY);
	return button;
}


Dialog.prototype.addToLayer = function(layer){
	layer.add(this.background);
	this.yes.addToLayer(layer);
	this.no.addToLayer(layer);
	layer.add(this.text);
}



Dialog.prototype.setTexts = function(dialogText, yesText, noText){
	this.text.text = dialogText || this.text.text;
	this.yes.setText(yesText);
	this.no.setText(yesText);
}


/**
 * Sets the activity of the dialog and its components based on given value
 */
Dialog.prototype.setActive = function(activity){
	this.no.setActive(activity);
	this.yes.setActive(activity);
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
	this.yes.destroy();
	this.no.destroy();
	this.text.destroy();
	for(var i = 0; i < this.silencedObjects.length; i++){
		this.silencedObjects[i].setActive(true);
	}
	this.silencedObjects = [];
}