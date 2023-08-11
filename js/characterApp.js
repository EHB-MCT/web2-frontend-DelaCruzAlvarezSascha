"use strict"

import Chart from 'chart.js/auto';

const characterApp = {
    initApp() {
        this.listCharacters();
    },
    async getDataCharacters() {
        let response = await fetch("https://api.genshin.dev/characters");
        if(response.status == 200) {
            return await response.json();
        } else {
            console.log("Doesn't fetch the data");
        }
    },
    async listCharacters() {
        let list = await this.getDataCharacters();
        list.forEach(character => {
            // console.log(character)
            let characterList = document.getElementById('characterList')
    
            characterList.insertAdjacentHTML("beforeend", `
                <figure class="character">
                    <img src="https://api.genshin.dev/characters/${character}/icon.png" alt="" width="90px">
                    <figcaption>${character}</figcaption>
                </figure>
            `)        
        });
        
        this.infoCharacter();
    },
    async infoCharacter() {
        // let champ = await this.listCharacters();
        let getCharacterInfo = document.querySelectorAll(".character");
        let list = await this.getDataCharacters();
    
        // for(let i = 0; i < getCharacterInfo.length; i++) {
        for(let character in list) {
            getCharacterInfo[character].addEventListener('click', () => {
                // console.log(data[character.vision])
                
                fetch(`https://api.genshin.dev/characters/${list[character]}`)
                .then(response => response.json())
                .then(data => {
                    let characterList = document.getElementById('characterList');
                    let txtH1 = document.querySelector('h1');
                    let txtH4 = document.querySelector('h4');
                    let characterPage = document.querySelector('.characterPage');
    
                    characterPage.insertAdjacentHTML('beforeend', `
                        <div id="characterBanner">
                            <section>
                                <h1>${data.name} (${data.vision})</h1>
                                <h2>${data.title}</h2>
                            </section>
                        </div>
                    
                        <section>
                            <div id="characterSkill">
                                <section>
                                    <h1>Skill Talents</h1>
                                    <figure class="btnMoreInfo">
                                        <button class="btnAbility">
                                            <img src="https://api.genshin.dev/characters/${list[character]}/talent-na.png" alt="" width="100px">
                                        </button>
                                        <figcaption>
                                            <h2>${data.skillTalents[0].name}</h2>
                                            <h3>${data.skillTalents[0].unlock}</h3>
                                            <small> < Read more </small>
                                            <p hidden>${data.skillTalents[0].description}</p>
                                        </figcaption>
                                    </figure>
                    
                                    <figure class="btnMoreInfo">
                                        <button class="btnAbility">
                                            <img src="https://api.genshin.dev/characters/${list[character]}/talent-skill.png" alt="" width="100px">
                                        </button>
                                        <figcaption>
                                            <h2>${data.skillTalents[1].name}</h2>
                                            <h3>${data.skillTalents[1].unlock}</h3>
                                            <small> < Read more </small>
                                            <p hidden>${data.skillTalents[1].description}</p>
                                        </figcaption>
                                    </figure>
                    
                                    <figure class="btnMoreInfo">
                                        <button class="btnAbility">
                                            <img src="https://api.genshin.dev/characters/${list[character]}/talent-burst.png" alt="" width="100px">
                                        </button>
                                        <figcaption>
                                            <h2>${data.skillTalents[2].name}</h2>
                                            <h3>${data.skillTalents[2].unlock}</h3>
                                            <small> < Read more </small>
                                            <p hidden>${data.skillTalents[2].description}</p>
                                        </figcaption>
                                    </figure>
                                </section>
                            </div>
                
                            <div id="characterPassive">
                                <section>
                                    <h1>Passive Talents</h1>
                                    <figure class="btnMoreInfo">
                                        <button class="btnAbility">
                                            <img src="https://api.genshin.dev/characters/${list[character]}/talent-passive-0.png" alt="" width="100px">
                                        </button>
                                        <figcaption>
                                            <h2>${data.passiveTalents[0].name}</h2>
                                            <h3>${data.passiveTalents[0].unlock}</h3>
                                            <small> < Read more </small>
                                            <p hidden>${data.passiveTalents[0].description}</p>
                                        </figcaption>
                                    </figure>
                    
                                    <figure class="btnMoreInfo">
                                        <button class="btnAbility">
                                            <img src="https://api.genshin.dev/characters/${list[character]}/talent-passive-1.png" alt="" width="100px">
                                        </button>
                                        <figcaption>
                                            <h2>${data.passiveTalents[1].name}</h2>
                                            <h3>${data.passiveTalents[1].unlock}</h3>
                                            <small> < Read more </small>
                                            <p hidden>${data.passiveTalents[1].description}</p>
                                        </figcaption>
                                    </figure>
                                </section>
                            </div>
                        </section>                        
                    `);
                    characterBanner.style.backgroundImage = `url(https://api.genshin.dev/characters/${list[character]}/gacha-splash.png)`;
                        
                    characterList.style.display = "none";
                    txtH1.style.display = "none";
                    txtH4.style.display = "block";
    
                    this.btnReturnList();
                    this.btnMoreInfo();      
                })
            })
        }
    },
    btnReturnList() {
        let btnReturn = document.getElementById('btnReturn');
        let characterPage = document.querySelector('.characterPage'); 
        let characterList = document.getElementById('characterList');
        let txtH1 = document.querySelector('h1');
        let txtH4 = document.querySelector('h4');
    
        btnReturn.addEventListener('click', () => {
            console.log("Returned to character list");
            characterList.style.display = "";
            txtH1.style.display = "";
            txtH4.style.display = "none";
            characterPage.innerHTML = "";
        })
    },
    btnMoreInfo() {
        console.log("Character information page");
        let btnAbility = document.querySelectorAll('.btnAbility');
        let btnMoreInfo = document.querySelectorAll('.btnMoreInfo');
        let txtP = document.querySelectorAll('p');
        let txtsmall = document.querySelectorAll('small');
        let txtH3 = document.querySelectorAll('h3');
        let txtH2 = document.querySelectorAll('h2');
        
        for(let i = 0; i < btnMoreInfo.length; i++) {
            btnAbility[i].addEventListener('click', () => {
                if(txtP[i].style.display == "") {
                    btnMoreInfo[i].style.backgroundColor = "#ffe3d1";
                    btnMoreInfo[i].style.transition = "0.3s ease-in";
                    txtH2[1 + i].style.color = "#000d36";
                    txtP[i].style.display = "block";
                    txtP[i].style.color = "#000d36";
                    txtH3[i].classList.add('displayText');
                    txtsmall[i].classList.add('displayText');
                } else {
                    btnMoreInfo[i].style.backgroundColor = "#000d3600";
                    txtH2[1 + i].style.color = "#ffe3d1";
                    txtP[i].style.display = "";
                    txtH3[i].classList.remove('displayText');
                    txtsmall[i].classList.remove('displayText');
                }
            })
        }
    }
}

characterApp.initApp();