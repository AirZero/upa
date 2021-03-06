
/**
 * Author: Tero Paavolainen
 * Version: 1.0.0
 */

/**
 * Handles the movement in-game using touch or mouse
 *
 */


function MouseMovement (phaserGame, cameraMovementSpeed){
	this.phaserGame = phaserGame;
	this.cameraMovementSpeed = cameraMovementSpeed;
	
	this.active = true;
	this.pointerXMovement = null;
	this.pointerYMovement = null;
	
}


/**
 * Sets the activity for mousemovements component
 */
MouseMovement.prototype.setActive = function(activity){
	this.active = activity;
}

/**
 * Observes the states of the input devices and manages movement according to this information.
 * Needs to be called by the parent of this object.
 */
MouseMovement.prototype.update = function(){
	if(!this.active) return;
	var pointer = this.phaserGame.input.activePointer;
	if (this.phaserGame.input.activePointer.isDown)
    {

		if(!this.pointerXMovement){
			this.pointerXMovement = pointer.x;
			this.pointerYMovement = pointer.y;
			return;
		}
			
		//const lvlMiddleX = lvlWidth * 0.5;
		//const lvlMiddleY = lvlHeight * 0.5;
		
		//Click to move approach
		//var x = (pointer.x - 0.5 * lvlWidth) / lvlWidth ;
		//x = x*2; //Koska lvlWidthin j�lkeen on -0.5 *viiva* 0.5 x:n arvo 
		//var y = (pointer.y - 0.5 * lvlHeight) / lvlHeight ;
		//y = y *2;
		
		//Drag to move approach
		var differenceX = this.pointerXMovement - pointer.x ;
		var differenceY = this.pointerYMovement - pointer.y;
		var x = differenceX / lvlWidth;
		x = x*2;
		var y = differenceY / lvlHeight;
		y = y*2;
		

        this.moveCamera(x * this.cameraMovementSpeed, y * this.cameraMovementSpeed);
    }
	else{
		this.pointerXMovement = null;
		this.pointerYMovement = null;
	}

	
}


/**
 * Moves camera in game
 * Made in case theres need to affect some GUI-components somehow, made obsolete by this.setFixedToCamera.
 */
MouseMovement.prototype.moveCamera = function(x, y){
	this.phaserGame.camera.x += x;
	this.phaserGame.camera.y += y;
	
	//this.debugText.text = pointer.screenX+ " . "+pointer.screenY;
}


/**
 * Moves the camera to the given x y coordinates.
 */
MouseMovement.prototype.moveCameraTo = function(x,y){
	this.phaserGame.camera.x = x;
	this.phaserGame.camera.y = y;
}

