/**
 * Underhand solution for reading Json on time without worrying about loadings not being on correct time.
 *
 */

function getJson(){
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
			"width": 518,
			"height": 694,
			"rotation": 0,
			"sprite": "Venaja"
		
		},		
		{
			"name": "Norja",
			"x": "Left:Venaja,Percent:19",
			"y": "Same:Venaja,Percent:-45",
			"width": 258,
			"height": 207,
			"rotation": 0,
			"sprite": "Norja"
		
		},
		{
			"name": "Suomi",
			"x": "Left:Venaja,Percent:38",
			"y": "Same:Venaja,Percent:-60",
			"width": 120,
			"height": 159,
			"rotation": 0,
			"sprite": "Suomi"
		},
		{
			"name": "Ruotsi",
			"x": "Same:Suomi,Percent:-57.5",
			"y": "Same:Suomi,Percent:19",
			"width": 129,
			"height": 191,
			"rotation": 0,
			"sprite": "Ruotsi"
		
		},
		{
			"name": "Viro",
			"x": "Left:Venaja,Percent:17",
			"y": "Down:Suomi,Percent:-17",
			"width": 66,
			"height": 34,
			"rotation": 0,
			"sprite": "Viro"	
		},
		{
			"name": "Latvia",
			"x": "Same:Viro,Percent:-8",
			"y": "Down:Viro,Percent:-37",
			"width": 69,
			"height": 28,
			"rotation": 0,
			"sprite": "Latvia"	
		},
		{
			"name": "Valko-Venaja",
			"x": "Same:Latvia,Percent:36",
			"y": "Down:Latvia,Percent:-13",
			"width": 91,
			"height": 50,
			"rotation": 0,
			"sprite": "Valko-Venaja"	
		},
		{
			"name": "Liettua",
			"x": "Same:Latvia,Percent:-11",
			"y": "Down:Latvia,Percent:-30",
			"width": 55,
			"height": 29,
			"rotation": 0,
			"sprite": "Liettua"	
		},
		{
			"name": "Ukraina",
			"x": "Same:Valko-Venaja,Percent:15.5",
			"y": "Down:Valko-Venaja,Percent:-13",
			"width": 176,
			"height": 75,
			"rotation": 0,
			"sprite": "Ukraina"	
		},
		{
			"name": "Puola",
			"x": "Left:Valko-Venaja,Percent:7",
			"y": "Same:Valko-Venaja,Percent:33",
			"width": 92,
			"height": 58,
			"rotation": 0,
			"sprite": "Puola"	
		},
		{
			"name": "Saksa",
			"x": "Left:Puola,Percent:9",
			"y": "Same:Puola,Percent:11",
			"width": 84,
			"height": 72,
			"rotation": 0,
			"sprite": "Saksa"	
		},
		{
			"name": "Tanska",
			"x": "Same:Saksa,Percent:15",
			"y": "Up:Saksa,Percent:16",
			"width": 71,
			"height": 39,
			"rotation": 0,
			"sprite": "Tanska"	
		},
		{
			"name": "Alankomaat",
			"x": "Left:Saksa,Percent:43",
			"y": "Same:Saksa,Percent:-32",
			"width": 38,
			"height": 25,
			"rotation": 0,
			"sprite": "Alankomaat"	
		},
		{
			"name": "Ranska",
			"x": "Left:Saksa,Percent:27",
			"y": "Down:Saksa,Percent:-40",
			"width": 120,
			"height": 82,
			"rotation": 0,
			"sprite": "Ranska"	
		},
		{
			"name": "Belgia",
			"x": "Left:Saksa,Percent:10",
			"y": "Same:Saksa,Percent:50",
			"width": 28,
			"height": 18,
			"rotation": 0,
			"sprite": "Belgia"	
		},
		{
			"name": "Italia",
			"x": "Same:Saksa,Percent:15",
			"y": "Down:Saksa,Percent:0",
			"width": 102,
			"height": 86,
			"rotation": 0,
			"sprite": "Italia"	
		},
		{
			"name": "Romania",
			"x": "Same:Ukraina,Percent:-69",
			"y": "Down:Ukraina,Percent:-86",
			"width": 89,
			"height": 40,
			"rotation": 0,
			"sprite": "Romania"	
		},
		{
			"name": "Moldova",
			"x": "Same:Ukraina,Percent:-89",
			"y": "Down:Ukraina,Percent:-135",
			"width": 33,
			"height": 29,
			"rotation": 0,
			"sprite": "Moldova"	
		},
		{
			"name": "Sveitsi",
			"x": 400,
			"y": 400,
			"width": 88,
			"height": 36,
			"rotation": 0,
			"sprite": "Sveitsi"	
		}
	]
};
return x;
}