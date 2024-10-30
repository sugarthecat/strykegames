class Set {

    //000, 001, 010, 011, etc
    //corresponds to ABC
    constructor(truthVal) {
        this.truthVal = truthVal;
    }
    at(a, b, c) {
        return this.truthVal[a * 4 + b * 2 + c]
    }
    Intersection(otherSet) {
        let newArr = []
        for (let i = 0; i < this.truthVal.length; i++) {
            newArr.push(this.truthVal[i] && otherSet.truthVal[i])
        }
        return new Set(newArr)
    }
    Union(otherSet) {
        let newArr = []
        for (let i = 0; i < this.truthVal.length; i++) {
            newArr.push(this.truthVal[i] || otherSet.truthVal[i])
        }
        return new Set(newArr)
    }
    Exclude(otherSet) {
        let newArr = []
        for (let i = 0; i < this.truthVal.length; i++) {
            newArr.push(this.truthVal[i] && !otherSet.truthVal[i])
        }
        return new Set(newArr)
    }
    Complement() {
        let newArr = []
        for (let i = 0; i < this.truthVal.length; i++) {
            newArr.push(!this.truthVal[i])
        }
        return new Set(newArr)
    }
}
const A = new Set([false, false, false, false, true, true, true, true])
const B = new Set([false, false, true, true, false, false, true, true])
const C = new Set([false, true, false, true, false, true, false, true])
const U = new Set([true, true, true, true, true, true, true, true])
const empty = new Set([false, false, false, false, false, false, false, false])
//union symbol: ∪
//intersection symbol: ∩
//complement symbol: '
//null set: ∅
function evaluateString(inputStr) {
    let string = inputStr;
    let baseSymbol = string.charAt(0);
    let set;
    if (baseSymbol == "(") {
        let eval = evaluateParentheses(string);
        string = eval[0]
        set = eval[1]
    } else {
        set = getSetFromChar(baseSymbol);
    }
    let index = 1;
    while (index < string.length && string.charAt(index) == "'") {
        set = set.Complement();
        index++
    }
    while (index < string.length) {
        let operation = string.charAt(index);
        index++;
        let newSet;
        if (string.charAt(index) == "(") {
            let eval = evaluateParentheses(string);
            string = eval[0]
            newSet = eval[1]
        } else {
            newSet = getSetFromChar(string.charAt(index));
        }
        index++;
        while (index < string.length && string.charAt(index) == "'") {
            newSet = newSet.Complement();
            index++
        }
        switch (operation) {
            case "-":
                set = set.Exclude(newSet);
                break;
            case "∩":
                set = set.Intersection(newSet);
                break;
            case "∪":
                set = set.Union(newSet);
                break;
            default:
                throw new Error("Unrecognized Operation: " + operation)
        }
    }
    return set;
}
function getSetFromChar(char) {
    let dict = { "A": A, "B": B, "C": C, "U": U, "∅": empty }
    let set = dict[char];
    if (!set) {
        throw new Error("Invalid Set Symbol: " + char);
    }
    return set;
}
function evaluateParentheses(string) {
    let index = string.indexOf("(");
    let sIndex = index;
    index++;
    let depth = 1
    while (index < string.length) {
        if (string.charAt(index) == "(") {
            depth++;
        }
        if (string.charAt(index) == ")") {
            depth--
        }
        index++;

        if (depth == 0) {
            break;
        }
    }
    if (depth != 0) {
        throw new Error("mismatched Parentheses")
    }
    let set = evaluateString(string.substring(sIndex+1,index-1))
    let newString = string.substring(0, sIndex) + "Z" + string.substring(index)
    return [newString,set]
}