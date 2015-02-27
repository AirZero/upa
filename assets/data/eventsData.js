


function getJsonFromEventsData(){
	//TODO: assess the scripts again and whether story should be an effectName or not..
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
			"date":"x.1.x",
			"chance":100,
			"effects":[
				{
					"effectName":"",
					"data": "test",
					"description": "Easy for adding year change event, no hurdur code, me proud of not no HURDUR! Still, the syntax is horrible so changed coming sitll!",
					"story": "Year changed"
				}
			]
		}
		
	]
};
	return x;
}