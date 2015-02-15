


function Nations(phaserGame){
	//this.phaserGame = phaserGame;
	//this.layer = layer;
	//this.amount = amount;
	this.nations = [];
	this.phaserGame = phaserGame;
	
}


Nations.prototype.preload = function(){
	this.preloadNationData();
}

Nations.prototype.onNationClick = function(sprite){
	sprite.tint = sprite.tint * 0.9;	
}

Nations.prototype.preloadNationData = function(){

	
	//this.phaserGame.load.text('nationsJSON', DATA_PATH+'nations.json');
	//this.phaserGame.load.onLoadComplete.add(this.loadNationData, this, 9999);
	this.loadNationData();

	
}

Nations.prototype.loadNationData = function(){
	//this.nationsData = JSON.parse(this.phaserGame.cache.getText('nationsJSON')).nations;
	this.nationsData = getJson().nations;
	for(var i = 0; i < this.nationsData.length; i++){
		this.phaserGame.load.image(this.nationsData[i].sprite,PICTURE_PATH + this.nationsData[i].sprite+".png");
	}
	

}




Nations.prototype.createNations = function(layer){
	//this.loadNationData();
	for(var j = 0; j <5; j++)
	for(var i = 0; i < this.nationsData.length; i++){
		//var x = this.phaserGame.rnd.integerInRange(0, worldWidth);
		//var y = this.phaserGame.rnd.integerInRange(0, worldHeight);
		var nationData = this.nationsData[i];
		//var nation = new Nation(this.phaserGame, nationData.x, nationData.y, nationData.name, nationData.sprite);
		var nation = new Nation(this.phaserGame, this.phaserGame.world.randomX, this.phaserGame.world.randomY, nationData.name, nationData.sprite);
		nation.setWidth(nationData.width);
		nation.setHeight(nationData.height);
		nation.angle = nationData.rotation;
		//this.addToObjects(nation);
		nation.inputEnabled = true;
		nation.events.onInputDown.add(this.onNationClick);
		nation.setAutoCulling(true);
		layer.add(nation);
		layer.add(nation.text);
		nation.setTextVisibility(true);
		this.nations[this.nations.length] = nation;
	}
}