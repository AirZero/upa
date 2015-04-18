


function getJsonFromEventsData(){
	//TODO: the damn scrip engine that does me magic on this
	//Lets not break it before the first test day though
	var x=
{
    "events": [
        {
            "date": "1.1.x",
            "chance": 100,
            "effects": [
                {
                    "effectName": "stats",
                    "data": ""
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
            "date": "31.12.2013",
            "chance": 100,
            "effects": [
                {
                    "effectName": "endGame",
                    "data": "Selvisit pelin loppuun asti,\n mutta konflikti jatkuu maailmalla edelleen!"
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
        },
        {
            "date": "4.4.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Mellakat muuttuvat väkivaltaisiksi, hallitus vastaa kaikkiin mielenosoituksiin voimalla, kierre pahenee"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "30.4.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Ensimmäiset 5000 syyrialaista naista ja lasta pakenee Libanoniin"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "24.5.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Presidentti Assad vyöryttää panssarivaunuja useisiin kaupunkeihin vaientaakseen protestit"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "15.6.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Hallituksen joukot piirittävät Jisr al-Shughourin kaupungin, tuhannet pakenevat rajan yli Turkkiin."
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "15.7.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Hallituksen vastustajat perustavat Vapaan Syyrian armeijan, myös muita oppositioliikkeitä syntyy"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "15.8.2011",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Taistelut kapinallisten ja hallituksen joukkojen välillä kiihtyvät"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "1.1.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Syyrian sisällissota on vaatinut 7000 ihmisen hengen"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "15.1.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Osa Syyrian kurdeista pakenee väkivaltaa Pohjois-Irakin pakolaisleireille"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "25.2.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Venäjä ja Kiina estävät YK:n puuttumisen konfliktiin veto-oikeudellaan"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "1.6.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Taistelut puhkeavat Aleppossa, noin 200 000 ihmistä joutuu jättämään kotinsa"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "15.6.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Taistelut puhkeavat Damaskoksessa, jopa 40 000 ihmistä pakenee Libanoniin"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "20.7.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Syyria uhkaa käyttää kemiallisia ja biologisia aseita, jos jokin ulkopuolinen valtio hyökkää maahan"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "1.11.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Jopa 11 000 ihmistä pakenee Syyriasta yhden päivän aikana"
                }
            ],
            "description": "basic news"
        }			,
        {
            "date": "15.11.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Useat oppositioliikkeet yhdistävät voimansa Syyrian kansalliseksi koalitioksi, useita aseistettuja ryhmittymiä jää koalition ulkopuolelle"
                }
            ],
            "description": "basic news"
        }			,
        {
            "date": "1.12.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Useat länsimaat, Turkki ja Persianlahden valtiot tunnustavat koalition Syyrian viralliseksi edustajaksi"
                }
            ],
            "description": "basic news"
        }	,
        {
            "date": "1.3.2013",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Kapinalliset valtaavat Raqqan kaupugin, Assad pommittaa kaupunkia"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.4.2013",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Assadin väitetään käyttäneen kemiallisia aseita kapinallisia vastaan"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.5.2013",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Syyrian armeija ottaa yhteen Israelin joukkojen kanssa Golanin kukkuloilla"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.9.2013",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "YK:n tarkastajat toteavat, että kemiallisia aseita on käytetty pääkaupungissa Damaskoksessa"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.1.2014",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "YK:n johtamat rauhanneuvottelut kariutuvat, sillä Syyrian hallitus ei halua luovuttaa valtaansa väliaikaiselle hallitukselle"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.6.2014",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Äärijärjestö ISIS julistaa perustaneensa islamilaisen kalifaatin Pohjois-Syyriaan"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.8.2014",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "YK:n tietojen mukaan ISIS on syyllistynyt \"hirmutekoihin\" Syyriassa"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.9.2014",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "USA ja viisi arabimaata aloittaa ilmaiskut ISISiä vastaan Raqqassa ja Aleppossa"
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.1.2015",
            "chance": 100,
            "effects": [
                {
                    "effectName": "feed",
                    "data": "Kurdien peshmerga-joukot valtaavat ISISIltä Kobanen kaupungin "
                }
            ],
            "description": "basic news"
        },
        {
            "date": "1.1.2012",
            "chance": 100,
            "effects": [
                {
                    "effectName": "setLosingTime",
                    "data": "8"
                },
				{
                    "effectName": "setProcessTime",
                    "data": "3"
                }
            ],
            "description": "Sets the losing time to the game for year 2012"
        },
        {
            "date": "1.1.2013",
            "chance": 100,
            "effects": [
                {
                    "effectName": "setLosingTime",
                    "data": "6"
                },
				{
                    "effectName": "setProcessTime",
                    "data": "2"
                }
            ],
            "description": "Sets the losing time to the game for year 2012"
        },
        {
            "date": "1.1.2014",
            "chance": 100,
            "effects": [
                {
                    "effectName": "setLosingTime",
                    "data": "4"
                },
				{
                    "effectName": "setProcessTime",
                    "data": "2"
                }
            ],
            "description": "Sets the losing time to the game for year 2012"
        },
        {
            "date": "1.1.2015",
            "chance": 100,
            "effects": [
                {
                    "effectName": "setLosingTime",
                    "data": "3"
                },
				{
                    "effectName": "setProcessTime",
                    "data": "2"
                }
            ],
            "description": "Sets the losing time to the game for year 2012"
        }
	]
};
	return x;
}