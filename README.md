# Todo's 

- eerst refactoren van hoe we shizzle in beeld plaatsen
    - dedicated property (class) op this waaruit gelezen en naar geschreven wordt?
    - maar definitie en instance zijn verschillend, de volgende vraag is belangrijker
- dan refactoren wat er nou eigenlijk wordt opgeslagen/er wordt niet genoeg opgeslagen, value bijv.
    - opgeslagen wordt instance info:
        - id: number
        - timestamp: string
        - name: string
        - major: boolean
        - emoji: string
        - emoji1: string
        - emoji2: string
        - meaning: string
        - reversed: boolean
        - icon: string
    - nodig zijn verschillende properties, zowel van instance als van data. Lijst doet het zelf, dagkaart wordt gedaan, en lezing is gelijk aan 3 x een dagkaart instance? 
        - nee, lezing heeft geen reversed prop op kaarten. 
        - ja, dat was een fout volgens mij.
- online klaarzetten(!)
- een promootje doen: readme afmaken, videootje opnemen, 
- een wens extra? de rest van de wensen die gedaan zijn afstrepen
- oude versie in git zetten als eerste (somehow)
- weirde npm includes uitleggen (waarom geen node modules)


# Some challenges

ideas:

- [x] Put your data in a Vuex store
- [x] Refactor the card markup to be a reusable child component
- [ ] Change the Past/Present/Future layout to be a different Tarot layout, such as the "Celtic Cross"
- [ ] Move the Tarot data into a GraphQL database, or port it elsewhere and make API calls against it
- [x] Change the One Card page to change only when the date changes so that it's a true "Daily Reading". More cool: save the date in Application Settings and test against that
- [x] Find a way to store cards and retrieve them
- [ ] Find a way for a Querant to make notes about various readings and their dates


# ontdekte fouten

- 72 ipv 80-something kaarten waaruit gekozen werd
- missing reversed indicator bij readings
