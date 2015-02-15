﻿/**
 * Underhand solution for reading Json on time without worrying about loadings not being on correct time.
 *
 */

function getJson(){
	var x=
{
	"nations":
	[
		{
			"name": "Suomi",
			"x": 655,
			"y": 500,
			"width": 300,
			"height": 300,
			"rotation": 0,
			"sprite": "Suomi"
		},
		{
			"name": "Ruotsi",
			"x": 350,
			"y": 500,
			"width": 258,
			"height": 382,
			"rotation": 25,
			"sprite": "Ruotsi"
		
		},
		{
			"name": "Venäjä",
			"x": 1250,
			"y": 600,
			"width": 800,
			"height": 500,
			"rotation": 0,
			"sprite": "Venäjä"
		
		},
		{
			"name": "Viro",
			"x": 655,
			"y": 900,
			"width": 200,
			"height": 100,
			"rotation": 0,
			"sprite": "Viro"	
		},
			{
			"name": "Latvia",
			"x": 655,
			"y": 1000,
			"width": 200,
			"height": 100,
			"rotation": 0,
			"sprite": "Latvia"	
		}
		
	
	]
};
return x;
}