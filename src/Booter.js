

function Booter(phaserGame){
	this.phaserGame = phaserGame;
	
}


Booter.prototype.init = function(){
	
}

Booter.prototype.preload = function(){
	this.phaserGame.load.image('logo', PICTURE_PATH+'Logo.png');
}

Booter.prototype.create = function(){
	var sprite = this.phaserGame.add.sprite(lvlWidth *0.5, lvlHeight *0.5, 'logo');
	sprite.anchor.setTo(0.5,0.5);
	sprite.width = lvlWidth;
	sprite.height = lvlHeight;
	sprite.fixedToCamera = true;
	this.phaserGame.load.setPreloadSprite(sprite);
	this.startGame();

}

Booter.prototype.startGame = function(){
	this.phaserGame.state.start('Main');
}