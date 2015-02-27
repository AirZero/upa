
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
var PICTURE_PATH = 'assets/pictures/';


var phaserGame;
var game;
var menu;
var BASE_STYLE = { font: '32px Arial', fill: '#ff0044', align: 'center' };
var NATION_TEXT_STYLE = { font: '26px Arial', fill: '#111111', align: 'center' };
var state;
var playerPrefs = new PlayerPrefs(); //TODO: assess if global access is the best or should not be object or etc..

init();

/**
 * init function sets up the phaserGame and is the inner starting point of the program.
 * not to be called separately
 */
function init(){
	if(debugOn)
	phaserGame = new Phaser.Game(lvlWidth, lvlHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render : render });
	else
	phaserGame = new Phaser.Game(lvlWidth, lvlHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update});
}

/**
 * reset returns the state of the game to the starting point of the game.
 */
function reset(){
	phaserGame.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	phaserGame.world.setBounds(0,0, lvlWidth, lvlHeight);
	phaserGame.camera.scale.x = 1;
	phaserGame.camera.scale.y = 1;
	phaserGame.stage.backgroundColor = '#000000'; //TODO: stagejen välillä siirtyminen
}

/**
 * preload is the phasers inner preload method that is used for loading all the assets and setting up Game and Menu classes
 */
function preload()
{
	if(debugOn){
		phaserGame.time.advancedTiming = true;
		var type = phaserGame.renderType;
		if(type === Phaser.CANVAS)
			alert('CanvasRenderer was used');
		else if(type === Phaser.WEBGL)
			alert('WebGL was used');
		else
			alert('HeadlessRenderer was used');
	}
	reset();
	phaserGame.load.spritesheet('button', 'assets/pictures/buttons2.png', 100, 100);
	//phaserGame.load.image('finland', 'assets/pictures/finland.png');
	phaserGame.load.image('dialogBack', 'assets/pictures/dialogBack.png');
	phaserGame.load.image('bar', 'assets/pictures/Bar.png');
	preloadGame();
	preloadMenu();
}

/**
 * preloads the Game-class.
 * initializes it and calls its preload.
 */
function preloadGame(){
	game = new Game(phaserGame);
	game.preload();
}


/**
 * preloadMenu preloads the Menu-class.
 *
 */
function preloadMenu(){
	//var titles = ['Pelaa', 'Asetukset', 'Tiedot'];
	//var methods = new Array();
	//methods[0] = {'method': function(){ start();}};
	//methods[1] = { 'method': function(){ settings();}};
	//methods[2] = { 'method': function(){ info();}};
	//var pictures = [ 'button' ];
	menu = new Menu(phaserGame, 50, 20, 20);
	//reMenu();
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
function create(){
	reMenu();

}

/**
 * Phasers update. 
 * Directs update to the associated classes that have controller
 * TODO: states/stages
 */
function update(){
	if(state === 'Game')
		game.update();
	
}

/**
 * Defines the "Tiedot" menu proportion.
 */
function info(){
	var titles = ['Ohjelmointi: Tero Paavolainen,', 'Eetu Rantakangas', 'Sisällöntuottaminen: Jarno Liski', 'Projektinjohtaja: Olli-Pekka Paajanen', 'Journalisti-tietotekniikko: Riikka Valtonen', 'Takaisin'];
	var methods = new Array();
	methods[0] = {'method': function(){
		var dialog = new Dialog(phaserGame, 'Siirrytäänkö Teron kotisivuille?', function(){ window.location.replace('http://users.jyu.fi/~tesatapa/');},function(){});
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
		var dialog = new Dialog(phaserGame, 'Herp', function(){}, function(){});
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
	}
	methods[2] = { 'method': function(){ settings();}};
	menu.create(titles, methods);

}


/**
 * Associated method for phasers render. Uses debug to show information regarding the game states
 */
function render(){
	phaserGame.debug.pointer(phaserGame.input.activePointer);
	phaserGame.debug.text("FPS:"+phaserGame.time.fps, 600, 200);

}

/**
 * Starts the game
 */
function start(){
	menu.clear();
	state = 'Game';
	game.start();
}

