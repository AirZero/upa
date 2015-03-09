
/**
 * Menu class that is used for showing stuff on menu
 */

 /**
 * Initializes a new menu based on the given attributes. Create will create something showeable to the screen
 */ 
function Menu(gameToAddTo, xMargin, yMargin, yMarginBetweenButtons){

this.titles = [];
this.methods = [];
this.pictures = [];
this.game = gameToAddTo;
this.textButtons = [];
this.xMargin = xMargin;
this.yMargin = yMargin;
this.yMarginBetweenButtons = yMarginBetweenButtons;
this.style = BASE_STYLE;

}

/**
 * Sets the given style to be used on next create
 */
Menu.prototype.setStyle = function(style){
	this.style = style;
}

/**
 * Set whether menu and its components are active
 */
Menu.prototype.setActive = function(activity){
	for(var i = 0; i < this.textButtons.length; i++){
		this.textButtons[i].setActive(activity);
	}
}

/**
 * Creates new menu components based on the given titles and methods associated with them.
 * If only 1 picture is in the pictuers array, that will be used for all buttons
 */
Menu.prototype.create = function(titles, methods, pictures, gameToAddTo, xMargin, yMargin, yMarginBetweenButtons){
	this.pictures = pictures || this.pictures;
	this.game = gameToAddTo || this.game;
	this.xMargin = xMargin || this.xMargin;
	this.yMargin = yMargin || this.yMargin;
	this.yMarginBetweenButtons = yMarginBetweenButtons || this.yMarginBetweenButtons;
	
	if(!titles  || ! methods || titles.length != methods.length)
		throw "There were issues with the given titles and methods!";
	this.titles = titles;
	this.methods = methods;
	this.createButtons();
}


/**
 * Clears the menu component and all its children
 */
Menu.prototype.clear = function(){
	if(this.textButtons.length != 0){
		for(var i = 0; i < this.textButtons.length; i++){
			this.textButtons[i].destroy();
		}
		this.textButtons = [];
	}
}


/**
 * Innerly creates the buttons based on the stored information
 */
Menu.prototype.createButtons = function(){
	this.clear();
	var BUTTON_HEIGHT = 100;
	if(this.titles.length == 0)
		throw "Titles can't be empty!";
	var buttonHeight = lvlHeight >= this.yMargin * 2 + BUTTON_HEIGHT *0.5 +  this.titles.length * (BUTTON_HEIGHT + this.yMarginBetweenButtons) ? BUTTON_HEIGHT : (lvlHeight - this.yMargin * 2 - this.titles.length * this.yMarginBetweenButtons) / this.titles.length;
	for(var i = 0; i < this.titles.length; i++){
		var style = this.style;
	
		var x = this.game.world.centerX;
		var y = this.yMargin + buttonHeight *0.5 +  i * (buttonHeight + this.yMarginBetweenButtons);
		
		var textButton = new TextButton(this.game, this.titles[i], this.pictures.length <=i ? this.pictures[0] : this.pictures[i], this.methods[i].method, style, x, y);
		
		textButton.setWidth(lvlWidth - this.xMargin * 2);
		textButton.setHeight (buttonHeight);

		this.textButtons[this.textButtons.length] = textButton;
	}
}


/**
 * If start is wanted to invoke here, it will start the menu with a manu
 * @DEPRECATED at least i think so
 */
Menu.prototype.start = function(){
	this.createButtons();
}