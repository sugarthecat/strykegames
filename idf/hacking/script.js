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
    }
    else {
        currentMessage += e.key
    }
    render()
}
let currentMessage = ""

let awaitedMessage = "";

const startingPrompt = "IDF MILITARY INTELLIGENCE CONSOLE - LOADING . . . 1ESTABLISHING SECURE CONNECTION . . .1VERIFYING CREDENTIALS . . .1PREPARING CONSOLE . . .1ENTER COMMAND: "
const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"
const finalprompt = startingPrompt.replaceAll(1, "<br/>")
let currentCMDprompt = "";
let chars = 0

function render() {
    document.getElementById("content").innerHTML = currentCMDprompt + "<span id=\"prompt\"></span>"
    if (currentCMDprompt.length < finalprompt.length) {
        currentCMDprompt = startingPrompt.substring(0, chars).replaceAll(1, "<br/>")
        chars++;
        clearInterval(interval);
        setTimeout(render, 100)
    } else {
        document.getElementById("prompt").innerText = currentMessage + "|"
    }
}
function enterCommand(cmd) {
    let args = cmd.split(" ");
    let formattedCommand = args[0].toLowerCase();

    if (formattedCommand == "help") {
        currentCMDprompt += "<br/>"
        currentCMDprompt += "HELP: print command list <br/>"
        currentCMDprompt += "CAESAR &#8249;phrase&#8250;: Bruteforce caesar cypher crack a given phrase <br/>"
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
    } else {
        currentCMDprompt += "<span>UNRECOGNIZED COMMAND</span><br/>"
    }
    currentMessage = "";
    currentCMDprompt += "ENTER COMMAND: "
    render();
}
let interval = setInterval(render,100)