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

const vowels = "aeiouy"
const numbers = "1234567890"

const startingPrompt = "IDF MILITARY INTELLIGENCE CONSOLE - LOADING . . . 1ESTABLISHING SECURE CONNECTION . . .1VERIFYING CREDENTIALS . . .1PREPARING CONSOLE . . .1<h2>Israeli Defense Forces</h2>ENTER COMMAND: "
const finalprompt = startingPrompt.replaceAll(1, "<br/>")
let currentCMDprompt = "";
let chars = 0

let wordbank = [];
async function loadWordBank() {
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

let currentProcess = false
function render() {

    if (currentProcess) {
        let startMs = Date.now()
        while (Date.now() < startMs + 500 && currentProcess) {
            for (let i = 0; i < 50; i++) {
                currentProcess.Work();
                if (currentProcess.finished) {
                    currentCMDprompt += `Filter ran. ${currentProcess.removed} entries removed.<br/>`
                    currentProcess = false;
                    sysarr = newSysArr
                    currentCMDprompt += "ENTER COMMAND: "
                    break;
                }
            }
        }
        updatePage();
    } else if (currentCMDprompt.length < finalprompt.length) {
        currentCMDprompt = startingPrompt.substring(0, chars).replaceAll(1, "<br/>")
        chars++;
        updatePage();
    } else {
        document.getElementById("prompt").innerText = currentMessage + "|"
    }
}
function updatePage() {
    let content = document.getElementById("content")
    content.innerHTML = currentCMDprompt + "<span id=\"prompt\"></span>"
    if (currentProcess) {
        content.innerHTML = currentCMDprompt + `<div style = "color:red">PROCESS ACTIVE - ${Math.floor(10000 * currentProcess.progress / sysarr.length) / 100}%, Pass ${currentProcess.progress} / Fail ${currentProcess.removed}</div>`
    }
    window.scrollTo(0, document.body.scrollHeight);
}
function enterCommand(cmd) {
    let args = cmd.split(" ");
    let formattedCommand = args[0].toLowerCase();

    if (formattedCommand == "help") {
        currentCMDprompt += "<br/>"
        currentCMDprompt += "General Commands<br/>"
        currentCMDprompt += "HELP: Print command list <br/>"
        currentCMDprompt += "CLEARCONSOLE: Reset console to start <br/>"
        currentCMDprompt += "PATCHLOG: view new features <br/>"
        currentCMDprompt += "<br/>"
        currentCMDprompt += "Caesar Cypher Commands<br/>"
        currentCMDprompt += "ECAESAR &#8249;phrase&#8250; &#8249;key1&#8250; &#8249;key2&#8250; &#8249;keyN&#8250;: Caesar cypher encode a given phrase with keys <br/>"
        currentCMDprompt += "DCAESAR &#8249;phrase&#8250; &#8249;key1&#8250; &#8249;key2&#8250; &#8249;keyN&#8250;: Caesar cypher decode a given phrase with keys <br/>"
        currentCMDprompt += "BFCAESAR &#8249;phrase&#8250; &#8249;keyCount&#8250;: Bruteforce caesar cypher crack a given phrase. Loads possibilities into sysarr <br/>"
        currentCMDprompt += "<br/>"
        currentCMDprompt += "Sysarr Commands<br/>"
        currentCMDprompt += "PREVIEW: previews 10 entries remaining in sysarr<br/>";
        currentCMDprompt += "PREVIEWALL: previews all entries (up to 2000) remaining in sysarr<br/>";
        currentCMDprompt += "COUNT: counts entries remaining in sysarr<br/>";

        currentCMDprompt += "<br/>"
        currentCMDprompt += "Sysarr Filtering Commands<br/>"
        currentCMDprompt += "FILTER &#8249;phrase&#8250;: removes all entries with the given phrase<br/>";
        currentCMDprompt += "REQPHRASE &#8249;phrase&#8250;: removes all entries which do not contain a given phrase<br/>";
        currentCMDprompt += "FREQUENCY &#8249;phrase&#8250; &#8249;count&#8250;: removes all entries with the given phrase more than count times<br/>";
        currentCMDprompt += "MINVOWELS &#8249;count&#8250;: removes all entries with fewer than the given amount of vowels<br/>";
        currentCMDprompt += "MAXVOWELS &#8249;count&#8250;: removes all entries with more than the given amount of vowels<br/>";
        currentCMDprompt += "FILTERWORD: removes all entries which do not contain any of a few common words<br/>";
        currentCMDprompt += "<br/>"
    } else if (formattedCommand == "patchlog") {
        currentCMDprompt += "<br/>"
        currentCMDprompt += "<h2>IDF Cryptography Console Ver 1.1 </h2>"
        currentCMDprompt += "<p>Developed by Agent [u2uimmgyx-r8-llcewux] [KeyCount:4] </p>"
        currentCMDprompt += "<h1>New Features</h1>"
        currentCMDprompt += "<ul>"
        currentCMDprompt += "<li>Added word filtering. Command \"filterword\" described in help menu.</li>"
        currentCMDprompt += "<li>Added process waiting. Processes will now take multiple runs in order to prevent a program freeze.</li>"
        currentCMDprompt += "</ul>"
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
    } else if (formattedCommand == "minvowels") {
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing args: Required 1</span><br/>"
        } else {
            let mincount = Number(args[1])
            currentProcess = new FilterProcess(
                function (item) {
                    let vowelCount = 0
                    for (let j = 0; j < item.length; j++) {
                        if (vowels.includes(item.charAt(j))) {
                            vowelCount++;
                        }
                    }
                    return (vowelCount >= mincount)
                }
            )
        }
    } else if (formattedCommand == "maxvowels") {
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing args: Required 1</span><br/>"
        } else {
            let maxcount = Number(args[1])
            currentProcess = new FilterProcess(
                function (item) {
                    let vowelCount = 0
                    for (let j = 0; j < item.length; j++) {
                        if (vowels.includes(item.charAt(j))) {
                            vowelCount++;
                        }
                    }
                    return (vowelCount <= maxcount)
                }
            )
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
        for (let i = 0; i < sysarr.length && i < 2000; i++) {
            currentCMDprompt += sysarr[i] + "<br/>"
        }
    } else if (formattedCommand == "clearconsole") {
        currentMessage = "";
        currentCMDprompt = startingPrompt.replaceAll(1, "<br/>")
        updatePage();
        return;
    } else if (formattedCommand == "count") {
        if (sysarr.length == 0) {
            currentCMDprompt += "No entries in sysarr</br>"
        } else {
            currentCMDprompt += sysarr.length + " entries in sysarr</br>"
        }
    } else if (formattedCommand == "filter") {
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing args: Required 1</span><br/>"
        } else {
            let filteritem = args[1]
            currentProcess = new FilterProcess(
                function (item) {
                    return !item.includes(filteritem)
                }
            )
        }
    } else if (formattedCommand == "filterword") {
        currentProcess = new FilterProcess(
            function (item) {
                for (let j = 0; j < wordbank.length; j++) {
                    if (item.includes(wordbank[j])) {
                        return true
                    }
                }
                return false
            }
        )

    } else if (formattedCommand == "frequency") {
        if (args.length < 3) {
            currentCMDprompt += "<span>Error: Missing args: Required 2</span><br/>"
        } else {
            let maxcount = Number(args[2])
            let tag = args[1]
            currentProcess = new FilterProcess(
                function (item) {
                    let matchcount = 0;
                    for (let j = 0; j < item.length - tag.length + 1; j++) {
                        if (item.substring(j, j + tag.length) == tag) {
                            matchcount++;
                        }
                    }
                    return (matchcount <= maxcount)
                }
            )
        }
    } else if (formattedCommand == "reqphrase") {
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing args: Required 2</span><br/>"
        } else {
            let tag = args[1]
            currentProcess = new FilterProcess(
                function (item) {
                    return item.includes(tag)
                }
            )
        }
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
            currentCMDprompt += "Loaded.<br/>"
        }
    } else {
        currentCMDprompt += "<span>UNRECOGNIZED COMMAND</span><br/>"
    }
    currentMessage = "";
    if (!currentProcess) {
        currentCMDprompt += "ENTER COMMAND: "
    }
    if (currentCMDprompt.length > 10000000) {
        currentCMDprompt = currentCMDprompt.substring(currentCMDprompt.length - 10000000, currentCMDprompt.length)
    }
    updatePage();
}
let interval = setInterval(render, 30)
let newSysArr = []
class FilterProcess {
    constructor(evalFunc) {
        this.progress = 0;
        this.eval = evalFunc;
        this.removed = 0;
        newSysArr = []
    }
    Work() {
        if (this.progress >= sysarr.length) {
            this.finished = true;
            return;
        }
        if (this.eval(sysarr[this.progress])) {
            newSysArr.push(sysarr[this.progress])
        }else{
            this.removed++;
        }
        this.progress++;
    }
}