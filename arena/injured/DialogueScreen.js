class DialogueScreen extends GUI {
    constructor() {
        super();
        this.idx = 0;
        this.phases = [];
        this.time = 0;
    }
    HandleClick(x, y) {
        if (this.idx >= this.phases.length) {
            return;
            //should not happen
        }
        const currPhase = this.phases[this.idx]
        if (this.time < currPhase.time) {
            this.time = currPhase.time;
            return;
        }
        this.time = 0;
        this.idx++;
    }
    Draw(x, y) {
        if (this.idx >= this.phases.length) {
            if (this.level < 11) {
                screens.game.Load(this.level);
                screenOn = "game"
            } else {
                screenOn = "title"
            }
            return;
        }
        push()
        this.time += deltaTime / 1000
        const currPhase = this.phases[this.idx]
        switch (currPhase.character) {
            case "radio":
                image(Assets.backgrounds.poland, 0, 0, 600, 400)
                break;
            case "german":
                image(Assets.backgrounds.germany, 0, 0, 600, 400)
                break;
            case "officer":
            case "soldier":
            case "surrender":
            case "injured":
            case "explosion":
                image(Assets.backgrounds.ussr, 0, 0, 600, 400)
                break;
        }
        textFont("trebuchet MT")
        switch (currPhase.character) {
            case "german":
                image(Assets.characters.german, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                stroke(0)
                strokeWeight(5)
                fill(255)
                rect(25, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                textFont("Tahoma")
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    150, 175 + cos(this.time / 3) * 25)
                textFont("Courier New")
                textSize(10)
                text(currPhase.messageEng.substring(0, floor(this.time / currPhase.time * currPhase.messageEng.length)),
                    150, 225 + cos(this.time / 3) * 25)
                break;
            case "radio":
                image(Assets.characters.radio, 300, 100 + sin(this.time / 3) * 50, 300, 200)
                stroke(0)
                strokeWeight(5)
                fill(255)
                rect(25, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                textFont("Garamond")
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    150, 200 + cos(this.time / 3) * 25)
                break;
            case "explosion":
                stroke(0)
                strokeWeight(5)
                image(Assets.characters.explosion, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                fill(255)
                rect(325, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                textFont("Courier New")
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    450, 200 + cos(this.time / 3) * 25)
                break;
            case "soldier":
            case "injured":
            case "surrender":
            case "officer":
                if (currPhase.character == "surrender") {
                    image(Assets.characters.surrender, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                }
                if (currPhase.character == "soldier") {
                    image(Assets.characters.soldier, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                }
                if (currPhase.character == "injured") {
                    image(Assets.characters.soldier, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                }
                if (currPhase.character == "officer") {
                    image(Assets.characters.officer, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                }
                stroke(0)
                strokeWeight(5)
                fill(255)
                rect(325, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                if(currPhase.language == "russian"){
                    textFont("Times New Roman")
                }else{
                    textFont("Tahoma")
                }
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    450, 175 + cos(this.time / 3) * 25)
                textFont("Courier New")
                textSize(10)
                text(currPhase.messageEng.substring(0, floor(this.time / currPhase.time * currPhase.messageEng.length)),
                    450, 225 + cos(this.time / 3) * 25)
                break;
        }
        pop()
    }
    Load(level) {
        this.idx = 0;
        this.level = level;

        this.phases = [
            {
                character: "radio",
                language: "english",
                message: "You have completed the demo of the game.",
                time: 3
            },
        ]
        if (level == 1) {
            this.phases = [
                {
                    character: "officer",
                    language: "russian",
                    message: "Мы одни остались,\n но всё будет хорошо.",
                    messageEng: "[We're the only ones left,\n but it will be alright.]",
                    time: 2
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Нет... Мы \n за линиями Розвадовского.",
                    messageEng: "[Oh no. We're \n behind Rozwadowski's lines.]",
                    time: 2
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Я найду путь домой.",
                    messageEng: "[I can figure out the \n way back home.]",
                    time: 2
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Ты сможешь прикрыть меня\n и разведать путь, да?",
                    messageEng: "[You can fight and scout\n for me, yes?]",
                    time: 2
                },
                {
                    character: "soldier",
                    language: "russian",
                    message: "Иван, ты не так уж плох для\n свежеиспечённого выпускника.",
                    messageEng: "[Ivan, you're not so bad for a\n fresh university graduate.]",
                    time: 3
                },
                {
                    character: "soldier",
                    language: "russian",
                    message: "Конечно, смогу.",
                    messageEng: "[Of course I can]",
                    time: 3
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Лишь бы добраться домой.",
                    messageEng: "[Anything to get home.]",
                    time: 4
                },
                {
                    character: "officer",
                    language: "russian",
                    message: " Нас только двое \n  — нужноберечь друг друга.",
                    messageEng: "[It's just the two of us, \n we need to look \nout for each other.]",
                    time: 4
                },
                {
                    character: "soldier",
                    language: "russian",
                    message: "Слушаюсь, товарищ командир.",
                    messageEng: "[Very well, sir.]",
                    time: 2
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Сначала пройдём через это минное поле.\n Иди вперёд.",
                    messageEng: "[First, we just need to get\n through this minefield. \nGo ahead and lead.]",
                    time: 3
                },
            ]
        } else if (level == 2) {
            this.phases = [
                {
                    character: "officer",
                    language: "russian",
                    message: "Не ожидал там минного поля.",
                    messageEng: "[I didn't expect a\n minefield back there.]",
                    time: 2
                },
                {
                    character: "soldier",
                    language: "russian",
                    message: "Тихо! Впереди солдаты.",
                    messageEng: "[Quiet! \nThere are soldiers ahead.]",
                    time: 3
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Всего один враг.\n Ты справишься.",
                    messageEng: "[It's only one enemy.\nYou can handle this.]",
                    time: 3
                }
            ]
        } else if (level == 3) {
            this.phases = [
                {
                    character: "officer",
                    language: "russian",
                    message: "Еле выбрались!",
                    messageEng: "[That was a close call!]",
                    time: 2
                },
                {
                    character: "soldier",
                    language: "russian",
                    message: "Так точно.",
                    messageEng: "[Indeed.]",
                    time: 1
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Внимание! Враги!",
                    messageEng: "[Heads up! Enemies!]",
                    time: 2
                },
                {
                    character: "soldier",
                    language: "russian",
                    message: "Почему они в синем?",
                    messageEng: "[Why are they wearing blue?]",
                    time: 2
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Потом объясню.\n Быстро — разберись с ними, и домой.",
                    messageEng: "[There's time later for explaining.\nQuick, clear them out\n and let's get home.]",
                    time: 3
                }
            ]
        } else if (level == 4) {
            this.phases = [
                {
                    character: "officer",
                    language: "russian",
                    message: "Осторожно! Говорят, впереди артиллерия.",
                    messageEng: "[Watch out! \nI heard there's artillery ahead.]",
                    time: 2
                },
                {
                    character: "officer",
                    language: "russian",
                    message: "Берегись—",
                    messageEng: "[Mind the-]",
                    time: 2
                },
                {
                    character: "explosion",
                    language: "russian",
                    message: "[BOOM]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Он мёртв!\n Они убили его!",
                    messageEng: "[He's dead!\n They killed him!]",
                    time: 4
                },
            ]
        } else if (level == 5) {
            this.phases = [
                {
                    character: "injured",
                    language: "russian",
                    message: "Они убили Максима!\n Без него я не найду дорогу домой.",
                    messageEng: "[They killed Maxim!\n I have no way home without him.]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Вон тот отряд!\n У них есть радио.",
                    messageEng: "[That squad over there!\n They have a radio.]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Оно мне нужно, чтобы найти путь домой.",
                    messageEng: "[I need it to find my way home.]",
                    time: 2
                }
            ]
        } else if (level == 6) {
            this.phases = [
                {
                    character: "injured",
                    language: "russian",
                    message: "Дорогое радио, пожалуйста, работай.",
                    messageEng: "[Dear radio, please work.]",
                    time: 2
                },
                {
                    character: "radio",
                    language: "polish",
                    message: "Tu Błękitna Armia. Czy ktoś nas słyszy? Zgłoś się.",
                    time: 3
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Я не говорю по-польски.",
                    messageEng: "[I don't speak Polish.]",
                    time: 3
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Придётся продолжать идти.",
                    messageEng: "[I have to keep wandering.]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Мне плохо. Не пойму, где право, где лево.",
                    messageEng: "[I feel sick. \nI can't tell my left from my right.]",
                    time: 3
                },
            ]
        } else if (level == 7) {
            this.phases = [
                {
                    character: "radio",
                    language: "polish",
                    message: "Uwaga. \nŻołnierz wroga widziany w pobliżu. \nZachować czujność.",
                    time: 3
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Алло? Слышите меня?",
                    messageEng: "[Hello? Can you hear me?]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Этот дождь. Грязь попала в ствол.",
                    messageEng: "[This rain. I've got mud in my rifle.]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Надо быть осторожным —\n может дать осечку.",
                    messageEng: "[I need to be careful,\n it could misfire.]",
                    time: 2
                },
            ]
        } else if (level == 8) {
            this.phases = [
                {
                    character: "radio",
                    language: "polish",
                    message: "Sowiecki żołnierz w sektorze. \nWzywam ogień artylerii. \nPowtarzam — ogień artylerii.",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Похоже, это про моё местоположение.",
                    messageEng: "[That sounds like my location.]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Надо убираться отсюда!",
                    messageEng: "[I need to get out of here!]",
                    time: 2
                }
            ]
        } else if (level == 9) {
            this.phases = [
                {
                    character: "injured",
                    language: "russian",
                    message: "Это вражеский форт?",
                    messageEng: "[Is that an enemy fort?]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Другого пути нет — только вперёд.",
                    messageEng: "[Well, no way out but through.]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Если подберусь поближе,\n может, перестреляю через баррикады.",
                    messageEng: "[Maybe if I get close enough,\n I can shoot over the barricades.]",
                    time: 2
                }
            ]
        } else if (level == 10) {
            this.phases = [
                {
                    character: "injured",
                    language: "russian",
                    message: "Это уже не польский форт.\n Это граница!",
                    messageEng: "[That's not a polish fort anymore.\n That's the border!]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "Неужели всё?",
                    messageEng: "[Is it really over?]",
                    time: 2
                },
                {
                    character: "injured",
                    language: "russian",
                    message: "После штурма форта я ранен ещё сильнее..",
                    messageEng: "[I'm even more injured after that fort raid..]",
                    time: 2
                },
                {
                    character: "surrender",
                    language: "russian",
                    message: "Ещё несколько шагов до спасения...",
                    messageEng: "[Just a few steps to safety...]",
                    time: 2
                }
            ]
        } else if (level == 11) {
            this.phases = [
                {
                    character: "surrender",
                    language: "russian",
                    message: "Сдаюсь! Сдаюсь! Я сдаюсь! Пожалуйста!",
                    messageEng: "[I give up! I give up!\n I surrender! Please!]",
                    time: 2
                },
                {
                    character: "surrender",
                    language: "russian",
                    message: "Мне всё равно.\n Я больше не хочу воевать.",
                    messageEng: "[I don't care.\n I don't want to fight anymore.]",
                    time: 2
                },
                {
                    character: "german",
                    language: "german",
                    message: "Ich verstehe Sie kaum. Beruhigen Sie sich.",
                    messageEng: "[I can't understand you. Calm down.]",
                    time: 2
                },
                {
                    character: "surrender",
                    language: "german",
                    message: "Warten Sie — ich spreche Deutsch.\n Bitte, nehmen Sie meine Kapitulation an.",
                    messageEng: "[Wait, I can speak german.\n Please, take my surrender.]",
                    time: 2
                },
                {
                    character: "german",
                    language: "german",
                    message: "Ich akzeptiere Ihre Kapitulation.",
                    messageEng: "[I accept your surrender.]",
                    time: 2
                },
                {
                    character: "german",
                    language: "german",
                    message: "Sie werden als Kriegsgefangener festgehalten,\n obwohl Deutschland in diesem Krieg neutral ist.",
                    messageEng: "[You will be held as a prisoner of war,\n though Germany is neutral in this war.]",
                    time: 2
                },
                {
                    character: "surrender",
                    language: "german",
                    message: "Also ist alles vorbei?",
                    messageEng: "[So it's all over?]",
                    time: 2
                },
                {
                    character: "german",
                    language: "german",
                    message: "Vorerst ja. Keine Versprechen.",
                    messageEng: "[It's over for now. No promises.]",
                    time: 2
                }
            ]
        }
    }
}
