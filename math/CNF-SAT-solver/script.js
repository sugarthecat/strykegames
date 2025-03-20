/**
 * A Javascript-based CNF-SAT Solver. 
 * This file manages the frontend.
 * @author TJ Nickerson
 */
let clauses = []
function solve() {
    document.getElementById("solution").innerHTML = "<h2>Reduction Process:</h2><hr/>"
    //pass to actual CNF-SAT solver
    solveCNFSat(getCNFData())
}
function getCNFData() {

    //parse OOP into a denser data structure
    let CNFLayout = [];
    for (let i = 0; i < clauses.length; i++) {
        CNFLayout.push([])
        for (let j = 0; j < clauses[i].literals.length; j++) {
            let literal = clauses[i].literals[j]
            CNFLayout[i].push(literal.getCNFObject())
        }
    }
    return CNFLayout
}
let printInfo = true;
function addSolutionSegment(str, allCases = false) {
    if (!allCases && !printInfo) {
        return;
    }
    let newSegment = document.createElement("p")
    newSegment.innerText = str
    document.getElementById("solution").appendChild(newSegment)
}
function addClause(newClause = new OrClause([])) {
    clauses.push(newClause);
    clauseDiv.appendChild(newClause.htmlElement)
}
let clauseDiv
window.onload = function () {
    clauseDiv = document.getElementById('clauses');
}
function updateClauses() {
    for (let i = 0; i < clauses.length; i++) {
        if (clauses[i].literals.length == 0) {
            clauses[i].Delete();
            clauses.splice(i, 1)
            i--;
        }
    }
}
function chooseReduction(){
    document.getElementById("reduction").hidden = true;
    document.getElementById("solution").innerHTML = ""
    console.log(cnfReducedGlobal)
    //clear clauses
    while(clauses.length > 0){
        clauses[clauses.length-1].Delete();
        clauses.pop();
    }
    for(let i = 0; i<cnfReducedGlobal.length; i++){
        let newClause = new OrClause();
        newClause.ClearLiterals();
        for(let j = 0; j<cnfReducedGlobal[i].length; j++){
            let literal = new Literal()
            literal.setVariable(cnfReducedGlobal[i][j].v)
            literal.setNegation(cnfReducedGlobal[i][j].n)
            newClause.AddLiteral(literal)
        }
        addClause(newClause)
    }
}