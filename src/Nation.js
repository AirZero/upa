
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * The sprite inherited class that holds the data associated with the nation.
 * Also handles the text associated with the nation
 */

//Inheritance from Sprite
Nation.prototype = Object.create(Phaser.Sprite.prototype);
Nation.prototype.constructor = Nation;

/**
 * Initializes the sprite for the nation and maxrefugee amounts for this nation
 */
function Nation(game, x,y, name, sprite, maxRefugees, actualName){
	Phaser.Sprite.call(this, game, 0, 0, sprite);
	this.createText(game, name, x, y);
	this.actualName = actualName;

	
	this.inProcess = false;
	this.name = name;
	this.active = true;
	
	this.anchor.setTo(0.5, 0.5);
	this.x = x;
	this.y = y;
	//this.sprite = game.add.sprite(0,0,sprite);
	//this.sprite.anchor.setTo(0.5, 0.5);
	//this.sprite.x = x;
	//this.sprite.y = y;
	this.refugees = 0;
	this.maxRefugees = maxRefugees;
	
	this.nationState = new NationState(this.maxRefugees );
}


/**
 * Sets the activity of the nation
 */
Nation.prototype.setActive = function(activity){
	this.active = activity;
}


/**
 * Returns the amount of refugees in the current nation
 */
Nation.prototype.getRefugees = function(){
	return this.refugees;
}


/**
 * returns the amount of max refugees in the nation
 */
Nation.prototype.getMaxRefugees = function(){
	return this.maxRefugees;
}


/**
 * Increases max refugee amount for nation
 */
Nation.prototype.increaseMaxRefugeeAmount = function(amount){
	this.maxRefugees += amount;
	this.nationState.updateState(this.maxRefugees, this.refugees, this);
}


/**
 * Tells if the nation is under process of housing refugees
 */
Nation.prototype.getInProcess = function(){
	return this.inProcess;
}


/**
 * Sets the nation to be under refugee taking process
 */
Nation.prototype.setInProcess = function(inProcess){
	this.inProcess = inProcess;
	this.tintNormal();
}

/**
 * Sets the visibility of the text component of nation
 */
Nation.prototype.setTextVisibility = function(visibility){
	this.text.visible = visibility;
}


/**
 * Sets the autoculling property for the nation and the text
 */
Nation.prototype.setAutoCulling = function(cull){
	this.autoCull = cull;
	this.text.autoCull = cull;
}


Nation.prototype.tintNormal = function(){
	this.nationState.tintNormal(this);
}


/**
 * Creates the text component of the nation. Called internally upon creation.
 */
Nation.prototype.createText = function(game, text, x, y){
	this.text = game.add.text(0,0, text, NATION_TEXT_STYLE);
	this.text.anchor.setTo(0.5, 0.5);
	this.text.x = x;
	this.text.y = y;
}

/**
 * Destroys the Phaser objects associated with this nation
 */
Nation.prototype.destroy = function(){
	this.text.destroy();
	Phaser.Sprite.prototype.destroy.call(this);
}

/**
 * Sets the x and y for the nation and its components
 */
Nation.prototype.setXandY = function(x,y){
	this.x = x;
	this.y = y;
	this.text.x = x;
	this.text.y = y;
}

/**
 * Sets the width of the nation
 */
Nation.prototype.setWidth = function(width){
	this.width = width;
}


Nation.prototype.isFull = function(){
	return this.maxRefugees <= this.refugees;
}


/**
 * Sets the height of the nation
 */
Nation.prototype.setHeight = function(height){
	this.height = height;
}


Nation.prototype.countHowManyWouldFit = function(amount){
	var space = this.getSpaceLeft();
	return space >= amount ? amount : space;
}


Nation.prototype.getSpaceLeft = function(){
	return this.maxRefugees - this.refugees;
}


Nation.prototype.isSpaceLeft = function(){
	return this.getSpaceLeft > 0;
}

/**
 * Tries to house the given amount of refugees to the nation.
 * Returns the amount refugees that were not able to be housed.
 */
Nation.prototype.tryHousing = function(amount){
	var fit = this.countHowManyWouldFit(amount);
	var notFit = amount - fit;
	this.refugees += fit;
	this.nationState.updateState(this.maxRefugees, this.refugees, this);
	return fit;
	////TODO: Fix this method, not working 100%
	//var space = this.maxRefugees - this.refugees;
	//var notSent = 0;
	//if(space >= amount){
	//	this.refugees += amount;
	//}
	//else {
	//	notSent = amount - space;
	//	this.refugees = this.maxRefugees;
	//}
	////TODO: only 1 access from nations class to the update state
	//this.nationState.updateState(this.maxRefugees, this.refugees, this);
	//return notSent;
}