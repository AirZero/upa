
/**
 * Class meant to define access to the storaged preferences of the player.
 * For example can be used to store information of the decisions made by player or to store game states.
 */


function PlayerPrefs(){
	//TODO: boolean storing with bytes from int
}


/**
 * Returns the string-value associated with the given key 
 * @params key used to find the value from the localStorage
 * @returns value associated with key
 */
PlayerPrefs.prototype.get = function(key){
	var value = localStorage.getItem(key);
	return value;
}

/**
 * Returns the number-value associated with the given key 
 * @params key used to find the value from the localStorage
 * @returns value associated with key in number format
 */
PlayerPrefs.prototype.getNumber = function(key){
	var value = this.get(key);
	value = parseInt(value);
	//TODO: parse
	return value;
}

/**
 * Stores the key value pair into the localStorage
 * @params key used to store the value in the localStorage
 * @params value associated data bound to the key
 */
PlayerPrefs.prototype.set = function(key, value){
	localStorage.setItem(key, value);
	
}