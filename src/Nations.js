


function Nations(){
	//this.phaserGame = phaserGame;
	//this.layer = layer;
	//this.amount = amount;
	this.nations = [];
}



Nations.prototype.createNations = function(phaserGame, layer, amount){
	for(var i = 0; i < amount; i++){
		var x = phaserGame.rnd.integerInRange(0, worldWidth);
		var y = phaserGame.rnd.integerInRange(0, worldHeight);
		var nation = new Nation(phaserGame, x , y, 'land');
		nation.setWidth(100);
		nation.setHeight(100);
		//this.addToObjects(nation);
		nation.sprite.inputEnabled = true;
		layer.add(nation.sprite);
		this.nations[this.nations.length] = nation;
	}
}