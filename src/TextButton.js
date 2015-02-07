

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


TextButton.prototype.addToLayer = function(layer){
	layer.add(this.button);
	layer.add(this.text);
}

TextButton.prototype.setFixedToCamera = function(fixed){
	this.button.fixedToCamera = fixed;
	this.text.fixedToCamera = fixed;
}

TextButton.prototype.setInputPriority = function(inputPriority){
	this.button.input.priorityID = inputPriority;
}


TextButton.prototype.perform = function(){
	if(this.active)
		this.method();
}

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


TextButton.prototype.setXandY = function(x, y){
	this.button.x = x;
	this.button.y = y;
	this.text.x = x;
	this.text.y = y;
}