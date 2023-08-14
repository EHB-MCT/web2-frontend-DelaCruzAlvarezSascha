"use strict"

let team = [];


const teambuilderApp = {
    initApp() {
        this.selectCharacters();
        
        this.saveTeam();
    },
    async getDataCharacters() {
        let response = await fetch("https://api.genshin.dev/characters");
        if(response.status == 200) {
            return await response.json();
        } else {
            console.log("Doesn't fetch the data");
        }
    },
    async selectCharacters() {
        let list = await this.getDataCharacters();
        list.forEach(character => {
            // console.log(character)
            let characterList = document.getElementById('characterSelect')
    
            characterList.insertAdjacentHTML("beforeend", `
                <figure class="character">
                    <img src="https://api.genshin.dev/characters/${character}/icon.png" alt="" width="90px">
                    <figcaption>${character}</figcaption>
                </figure>
            `);
        });
        this.pushCharacter();
    },
    async pushCharacter() {
        let getCharacterInfo = document.querySelectorAll(".character");
        let list = await this.getDataCharacters();
        let clearTeam = document.getElementById('clearTeam');
        let builedTeam = document.getElementById('team1');

        for(let character in list) {
            getCharacterInfo[character].addEventListener('click', () => {
                fetch(`https://api.genshin.dev/characters/${list[character]}`)
                .then(response => response.json())
                .then(data => {
                    let element = data.vision;
                    let newElement = element.toLowerCase();

                    let htmlString = {
                        name: list[character],
                        vision: newElement,
                        weapon: `https://api.genshin.dev/characters/${list[character]}/talent-skill.png`,
                        icon: `https://api.genshin.dev/characters/${list[character]}/icon.png`,
                        portrait: `https://api.genshin.dev/characters/${list[character]}/gacha-splash.png`,
                    }
                    
                    let saved = this.saveTeam(htmlString.name, htmlString.vision, htmlString.weapon, htmlString.icon, htmlString.portrait);

                    builedTeam.insertAdjacentHTML('afterbegin', saved);

                    team.push(htmlString);
                    console.log(team);
                })
            })
        }
        clearTeam.addEventListener('click', () => {
                team = [];
                builedTeam.innerHTML = "";
                console.log(team);
        })
    },
    async saveTeam(name, vision, weapon, icon, portrait) {
        let list = await this.getDataCharacters();
        let saveTeam = document.getElementById('saveTeam');
        let teamContainer = document.getElementById('teamContainer');
        let overviewContainer = document.getElementById('overview');

        saveTeam.addEventListener('click', () => {
            let htmlStrings = {
                iconHTML:  `
                    <figure class="selected">
                        <img src="${icon}" alt="" width="90px">
                        <figcaption>${name}</figcaption>
                    </figure>`,
                portraitHTML: `
                    <figure>
                        <h2>${name}</h2>
                        <a href="">
                            <section>
                                <img src="${portrait}" alt="">
                            </section>                    
    
                            <section>
                                <img src="https://api.genshin.dev/elements/${vision}/icon.png" alt="">
                                <img src="${weapon}" alt="">
                                <p>More details</p>
                            </section>
                        </a>
                    </figure>`
            }
            // team.push(htmlStrings);
            // console.log(htmlStrings);

            console.log(team)
        })
    }

}

teambuilderApp.initApp();