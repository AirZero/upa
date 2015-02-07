

function MouseMovement (phaserGame, cameraMovementSpeed){
	this.phaserGame = phaserGame;
	this.cameraMovementSpeed = cameraMovementSpeed;
	
	this.pointerXMovement = null;
	this.pointerYMovement = null;
	
}


MouseMovement.prototype.update = function(){
	var pointer = this.phaserGame.input.activePointer;
	if (this.phaserGame.input.mousePointer.isDown)
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
		//x = x*2; //Koska lvlWidthin jälkeen on -0.5 *viiva* 0.5 x:n arvo 
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


MouseMovement.prototype.moveCamera = function(x, y){
	this.phaserGame.camera.x += x;
	this.phaserGame.camera.y += y;
	
	//this.debugText.text = pointer.screenX+ " . "+pointer.screenY;
}