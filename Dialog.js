


function createDialog(game, text,x, y, width, height, methodYes, methodNo){
	

}





function Dialog(game, text, methodYes, methodNo, x, y, width, height){
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
	
	this.yes = new TextButton(game, 'yes', 'button', function(){
		methodYes();
		dialog.destroy();
	}, BASE_STYLE, xPosYes, yPos)
	this.yes.setWidth(xSize);
	this.yes.setHeight(ySize);
	this.no = new TextButton(game, 'no', 'button', function(){
		methodNo();
		dialog.destroy();
	}, BASE_STYLE, xPosNo, yPos)
	this.no.setWidth(xSize);
	this.no.setHeight(ySize);
}

Dialog.prototype.setActive = function(activity){
	this.no.setActive(activity);
	this.yes.setActive(activity);
}

Dialog.prototype.silence = function(theSilenced){
	theSilenced.setActive(false);
	this.silencedObjects[this.silencedObjects.length] = theSilenced;
}


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