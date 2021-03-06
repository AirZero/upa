
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * Handles the understanding of state of the nation in contrast to how many refugees are living in there.
 * Is responsible for tinting and acting based on nationStateData.js
 */

function NationState(maxRefugees){
	this.nationState = NATIONSTATE.states[0];
	this.maxRefugees = maxRefugees;
	this.refugees = 0;
}


/**
 * Tints the object based current state of the nation
 */
NationState.prototype.tintNormal = function(nation){
	if(nation.getInProcess())
		this.tintSelected(nation);
	else
		this.tintOnState(nation);
}


/**
 * Updates the nations state based on the state in its in.
 * Not totally good OO-programming.
 */
NationState.prototype.tintOnState = function(nation){
	nation.tint = this.nationState.tint;
}

/**
 * Tint the current nation selected.
 */
NationState.prototype.tintSelected = function(nation){
	nation.tint = 0x0299FF;

}



/**
 * Updates the state of the nation based on given amounts of refugees and max refugees
 */
NationState.prototype.updateState = function(maxRefugees, refugees, nation){
	this.maxRefugees = maxRefugees;
	this.refugees = refugees;
	//TODO: no passing nation as argument but event also optimize the hell out of this.. not like it needs it.. but maybe?
	//To avoid multiple divisions since it is not necessary 
	var refugeePercent = 0;
	if(this.maxRefugees <= 0 || this.refugees > this.maxRefugees)
		refugeePercent = 100;
	else
		refugeePercent = this.refugees / this.maxRefugees;
	if(refugeePercent < (this.nationState.amount * 0.01))
		this.nationState = NATIONSTATE.states[0];
	for(stateName in NATIONSTATE.states){
		var nationState = NATIONSTATE.states[stateName];
		if((nationState.amount * 0.01) <= refugeePercent && nationState.amount > this.nationState.amount)
		{
			this.nationState = nationState;
		}
		
	}
	this.tintNormal(nation);
	
}