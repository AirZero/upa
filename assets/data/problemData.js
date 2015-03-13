

function getJsonFromProblemData(){
	//Think if sizeMultiplier should be set instead of the zoom as playerPref
	var x={
		"problems":
		[
			{
				"name": "Plague",
				"deathToll": "10%",
				"chance": 1,
				"treshold": 105000
			},
			{
				"name": "No sleeping place",
				"deathToll": 200,
				"chance": 50,
				"treshold": 150000
			},
			{
				"name": "Gang fights",
				"deathToll": 500,
				"chance": 0.1,
				"treshold": 50000
			}
		]
		
	};
	
	return x;
}