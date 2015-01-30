


function Menu(titles, methods, pictures, gameToAddTo, xMargin, yMargin, yMarginBetweenButtons){
if(titles.length != methods.length && (pictures != null && pictures.length != methods.length))
	throw "The length of the given titles and methods arrays were not the same!";

this.titles = titles;
this.methods = methods;
this.pictures = pictures;
this.game = gameToAddTo;
this.buttons = [];
this.texts = [];
this.xMargin = xMargin;
this.yMargin = yMargin;
this.yMarginBetweenButtons = yMarginBetweenButtons;
this.style = { font: "32px Arial", fill: "#ff0044", align: "center" };

}

Menu.prototype.setStyle = function(style){
	this.style = style;
}


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


Menu.prototype.clear = function(){
	if(this.buttons.length != 0){
		for(var i = 0; i < this.buttons.length; i++){
			this.buttons[i].destroy();
		}
		this.buttons = [];
	}
	if(this.texts.length != 0){
		for(var i = 0; i < this.texts.length; i++){
			this.texts[i].destroy();
		}
		this.texts = [];
	}
}


Menu.prototype.createButtons = function(){
	this.clear();
	const BUTTON_HEIGHT = 100;
	if(this.titles.length == 0)
		throw "Titles can't be empty!";
	var buttonHeight = lvlHeight >= this.yMargin * 2 + BUTTON_HEIGHT *0.5 +  this.titles.length * (BUTTON_HEIGHT + this.yMarginBetweenButtons) ? BUTTON_HEIGHT : (lvlHeight - this.yMargin * 2 - this.titles.length * this.yMarginBetweenButtons) / this.titles.length;
	for(var i = 0; i < this.titles.length; i++){
		var style = this.style;
		var x = this.game.world.centerX;
		var y = this.yMargin + buttonHeight *0.5 +  i * (buttonHeight + this.yMarginBetweenButtons);
		var button = this.game.add.button(0, 0, this.pictures.length <=i ? this.pictures[0] : this.pictures[i]
		, this.methods[i].method, this.game, 1, 0, 2);
		button.height = buttonHeight;
		button.width = lvlWidth - this.xMargin * 2;
		button.anchor.setTo(0.5, 0.5);
		button.x = x;
		button.y = y;
		
		var text = this.game.add.text(0, 0, this.titles[i], style);
		text.anchor.setTo(0.5, 0.5);
		text.x = x;
		text.y = y;
		this.texts[this.texts.length] = text;
		this.buttons[this.buttons.length] = button;	
	}
}


Menu.prototype.start = function(){
	this.createButtons();
}