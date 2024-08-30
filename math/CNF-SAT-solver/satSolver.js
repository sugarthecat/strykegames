/**
 * Solves a CNF-SAT problem.
 * @param {Array<Array<Object>>} cnf 
 */
let contradiction;
function solveCNFSat(cnf) {
    //in complexity terms, n is the amount of literals.
    let variableValue = new Map()
    let variables = new Set()
    contradiction = false;
    //identify variables, O(n)
    for (let i = 0; i < cnf.length; i++) {
        for (let j = 0; j < cnf[i].length; j++) {
            let literal = cnf[i][j]
            variables.add(literal.v)
        }
    }
    addSolutionSegment("Unsolved variables: " + stringifySet(variables))
    while (
        !contradiction && (
            CNF_Remove_Tautologies(cnf) ||
            CNF_Set_Free_Variables(cnf, variableValue) ||
            CNF_Resolve_Single_Literal_Clauses(cnf, variableValue)
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
 * Takes a Normal Form boolean formula
 * @param {CNF} cnf 
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