
class NumberOperator {
    constructor(name, operation) {
        this.name = name;
        this.operation = operation;
    }
}
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const numberOperators = [
    new NumberOperator("even", function(x){return (x % 2 == 0) }),
    new NumberOperator("odd", function(x){return (x % 2 == 1) })
];
function GetGlobalInformation(){
    return [
    ]
}
class EnumInformation {
    constructor(infoName, current, possible) {
        this.name = infoName
        this.current = current;
        this.possible = possible;
    }
    GetNotCurrent() {
        let pick = random(this.possible)
        while (pick == this.current) {
            pick = random(this.possible);
        }
        return pick;
    }
}

class NumberInformation {
    constructor(infoName, value) {
        this.name = infoName
        this.value = value;
    }
}


class Clause {
    constructor(information, currentPayment) {
        //condition
        this.text = ""
        this.valid = random([true, false]);
        if (information instanceof EnumInformation) {
            this.text = "if " + information.name + " is "
            if (this.valid) {
                this.text += information.current
            } else {
                this.text += information.GetNotCurrent();
            }
        }
        if (information instanceof NumberInformation) {
            this.text = "if " + information.name + " "
            let operator = random(numberOperators)

            if (this.valid) {
                if(operator.operation(information.value) == true){
                    this.text += "is " + operator.name
                }else{
                    this.text += "isn't " + operator.name
                }
            } else {
                if(operator.operation(information.value) == true){
                    this.text += "isn't " + operator.name
                }else{
                    this.text += "is " + operator.name
                }
            }
        }
        //effect
        let effects = ["pay"]
        let effect = random(effects)
        this.apply = function (num) { return num; }
        switch (effect) {
            case "pay":
                let payValue = floor(random(200, 5000))
                this.text += ", pay $" + payValue;
                this.apply = function (num) { return num + payValue; }
                break;
        }
    }
    applyGen(num) {
        if (this.valid) {
            return this.apply(num);
        } else {
            return num;
        }
    }
    applyUser(num) {
        if (this.checkbox.enabled) {
            return this.apply(num);
        } else {
            return num;
        }
    }
}