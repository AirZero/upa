/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */
 
/**
 * Handles the refugee amount sprite lists. Not used
 */
function RefugeeSpriteListController(phaserGame, arrayOfDetails, xStart, xEnd, rowStartY, lastRowEndY){
	this.game = phaserGame;
	this.spriteLists = [];
	var total = 0;
	for(var i = 0; i< arrayOfDetails.length; i++){
		total += arrayOfDetails[i].ratio;
	}
	this.details = arrayOfDetails;
	this.refugees = 0;
	this.xStart = xStart;
	this.xEnd = xEnd;
	this.rowStartY = rowStartY;
	this.lastRowEndY = lastRowEndY;
	var last = rowStartY;
	for(var i = 0; i < arrayOfDetails.length; i++){
		var details = arrayOfDetails[i];
		var difference = last -rowStartY;
		var y = rowStartY + difference + ((lastRowEndY - (rowStartY + difference)) * details.ratio / total);
		
		this.spriteLists[this.spriteLists.length] = new SpriteList(phaserGame, xStart, xEnd, y, y, details.maxSprites, 'hunam', details.layer, true, details.width, details.height);
		last = y;
	}
}


/**
 * Changes the amount of sprite lists
 */
RefugeeSpriteListController.prototype.refugeeAmountChanged = function(refugees){
	this.refugees = refugees;
	this.updateLists();
}


/**
 * Updates the lists
 */
RefugeeSpriteListController.prototype.updateLists = function(){
	var refugeesLeft = this.refugees;
	for(var i = this.spriteLists.length -1; i >= 0; i--){
		var details = this.details[i];
		var sprites =  Math.floor(refugeesLeft / details.represents);
		refugeesLeft -= sprites * details.represents;
		this.spriteLists[i].changeObjectAmount(sprites);
	}
	//TODO: into method that will rotate over to the next list
	if(refugeesLeft > 0)
		this.spriteLists[0].addNewSprite();
}