let documents = [];
class GameScreen extends GUI {
    constructor() {
        super();
        this.elements = []
        this.scrollOffset = 0;
        this.height = 400;
    }
    Draw(x, y) {
        fill(200)
        image(Assets.govtpaper, 0, 0, 600, 400)
        image(Assets.logo, 5, 5, 150, 50)
        //calculate final num
        this.finalNum = 0;
        for (let i = 0; i < this.clauses.length; i++) {
            this.finalNum = this.clauses[i].applyUser(this.finalNum)
        }
        this.elements[0].text = "Total Due: $" + this.finalNum;
        push()
        translate(0, -this.scrollOffset)
        super.Draw(x, y + this.scrollOffset);
        pop()
    }
    HandleClick(x, y) {
        super.HandleClick(x, y + this.scrollOffset)
    }
    Scroll(scrollAmount) {
        this.scrollOffset = max(0, min(this.scrollOffset + scrollAmount, this.height - 400))
    }
    NewLevel() {
        Assets.music.loop();
        this.elements = []
        let possDocuments = [new LoveLetter(), new Paycheck(), new Diploma(), new DriversLicense()]
        this.accessibleDocuments = []
        while (this.accessibleDocuments.length < difficulty / 2 + 0.5 && possDocuments.length > 0) {
            let newDoc = possDocuments.splice(floor(random(possDocuments.length)), 1)
            this.accessibleDocuments.push(newDoc[0]);
        }

        screens.documents.Update(this.accessibleDocuments);
        //screens.documents.Update(documents)
        let information = GetGlobalInformation();
        for(let i = 0; i<this.accessibleDocuments.length; i++){
            for(let j = 0; j<this.accessibleDocuments[i].information.length; j++){
                information.push(this.accessibleDocuments[i].information[j])
            }
        }
        let ref = this;
        let clauseCount = random(2 + difficulty * 1.5, 3 + difficulty * 2)
        let finalHeight = clauseCount * 60 + 125;
        this.elements.push(new GUIText(25, finalHeight, 400, 50, "0"))
        this.elements.push(new Button(500, finalHeight, 100, 60, "Pay", function () { ref.EvaluateWin() }))
        if(this.accessibleDocuments.length > 0){
            this.elements.push(new Button(350, 10, 200, 30, "Documents", function () { screenOn = "documents" }))
        }
        let payment = 0;
        while(payment == 0){

            this.clauses = []
            for (let i = 0; i < clauseCount; i++) {
                let newClause = new Clause(random(information), payment);
                this.clauses.push(newClause)
                payment = newClause.applyGen(payment);
                this.elements.push(new GUIText(50, 50 + i * 60, 440, 50, newClause.text))
                newClause.checkbox = new Checkbox(0, 55 + i * 60, 50, 50)
                this.elements.push(newClause.checkbox);
            }
        }
        this.height = max(finalHeight + 75, 400)
        this.scrollOffset = 0;
        this.finalNum = 0;
        this.correctPayment = payment;
        /*
        let ref = this;
        for (let i = 0; i < 10; i++) {
            let num = i
            this.elements.push(new Button(i * 50, finalHeight, 50, 50, num, function () { ref.AddNum(num) }))
        }
        this.elements.push(new Button(500, finalHeight, 50, 50, "C", function () { ref.DeleteNum() }))
        this.elements.push(new Button(550, finalHeight, 50, 50, "X", function () { ref.ClearNum() }))
        */
    }
    AddNum(num) {
        this.finalNum *= 10;
        this.finalNum += num;
    }
    DeleteNum() {
        this.finalNum = floor(this.finalNum / 10);
    }
    ClearNum() {
        this.finalNum = 0;
    }
    EvaluateWin() {
        Assets.music.stop();
        if (this.finalNum == this.correctPayment) {
            screenOn = "win";
            Assets.winsound.play();
        } else {
            screenOn = "lose";
            Assets.jailsound.play();
        }
    }
}