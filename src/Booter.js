

function Booter(phaserGame){
	this.phaserGame = phaserGame;
	
}


Booter.prototype.init = function(){
	
}

Booter.prototype.preload = function(){
	this.phaserGame.load.image('logo', PICTURE_PATH+'PelinLogo.png');
}

Booter.prototype.create = function(){

	this.startGame();

}

Booter.prototype.startGame = function(){
	this.phaserGame.state.start('Main');
}