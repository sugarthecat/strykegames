/**
 * Solves a CNF-SAT problem.
 * @param {Array<Array<Object>>} cnf 
 */
let contradiction;
let cnfGlobal;
function solveCNFSat(cnf) {
    //in complexity terms, n is the amount of literals.
    let variableValue = new Map()
    let variables = new Set()
    contradiction = false;
    cnfGlobal = cnf;
    //identify variables, O(n)
    for (let i = 0; i < cnf.length; i++) {
        for (let j = 0; j < cnf[i].length; j++) {
            let literal = cnf[i][j]
            variables.add(literal.v)
        }
    }
    addSolutionSegment("Variables: " + stringifySet(variables))
    CNF_Remove_Tautologies(cnf) //only needs to occur once
    addSolutionSegment(stringifyCNF(cnf))
    while (
        !contradiction && (
            CNF_Set_Free_Variables(cnf, variableValue) ||
            CNF_Resolve_Single_Literal_Clauses(cnf, variableValue) ||
            CNF_Remove_Supersets(cnf)
        )
    ) {
        addSolutionSegment(stringifyCNF(cnf))
    }
    if (!contradiction) {
        addSolutionSegment("Final Reduced form:")
        addSolutionSegment(stringifyCNF(cnf))
        addSolutionSegment("Deduced variables:")
        let iter = variableValue.keys()
        let iterNext = iter.next()
        let str = ""
        while (!iterNext.done) {
            str += `${iterNext.value} = ${variableValue.get(iterNext.value)},`;
            iterNext = iter.next()
        }
        addSolutionSegment(str)
    }else{
        addSolutionSegment("There is no solution.")
    }
}
/**
 * 
 */
function CNF_Simplify_Clauses(cnf){

}
/**
 * Removes tautologically true clauses and simplifies clauses when a literal is duplicated
 */
function CNF_Remove_Tautologies(cnf) {
    let actionPerformed = false;
    for (let i = 0; i < cnf.length; i++) {
        let clause = cnf[i];
        let variableNegativity = new Map()
        for (let j = 0; j < clause.length; j++) {
            if (variableNegativity.has(clause[j].v)) {
                if (variableNegativity.get(clause[j].v) != clause[j].n) {
                    //tautology, delete
                    addSolutionSegment(`${stringifyClause(clause)} is a tautology, since ${clause[j].v} can be ether true or positive`)
                    actionPerformed = true;
                    cnf.splice(i, 1);
                    i--;
                    break;
                }
            } else {
                variableNegativity.set(clause[j].v, clause[j].n)
            }
        }
    }
    return actionPerformed;
}
/**
 * If there is no point in the problem in which a certain variable is negated, or no point in which it is not negated, then
 * set the variable to the condition which would leave the literals always evaluating to true.
 */
function CNF_Set_Free_Variables(cnf, variableValue) {
    let actionPerformed = false;
    let variables = new Set();
    let positiveVariables = new Set();
    let negativeVariables = new Set();
    for (let i = 0; i < cnf.length; i++) {
        for (let j = 0; j < cnf[i].length; j++) {
            let literal = cnf[i][j]
            if (literal.n) {
                variables.add(literal.v)
                negativeVariables.add(literal.v)
            } else {
                variables.add(literal.v)
                positiveVariables.add(literal.v)
            }
        }
    }
    let solvedNegative = variables.difference(positiveVariables)
    let iter = solvedNegative[Symbol.iterator]();
    let iterVal = iter.next()
    while (!iterVal.done) {
        actionPerformed = true;
        variableValue.set(iterVal.value, false);
        addSolutionSegment(iterVal.value + " = false")
        iterVal = iter.next();
    }
    delete negativeVariables;
    let solvedPositive = variables.difference(negativeVariables)
    iter = solvedPositive[Symbol.iterator]();
    iterVal = iter.next()
    while (!iterVal.done) {
        actionPerformed = true;
        variableValue.set(iterVal.value, true);
        addSolutionSegment(iterVal.value + " = true")
        iterVal = iter.next();
    }
    delete positiveVariables;
    if (actionPerformed) {
        CNF_Substitute(cnf, variableValue)
    }
    return actionPerformed
}
/**
 * Applies substitutions according to the VariableValue argument
 */
function CNF_Substitute(cnf, variableValue) {
    for (let i = 0; i < cnf.length; i++) {
        for (let j = 0; j < cnf[i].length; j++) {
            if (variableValue.has(cnf[i][j].v)) {
                let literalValue = variableValue.get(cnf[i][j].v) != cnf[i][j].n
                if (literalValue) {
                    addSolutionSegment(`Statement satisfied: ${stringifyClause(cnf[i])}, ${cnf[i][j].n ? "!" : ""}${cnf[i][j].v} = true`)
                    cnf.splice(i, 1);
                    i--;
                    break;
                } else {
                    if (cnf[i].length <= 1) {
                        addSolutionSegment("Contradiction found: " + cnf[i][j].v + " cannot be true or false")
                        contradiction = true;
                        return;
                    } else {
                        addSolutionSegment(`Statement false: ${stringifyLiteral(cnf[i][j])}`)
                        let oldClause = stringifyClause(cnf[i]);
                        cnf[i].splice(j, 1);
                        let newClause = stringifyClause(cnf[i])
                        addSolutionSegment(`${oldClause} -> ${newClause}`)
                    }
                }
            }
        }
    }
}
/**
 * If a single literal clause is true, the literal must evaluate to true.
 * If contradictions arise, the CNF-SAT problem is impossible.
 * Set the literal to equate to true and substitute the variable.
 */
function CNF_Resolve_Single_Literal_Clauses(cnf, variableValue) {
    let actionPerformed = false;
    for (let i = 0; i < cnf.length; i++) {
        if (cnf[i].length == 1) {
            addSolutionSegment("Single-literal identified: " + stringifyClause(cnf[i]))
            variableValue.set(cnf[i][0].v, !cnf[i][0].n);
            actionPerformed = true;
            break;
        }
    }
    if (actionPerformed) {
        CNF_Substitute(cnf, variableValue)
    }
    return actionPerformed
}
/**
 * If, between two CNF clauses, all of the terms of CNF Clause A are terms in CNF Clause B,
 * then clause A implies clause B, and clause B can be removed, since all clauses would need to be satisfied.
 */
function CNF_Remove_Supersets(cnf){
    /**
     * Checks if ClauseA is a subset of clauseB
     */
    function CNF_check_subset(clauseA,clauseB){
        for(let i = 0; i<clauseA.length; i++){
            let foundElement = false;
            for(let j = 0; j<clauseB.length; j++){
                if(clauseA[i].n == clauseB[j].n && clauseA[i].v == clauseB[j].v){
                    foundElement = true;
                    break;
                }
            }
            if(!foundElement){
                return false;
            }
        }
        return true;
    }
    let actionPerformed = false;
    for(let i = 0; i<cnf.length; i++){
        for(let j = 0; j<cnf.length; j++){
            if(i == j){
                //ensure we are comparing 2 distinct clauses
                continue;
            }
            if(CNF_check_subset(cnf[i],cnf[j])){
                addSolutionSegment(`${stringifyClause(cnf[i])} is a subclause of ${stringifyClause(cnf[j])}`)
                cnf.splice(j,1);
                i--;
                actionPerformed = true;
                break;
            }
            //check if CNF[i] is a subset of CNF[j]
            
        }
    }
    return actionPerformed;
}
function stringifyCNF(cnf) {
    let str = "("
    for (let i = 0; i < cnf.length; i++) {
        str += stringifyClause(cnf[i])
        if (i + 1 < cnf.length) {
            str += "∧"
        }
    }
    str += ")"
    return str;
}
function stringifyClause(clause) {
    let str = "("
    for (let i = 0; i < clause.length; i++) {
        if (clause[i].n) {
            str += "¬"
        }
        str += clause[i].v
        if (i + 1 < clause.length) str += " ∨ ";
    }
    str += ")"
    return str;
}
function stringifySet(set) {
    let str = "{"
    let iter = set[Symbol.iterator]();
    let iterVal = iter.next()
    while (!iterVal.done) {
        str += iterVal.value
        iterVal = iter.next();
        if (!iterVal.done) {
            str += " , "
        }
    }
    str += "}"
    return str;
}
function stringifyLiteral(literal) {
    let str = ""
    if (literal.n) {
        str += "¬"
    }
    str += literal.v;
    return str;
}