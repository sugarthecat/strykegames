class Documents extends GUI {
    constructor() {
        super();
    }
    Draw(x, y) {
        fill(255)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
    Update(docs) {
        this.elements = [new Button(15, 15, 150, 40, "Return", function () { screenOn = "game" })]
        for (let i = 0; i < docs.length; i++) {
            let destination = docs[i]
            screens[destination.id] = destination;
            this.elements.push(new Button(200, 50 + i * 80, 200, 50, destination.name, function () { screenOn = destination.id; }))
        }
    }
}
class GameDocument extends GUI {
    constructor(name, id) {
        super();
        this.name = name;
        this.id = id;
        this.elements = [new Button(15, 15, 150, 40, "Return", function () { screenOn = "documents" })];
    }
}

const loverNames = ["Maria", "Joana", "Alexis", "Ruth", "Anna", "Jessica"]
const lastNames = ["Smith", "Brown", "Hanlon", "Burger", "Green", "Jackson"]
const boyfriendNames = ["Jack", "John", "Steven", "Rick", "Robert", "Eugene"]
const classNames = ["Math", "Science", "English", "History", "Gym"]
const nicknames = ["Biggs", "Skinny", "J-Dog", "Noodle", "Conehead", "Poindexter"]
class LoveLetter extends GameDocument {
    constructor() {
        super("Love Letter", "loveletter")
        let lover = random(loverNames);
        let loverlastname = random(lastNames);
        let nickname = random(nicknames)

        let yearMeeting = floor(random(2005, 2015))
        this.information = [
            new EnumInformation("your first love's name", lover, loverNames),
            new EnumInformation("your first love's last name", loverlastname, lastNames),
            new EnumInformation("your high school nickname", nickname, nicknames),
            new NumberInformation("the year you met your crush", yearMeeting)
        ]
        this.elements.push(new GUIText(50, 50, 400, 40, "Dear " + lover + " " + loverlastname + ","))
        let paragraphs = ["boyfriend", "class"]
        let paragraphCount = 2
        this.elements.push(new GUIText(50, 90 + 45 * (paragraphCount), 400, 40, "Love, " + nickname + " (" + floor(random(1, 12)) + "/" + floor(random(1, 29)) + "/" + yearMeeting + ")"))

        for (let i = 0; i < paragraphCount; i++) {
            let para = paragraphs.splice(floor(random(paragraphs.length)), 1)[0]
            switch (para) {
                case "boyfriend":
                    let boyfriendName = random(boyfriendNames)
                    this.elements.push(new GUIText(50, 90 + 45 * i, 400, 40, "I hope you aren't still with " + boyfriendName + '.'));
                    this.information.push(new EnumInformation("your former romantic rival's name", boyfriendName, boyfriendNames))
                    break;
                case "class":
                    let className = random(classNames)
                    this.elements.push(new GUIText(50, 90 + 45 * i, 400, 40, "I miss when we first met, back in " + className + " class."));
                    this.information.push(new EnumInformation("the class you met your crush in", className, classNames))
                    break;
            }
        }

    }
    Draw() {
        image(Assets.crumpledpaper, 0, 0, 600, 400)
        super.Draw()
    }
}

const companies = ["Steel Incorporated", "Plastics, Inc.", "El Diego Times", "Jackson Herald Corp.", "Old America Auto Repair"]
const jobs = ["Manager", "Supervisor", "Employee", "Security", "Accountant", "CEO", "Janitor"]
const banks = ["Bank of Small Towns", "Pop & Kid Banking", "National Credit Union"]
const depositMethods = ["Auto-deposit", "Check", "Cash", "Gold Coins"]
class Paycheck extends GameDocument {
    constructor() {
        super("Paycheck", "check")
        let employer = random(companies)
        let checkAmount = floor(random(500, 3000))
        let bank = random(banks)
        let payment = random(depositMethods);
        this.information = [
            new EnumInformation("your job's payment method", payment, depositMethods),
            new EnumInformation("your employer", employer, companies),
            new EnumInformation("your bank", bank, banks),
            new NumberInformation("the amount on your most recent paycheck", checkAmount)
        ]
        this.elements.push(new GUIText(50, 50, 400, 40, "PAYMENT - " + bank))
        this.elements.push(new GUIText(50, 100, 400, 40, "AMOUNT: $" + checkAmount))
        this.elements.push(new GUIText(50, 150, 400, 40, "PAID BY: " + employer))
        this.elements.push(new GUIText(50, 200, 400, 40, "PAID THRU: " + payment))

    }
    Draw() {
        image(Assets.crumpledpaper, 0, 0, 600, 400)
        super.Draw()
    }
}

const universityTypes = ["University", "College", "Institute", "Community College"]
const universityTitles = ["Southern", "New England", "Brooklyn", "California", "Mid-Atlantic", "Midwestern"];
const degreeTitles = ["Bachelor's Degree", "Master's Degree", "High School Diploma", "Doctorate Degree", "Associate's Degree"]
const degreeTypes = ["Computer Science", 'Finance', "Mathematics", "Biology", "Mechanical Engineering", "English", "History", "Sports Management"]
class Diploma extends GameDocument {
    constructor() {
        super("Degree", "diploma")
        let universityType = random(universityTypes);
        let uniTitle = random(universityTitles);
        let degreeType = random(degreeTypes);
        let degreeTitle = random(degreeTitles);
        this.elements.push(new GUIText(50, 50, 500, 100, "The " + uniTitle + " " + universityType + " Hereby grants"))
        this.elements.push(new GUIText(50, 180, 400, 50, "A " + degreeTitle + " in " + degreeType))
        this.information = [
            new EnumInformation("your highest level of education", degreeTitle, depositMethods),
            new EnumInformation("your highest educational institution attended", universityType, universityTypes),
            new EnumInformation("the location of your highest education", uniTitle, universityTitles),
            new EnumInformation("your academic field", degreeType, degreeTypes),
        ]
    }
    Draw() {
        image(Assets.govtpaper, 0, 0, 600, 400)
        super.Draw()
    }
}

const firstNames = ["Alex", "Payton", "Sal", "Sam", "Charlie"]
const hairColors = ["black", "blond", "gray"];
class DriversLicense extends GameDocument {
    constructor() {
        super("Driver's License", "license")

        let firstName = random(firstNames);
        let lastName = random(lastNames)
        let birthYear = floor(random(1987, 2003))
        let hairColor = random(hairColors)
        this.elements.push(new GUIText(150, 50, 350, 100, firstName + " " + lastName))
        this.elements.push(new GUIText(150, 180, 300, 50, "Born " + floor(random(1, 12)) + "/" + floor(random(1, 29)) + "/" + birthYear))
        this.information = [
            new EnumInformation("your first name", firstName, firstNames),
            new EnumInformation("your last name", lastName, lastNames),
            new EnumInformation("your hair color", hairColor, hairColors),
            new NumberInformation("your birth year", birthYear),
        ]
        this.hairColor = hairColor;
    }
    Draw() {
        image(Assets.govtpaper, 0, 0, 600, 400)
        switch (this.hairColor) {
            case "blond":

                image(Assets.blond, 20, 160, 120, 160)
                break;
            case "black":

                image(Assets.black, 20, 160, 120, 160)
                break;
            case "gray":
                image(Assets.gray, 20, 160, 120, 160)
                break;
        }
        super.Draw()
    }
}