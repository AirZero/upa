

function NationState(maxRefugees){
	this.nationState = NATIONSTATE.states[0];
	this.maxRefugees = maxRefugees;
	this.refugees = 0;
}


NationState.prototype.tintNormal = function(nation){
	nation.tint = this.nationState.tint;
}


NationState.prototype.updateState = function(refugees, nation){
	this.refugees = refugees;
	//TODO: no passing nation as argument but event
	//To avoid multiple divisions since it is not necessary 
	var refugeePercent = this.refugees / this.maxRefugees;
	for(stateName in NATIONSTATE.states){
		var nationState = NATIONSTATE.states[stateName];
		if((nationState.amount * 0.01) <= refugeePercent && nationState.amount > this.nationState.amount)
		{
			this.nationState = nationState;
			nation.tint = nationState.tint;
		}
		
	}
}