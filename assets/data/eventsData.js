


function getJsonFromEventsData(){
	//TODO: the damn scrip engine that does me magic on this
	//Lets not break it before the first test day though
	var x=
{
    "events": [
        {
            "date": "x.x.x",
            "chance": 1,
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
                    "data": "Vuosi vaihtuu\n ja uusia pakolaisia tulee"
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
                    "data": "relative"
                }
            ],
            "description": "Increases the maxrefugee amount by 100. This really needs something more beautiful to handle this stuff."
        },
        {
            "date": "1.3.2015",
            "chance": 100,
            "effects": [
                {
                    "effectName": "story",
                    "data": "Peli loppuu, mutta konflikti jatkuu edelleen!\n"
                },
                {
                    "effectName": "endGame",
                    "data": 0
                }
            ],
            "description": "Game ends here"
        },
        {
            "date": "6.3.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Syyrian salainen poliisi pidättää 15 poikaa, jotka maalasivat arabikevään innoittamana hallituksen vastaisia graffiteja"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "15.3.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Tuhannet syyrialaiset protestoivat poikien pidätystä vastaan"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "18.3.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Hallituksen joukot avaavat tulen mielenosoittajia vastaan - syntyy lisää protesteja"
                }
            ],
            "description": "basic news"
        }	
    ]
};
	return x;
}