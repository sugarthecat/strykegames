
class Literal {
    /**
     * Initializes a literal
     */
    constructor() {
        this.negated = false;

        let ref = this;

        this.htmlElement = document.createElement("span")
        let inputElement = document.createElement("input")
        inputElement.onkeydown = function () {
            inputElement.style.width = Math.max(1.5, inputElement.value.length + 1) + "ch";
        }
        let inversion = document.createElement("span")
        inversion.innerHTML = "&not;"
        inversion.onclick = function () { ref.invertNegation() }

        this.htmlElement.appendChild(inversion)
        this.htmlElement.className = "literal"
        this.htmlElement.appendChild(inputElement)
    }
    /**
     * Returns the HTML Element
     * @returns {HTMLElement} 
     */
    getElement() {
        return this.htmlElement;
    }
    /**
     * Inverts the negation of the literal
     */
    invertNegation() {
        this.negated = !this.negated;
        if (this.negated) {
            this.htmlElement.className = "negated literal"
        } else {
            this.htmlElement.className = "literal"
        }
    }
    /**
     * Delete the HTML element corresponding to this literal off of the webpage
     */
    Delete() {
        this.htmlElement.remove();
    }
    /**
     * Gets a simpler object
     * @returns {n: Boolean, v: String}
     */
    getCNFObject() {
        return { n: this.negated, v: this.htmlElement.children[1].value }
    }
    /**
     * 
     * @param {String} v The variable to set it to
     */
    setVariable(v) {
        this.htmlElement.children[1].value = v;
    }
    /**
     * Set the literal to the negation or the non-negation of the variable
     * @param {Boolean} n If the variable is to be negated
     */
    setNegation(n) {
        if(n != this.negated){
            this.invertNegation()
        }
    }
}
class OrClause {
    /**
     * Represents a string of OR statements 
     * @param {Array<Literal>} literals A list of literals
     */
    constructor(literals = []) {

        let ref = this;
        this.literals = literals
        this.htmlElement = document.createElement("div")
        this.htmlElement.innerHTML = "(<span></span>)"
        this.htmlElement.classList.add("clause")

        let addLiteralButton = document.createElement("button");
        addLiteralButton.innerText = " + "
        addLiteralButton.onclick = function () { ref.AddLiteral() }
        this.htmlElement.appendChild(addLiteralButton)
        let removeLiteralButton = document.createElement("button");
        removeLiteralButton.innerText = " - "
        removeLiteralButton.onclick = function () { ref.RemoveLiteral() }
        this.htmlElement.appendChild(removeLiteralButton)

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "X"
        deleteButton.onclick = function () {
            ref.literals = []
            updateClauses();
        }
        this.htmlElement.appendChild(deleteButton)

        this.AddLiteral();
    }
    /**
     * Evaluate the or clause as true or false
     */
    getValue() {
        let possTrue = false;
        for (let i = 0; i < this.literals.length; i++) {
            let literalValue = this.literals[i].getValue()
            if (literalValue === true) {
                return true;
            }
            if (literalValue === null) {
                possTrue = true
            }
        }
        if (possTrue) {
            return null;
        } else {
            return false;
        }
    }
    /**
     * Adds another literal to this clause
     */
    AddLiteral(literal = new Literal()) {
        this.literals.push(literal)
        this.htmlElement.children[0].appendChild(this.literals[this.literals.length - 1].getElement())
    }
    RemoveLiteral() {
        if (this.literals.length > 1) {
            this.literals.pop().Delete();
        }
    }
    ClearLiterals(){
        while(this.literals.length > 0){
            this.literals.pop().Delete();
        }
    }
    Delete() {
        this.htmlElement.remove()
    }
}