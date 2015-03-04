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
			"width": 187,
			"height": 348,
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
			"y": "Down:Latvia,Percent:-34",
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
			"name": "Benelux",
			"x": "Left:Saksa,Percent:43",
			"y": "Same:Saksa,Percent:-2",
			"width": 40,
			"height": 38,
			"rotation": 0,
			"sprite": "Benelux"	
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
			"y": "Down:Ukraina,Percent:-88",
			"x": "Same:Ukraina,Percent:-69",
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
			"x": "Same:Italia,Percent:-80.5",
			"y": "Same:Italia,Percent:-215",
			"width": 44,
			"height": 18,
			"rotation": 0,
			"sprite": "Sveitsi"	
		},
		{
			"name": "Espanja",
			"x": "Same:Ranska,Percent:-45",
			"y": "Down:Ranska,Percent:-31",
			"width": 102,
			"height": 59,
			"rotation": 0,
			"sprite": "Espanja"	
		},
				{
			"name": "Portugal",
			"x": "Left:Espanja,Percent:100",
			"y": "Same:Espanja,Percent:8",
			"width": 27,
			"height": 39,
			"rotation": 0,
			"sprite": "Portugal"	
		},
		{
			"name": "Itavalta",
			"x": "Right:Sveitsi,Percent:-18",
			"y": "Same:Sveitsi,Percent:-30",
			"width": 70,
			"height": 24,
			"rotation": 0,
			"sprite": "Itavalta"	
		},
				{
			"name": "Tsekki",
			"x": "Right:Saksa,Percent:-40",
			"y": "Same:Saksa,Percent:61",
			"width": 73,
			"height": 23,
			"rotation": 0,
			"sprite": "Tsekki"	
		},
			{
			"name": "Slovakia",
			"x": "Right:Tsekki,Percent:-55",
			"y": "Same:Tsekki,Percent:72",
			"width": 52,
			"height": 16,
			"rotation": 0,
			"sprite": "Slovakia"	
		},
		
		{
			"name": "Unkari",
			"x": "Right:Itavalta,Percent:-13",
			"y": "Down:Slovakia,Percent:-32",
			"width": 60,
			"height": 26,
			"rotation": 0,
			"sprite": "Unkari"	
		},
		
		{
			"name": "Entinen-Jugoslavia",
			"x": "Right:Italia,Percent:-48",
			"y": "Same:Italia,Percent:-25",
			"width": 86,
			"height": 52,
			"rotation": 0,
			"sprite": "Entinen-Jugoslavia"	
		},
		{
			"name": "Bulgaria",
			"x": "Right:Italia,Percent:65",
			"y": "Down:Romania,Percent:-22",
			"width": 59,
			"height": 26,
			"rotation": 0,
			"sprite": "Bulgaria"	
		},
			{
			"name": "Kreikka",
			"x": "Right:Italia,Percent:13",
			"y": "Down:Romania,Percent:28",
			"width": 78,
			"height": 54,
			"rotation": 0,
			"sprite": "Kreikka"	
		},
			{
			"name": "Iso-Britannia",
			"x": "Same:Ranska,Percent:-50",
			"y": "Up:Ranska,Percent:10",
			"width": 84,
			"height": 119,
			"rotation": 0,
			"sprite": "Iso-Britannia"	
		},
			{
			"name": "Islanti",
			"x": "Same:Iso-Britannia,Percent:-50",
			"y": "Up:Iso-Britannia,Percent:-60",
			"width": 92,
			"height": 48,
			"rotation": 0,
			"sprite": "Islanti"	
		},
		{
			"name": "Turkki",
			"x": "Right:Kreikka,Percent:0",
			"y": "Same:Kreikka,Percent:10",
			"width": 186,
			"height": 53,
			"rotation": 0,
			"sprite": "Turkki"	
		}/*,
		
		{
			"name": "Albania",
			"x": "Right:Italia,Percent:33",
			"y": "Down:Romania,Percent:33",
			"width": 78,
			"height": 54,
			"rotation": 0,
			"sprite": "Albania"	
		}
*/
		

	]
};
return x;
}