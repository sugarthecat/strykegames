import RGBToHex from "./tools/rgbToHex.js";


const xdefinition = 200;
const ydefinition = 100;

export default class Flag {
    customImage = false;
    constructor(inputList) {
        if (inputList instanceof Array) {
            this.flagElements = inputList
            // convert cs and fs into s
            for (let i = 0; i < this.flagElements.length; i++) {
                if (this.flagElements[i].split('z')[0] == 'cs') {
                    let parts = this.flagElements[i].split('z')
                    parts[1] = parseInt(parts[1]) + 11
                    parts[0] = 's'
                    this.flagElements[i] = parts.join('z')
                }
                if (this.flagElements[i].split('z')[0] == 'fs') {
                    let parts = this.flagElements[i].split('z')
                    parts[0] = 's'
                    this.flagElements[i] = parts.join('z')
                }
            }
        } else {
            //console.log(inputList)
            this.customImage = true;
            this.customImageCanvas = document.createElement('canvas');
            let ctx = this.customImageCanvas.getContext('2d');
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, this.customImageCanvas.width, this.customImageCanvas.height)
            ctx.drawImage(inputList, 0, 0, this.customImageCanvas.width, this.customImageCanvas.height)
            //this.customImageCanvas.style = "display:none;"
        }
    }
    /**
     * Draws the flag to a selected canvas
     * @param {HTMLCanvasElement} canvas A canvas object to draw to
     */
    displayInCanvas(canvas) {
        let ctx = canvas.getContext('2d')
        if (this.customImage) {
            ctx.drawImage(this.customImageCanvas, 0, 0, canvas.width, canvas.height)
        } else {
            //ctx.fillStyle = "#000000"
            //ctx.fillRect(0,0,10,10)
            for (let i = 0; i < this.flagElements.length; i++) {
                if (this.flagElements[i].split('z')[0] == 'r') {
                    //rectangle
                    //r, [color], [x], [y], [w], [h]
                    ctx.fillStyle = '#' + this.flagElements[i].split('z')[1]
                    ctx.fillRect(canvas.width * this.flagElements[i].split('z')[2],
                        canvas.height * this.flagElements[i].split('z')[3],
                        canvas.width * this.flagElements[i].split('z')[4],
                        canvas.height * this.flagElements[i].split('z')[5])
                }
                else if (this.flagElements[i].split('z')[0] == 'c') {
                    //circle
                    //c, [color], [xcenter], [ycenter], [radius]
                    ctx.beginPath()
                    ctx.arc(canvas.width * this.flagElements[i].split('z')[2],
                        canvas.height * this.flagElements[i].split('z')[3],
                        canvas.width * this.flagElements[i].split('z')[4],
                        0, 2 * Math.PI, false);
                    ctx.fillStyle = '#' + this.flagElements[i].split('z')[1];
                    ctx.fill();
                }
                else if (this.flagElements[i].split('z')[0] == 's') {
                    // symbol
                    //s, [symbolnumber], [x], [y], [w], [h]
                    ctx.drawImage(document.getElementById('symbolsheet'),
                        Math.floor(this.flagElements[i].split('z')[1]) * 250,
                        0, 250, 250,
                        canvas.width * this.flagElements[i].split('z')[2],
                        canvas.height * this.flagElements[i].split('z')[3],
                        canvas.width * this.flagElements[i].split('z')[4],
                        canvas.height * this.flagElements[i].split('z')[5])
                }
                else if (this.flagElements[i].split('z')[0] == 'l') {
                    //line
                    //l, [color], [line width], [xstart], [ystart], [xend], [yend]
                    ctx.beginPath();
                    ctx.moveTo(this.flagElements[i].split('z')[3] * canvas.width,
                        this.flagElements[i].split('z')[4] * canvas.height);
                    ctx.lineTo(this.flagElements[i].split('z')[5] * canvas.width,
                        this.flagElements[i].split('z')[6] * canvas.height);
                    ctx.strokeStyle = '#' + this.flagElements[i].split('z')[1]
                    ctx.lineWidth = this.flagElements[i].split('z')[2] * canvas.width
                    ctx.stroke();
                }
                else if (this.flagElements[i].split('z')[0] == 't') {
                    //triangle
                    //t, [color], [x1], [y1], [x2], [y2], [x3], [y3]
                    ctx.beginPath();
                    ctx.moveTo(this.flagElements[i].split('z')[2] * canvas.width,
                        this.flagElements[i].split('z')[3] * canvas.height);
                    ctx.lineTo(this.flagElements[i].split('z')[4] * canvas.width,
                        this.flagElements[i].split('z')[5] * canvas.height);
                    ctx.lineTo(this.flagElements[i].split('z')[6] * canvas.width,
                        this.flagElements[i].split('z')[7] * canvas.height);
                    ctx.fillStyle = '#' + this.flagElements[i].split('z')[1]
                    ctx.fill();
                } else if (this.flagElements[i].split('z')[0] == 'st') {
                    //star
                    //t, [color], [x], [y], [radius], [corners],
                    let midx = parseFloat(this.flagElements[i].split('z')[2] * canvas.width)
                    let midy = parseFloat(this.flagElements[i].split('z')[3] * canvas.height)
                    let radius = parseFloat(this.flagElements[i].split('z')[4] * canvas.height)
                    let corners = parseFloat(this.flagElements[i].split('z')[5])
                    ctx.beginPath();
                    ctx.moveTo(midx, midy - radius);
                    for (let i = 1; i <= corners * 2; i += 1) {
                        let degreePoint = i / (corners * 2) * (Math.PI * 2)
                        if (i % 2 == 0) {
                            ctx.lineTo(Math.sin(degreePoint) * radius + midx, midy - Math.cos(degreePoint) * radius)
                        } else {
                            ctx.lineTo(Math.sin(degreePoint) * radius / 2 + midx, midy - Math.cos(degreePoint) * radius / 2)
                        }

                    }
                    ctx.fillStyle = '#' + this.flagElements[i].split('z')[1]
                    ctx.fill();
                }
            }
        }
    }
    /**
     * Gets the export code for the flag
     * @returns The export code for the flag, in String format
     */
    getExportCode() {
        if (this.customImage) {
            let ctx = this.customImageCanvas.getContext('2d');
            let exportShapes = []
            for (let x = 0; x < xdefinition; x++) {
                let lastColor = ""
                let start = 0;
                for (let y = 0; y < ydefinition; y++) {
                    let imageData = ctx.getImageData(this.customImageCanvas.width / xdefinition * x,
                        this.customImageCanvas.height / ydefinition * y,
                        this.customImageCanvas.width / xdefinition,
                        this.customImageCanvas.height / ydefinition).data
                    //aggregate data for each color in selected range
                    let r = 0;
                    let g = 0;
                    let b = 0;
                    let count = Math.floor(imageData.length / 4)
                    for (let i = 0; i < count; i++) {
                        r += imageData[i * 4];
                        g += imageData[i * 4 + 1];
                        b += imageData[i * 4 + 2]
                    }
                    r /= count
                    g /= count
                    b /= count
                    r = Math.floor(r);
                    g = Math.floor(g);
                    b = Math.floor(b);
                    //console.log(r, g, b)
                    //compress into vertical rectangles
                    let color = RGBToHex(r, g, b);
                    if (color != lastColor) {
                        if (lastColor != "") {
                            exportShapes.push("rz" + lastColor + "z" + x / xdefinition + "z" + start / ydefinition + "z" + 1 / xdefinition + "z" + (y-start) / ydefinition)
                            start = y;
                        }
                        lastColor = color;
                    } 
                }
            }
            console.log(exportShapes)
            return exportShapes.join('x')
        } else {
            return this.flagElements.join('x')
        }
    }

}