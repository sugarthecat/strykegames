const validMultispaceKeys = ["Backspace", "Enter"]
document.onkeydown = function (e) {
    if (e.key.length > 1 && !validMultispaceKeys.includes(e.key)) {
        return
    }
    if (e.key == "Enter") {
        let cmd = document.getElementById("prompt").innerText
        cmd = cmd.substring(0, cmd.length - 1)
        currentCMDprompt += cmd + "<br/>"
        enterCommand(cmd)
    } else if (e.key == "Backspace") {
        currentMessage = currentMessage.substring(0, currentMessage.length - 1);
    } else if (e.key == "v" && e.ctrlKey) {
        pasteContent()
    }
    else {
        currentMessage += e.key
    }
    render()
}
let currentMessage = ""
let sysarr = [];
let awaitedMessage = "";

const startingPrompt = "IDF MILITARY INTELLIGENCE CONSOLE - LOADING . . . 1ESTABLISHING SECURE CONNECTION . . .1VERIFYING CREDENTIALS . . .1PREPARING CONSOLE . . .1<h2>Israeli Defense Forces</h2>ENTER COMMAND: "

const finalprompt = startingPrompt.replaceAll(1, "<br/>")
let currentCMDprompt = "";
let chars = 0

let wordbank = [];
async function loadWordBank(){
    let text = fetch("words.txt").then(x => x.text())
    wordbank = (await text).split("\r\n");
    console.log(wordbank)
}
loadWordBank();
async function pasteContent() {
    try {
        let text = await navigator.clipboard.readText();
        currentMessage += text
        render()
    }
    catch {
        console.error("Error reading clipboard")
    }
}

function render() {
    let content = document.getElementById("content")
    content.innerHTML = currentCMDprompt + "<span id=\"prompt\"></span>"
    if (currentCMDprompt.length < finalprompt.length) {
        currentCMDprompt = startingPrompt.substring(0, chars).replaceAll(1, "<br/>")
        chars++;
        clearInterval(interval);
        setTimeout(render, 50)
    } else {
        document.getElementById("prompt").innerText = currentMessage + "|"
    }
    window.scrollTo(0, document.body.scrollHeight);
}
function enterCommand(cmd) {
    let args = cmd.split(" ");
    let formattedCommand = args[0].toLowerCase();

    if (formattedCommand == "help") {
        currentCMDprompt += "<br/>"
        currentCMDprompt += "General Commands<br/>"
        currentCMDprompt += "HELP: print command list <br/>"
        currentCMDprompt += "<br/>"
        currentCMDprompt += "Caesar Cypher Commands<br/>"
        currentCMDprompt += "ECAESAR &#8249;phrase&#8250; &#8249;key1&#8250; &#8249;key2&#8250; &#8249;keyN&#8250;: Caesar cypher encode a given phrase with keys <br/>"
        currentCMDprompt += "DCAESAR &#8249;phrase&#8250; &#8249;key1&#8250; &#8249;key2&#8250; &#8249;keyN&#8250;: Caesar cypher decode a given phrase with keys <br/>"
        currentCMDprompt += "BFCAESAR &#8249;phrase&#8250; &#8249;keyCount&#8250;: Bruteforce caesar cypher crack a given phrase. Loads possibilities into sysarr <br/>"
        currentCMDprompt += "<br/>"
        currentCMDprompt += "Sysarr Commands<br/>"
        currentCMDprompt += "PREVIEW: previews 10 entries remaining in sysarr<br/>";
        currentCMDprompt += "COUNT: counts entries remaining in sysarr<br/>";
        currentCMDprompt += "FILTER <phrase>: removes all entries with the given phrase<br/>";
        currentCMDprompt += "FREQUENCY <phrase> <count>: removes all entries with the given phrase more than count times<br/>";
        currentCMDprompt += "<br/>"
    } else if (formattedCommand == "ecaesar") {
        if (args.length < 3) {
            currentCMDprompt += "<span>Error: Missing args: Required 2</span><br/>"
        } else {
            let keys = []
            for (let i = 2; i < args.length; i++) {
                keys.push(Number(args[i]))
            }
            let word = ecaesar(args[1], keys)
            currentCMDprompt += word + "<br/>"
        }
    } else if (formattedCommand == "dcaesar") {
        if (args.length < 3) {
            currentCMDprompt += "<span>Error: Missing args: Required 2</span><br/>"
        } else {
            let keys = []
            try {
                for (let i = 2; i < args.length; i++) {
                    keys.push(Number(args[i]))
                }
                let word = dcaesar(args[1], keys)
                currentCMDprompt += word + "<br/>"
            } catch {
                currentCMDprompt += "<span>Error: Cannot parse key numbers.</span><br/>"

            }
        }
    } else if (formattedCommand == "preview") {
        if (sysarr.length == 0) {
            currentCMDprompt += "No entries in sysarr</br>"
        }
        for (let i = 0; i < sysarr.length && i < 10; i++) {
            currentCMDprompt += sysarr[i] + "<br/>"
        }
    } else if (formattedCommand == "previewall") {
        if (sysarr.length == 0) {
            currentCMDprompt += "No entries in sysarr</br>"
        }
        for (let i = 0; i < sysarr.length; i++) {
            currentCMDprompt += sysarr[i] + "<br/>"
        }
    } else if (formattedCommand == "count") {
        if (sysarr.length == 0) {
            currentCMDprompt += "No entries in sysarr</br>"
        } else {
            currentCMDprompt += sysarr.length + " entries in sysarr</br>"
        }
    } else if (formattedCommand == "filter") {
        let removed = 0;
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing args: Required 1</span><br/>"
        } else {
            for (let i = 0; i < sysarr.length; i++) {
                if (sysarr[i].includes(args[1])) {
                    sysarr.splice(i, 1);
                    removed++;
                    i--;
                }
            }
        }

        currentCMDprompt += "Filter ran. " + removed + " entries removed.<br/>"
    } else if (formattedCommand == "filterword") {
        let removed = 0;
        for (let i = 0; i < sysarr.length; i++) {
            if (sysarr[i].includes(args[1])) {
                sysarr.splice(i, 1);
                removed++;
                i--;
            }
        }

        currentCMDprompt += "Filter ran. " + removed + " entries removed.<br/>"
    } else if (formattedCommand == "frequency") {
        let removed = 0;
        if (args.length < 3) {
            currentCMDprompt += "<span>Error: Missing args: Required 2</span><br/>"
        } else {
            let maxcount = Number(args[2])
            for (let i = 0; i < sysarr.length; i++) {

                let matchcount = 0;
                for (let j = 0; j < sysarr[i].length - args[1].length + 1; j++) {
                    if (sysarr[i].substring(j, j + args[1].length) == args[1]) {
                        matchcount++;
                    }
                }
                if (matchcount > maxcount) {
                    sysarr.splice(i, 1);
                    removed++;
                    i--;
                }
            }
        }

        currentCMDprompt += "Filter ran. " + removed + " entries removed.<br/>"
    } else if (formattedCommand == "bfcaesar") {
        if (args.length < 3) {
            currentCMDprompt += "<span>Error: Missing args: Required 2</span><br/>"
        } else {
            let keycount = Number(args[2])
            sysarr = [];
            for (let keynum = 0; keynum < Math.pow(alphabet.length, keycount); keynum++) {
                let keys = []
                for (let i = 0; i < keycount; i++) {
                    keys.push(0)
                }
                keys[0] = keynum;
                for (let i = 1; i < keycount; i++) {
                    keys[i] = Math.floor(keys[i - 1] / alphabet.length)
                    keys[i - 1] = keys[i - 1] % alphabet.length
                }
                let word = ""
                for (let j = 0; j < args[1].length; j++) {
                    let char = args[1].charAt(j).toLowerCase()
                    if (alphabet.includes(char)) {
                        word += alphabet[(alphabet.indexOf(char) + keys[j % keys.length]) % alphabet.length]
                    } else {
                        word += char
                    }
                }
                sysarr.push(word)

            }
        }
        currentCMDprompt += "Loaded.<br/>"
    } else {
        currentCMDprompt += "<span>UNRECOGNIZED COMMAND</span><br/>"
    }
    currentMessage = "";
    currentCMDprompt += "ENTER COMMAND: "
    render();
}
let interval = setInterval(render, 100)