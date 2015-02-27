/**
 * A button with a textfield attached to it since Phaser did not contain one.
 * Rendering text is a coslty operation, so should be used with this in mind.
 */

 
 /**
  * Constructor that initializes the component with given parameters
  * TODO: optional parameters
  */
 function TextButton (gameToAddTo, title, picture, method, style, x, y, callBackClass){
	this.button = gameToAddTo.add.button(0, 0, picture, callBackClass ? method : this.perform, callBackClass ? callBackClass : this, 1, 0, 2);
	this.setInputPriority(BUTTON_INPUTPRIORITY);
	//TODO: fix this.. jos annetaan callBackClass, niin ei voida määrittää itseä enään performia varten, tähän pitäisi keksiä joku fiksu ratkaisu oikaisuksi. Tai sitten vain ei näppäintä saa sulkea? sekään ei ole btw hyvä... Tämän saa hurdurpurkka virityksellä hoidettua Game:n päässä, mutta mutta....
	
	this.method = method;
	this.active = true;
	this.button.anchor.setTo(0.5, 0.5);

		
	this.text = gameToAddTo.add.text(0, 0, title, style);
	this.text.anchor.setTo(0.5, 0.5);

	if(x && y)
		this.setXandY(x,y);
}

/**
 * Adds this and all its components to a layer.
 * TODO: contemplate if approach is good.
 * (Another approach would be to make this a sprite and text a child of this, which atleast in theory should allow direct adding to groups)
 */
TextButton.prototype.addToLayer = function(layer){
	layer.add(this.button);
	layer.add(this.text);
}

/**
 * Sets components fixed to camera
 * TODO: See addToLayer 
 */
TextButton.prototype.setFixedToCamera = function(fixed){
	this.button.fixedToCamera = fixed;
	this.text.fixedToCamera = fixed;
}

/**
 * Sets the inputpriority for underlying components
 */
TextButton.prototype.setInputPriority = function(inputPriority){
	this.button.input.priorityID = inputPriority;
}


/**
 * Will try to perform the method given to the textbutton if the component is active
 */
TextButton.prototype.perform = function(){
	if(this.active)
		this.method();
}

/**
 * Destroys Phaser components related to this textbutton
 */
TextButton.prototype.destroy = function(){
	this.button.destroy();
	this.text.destroy();
}


TextButton.prototype.setActive = function(activity){
	this.active = activity;
}


TextButton.prototype.setWidth = function(width){
	this.button.width = width;
}

TextButton.prototype.setHeight = function(height){
	this.button.height = height;
}

TextButton.prototype.setText = function(text){
	this.text.text = text || this.text.text;
}



TextButton.prototype.setXandY = function(x, y){
	this.button.x = x;
	this.button.y = y;
	this.text.x = x;
	this.text.y = y;
}