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
const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"
const finalprompt = startingPrompt.replaceAll(1, "<br/>")
let currentCMDprompt = "";
let chars = 0

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
        currentCMDprompt += "HELP: print command list <br/>"
        currentCMDprompt += "CAESAR &#8249;phrase&#8250;: Bruteforce caesar cypher crack a given phrase <br/>"
        currentCMDprompt += "ECAESAR3 &#8249;phrase&#8250; &#8249;key1&#8250; &#8249;key2&#8250; &#8249;key3&#8250;: Encrypt caesar cypher with 3 rotational keys <br/>"
        currentCMDprompt += "DCAESAR3 &#8249;phrase&#8250; &#8249;key1&#8250; &#8249;key2&#8250; &#8249;key3&#8250;: Decrypt caesar cypher with 3 rotational keys <br/>"
        currentCMDprompt += "<br/>"
        currentCMDprompt += "Brute Force Commands<br/>"
        currentCMDprompt += "BFCAESAR3 &#8249;phrase&#8250;: Bruteforce Caesar cypher with 3 rotational keys, loading results to sysarr<br/>";
        currentCMDprompt += "PREVIEW: previews 10 entries remaining in sysarr<br/>";
        currentCMDprompt += "COUNT: counts entries remaining in sysarr<br/>";
        currentCMDprompt += "FILTER <phrase>: removes all entries with the given phrase<br/>";
        currentCMDprompt += "FREQUENCY <phrase> <count>: removes all entries with the given phrase more than count times<br/>";
        currentCMDprompt += "<br/>"
    } else if (formattedCommand == "caesar") {
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing arg \"Phrase\"</span><br/>"
        } else {
            for (let i = 0; i < alphabet.length; i++) {
                let word = "";
                for (let j = 0; j < args[1].length; j++) {
                    let char = args[1].charAt(j).toLowerCase()
                    if (alphabet.includes(char)) {
                        word += alphabet[(alphabet.indexOf(char) + i) % alphabet.length]
                    } else {
                        word += char
                    }
                }
                currentCMDprompt += word + "<br/>"
            }
        }
    } else if (formattedCommand == "ecaesar3") {
        if (args.length < 5) {
            currentCMDprompt += "<span>Error: Missing args: Required 4</span><br/>"
        } else {
            let keys = []
            try {
                keys.push(Number(args[2]))
                keys.push(Number(args[3]))
                keys.push(Number(args[4]))
                let word = ""
                for (let j = 0; j < args[1].length; j++) {
                    let char = args[1].charAt(j).toLowerCase()
                    if (alphabet.includes(char)) {
                        word += alphabet[(alphabet.indexOf(char) + keys[j % keys.length]) % alphabet.length]
                    } else {
                        word += char
                    }
                }
                currentCMDprompt += word + "<br/>"
            } catch {
                currentCMDprompt += "<span>Error: Cannot parse key numbers.</span><br/>"

            }
        }
    } else if (formattedCommand == "dcaesar3") {
        if (args.length < 5) {
            currentCMDprompt += "<span>Error: Missing args: Required 4</span><br/>"
        } else {
            let keys = []
            try {
                keys.push(Number(args[2]))
                keys.push(Number(args[3]))
                keys.push(Number(args[4]))
                let word = ""
                for (let j = 0; j < args[1].length; j++) {
                    let char = args[1].charAt(j).toLowerCase()
                    if (alphabet.includes(char)) {
                        word += alphabet[(alphabet.indexOf(char) - keys[j % keys.length] + alphabet.length) % alphabet.length]
                    } else {
                        word += char
                    }
                }
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
    }else if (formattedCommand == "previewall") {
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
    } else if (formattedCommand == "bfcaesar3") {
        if (args.length < 2) {
            currentCMDprompt += "<span>Error: Missing args: Required 1</span><br/>"
        } else {
            sysarr = [];
            for (let a = 0; a < alphabet.length; a++) {
                for (let b = 0; b < alphabet.length; b++) {
                    for (let c = 0; c < alphabet.length; c++) {
                        let keys = [a, b, c]
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