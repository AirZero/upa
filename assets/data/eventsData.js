


function getJsonFromEventsData(){
	//TODO: the damn scrip engine that does me magic on this
	//Lets not break it before the first test day though
	var x=
{
    "events": [
        {
            "date": "x.x.x",
            "chance": 10,
            "effects": [
                {
                    "effectName": "addRefugees",
                    "data": 500
                }
            ],
            "description": "For inner use of the event description, this is for comments and other relevant stuff that other coders need to see"
        },
        {
            "date": "1.1.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "story",
                    "data": "Year Changed and loads\n of new refugees came"
                },
				{
                    "effectName": "addRefugees",
                    "data": 2500
                }
            ],
            "description": "Easy for adding year change event, no hurdur code, me proud of not no HURDUR! Still, the syntax is horrible so changed coming sitll!"
        },
        {
            "date": "1.x.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "addMaxRefugees",
                    "data": 100
                }
            ],
            "description": "Increases the maxrefugee amount by 100. This really needs something more beautiful to handle this stuff."
        },
        {
            "date": "x.3.2015",
            "chance": 100,
            "effects": [
                {
                    "effectName": "story",
                    "data": "The conflict still ensues!"
                },
                {
                    "effectName": "endGame",
                    "data": 0
                }
            ],
            "description": "Game ends here"
        },
        {
            "date": "3.12.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "I'm so blue!"
                }
            ],
            "description": "testing the news feed"
        },
        {
            "date": "4.12.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Da bu dee da bu dai da bu dee dabu!"
                }
            ],
            "description": "testing the news feed"
        },
        {
            "date": "5.12.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "I have a blue house with a blue window"
                }
            ],
            "description": ""
        },
        {
            "date": "6.12.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Blue is the color, i often wear!"
                }
            ],
            "description": "testing the news feed"
        }
		
    ]
};
	return x;
}