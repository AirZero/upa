


function getJsonFromEventsData(){
	//TODO: the damn scrip engine that does me magic on this
	//Lets not break it before the first test day though
	var x=
{
	"events":
	[
		{
			"date":"x.x.x",
			"chance":10,
			"effects":[
				{
					"effectName":"addRefugees",
					"data": 5000,
					"description": "For inner use of the event description, this is for comments and other relevant stuff that other coders need to see",
					"story": ""
				}
			]
		},
		{
			"date":"1.1.x",
			"chance":100,
			"effects":[
				{
					"effectName":"story",
					"data": "Year Changed",
					"description": "Easy for adding year change event, no hurdur code, me proud of not no HURDUR! Still, the syntax is horrible so changed coming sitll!"
				}
			]
		},
		{
			"date":"1.x.x",
			"chance":100,
			"effects":[
				{
					"effectName":"addMaxRefugees",
					"data": 100,
					"description": "Increases the maxrefugee amount by 100. This really needs something more beautiful to handle this stuff."
				}
			]
		},
		{
			"date":"x.3.2015",
			"chance":100,
			"effects":[
				{
					"effectName":"story",
					"data": "The conflict still ensues!",
					"description": "Game ends here",
					
				},
				{
					"effectName":"endGame",
					"data": 0,
					"description": "Game ends here",
					
				}
			]
		}
		
	]
};
	return x;
}