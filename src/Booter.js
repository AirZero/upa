
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * A state class used for preloading the music and the logo,
 * Logo is loaded so it can be used in the actual loading state and the music so that it can be decoded in time.
 */

function Booter(phaserGame){
	this.phaserGame = phaserGame;
	
}


/**
 * NOT USED
 */
Booter.prototype.init = function(){
	
}

/**
 * Loads the required assets
 */
Booter.prototype.preload = function(){
	this.phaserGame.load.image('logo', PICTURE_PATH+'PelinLogo.png');
	this.phaserGame.load.audio('music', SOUND_PATH+'WarLow.ogg');
}

/**
 * starts the game state after booterloading is done
 */
Booter.prototype.create = function(){

	this.startGame();

}


/**
 * The actual game and its states can commence now.
 */
Booter.prototype.startGame = function(){
	this.phaserGame.state.start('Main');
}