
/**
 * Class that handles all the problems in the refugee camps
 */
function RefugeeProblemHandler (game){
	this.problems = getJsonFromProblemData().problems;
	this.problemHandlers = [];
	this.game = game;
	this.numberAndPercentRegex = new RegExp("([0-9])+%");
}

/**
 * Adds a new handler for when a problem occurs
 */
RefugeeProblemHandler.prototype.addProblemHandler = function(method, callBackClass){
	this.problemHandlers[this.problemHandlers.length] = new EventHandler(method, callBackClass);
}

/**
 * Clears this and all the memory associated with it
 */
RefugeeProblemHandler.prototype.clear = function(){
	this.problemHandlers = [];	
}


/**
 * Needs to be called when day changes so the problems can occur
 */
RefugeeProblemHandler.prototype.dayChanged = function(refugees){
	for(problemName in this.problems){
		var problem = this.problems[problemName];
		if(problem.treshold <= refugees)
			if(problem.chance >= (this.game.rnd.frac() * 100)){
				this.invokeProblem(refugees, problem);
			}
	}
}

/**
 * Parses the data into useable format removing the strings
 */
RefugeeProblemHandler.prototype.parseProblemData = function(problemData, refugees){
	var problem;
	if(isNaN(problemData.deathToll))
		var stringDeathToll = problemData.deathToll;
		if(this.numberAndPercentRegex.test(stringDeathToll)){
			var deathTollAmount = parseFloat(problemData.deathToll.substr(0, problemData.deathToll.length -1)) * 0.01 * refugees;
			problem = new RefugeeProblem(problemData.name, deathTollAmount);
			return problem;
			
		}
	else
		problem = new RefugeeProblem(problemData.name, problemData.deathToll);
	return problem;
}


/**
 * Invokes the problem with refugeebased data
 */
RefugeeProblemHandler.prototype.invokeProblem = function(refugees, problemData){
	//var problemData = this.game.rnd.pick(this.problems);
	var problem = this.parseProblemData(problemData, refugees);
	
//TODO: file for problems	
	//this.problems.push(problem);
	for(var i = 0; i<this.problemHandlers.length; i++){
		this.problemHandlers[i].process(problem);
	}
	
}