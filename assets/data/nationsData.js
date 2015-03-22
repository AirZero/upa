﻿/**
 * Underhand solution for reading Json on time without worrying about loadings not being on correct time.
 *
 */

function getJsonFromNationsData(){
	//Think if sizeMultiplier should be set instead of the zoom as playerPref
	var x=
{
	"sizeMultiplier": 0.8, 
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
		}	,
		{
			"name": "Puola",
			"x": "Left:Valko-Venaja,Percent:6",
			"y": "Same:Valko-Venaja,Percent:39.7",
			"width": 373,
			"height": 165,
			"rotation": 0,
			"sprite": "Puola"	
		},
		{
			"name": "Saksa",
			"x": "Left:Puola,Percent:6",
			"y": "Same:Puola,Percent:25",
			"width": 341,
			"height": 213,
			"rotation": 0,
			"sprite": "Saksa"	
		},
		{
			"name": "Tanska",
			"x": "Same:Saksa,Percent:28",
			"y": "Up:Saksa,Percent:3",
			"width": 152,
			"height": 84	,
			"rotation": 0,
			"sprite": "Tanska"	
		},
		{
			"name": "Ranska",
			"x": "Left:Saksa,Percent:18",
			"y": "Down:Saksa,Percent:-34.5",
			"width": 308,
			"height": 247,
			"rotation": 0,
			"sprite": "Ranska"	
		},
		{
			"name": "Italia",
			"x": "Same:Saksa,Percent:0.4",
			"y": "Down:Saksa,Percent:1.5",
			"width": 421,
			"height": 271,
			"rotation": 0,
			"sprite": "Italia"	
		},
		{
			"name": "Sveitsi",
			"x": "Same:Saksa,Percent:-75.5",
			"y": "Same:Saksa,Percent:222",
			"width": 178,
			"height": 57,
			"rotation": 0,
			"sprite": "Sveitsi"	
		},
		{
			"name": "Espanja",
			"x": "Same:Ranska,Percent:-85",
			"y": "Down:Ranska,Percent:-50",
			"width": 162,
			"height": 153,
			"rotation": 0,
			"sprite": "Espanja"	
		},
		{
			"name": "Portugal",
			"x": "Left:Espanja,Percent:35",
			"y": "Same:Espanja,Percent:2",
			"width": 48,
			"height": 98,
			"rotation": 0,
			"sprite": "Portugal"	
		},
		{
			"name": "Itavalta",
			"x": "Right:Sveitsi,Percent:-11",
			"y": "Same:Sveitsi,Percent:-49",
			"width": 310,
			"height": 79,
			"rotation": 0,
			"sprite": "Itavalta"	
		},
				{
			"name": "Tsekki",
			"x": "Right:Saksa,Percent:-42",
			"y": "Same:Saksa,Percent:34",
			"width": 313,
			"height": 75,
			"rotation": 0,
			"sprite": "Tsekki"	
		}	,
			{
			"name": "Slovakia",
			"x": "Right:Tsekki,Percent:-55",
			"y": "Same:Tsekki,Percent:38",
			"width": 235,
			"height": 61,
			"rotation": 0,
			"sprite": "Slovakia"	
		},
		{
			"name": "Unkari",
			"x": "Right:Itavalta,Percent:-16",
			"y": "Down:Slovakia,Percent:-37",
			"width": 275,
			"height": 97,
			"rotation": 0,
			"sprite": "Unkari"	
		},
		{
			"name": "Moldova",
			"x": "Same:Ukraina,Percent:-28",
			"y": "Down:Ukraina,Percent:-109",
			"width": 121,
			"height": 86,
			"rotation": 0,
			"sprite": "Moldova"	
		},
		
		{
			"name": "Bulgaria",
			"x": "Same:Ukraina,Percent:-46",
			"y": "Down:Ukraina,Percent:-56",
			"width": 368,
			"height": 139,
			"rotation": 0,
			"sprite": "Bulgaria"	
		},
		{
			"name": "Romania",
			"y": "Down:Ukraina,Percent:39",
			"x": "Same:Ukraina,Percent:-61",
			"width": 256,
			"height": 96,
			"rotation": 0,
			"sprite": "Romania"	
		},
		{
			"name": "Serbia",
			"y": "Down:Ukraina,Percent:1",
			"x": "Same:Romania,Percent:-112",
			"width": 166,
			"height": 124,
			"rotation": 0,
			"sprite": "Serbia"	
		},
		{
			"name": "Bosnia-Herzegovina",
			"y": "Same:Serbia,Percent:11",
			"x": "Same:Serbia,Percent:-86",
			"width": 167,
			"height": 73,
			"rotation": 0,
			"sprite": "Bosnia-Herzegovina"	
		},
		{
			"name": "Slovenia",
			"y": "Same:Italia,Percent:-219",
			"x": "Same:Italia,Percent:86",
			"width": 143,
			"height": 50,
			"rotation": 0,
			"sprite": "Slovenia"	
		},
		{
			"name": "Kroatia",
			"y": "Same:Italia,Percent:-76.6",
			"x": "Same:Italia,Percent:69",
			"width": 252,
			"height": 95,
			"rotation": 0,
			"sprite": "Kroatia"	
		},
		{
			"name": "Montenegro",
			"y": "Same:Italia,Percent:-46.6",
			"x": "Same:Italia,Percent:321",
			"width": 88,
			"height": 51,
			"rotation": 0,
			"sprite": "Montenegro"	
		},	
		{
			"name": "Albania",
			"x": "Right:Italia,Percent:55",
			"y": "Down:Romania,Percent:-37",
			"width": 85,
			"height": 81,
			"rotation": 0,
			"sprite": "Albania"	
		},	
		{
			"name": "Makedonia",
			"x": "Right:Italia,Percent:100",
			"y": "Down:Romania,Percent:-56",
			"width": 116,
			"height": 50,
			"rotation": 0,
			"sprite": "Makedonia"	
		},

			{
			"name": "Kreikka",
			"x": "Right:Italia,Percent:15",
			"y": "Down:Romania,Percent:-14.5",
			"width": 331,
			"height": 183,
			"rotation": 0,
			"sprite": "Kreikka"	
		},
		{
			"name": "Turkki",
			"x": "Right:Kreikka,Percent:-17",
			"y": "Same:Kreikka,Percent:-9.5",
			"width": 510,
			"height": 216,
			"rotation": 0,
			"sprite": "Turkki"	
		},
			{
			"name": "Iso-Britannia",
			"x": "Same:Ranska,Percent:-15",
			"y": "Up:Ranska,Percent:5",
			"width": 300,
			"height": 205,
			"rotation": 0,
			"sprite": "Iso-Britannia"	
		},
			{
			"name": "Alankomaat",
			"x": "Same:Ranska,Percent:95",
			"y": "Up:Ranska,Percent:-5.5",
			"width": 127,
			"height": 72,
			"rotation": 0,
			"sprite": "Alankomaat"	
		},
			{
			"name": "Belgia",
			"x": "Same:Ranska,Percent:79.5",
			"y": "Up:Ranska,Percent:71.5",
			"width": 81,
			"height": 49,
			"rotation": 0,
			"sprite": "Belgia"	
		},
			{
			"name": "Luxemburg",
			"x": "Same:Ranska,Percent:479",
			"y": "Up:Ranska,Percent:181",
			"width": 20,
			"height": 21,
			"rotation": 0,
			"sprite": "Luxemburg"	
		},
			{
			"name": "Syyria",
			"x": "Right:Kreikka,Percent:57",
			"y": "Down:Turkki,Percent:-55",
			"width": 271,
			"height": 201,
			"rotation": 0,
			"sprite": "Syyria"	
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