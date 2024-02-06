fetch("data/lnames.txt").then(x => x.text()).then(x => x.split(",\r\n")).then(x => last_names = x).then(x => dataLoaded++)
fetch("data/fnames.txt").then(x => x.text()).then(x => x.split("\r\n")).then(x => first_names = x).then(x => dataLoaded++)

fetch("data/csybs.txt").then(x => x.text()).then(x => x.split("\r\n")).then(x => vowelSyllables = x).then(x => dataLoaded++)
fetch("data/vsybs.txt").then(x => x.text()).then(x => x.split("\r\n")).then(x => consonantSyllables = x).then(x => dataLoaded++)
let dataLoaded = 0;
let dataMax = 4;