

function RefugeeProblemHandler (game){
	this.problems = getJsonFromProblemData().problems;
	this.problemHandlers = [];
	this.game = game;
	this.numberAndPercentRegex = new RegExp("([0-9])+%");
}

RefugeeProblemHandler.prototype.addProblemHandler = function(method, callBackClass){
	this.problemHandlers[this.problemHandlers.length] = new EventHandler(method, callBackClass);
}



RefugeeProblemHandler.prototype.clear = function(){
	this.problemHandlers = [];	
}



RefugeeProblemHandler.prototype.dayChanged = function(refugees){
	for(problemName in this.problems){
		var problem = this.problems[problemName];
		if(problem.treshold <= refugees)
			if(problem.chance >= (this.game.rnd.frac() * 100)){
				this.invokeProblem(refugees, problem);
			}
	}
}

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



RefugeeProblemHandler.prototype.invokeProblem = function(refugees, problemData){
	//var problemData = this.game.rnd.pick(this.problems);
	var problem = this.parseProblemData(problemData, refugees);
	
//TODO: file for problems	
	//this.problems.push(problem);
	for(var i = 0; i<this.problemHandlers.length; i++){
		this.problemHandlers[i].process(problem);
	}
	
}