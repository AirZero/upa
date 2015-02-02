

function TextButton (gameToAddTo, title, picture, method, style, x, y, callBackClass){
	this.button = gameToAddTo.add.button(0, 0, picture, method,
	callBackClass ? callBackClass : gameToAddTo, 1, 0, 2);

	this.button.anchor.setTo(0.5, 0.5);

		
	this.text = gameToAddTo.add.text(0, 0, title, style);
	this.text.anchor.setTo(0.5, 0.5);

	if(x && y)
		this.setXandY(x,y);
}

TextButton.prototype.destroy = function(){
	this.button.destroy();
	this.text.destroy();
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