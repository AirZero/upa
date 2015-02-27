

function GameEventHandler(phaserGame){
	this.events = [];
	//Needed for randoms for example, its good practice to use same place for all randoms.
	this.phaserGame = phaserGame;
	this.onEventProcess = [];
	
}

GameEventHandler.prototype.addOnEventProcessingHandler = function(handler, callBackClass){
	//TODO: a class from these objects
	this.onEventProcess.push(new EventHandler(handler, callBackClass));
	
}

GameEventHandler.prototype.clear = function(){
	this.onEventProcess = [];
	
}

GameEventHandler.prototype.preload = function(){
	var jsonEvents = getJsonFromEventsData();
	var events = jsonEvents.events
	for(eventName in events)
	{
		this.events.push(events[eventName]);
	}
}


GameEventHandler.prototype.checkForEventsOnTimeChange = function(day, month, year){
	//TODO: this needs some kind of statemachine/language far beyond current skill and time
	
	this.checkForEventTick(day, month, year)
	
	
}


GameEventHandler.prototype.checkForEventTick = function(args){
	//Will be this way as long as eventhandler cant send it better way
	var day = args[0];
	var month = args[1];
	var year = args[2];
	for(eventName in this.events){
		var event = this.events[eventName];
		//We start by splitting the events date into a readable format
		var dateSplitted = event.date.split(".");
		var eventsDay = this.parseIfNumber(dateSplitted[0]); //TODO: checking if everythings fine, currently though everything is assumed to be written right
		var eventsMonth = this.parseIfNumber(dateSplitted[1]);
		var eventsYear = this.parseIfNumber(dateSplitted[2]);
		if(this.eventDateMatch(day, month, year, eventsDay, eventsMonth, eventsYear)){
			var chance = this.phaserGame.rnd.integerInRange(1, 100); //includes 100, chance of 0 should never happen, hence 1-100
			if(event.chance >= chance){
				for(methodName in this.onEventProcess){
					this.onEventProcess[methodName].process(event);
				}
				//TODO: magix
			}
		}
	}
	
}



GameEventHandler.prototype.parseAndProcessEffect = function(effect){
	alert(effect.effect);
}



GameEventHandler.prototype.parseIfNumber = function(toParse){
	return isNaN(toParse) ? toParse : parseFloat(toParse)
	
}

GameEventHandler.prototype.eventDateMatch = function(day, month, year, eDay, eMonth, eYear){
	//TODO: is ugly.. why so ugly..? Maybe arrays or something to make beauty code?
	if(eDay !== day && eDay !== 'x')
		return false;
	if(eMonth !== month && eMonth !== 'x')
		return false;
	if(eYear !== year && eYear !== 'x')
		return false;
	
	return true;
}




