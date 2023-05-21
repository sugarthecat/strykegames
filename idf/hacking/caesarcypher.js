const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"
function ecaesar(phrase, keys) {
    let word = ""
    for (let j = 0; j < phrase.length; j++) {
        let char = phrase.charAt(j).toLowerCase()
        if (alphabet.includes(char)) {
            word += alphabet[(alphabet.indexOf(char) + keys[j % keys.length] ) % alphabet.length]
        } else {
            word += char
        }
    }
    return word
}
function dcaesar(phrase, keys) {
    let word = ""
    for (let j = 0; j < phrase.length; j++) {
        let char = phrase.charAt(j).toLowerCase()
        if (alphabet.includes(char)) {
            word += alphabet[(alphabet.indexOf(char) - keys[j % keys.length] + alphabet.length) % alphabet.length]
        } else {
            word += char
        }
    }
    return word
}