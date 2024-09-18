
function stringifyCNF(cnf) {
    let str = "("
    for (let i = 0; i < cnf.length; i++) {
        str += stringifyClause(cnf[i])
        if (i + 1 < cnf.length) {
            str += " ∧ "
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
function CNF_Count_Literals(cnf){
    let literals = 0;
    for(let i = 0; i<cnf.length; i++){
        literals += cnf[i].length;
    }
    return literals;
}