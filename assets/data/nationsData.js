/**
 * Underhand solution for reading Json on time without worrying about loadings not being on correct time.
 *
 */

function getJson(){
	var x=
{
	"nations":
	[
		{
			"name": "Venäjä",
			"x": " ,Border:Right",
			"y": 600,
			"width": 374,
			"height": 696,
			"rotation": 0,
			"sprite": "Venäjä"
		
		},
		{
			"name": "Suomi",
			"x": "Left:Venäjä,Percent:37",
			"y": "Same:Venäjä,Percent:-60",
			"width": 240,
			"height": 318,
			"rotation": 0,
			"sprite": "Suomi"
		},
		{
			"name": "Ruotsi",
			"x": "Same:Suomi,Percent:-58",
			"y": "Same:Suomi,Percent:19",
			"width": 258,
			"height": 382,
			"rotation": 0,
			"sprite": "Ruotsi"
		
		},
		{
			"name": "Viro",
			"x": "Left:Venäjä,Percent:17",
			"y": "Down:Suomi,Percent:-17",
			"width": 132,
			"height": 68,
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