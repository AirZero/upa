

function getJsonFromProblemData(){
	//Think if sizeMultiplier should be set instead of the zoom as playerPref
	var x={
		"problems":
		[
			{
				"name": "RUTTO!",
				"deathToll": "10%",
				"chance": 0.1,
				"treshold": 105000
			},
			{
				"name": "Ei nukkumapaikkoja pakolaisleirissä",
				"deathToll": 200,
				"chance": 50,
				"treshold": 150000
			},
			{
				"name": "Jengi taisteluja pakolaisleireissä",
				"deathToll": 500,
				"chance": 0.1,
				"treshold": 50000
			}
		]
		
	};
	
	return x;
}