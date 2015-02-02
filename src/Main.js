

const lvlWidth = 800;
const lvlHeight = 600;
var phaserGame;
var game;
var menu;
const BASE_STYLE = { font: "32px Arial", fill: "#ff0044", align: "center" };

init();

function init(){
	phaserGame = new Phaser.Game(lvlWidth, lvlHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });	
}

function preload()
{
	phaserGame.load.spritesheet('button', 'assets/buttons2.png', 100, 100);
	phaserGame.load.image('star', 'assets/star.png');
	phaserGame.load.image('dialogBack', 'assets/dialogBack.png');
	preloadGame();
	preloadMenu();
}

function preloadGame(){
	game = new Game(phaserGame);
	game.preload();
}


function preloadMenu(){
	//var titles = ["Pelaa", "Asetukset", "Tiedot"];
	//var methods = new Array();
	//methods[0] = {"method": function(){ start();}};
	//methods[1] = { "method": function(){ settings();}};
	//methods[2] = { "method": function(){ info();}};
	//var pictures = [ 'button' ];
	menu = new Menu(phaserGame, 50, 20, 20);
	//reMenu();
}

function reMenu(){
	var titles = ["Pelaa", "Asetukset", "Tiedot"];
	var methods = new Array();
	methods[0] = {"method": function(){ start();}};
	methods[1] = { "method": function(){ settings();}};
	methods[2] = { "method": function(){ info();}};
	var pictures = [ 'button'];
	menu.create(titles, methods, pictures);
}



function create(){
	reMenu();
	phaserGame.stage.backgroundColor = '#000000';

}


function update(){

}

function info(){
	var titles = ["Ohjelmointi: Tero Paavolainen,", "Eetu Rantakangas", "Sisällöntuottaminen: Jarno Liski", "Projektinjohtaja: Olli-Pekka Paajanen", "Journalisti-tietotekniikko: Riikka Valtonen", "Takaisin"];
	var methods = new Array();
	methods[0] = {"method": function(){ var dialog = new Dialog(phaserGame, "Siirrytäänkö Teron kotisivuille?", function(){ window.location.replace("http://users.jyu.fi/~tesatapa/");},function(){});
	dialog.silence(menu);	}};
	methods[1] = { "method": function(){ }};
	methods[2] = { "method": function(){ }};
	methods[3] = { "method": function(){ }};
	methods[4] = { "method": function(){ }};
	methods[5] = { "method": function(){ reMenu();}};
	menu.create(titles, methods);
}

function settings(){
	var titles = ["Äänet", "Modit", "Takaisin"];
	var methods = new Array();
	methods[0] = {"method": function(){ }};
	methods[1] = { "method": function(){ 
		var dialog = new Dialog(phaserGame, "Herp", function(){}, function(){});
		dialog.silence(menu);
	}};
	methods[2] = { "method": function(){ reMenu();}};
	menu.create(titles, methods);
}


function start(){
	menu.clear();
	game.start();

}

