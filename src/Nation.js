
/**
 * The sprite inherited class that holds the data associated with the nation.
 * Also handles the text associated with the nation
 */

//Inheritance from Sprite
Nation.prototype = Object.create(Phaser.Sprite.prototype);
Nation.prototype.constructor = Nation;

function Nation(game, x,y, name, sprite, maxRefugees){
	Phaser.Sprite.call(this, game, 0, 0, sprite);
	this.createText(game, name, x, y);
	
	this.name = name;
	
	this.anchor.setTo(0.5, 0.5);
	this.x = x;
	this.y = y;
	//this.sprite = game.add.sprite(0,0,sprite);
	//this.sprite.anchor.setTo(0.5, 0.5);
	//this.sprite.x = x;
	//this.sprite.y = y;
	this.refugees = 0;
	this.maxRefugees = maxRefugees;
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

/**
 * Sets the height of the nation
 */
Nation.prototype.setHeight = function(height){
	this.height = height;
}


/**
 * Tries to house the given amount of refugees to the nation.
 * Returns the amount refugees that were not able to be housed.
 */
Nation.prototype.tryHousing = function(amount){
	var leftover = this.maxRefugees - this.refugees;
	if(leftover >= amount){
		this.refugees+= amount;
	}
	else {
		leftover =-( this.maxRefugees - this.refugees);
		this.refugees = this.maxRefugees;
	}
	return leftover;
}