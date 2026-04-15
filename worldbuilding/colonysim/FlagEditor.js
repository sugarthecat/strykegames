
import Flag from "./Flag.js";
import loadPresetPack from "./PresetFlags.js";
import DemocraticFlag from "./flagTypes/democraticFlag.js";
import FascistFlag from "./flagTypes/fascistFlag.js";
import demAllianceFlag from "./flagTypes/demAllianceFlag.js";
import CommunistFlag from "./flagTypes/communistFlag.js";

export default class FlagEditor {
    constructor(parentDiv) {
        this.parentDiv = parentDiv
        this.canvas = document.createElement('canvas')
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.parentDiv.appendChild(this.canvas)
        this.flagPart = document.createElement('div')
        this.parentDiv.appendChild(this.flagPart)
        this.currentFlag = new DemocraticFlag()
        this.displayflag(this.currentFlag)
        let ref = this

        let dembtn = document.createElement('button')
        dembtn.addEventListener("click", function () { ref.randomGenericFlag() })

        let fasbtn = document.createElement('button')
        fasbtn.addEventListener("click", function () { ref.randomFascistFlag() })

        let combtn = document.createElement('button')
        combtn.addEventListener("click", function () { ref.randomCommunistFlag() })

        let demally = document.createElement('button')
        demally.addEventListener("click", function () { ref.randomGenAlliance() })

        let uploadbtn = document.createElement('input')
        uploadbtn.type = "file"

        let presetbtn = document.createElement('button')
        presetbtn.onclick = function () {
            setFlagToPreset()
        }
        let addrectbtn = document.createElement('button')
        addrectbtn.onclick = function () {
            let g = ref.currentFlag.getExportCode().split('x')
            g.push('rzffffffz0z0z0.5z0.5')
            ref.currentFlag = new Flag(g)
            ref.displayflag(ref.currentFlag)
        }
        let addcircbtn = document.createElement('button')
        addcircbtn.onclick = function () {
            let g = ref.currentFlag.getExportCode().split('x')
            g.push('czffffffz0z0z0.5')
            ref.currentFlag = new Flag(g)
            ref.displayflag(ref.currentFlag)
        }
        let addlinebtn = document.createElement('button')
        addlinebtn.onclick = function () {
            let g = ref.currentFlag.getExportCode().split('x')
            g.push('lzffffffz0.2z0z0z1z1')
            ref.currentFlag = new Flag(g)
            ref.displayflag(ref.currentFlag)
        }
        let addsymbtn = document.createElement('button')
        addsymbtn.onclick = function () {
            let g = ref.currentFlag.getExportCode().split('x')
            g.push('sz1z0z0z0.5z0.5')
            ref.currentFlag = new Flag(g)
            ref.displayflag(ref.currentFlag)
        }
        let addtribtn = document.createElement('button')
        addtribtn.onclick = function () {
            let g = ref.currentFlag.getExportCode().split('x')
            g.push('tzff00ffz0z0z1z0z0z1')
            ref.currentFlag = new Flag(g)
            ref.displayflag(ref.currentFlag)
        }
        let addstarbtn = document.createElement('button')
        addstarbtn.onclick = function () {
            let g = ref.currentFlag.getExportCode().split('x')
            g.push('stzff00ffz0.5z0.5z0.2z5')
            ref.currentFlag = new Flag(g)
            ref.displayflag(ref.currentFlag)
        }

        let shapesdiv = document.createElement('div');
        let gensdiv = document.createElement('div');
        dembtn.innerHTML = "Democratic Flag"
        gensdiv.append(dembtn)
        combtn.innerHTML = "Communist Flag"
        gensdiv.append(combtn)
        fasbtn.innerHTML = "Fascist Flag"
        gensdiv.append(fasbtn)
        demally.innerHTML = "Generic Alliance Flag"
        gensdiv.append(demally)
        let uploadlabel = document.createElement('label');
        uploadlabel.innerHTML = "Upload Flag"
        uploadlabel.append(uploadbtn)
        uploadlabel.className = "custom-file-upload"
        gensdiv.append(uploadlabel)
        console.log(uploadbtn)
        let canvasRef = this.canvas
        let flagEditorRef = this
        uploadbtn.addEventListener("change", function () {
            const reader = new FileReader();

            // gets the image's width and height and changes canvas and board sizes
            reader.onload = (theFile) => {
                console.log(theFile)
                if (theFile.target.result.split("/")[0].split(":")[1] === "text") {

                } else {
                    const image = new Image();
                    image.src = theFile.target.result;
                    image.onload = () => {
                        console.log(canvasRef)
                        let ctx = canvasRef.getContext('2d')

                        ctx.drawImage(image, 0, 0,canvasRef.width,canvasRef.height);
                        flagEditorRef.imageUploaded();
    
                    };
                }
            }
            reader.addEventListener("load", () => {
    
            })
            reader.readAsDataURL(this.files[0]);
        })

        addcircbtn.innerHTML = "Add Circle"
        shapesdiv.append(addcircbtn)
        addrectbtn.innerHTML = "Add Rectangle"
        shapesdiv.append(addrectbtn)
        addlinebtn.innerHTML = "Add Line"
        shapesdiv.append(addlinebtn)
        addtribtn.innerHTML = "Add Triangle"
        shapesdiv.append(addtribtn)
        addstarbtn.innerHTML = "Add Star"
        shapesdiv.append(addstarbtn)
        addsymbtn.innerHTML = "Add Symbol"
        shapesdiv.append(addsymbtn)
        this.shapesdiv = shapesdiv;
        let packdiv = document.createElement('div')
        this.parentDiv.appendChild(gensdiv)
        this.parentDiv.appendChild(packdiv)
        this.parentDiv.appendChild(shapesdiv)

        this.parentDiv.appendChild(this.flagPart)
        this.packSelector = document.createElement('select')
        this.packSelector.innerHTML += "<option value=\"ModernEurope\">Europe</option>"
        this.packSelector.innerHTML += "<option value=\"EastAsia\">East Asia</option>"
        this.packSelector.innerHTML += "<option value=\"SouthAmerica\">South America</option>"
        this.packSelector.innerHTML += "<option value=\"Africa\">Africa</option>"
        this.packSelector.innerHTML += "<option value=\"CentralAsia\">Central Asia</option>"
        this.packSelector.innerHTML += "<option value=\"SouthAsia\">South Asia</option>"
        this.packSelector.innerHTML += "<option value=\"Historical\">Historical</option>"
        this.packSelector.innerHTML += "<option value=\"Pride\">LGBT+ Pride</option>"
        this.packSelector.innerHTML += "<option value=\"Divisions\">Regions</option>"
        this.packSelector.innerHTML += "<option value=\"Organizations\">Organizations</option>"
        this.presetSelector = document.createElement('select')

        this.packSelector.onchange = function () {
            loadPresetPack(ref.packSelector.value, ref.presetSelector)
        }
        loadPresetPack(ref.packSelector.value, ref.presetSelector)
        packdiv.appendChild(this.packSelector)
        packdiv.appendChild(this.presetSelector)
        this.packSelector.className = 'flag_preset_select'
        this.presetSelector.className = 'flag_preset_select'
        let presetBtn = document.createElement('button')
        presetBtn.innerHTML = 'Set flag to preset'
        presetBtn.onclick = function () { ref.setFlagToPreset() }
        packdiv.appendChild(presetBtn)

    }
    randomGenericFlag() {
        this.currentFlag = new DemocraticFlag()
        this.displayflag(this.currentFlag)
        this.shapesdiv.style.display = "block";
    }
    randomCommunistFlag() {
        this.currentFlag = new CommunistFlag()
        this.displayflag(this.currentFlag)
        this.shapesdiv.style.display = "block";
    }
    randomFascistFlag() {
        this.currentFlag = new FascistFlag()
        this.displayflag(this.currentFlag)
        this.shapesdiv.style.display = "block";
    }
    randomGenAlliance() {
        this.currentFlag = new demAllianceFlag()
        this.displayflag(this.currentFlag)
        this.shapesdiv.style.display = "block";
    }
    setFlagToPreset() {
        let flagCode = this.presetSelector.value
        this.currentFlag = new Flag(flagCode.split('x'))
        this.displayflag(this.currentFlag)
        this.shapesdiv.style.display = "block";
    }

    displayflag(flag) {
        if (this.flag) {
            console.log(this.flag.getExportCode())
        }
        let ref = this
        let ctx = this.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.currentFlag.displayInCanvas(this.canvas)
        let outcode = this.currentFlag.getExportCode();
        let parts = outcode.split('x')
        this.flagPart.innerHTML = ''
        for (let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].split('z')
            let outdiv = document.createElement('div')
            let span1 = document.createElement('span')
            span1.className = 'custom_flag_type_span'
            switch (parts[i][0]) {
                case 'r':
                    span1.innerHTML = 'Rectangle'
                    outdiv.appendChild(span1)
                    this.appendSpanElement(outdiv, 'Color: ')
                    this.addColorInput(outdiv, '#' + parts[i][1])
                    this.appendSpanElement(outdiv, 'X: ')
                    this.addNumberInput(outdiv, parts[i][2])
                    this.appendSpanElement(outdiv, 'Y: ')
                    this.addNumberInput(outdiv, parts[i][3])
                    this.appendSpanElement(outdiv, 'Width: ')
                    this.addNumberInput(outdiv, parts[i][4])
                    this.appendSpanElement(outdiv, 'Height: ')
                    this.addNumberInput(outdiv, parts[i][5])
                    break;
                case 'c':
                    span1.innerHTML = 'Circle'
                    outdiv.appendChild(span1)
                    this.appendSpanElement(outdiv, 'Color: ')
                    this.addColorInput(outdiv, '#' + parts[i][1])
                    this.appendSpanElement(outdiv, 'X: ')
                    this.addNumberInput(outdiv, parts[i][2])
                    this.appendSpanElement(outdiv, 'Y: ')
                    this.addNumberInput(outdiv, parts[i][3])
                    this.appendSpanElement(outdiv, 'Radius: ')
                    this.addNumberInput(outdiv, parts[i][4])
                    break;
                case 'l':
                    span1.innerHTML = 'Line'
                    outdiv.appendChild(span1)
                    this.appendSpanElement(outdiv, 'Color: ')
                    this.addColorInput(outdiv, '#' + parts[i][1])
                    this.appendSpanElement(outdiv, 'Line Width: ')
                    this.addNumberInput(outdiv, parts[i][2])
                    this.appendSpanElement(outdiv, 'Start X: ')
                    this.addNumberInput(outdiv, parts[i][3])
                    this.appendSpanElement(outdiv, 'Start Y: ')
                    this.addNumberInput(outdiv, parts[i][4])
                    this.appendSpanElement(outdiv, 'End X: ')
                    this.addNumberInput(outdiv, parts[i][5])
                    this.appendSpanElement(outdiv, 'End Y: ')
                    this.addNumberInput(outdiv, parts[i][6])
                    break;
                case 's':
                    span1.innerHTML = 'Symbol'
                    outdiv.appendChild(span1)
                    this.appendSpanElement(outdiv, 'Symbol ID(0-30): ')
                    this.addNumberInput(outdiv, parts[i][1], '1')
                    this.appendSpanElement(outdiv, 'X: ')
                    this.addNumberInput(outdiv, parts[i][2])
                    this.appendSpanElement(outdiv, 'Y: ')
                    this.addNumberInput(outdiv, parts[i][3])
                    this.appendSpanElement(outdiv, 'Width: ')
                    this.addNumberInput(outdiv, parts[i][4])
                    this.appendSpanElement(outdiv, 'Height: ')
                    this.addNumberInput(outdiv, parts[i][5])
                    break;
                case 't':
                    span1.innerHTML = 'Triangle'
                    outdiv.appendChild(span1)
                    this.appendSpanElement(outdiv, 'Color ')
                    this.addColorInput(outdiv, '#' + parts[i][1])
                    this.appendSpanElement(outdiv, 'Point 1 X: ')
                    this.addNumberInput(outdiv, parts[i][2])
                    this.appendSpanElement(outdiv, 'Point 1 Y: ')
                    this.addNumberInput(outdiv, parts[i][3])
                    this.appendSpanElement(outdiv, 'Point 2 X: ')
                    this.addNumberInput(outdiv, parts[i][4])
                    this.appendSpanElement(outdiv, 'Point 2 Y: ')
                    this.addNumberInput(outdiv, parts[i][5])
                    this.appendSpanElement(outdiv, 'Point 3 X: ')
                    this.addNumberInput(outdiv, parts[i][6])
                    this.appendSpanElement(outdiv, 'Point 3 Y: ')
                    this.addNumberInput(outdiv, parts[i][7])
                    break;
                case 'st':
                    span1.innerHTML = 'Star'
                    outdiv.appendChild(span1)
                    this.appendSpanElement(outdiv, 'Color ')
                    this.addColorInput(outdiv, '#' + parts[i][1])
                    this.appendSpanElement(outdiv, 'X: ')
                    this.addNumberInput(outdiv, parts[i][2])
                    this.appendSpanElement(outdiv, 'Y: ')
                    this.addNumberInput(outdiv, parts[i][3])
                    this.appendSpanElement(outdiv, 'Radius: ')
                    this.addNumberInput(outdiv, parts[i][4])
                    this.appendSpanElement(outdiv, 'Point Count: ')
                    this.addNumberInput(outdiv, parts[i][5], '1')
                    break;
            }
            let deletebtn = document.createElement('button')
            deletebtn.innerHTML = 'Delete'
            deletebtn.onclick = function () {
                ref.deleteFlagIndex(i)
            }
            outdiv.appendChild(deletebtn)
            this.flagPart.appendChild(outdiv)
        }
        //console.log(flag.getExportCode())
    }
    appendSpanElement(div, elementInner) {
        let j = document.createElement('span')
        j.className = 'custom_flag_span'
        div.appendChild(j)
        j.innerHTML = elementInner
    }
    addNumberInput(div, startingValue, stepValue = '0.01') {
        let ref = this
        let inputN = document.createElement('input')
        inputN.type = 'number'
        inputN.className = 'flag_number_input'
        inputN.value = startingValue
        inputN.step = stepValue
        inputN.onchange = function () {
            ref.newFlagFromEditor()
        }
        div.appendChild(inputN)
    }
    addColorInput(div, startingValue) {
        let ref = this
        let inputN = document.createElement('input')
        inputN.type = 'color'
        inputN.value = startingValue
        inputN.onchange = function () {
            ref.newFlagFromEditor()
        }
        div.appendChild(inputN)
    }
    newFlagFromEditor() {
        let flagChildren = this.flagPart.children
        let flagparts = []
        for (let i = 0; i < flagChildren.length; i++) {
            let parts = flagChildren[i].children
            if (parts[0].innerHTML == 'Rectangle') {
                flagparts.push('rz' + parts[2].value.replace('#', '') + 'z' + parts[4].value + 'z' + parts[6].value + 'z' + parts[8].value + 'z' + parts[10].value)
            } else if (parts[0].innerHTML == 'Circle') {
                flagparts.push('cz' + parts[2].value.replace('#', '') + 'z' + parts[4].value + 'z' + parts[6].value + 'z' + parts[8].value)
            } else if (parts[0].innerHTML == 'Line') {
                flagparts.push('lz' + parts[2].value.replace('#', '') + 'z' + parts[4].value + 'z' + parts[6].value + 'z' + parts[8].value + 'z' + parts[10].value + 'z' + parts[12].value)
            } else if (parts[0].innerHTML == 'Symbol') {
                let partval = parts[2].value % 31;
                if (partval < 0) {
                    partval += 30;
                }
                flagparts.push('sz' + partval + 'z' + parts[4].value + 'z' + parts[6].value + 'z' + parts[8].value + 'z' + parts[10].value)
            } else if (parts[0].innerHTML == 'Triangle') {
                flagparts.push('tz' + parts[2].value.replace('#', '') + 'z' + parts[4].value + 'z' + parts[6].value + 'z' + parts[8].value + 'z' + parts[10].value + 'z' + parts[12].value + 'z' + parts[14].value)
            } else if (parts[0].innerHTML == 'Star') {
                flagparts.push('stz' + parts[2].value.replace('#', '') + 'z' + parts[4].value + 'z' + parts[6].value + 'z' + parts[8].value + 'z' + parts[10].value)
            }
        }
        this.currentFlag = new Flag(flagparts)
        this.currentFlag.displayInCanvas(this.canvas)
    }
    deleteFlagIndex(index) {
        let g = this.currentFlag.getExportCode().split('x')
        g.splice(index, 1)
        if (g.length == 0) {
            g = ['rzffffffz0z0z1z1']
        }
        this.currentFlag = new Flag(g)
        this.displayflag(this.currentFlag)
    }
    imageUploaded(){
        this.currentFlag = new Flag(this.canvas)
        this.flagPart.innerHTML = ""
        this.shapesdiv.style.display = "none";
    }

}