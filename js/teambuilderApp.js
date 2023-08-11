"use strict"

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
        let team = [];
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
                        portrait: `https://api.genshin.dev/characters/${list[character]}/gacha-splash.png`
                    }

                    let iconHTML = `
                            <figure class="selected">
                                <img src="${htmlString.icon}" alt="" width="90px">
                                <figcaption>${htmlString.name}</figcaption>
                            </figure>`;
                    let portraitHTML = `
                            <figure>
                                <h2>${htmlString.name}</h2>
                                <a href="">
                                    <section>
                                        <img src="${htmlString.portrait}" alt="">
                                    </section>                    
            
                                    <section>
                                        <img src="${htmlString.vision}" alt="">
                                        <img src="${htmlString.weapon}" alt="">
                                        <p>More details</p>
                                    </section>
                                </a>
                            </figure>`;

                    team.push(htmlString);
                    console.log(team);

                    if(team.length <= 4) {
                        builedTeam.innerHTML += iconHTML;
                    } else {
                        console.log('sop')
                    }

                })
            })
        }
        clearTeam.addEventListener('click', () => {
                team = [];
                builedTeam.innerHTML = "";
                console.log(team);
        })
    },
    saveTeam() {
        let saveTeam = document.getElementById('saveTeam');
    

        saveTeam.addEventListener('click', () => {

            let teamContainer = document.getElementById('teamContainer');
        let createdTeam = `
            <div id="team1">
                <figure class="character">
                    <img src="https://api.genshin.dev/characters/keqing/icon.png" alt="" width="90px">
                    <figcaption>Keqing</figcaption>
                </figure>        
            </div> 
        `;
            teamContainer.insertAdjacentHTML("beforeend", createdTeam);

            console.log(teamContainer);
        })
    }

}

teambuilderApp.initApp();