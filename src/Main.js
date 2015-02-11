

var lvlWidth = 800;
var lvlHeight = 600;
var worldWidth = 2000;
var worldHeight = 2000;
var DIALOG_INPUTPRIORITY = 2;
var BUTTON_INPUTPRIORITY = 2;

var phaserGame;
var game;
var menu;
var BASE_STYLE = { font: '32px Arial', fill: '#ff0044', align: 'center' };
var state;

init();

function init(){
	phaserGame = new Phaser.Game(lvlWidth, lvlHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render : render });	
	
}


function reset(){
	phaserGame.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	phaserGame.world.setBounds(0,0, lvlWidth, lvlHeight);
	phaserGame.camera.scale.x = 1;
	phaserGame.camera.scale.y = 1;
}


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
	phaserGame.load.spritesheet('button', 'assets/buttons2.png', 100, 100);
	phaserGame.load.image('land', 'assets/FinlandWithoutBackground.svg');
	phaserGame.load.image('dialogBack', 'assets/dialogBack.png');
	phaserGame.load.image('europe', 'assets/EuropeHuge.png');
	preloadGame();
	preloadMenu();
}

function preloadGame(){
	game = new Game(phaserGame);
	game.preload();
}


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



function create(){
	reMenu();
	phaserGame.stage.backgroundColor = '#000000';

}


function update(){
	if(state === 'Game')
		game.update();
	
}

function info(){
	var titles = ['Ohjelmointi: Tero Paavolainen,', 'Eetu Rantakangas', 'Sisällöntuottaminen: Jarno Liski', 'Projektinjohtaja: Olli-Pekka Paajanen', 'Journalisti-tietotekniikko: Riikka Valtonen', 'Takaisin'];
	var methods = new Array();
	methods[0] = {'method': function(){ var dialog = new Dialog(phaserGame, 'Siirrytäänkö Teron kotisivuille?', function(){ window.location.replace('http://users.jyu.fi/~tesatapa/');},function(){});
	dialog.silence(menu);
	}};
	methods[1] = { 'method': function(){ }};
	methods[2] = { 'method': function(){ }};
	methods[3] = { 'method': function(){ }};
	methods[4] = { 'method': function(){ }};
	methods[5] = { 'method': function(){ reMenu();}};
	menu.create(titles, methods);
}

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


function screenSettings(){
	var titles = ['Kokonäytön tila','Takaisin'];
	var methods = new Array();
	methods[0] = {'method': function(){
		phaserGame.scale.startFullScreen();
	}};
	methods[1] = { 'method': function(){ settings();}};
	menu.create(titles, methods);

}


function render(){
	if(debugOn){
		phaserGame.debug.pointer(phaserGame.input.activePointer);
		phaserGame.debug.text("FPS:"+phaserGame.time.fps, 600, 200);
	}
}



function start(){
	menu.clear();
	state = 'Game';
	game.start();
}

