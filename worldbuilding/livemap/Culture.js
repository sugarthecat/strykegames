const NAMING_STYLES = ["American", "Robotic", "English", "German", "Russian", "French", "Greek", "Chinese"]
const ENGLISH_SUFFIXES = ["borough", "field", "port", "shire", 'ham', 'mouth', 'ley', 'itch']
const GERMAN_SUFFIXES = ["burg", "en", "furt", "feld", 'gart', "au", "ich", "zig"]
const RUSSIAN_SUFFIXES = ["ov", "grad", "sk", "atov", "ovy", "tov", "ir", "orod"]
const FRENCH_SUFFIXES = ["eaux", "bourg", "eau", "aise", "is", "ais", "les", "on"]
const GREEK_SUFFIXES = ["opolis", "ople", "iki", "upoli", "mos", "dri"]
const CHINESE_SUFFIXES = ["ing", "nang", "sha", "ing", "king", "dong", "ruo"]
const AMERICAN_SUFFIXES = ["field", "ton", "ville", "town"]
const CONSONANTS = ["b", "c", "d", "f", "g", "h", 'j', 'k', 'l', 'm', 'p', 'r', 's', 't', 'v', 'w', 'z', "th", 'sk', "gr", "rl"]
const VOWELS = ["a", 'e', 'i', 'o', 'u', ]
class Culture {

    constructor() {
        this.namingStyle = random(NAMING_STYLES)
        this.usedCityNames = []

        switch (this.namingStyle) {
            case "Robotic":
                this.namingPrefix = random(["Zone", "Sector", "Precinct", 'District'])
                this.numberStyle = random(["Roman", "Normal"])
                break;
            default:
                //generate consonant / vowel distribution
                this.consonants = []
                this.vowels = []
                for (let i = 0; i < 30; i++) {
                    this.consonants.push(random(CONSONANTS))
                }
                for(let i = 0; i<10; i++){
                    
                    this.vowels.push(random(VOWELS))
                }
                break;
        }
    }
    NameTiles(tiles) {
        for (let i = 0; i < tiles.length; i++) {
            let newName = ""
            switch (this.namingStyle) {
                case "Robotic":
                    newName = this.GenerateCityName(i + 1)
                    break;
                case "American":
                    newName = this.GenerateCityName(tiles[i])
                    break;
                default:
                    newName = this.GenerateCityName()
                    break;
            }
            tiles[i].name = newName
        }
    }
    GenerateCityName(arg) {
        let name = "test"
        switch (this.namingStyle) {
            case "Robotic":
                if (this.numberStyle == "Roman") {
                    name = this.namingPrefix + " " + ToRomanNumeral(arg);
                } else {
                    name = this.namingPrefix + " " + (arg);
                }
                break;
            case "English":
                name = this.generateNameBase(3, 4) + random(ENGLISH_SUFFIXES)
                break;
            case "German":
                name = this.generateNameBase() + random(GERMAN_SUFFIXES)
                break;
            case "Russian":
                name = this.generateNameBase() + random(RUSSIAN_SUFFIXES)
                break;
            case "French":
                name = this.generateNameBase() + random(FRENCH_SUFFIXES)
                break;
            case "Greek":
                name = this.generateNameBase() + random(GREEK_SUFFIXES)
                break;
            case "Chinese":
                name = this.generateNameBase() + random(CHINESE_SUFFIXES)
                break;
            case "American":
                if (arg.importance > 0.4) {
                    name = this.generateNameBase();

                    if (random() < 0.4) {
                        name += " City"
                    } else if (random() < 0.3) {
                        name = "New " + name;
                    } else if (random() < 0.2) {
                        name = "Saint " + name;
                    } else {
                        name += random(AMERICAN_SUFFIXES)
                    }
                } else {
                    name = this.generateNameBase() + " County";
                }

                break;
            default:

                break;
        }
        return capitalizeFirstLetter(name);
    }
    generateNameBase(minCount = 3, maxCount = 5) {
        let length = random(minCount, maxCount)
        let base = ""
        for (let i = floor(random(1.25)); i < length; i++) {
            if (i % 2 == 1) {
                base += random(this.vowels)
            } else {
                base += random(this.consonants)
            }
        }
        return base
    }
}
function ToRomanNumeral(num) {
    let textForm = '';
    let n = num;
    while (n > 0) {
        if (n >= 50) {
            textForm += 'L'
            n -= 50;
        } else if (n >= 40) {

            textForm += 'XL'
            n -= 40;
        } else if (n >= 10) {

            textForm += 'X'
            n -= 10;
        } else if (n >= 9) {
            textForm += 'IX'
            n -= 9;
        } else if (n >= 5) {
            textForm += 'V'
            n -= 5;
        } else if (n == 4) {
            textForm += 'IV'
            n -= 4;
        } else {
            textForm += 'I'
            n--;
        }
    }
    return textForm;
}
function capitalizeFirstLetter(string) {
    let words = string.split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }
    return words.join(" ");
}