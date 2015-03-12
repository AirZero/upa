
/**
 * Created by Tero Paavolainen
 *
 */

/**
 * Class used for creation of the nations.
 * Is responsible for the states, functions and data regarding nations of the game
 */

function Nations(phaserGame){
	//this.phaserGame = phaserGame;
	//this.layer = layer;
	//this.amount = amount;
	this.nationsSizeMultiplier = 1;
	this.nations = [];
	this.phaserGame = phaserGame;


	this.onNationClick = null;
}



Nations.prototype.setActive = function(activity){
	for(nationName in this.nations){
		this.nations[nationName].setActive(activity);
	}
}


/**
 * Preloads data needed by Nations
 */
Nations.prototype.preload = function(){
	this.preloadNationData();
}



Nations.prototype.addOnNationClickHandler = function(method){
	this.onNationClick = method;
}


/**
 * 
 */
Nations.prototype.increaseMaxRefugeeAmountsByData = function(data){
	//TODO: see if this can be optimised somehow
	for(dataQuery in data.data){
		var nation = this.nations[data.data[dataQuery].name];
		//Probably not needed if-statement
		if(nation)
			nation.increaseMaxRefugeeAmount(data.data[dataQuery].amount);
	}
}



/**
 * 
 */
Nations.prototype.increaseMaxRefugeeAmounts = function(amount){

	for(nationName in this.nations){
		this.nations[nationName].increaseMaxRefugeeAmount(amount);
	}
}



/**
 * Defines what is to happen when the nations are clicked
 */




/**
 * Loads the images needed for the nations in the game
 */
Nations.prototype.preloadNationData = function(){
	//this.phaserGame.load.text('nationsJSON', DATA_PATH+'nations.json');
	//this.phaserGame.load.onLoadComplete.add(this.loadNationData, this, 9999);
	this.loadNationData();	
}


/**
 * The actual function that loads the pictures for nations
 */
Nations.prototype.loadNationData = function(){
	//this.nationsData = JSON.parse(this.phaserGame.cache.getText('nationsJSON')).nations;
	var jsonNations = getJsonFromNationsData();
	this.nationsData = jsonNations.nations;
	this.nationsSizeMultiplier = jsonNations.sizeMultiplier;
	for(var i = 0; i < this.nationsData.length; i++){
		this.phaserGame.load.image(this.nationsData[i].sprite,PICTURE_PATH + this.nationsData[i].sprite+".png");
	}
}

/**
 * Creates nations according to the data loaded
 */
Nations.prototype.createNations = function(layer, textLayer){
	//this.loadNationData();
	for(var i = 0; i < this.nationsData.length; i++){
		var nationData = this.nationsData[i];
		//Done to keep the original data intact.
		//TODO: create better approach without direct calling of attributes
		
		//Seems to be better than the approach added earlier since no functions are needed.
		var modifiedNationData = JSON.parse( JSON.stringify( nationData ) );
		//var modifiedNationData = {
		//	"name": nationData["name"],
		//	"x":  nationData["x"],
		//	"y": nationData["y"],
		//	"width": nationData["width"],
		//	"height": nationData["height"],
		//	"rotation": nationData["rotation"],
		//	"sprite": nationData["sprite"]
		//};
		modifiedNationData.width = modifiedNationData.width * this.nationsSizeMultiplier;
		modifiedNationData.height = modifiedNationData.height * this.nationsSizeMultiplier;
		var x = this.parseNationX(modifiedNationData);
		var y = this.parseNationY(modifiedNationData);
		this.createNation(layer, textLayer, x, y, modifiedNationData);

	}
}


/**
 * Creates a new nation based on the given parameters and its it as this child
 */
Nations.prototype.createNation = function(layer, textLayer, x, y, nationData){
	//TODO: Add an option to define the text position compared to the nations eg. anchor for text. See also what is ready for it
	//var nation = new Nation(this.phaserGame, nationData.x, nationData.y, nationData.name, nationData.sprite);
	this.textLayer = textLayer;
	var nation = new Nation(this.phaserGame, x, y, nationData.name, nationData.sprite, 10000);
	//var nationSize = this.parseNationSize(nation, nationData.width, nationData.height);
	nation.setWidth(nationData.width);
	nation.setHeight(nationData.height);
	nation.angle = nationData.rotation;
	//this.addToObjects(nation);
	nation.inputEnabled = true;
	nation.events.onInputDown.add(this.handleNationClick, this);
	nation.setAutoCulling(true);
	layer.add(nation);
	textLayer.add(nation.text);
	nation.setTextVisibility(playerPrefs.getNumber("showNames"));
	this.nations[nation.name] = nation;
	
}

/**
 * Handles a click on nation
 */
Nations.prototype.handleNationClick = function(nation){
	if(nation.active)
		if(this.onNationClick)
			this.onNationClick.process(nation);
	
}

/**
 * Parses the nations size from stringful information
 */
Nations.prototype.parseNationSize = function(nation, width, height){
	//TODO: ponder if necessary, most likely will not be with spritesheet and spritesheet is probably the better approach
	var size = {
		"width":0,
		"height":0
	};
	if(isNaN(width)){
		if(width.substr(width.length -2) === 'x'){
			size.width = parseFloat(width.substr(0,width.length -2)) * nation.width;
		}
	}
	else
		size.x = width;
	if(isNaN(height)){
		if(height.substr(height.length -2) === 'x'){
			size.height = parseFloat(height.substr(0,height.length -2)) * nation.height;
		}
	}
	else
		size.y = height;
	return size;
}

/**
 * Fixes the nations datas X coordinate depending on if its number or a string
 */
Nations.prototype.parseNationX = function(nationData){
	if(isNaN(nationData.x)){
		var scripts = nationData.x.split(",");
		var relationStrings = scripts[0].split(":");
		
		//Fetches the nation from the nations array
		var relativeNation = this.nations[relationStrings[1]];
		//calculates the x depending on if the modifier is left or right
		var dataObject = {
			"Percent": 0,
			"x": 0
		};
		
		this.parseScripts(nationData, dataObject, scripts, relativeNation);
		var multiplier = 0;
		if(!(relationStrings[0] === "Same"))
			multiplier = relationStrings[0] === "Left" ? -1 : 1;
		if(relativeNation)
			dataObject.x += relativeNation.x + multiplier * (nationData.width * 0.5 + relativeNation.width * 0.5) + dataObject.Percent * nationData.width;
		else
			dataObject.x += dataObject.Percent * nationData.width;
		
		return dataObject.x;
	}
	return nationData.x;
}


/**
 * Fixes the nations datas X coordinate depending on if its number or a string
 */
Nations.prototype.parseNationY = function(nationData){
	if(isNaN(nationData.y)){
		var scripts = nationData.y.split(",");
		var relationStrings = scripts[0].split(":");
		//Fetches the nation from the nations array
		var relativeNation = this.nations[relationStrings[1]];

		var dataObject = {
			"Percent": 0,
			"x": 0
		};

		this.parseScripts(nationData, dataObject, scripts, relativeNation);
		
		var multiplier = 0;
		if(!(relationStrings[0] === "Same"))
			multiplier = relationStrings[0] === "Up" ? -1 : 1;
		
		//calculates the y depending on if the modifier is up or down
		dataObject.x += relativeNation.y + multiplier * (nationData.height * 0.5 + relativeNation.height * 0.5) + dataObject.Percent * nationData.height;
		
		return dataObject.x;
	}
	return nationData.y;
}


/**
 * Parses the scripts in nations data so the nation can be made from the data
 */
Nations.prototype.parseScripts = function(nationData, dataObject, scripts, relativeNation){
	for(var i = 1; i < scripts.length;i++){
		var scriptData = scripts[i].split(":");
		switch(scriptData[0]){
			case "Percent":
				var asFloat = parseFloat(scriptData[1]);
				dataObject.Percent = asFloat * 0.01;
				break;
			case "Add":
					dataObject.x += parseFloat(scriptData[1]);
				break;
			case "Border":
				switch(scriptData[1]){
					case "Right":
						dataObject.x += worldWidth - nationData.width * 0.5;
						break;
					default:
						break;
				}
			default:
				break;
	
		}
	}
	
}
