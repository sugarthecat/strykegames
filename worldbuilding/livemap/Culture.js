const NAMING_STYLES = ["Robotic", "English", "German", "Russian", "French"]
const ENGLISH_SUFFIXES = [" City", "port", "shire", 'ham', 'mouth']
const GERMAN_SUFFIXES = ["burg", "en", "furt", "feld", 'gart', "au", "ich", "zig"]
const RUSSIAN_SUFFIXES = ["burg", "ov", "grad", "sk", "atov", "ovy"]
const FRENCH_SUFFIXES = ["eaux", "bourg", "eau", "aise","is","ais","les","on"]
const CONSONANTS = ["b", "c", "d", "f", "g", "h", 'j', 'k', 'l', 'm', 'p', 'r', 's', 't', 'v', 'w', 'z', "th", 'sk', "gr", "rl"]
const VOWELS = ["a", 'e', 'i', 'o', 'u']
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
                this.consonants = []
                this.vowels = []
                for (let i = 0; i < 50; i++) {
                    this.consonants.push(random(CONSONANTS))
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
                    newName = this.GenerateName(i + 1)
                    break;
                default:
                    newName = this.GenerateName()
                    break;
            }
            tiles[i].name = newName
        }
    }
    GenerateName(arg) {
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
                name = this.generateNameBase() + random(ENGLISH_SUFFIXES)
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
            default:

                break;
        }
        return capitalizeFirstLetter(name);
    }
    generateNameBase() {
        let length = random(3, 5)
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
    return string.charAt(0).toUpperCase() + string.slice(1);
}