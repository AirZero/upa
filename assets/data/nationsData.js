/**
 * Underhand solution for reading Json on time without worrying about loadings not being on correct time.
 *
 */

function getJsonFromNationsData(){
	//Think if sizeMultiplier should be set instead of the zoom as playerPref
	var x=
{
	"sizeMultiplier": 1.5, 
	"nations":
	[
		{
			"name": "Venaja",
			"x": " ,Border:Right",
			"y": 600,
			"width": 637,
			"height": 616,
			"rotation": 0,
			"sprite": "Venaja"
		
		},		
		{
			"name": "Norja",
			"x": "Left:Venaja,Percent:42",
			"y": "Same:Venaja,Percent:-76",
			"width": 763,
			"height": 248,
			"rotation": 0,
			"sprite": "Norja"
		
		},
		{
			"name": "Suomi",
			"x": "Left:Venaja,Percent:100",
			"y": "Same:Venaja,Percent:-150.5",
			"width": 353,
			"height": 154,
			"rotation": 0,
			"sprite": "Suomi"
		},
			{
			"name": "Ruotsi",
			"x": "Same:Suomi,Percent:-56.5",
			"y": "Same:Suomi,Percent:27",
			"width": 424,
			"height": 287,
			"rotation": 0,
			"sprite": "Ruotsi"
		
		},
		{
			"name": "Viro",
			"x": "Left:Venaja,Percent:136",
			"y": "Down:Suomi,Percent:1",
			"width": 201,
			"height": 59,
			"rotation": 0,
			"sprite": "Viro"	
		},
		{
			"name": "Latvia",
			"x": "Same:Viro,Percent:-6",
			"y": "Down:Viro,Percent:-31",
			"width": 244,
			"height": 61,
			"rotation": 0,
			"sprite": "Latvia"	
		},
		
		{
			"name": "Valko-Venaja",
			"x": "Same:Latvia,Percent:38",
			"y": "Down:Latvia,Percent:-11.5",
			"width": 306,
			"height": 125,
			"rotation": 0,
			"sprite": "Valko-Venaja"	
		}	,
		{
			"name": "Liettua",
			"x": "Same:Latvia,Percent:-11.3",
			"y": "Down:Latvia,Percent:-28",
			"width": 193,
			"height": 70,
			"rotation": 0,
			"sprite": "Liettua"	
		},
			{
			"name": "Ukraina",
			"x": "Same:Valko-Venaja,Percent:10.1",
			"y": "Down:Valko-Venaja,Percent:-12.4",
			"width": 531,
			"height": 202,
			"rotation": 0,
			"sprite": "Ukraina"	
		}
		
		
		
		
		
		
		
		
		
		
		/*,	
		{
			"name": "Karttapohja",
			"x": " ,Border:Right",
			"y": "600",
			"width": 1540,
			"height": 1013,
			"rotation": 0,
			"sprite": "Karttapohja"
		}		
*/
		

	]
};
return x;
}