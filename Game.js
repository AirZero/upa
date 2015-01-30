

var lvlWidth = 800;
var lvlHeight = 600;
var game;
var menu;

init();

function init(){
	game = new Phaser.Game(lvlWidth, lvlHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });	
}

function preload()
{
	game.load.spritesheet('button', 'buttons2.png', 100, 100);
	game.load.image('star', 'star.png');
	
	preloadMenu();
}

function preloadMenu(){
	var titles = ["Pelaa", "Asetukset", "Tiedot"];
	var methods = new Array();
	methods[0] = {"method": function(){ start();}};
	methods[1] = { "method": function(){ settings();}};
	methods[2] = { "method": function(){ info();}};
	var pictures = [ 'button' ];
	menu = new Menu(titles, methods, pictures, game, 50, 20, 20);
}

function reMenu(){
	var titles = ["Pelaa", "Asetukset", "Tiedot"];
	var methods = new Array();
	methods[0] = {"method": function(){ start();}};
	methods[1] = { "method": function(){ settings();}};
	methods[2] = { "method": function(){ info();}};
	var pictures = [ 'button'];
	menu.create(titles, methods);
}



function create(){
	menu.start();
	game.stage.backgroundColor = '#339933';

}


function update(){

}

function info(){
	var titles = ["Ohjelmointi: Tero Paavolainen,", "Eetu Rantakangas", "Sisällöntuottaminen: Jarno Liski", "Projektinjohtaja: Olli-Pekka Paajanen", "Journalisti-tietotekniikko: Riikka Valtonen", "Takaisin"];
	var methods = new Array();
	methods[0] = {"method": function(){ window.location.replace("http://users.jyu.fi/~tesatapa/") }};
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
	methods[1] = { "method": function(){ }};
	methods[2] = { "method": function(){ reMenu();}};
	menu.create(titles, methods);
}


function start(){
	for(var i = 0; i < 1; i++){
		var star = game.add.sprite(game.rnd.integerInRange(0, 800),game.rnd.integerInRange(0, 600), 'star');
	}
}

