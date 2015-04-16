
/**
 * This class is the controller class of the program. It defines the interaction
 * between the Menu and the Game and their states and is also the place to define
 * constants and globals.
 */


var lvlWidth = 800;
var lvlHeight = 600;
var worldWidth = 1500;
var worldHeight = 1500;
var TIME_FOR_DOUBLECLICK = 0.3;
var DIALOG_INPUTPRIORITY = 2;
var BUTTON_INPUTPRIORITY = 2;
var DATA_PATH = 'assets/data/';
var SOUND_PATH = 'assets/sounds/';
var PICTURE_PATH = 'assets/pictures/';


var phaserGame;
var menu;
var BASE_STYLE = { font: '32px Arial', fill: '#ff0044', align: 'center' };
var SMALL_STYLE = {font: '22px Arial', fill: '#aa1122', align: 'center' };
var NATION_TEXT_STYLE = { font: '26px Arial', fill: '#111111', align: 'center' };
var BIG_WHITE_STYLE = { font: '48px Arial', fill: '#FFFFFF', align: 'center' };
var state;
var playerPrefs = new PlayerPrefs(); //TODO: assess if global access is the best or should not be object or etc..

init();


function Main(phaserGame){
	this.phaserGame = phaserGame;
}

Main.prototype.preload = function(){
	this.loadingSprite = this.phaserGame.add.sprite(lvlWidth *0.5, lvlHeight *0.5, 'logo');
	this.loadingSprite.anchor.setTo(0.5,0.5);
	//this.loadingSprite.width = lvlWidth;
	//this.loadingSprite.height = lvlHeight;
	this.loadingSprite.fixedToCamera = true;
	//We dont need the bar interaction and that probably is the only thing done by this.
	//this.phaserGame.load.setPreloadSprite(this.loadingSprite);
	
	this.preloadAssets();
}

Main.prototype.preloadAssets = function(){
	this.reset();
	phaserGame.load.spritesheet('button', PICTURE_PATH+'buttonsWithUp.png', 100, 100);
	phaserGame.load.spritesheet('fullscreenButton', PICTURE_PATH+'fullscreenButtons.png', 100, 100);
	phaserGame.load.spritesheet('switch', PICTURE_PATH+'switchButtons.png', 100, 100);
	//phaserGame.load.image('finland', 'assets/pictures/finland.png');
	phaserGame.load.audio('error', SOUND_PATH+'ErrorNew.wav');
	phaserGame.load.audio('music', SOUND_PATH+'War.ogg');
	phaserGame.load.image('dialogBack', PICTURE_PATH+'dialogBack.png');
	phaserGame.load.image('bar', PICTURE_PATH+'TransparentBar.png');
	phaserGame.load.image('solidBar', PICTURE_PATH+'Bar.png');
	phaserGame.load.spritesheet('shade', PICTURE_PATH+'Shade.png', 200, 200);
	phaserGame.load.image('textFeed', PICTURE_PATH+'Uutispalkki.png');
	phaserGame.load.image('hunam', PICTURE_PATH+'Hunam.png');
	phaserGame.load.image('ball', PICTURE_PATH+'StateBall.png');
	phaserGame.load.image('infoLabel', PICTURE_PATH+'YlempiPalkki.png');
	phaserGame.load.image('progress', PICTURE_PATH+'progress.png');
	phaserGame.load.image('arrow', PICTURE_PATH+'arrow.png');
	phaserGame.load.image('info', PICTURE_PATH+'RefugeeAmountInfo.png');
	this.preloadGame();
	this.preloadMenu();
}


/**
 * preloads the Game-class.
 * initializes it and calls its preload.
 */
Main.prototype.preloadGame = function(){
	this.game = new Game(phaserGame);
	this.game.preload();
}


/**
 * preloadMenu preloads the Menu-class.
 *
 */
Main.prototype.preloadMenu = function(){
	//var titles = ['Pelaa', 'Asetukset', 'Tiedot'];
	//var methods = new Array();
	//methods[0] = {'method': function(){ start();}};
	//methods[1] = { 'method': function(){ settings();}};
	//methods[2] = { 'method': function(){ info();}};
	//var pictures = [ 'button' ];
	menu = new Menu(phaserGame, 50, 20, 20);
	//reMenu();
}



Main.prototype.reset = function(){
	this.phaserGame.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.phaserGame.world.setBounds(0,0, lvlWidth, lvlHeight);
	this.phaserGame.camera.scale.x = 1;
	this.phaserGame.camera.scale.y = 1;
	this.phaserGame.stage.backgroundColor = '#000000'; 
}


Main.prototype.create = function(){
	this.start();
}

Main.prototype.update = function(){
	if(state === 'Game')
		this.game.update();
}


/**
 * Starts the game
 */
Main.prototype.start = function(){
	menu.clear();
	state = 'Game';
	this.game.start();
	this.loadingSprite.destroy();
}


/**
 * init function sets up the phaserGame and is the inner starting point of the program.
 * not to be called separately
 */
function init(){
	var renderMode = Phaser.AUTO;
	phaserGame = new Phaser.Game(lvlWidth, lvlHeight, renderMode, '');
	phaserGame.antialias = true;
	phaserGame.state.add('Main', new Main(phaserGame));
	phaserGame.state.add('Booter', new Booter(phaserGame));
	phaserGame.state.start('Booter');

}


/**
 * This can be used to reinitialize the menu. This is the starting screen of the program also
 */
function reMenu(){
	state = 'Menu';
	reset();
	var titles = ['Pelaa', 'Asetukset', 'Tiedot'];
	var methods = new Array();
	methods[0] = {'method': function(){ start();}};
	methods[1] = { 'method': function(){ settings();}};
	methods[2] = { 'method': function(){ info();}};
	var pictures = [ 'button'];
	menu.create(titles, methods, pictures);
}


/**
 * Method associated with Phasers create. Sets up the starting screen of the game
 */


/**
 * Phasers update. 
 * Directs update to the associated classes that have controller
 * TODO: states/stages
 */


/**
 * Defines the "Tiedot" menu proportion.
 */
function info(){
	var titles = ['Ohjelmointi: Tero Paavolainen,', 'Eetu Rantakangas', 'Sisällöntuottaminen: Jarno Liski', 'Projektinjohtaja: Olli-Pekka Paajanen', 'Journalisti-tietotekniikko: Riikka Valtonen', 'Takaisin'];
	var methods = new Array();
	methods[0] = {'method': function(){
		var dialog = new Dialog(phaserGame, 'Siirrytäänkö Teron kotisivuille?', [function(){ window.location.replace('http://users.jyu.fi/~tesatapa/');},function(){}], ["Kyllä", "Ei"]);
		dialog.silence(menu);
	}};
	methods[1] = { 'method': function(){ }};
	methods[2] = { 'method': function(){ }};
	methods[3] = { 'method': function(){ }};
	methods[4] = { 'method': function(){ }};
	methods[5] = { 'method': function(){ reMenu();}};
	menu.create(titles, methods);
}


/**
 * Defines the "Asetukset" menu proportion.
 */
function settings(){
	var titles = ['Äänet','Näyttö', 'Modit', 'Takaisin'];
	var methods = new Array();
	methods[0] = {'method': function(){ }};
	methods[1] = {'method': function(){
		screenSettings();
	}};
	methods[2] = { 'method': function(){ 
		var dialog = new Dialog(phaserGame, 'Herp', [function(){}], ["OK..."] );
		dialog.silence(menu);
	}};
	methods[3] = { 'method': function(){ reMenu();}};
	menu.create(titles, methods);
}


/**
 * Defines the screen settings menu proportion.
 */
function screenSettings(){
	var titles = ['Kokonäytön tila',
	//Notice the parenthese around the ternary, this is required or else the start of the string will be absorped to the condition
	"Näytä maiden nimet " + (playerPrefs.getNumber("showNames") ? "X" : "_"),
	"Liikkuva kartta " + (playerPrefs.getNumber("moveMap") ? "X" : "_"),
	"Tuplaklikkaus päällä " + (playerPrefs.getNumber("doubleClickOn") ? "X" : "_"),
	'Takaisin'];
	xName = null;
	var methods = new Array();
	methods[0] = {'method': function(){
		phaserGame.scale.startFullScreen();
	}};
	methods[1] = { 'method': function(){
		playerPrefs.set("showNames", playerPrefs.getNumber("showNames") ? 0 : 1);
		screenSettings();
		}
	};
	methods[2] = { 'method': function(){
		playerPrefs.set("moveMap", playerPrefs.getNumber("moveMap") ? 0 : 1);
		screenSettings();
		}
	};
	methods[3] = { 'method': function(){
		playerPrefs.set("doubleClickOn", playerPrefs.getNumber("doubleClickOn") ? 0 : 1);
		screenSettings();
		}
	};
	methods[4] = { 'method': function(){ settings();}};
	menu.create(titles, methods);

}




