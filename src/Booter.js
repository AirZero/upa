

function Booter(phaserGame){
	this.phaserGame = phaserGame;
	
}


Booter.prototype.init = function(){
	
}

Booter.prototype.preload = function(){
	this.phaserGame.load.image('logo', PICTURE_PATH+'PelinLogo.png');
	this.phaserGame.load.audio('music', SOUND_PATH+'WarLow.ogg');
}

Booter.prototype.create = function(){

	this.startGame();

}

Booter.prototype.startGame = function(){
	this.phaserGame.state.start('Main');
}