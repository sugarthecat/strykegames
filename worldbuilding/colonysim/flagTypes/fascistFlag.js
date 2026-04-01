import Flag from '../Flag.js';
import randomInRange from '../tools/randomInRange.js';
import RGBToHex from '../tools/rgbToHex.js';
export default class FascistFlag extends Flag {
    constructor() {
        let highColor = randomInRange(200,255);
        let mediumColor = randomInRange(100,150);
        let lowColor = randomInRange(0,40);
        let colors = [
            RGBToHex(highColor,lowColor,lowColor),
            RGBToHex(lowColor,highColor,lowColor),
            RGBToHex(lowColor,lowColor,highColor),
            RGBToHex(mediumColor,mediumColor,highColor),
            RGBToHex(lowColor,lowColor,lowColor),
            RGBToHex(highColor,highColor,lowColor),
            RGBToHex(highColor,lowColor,highColor),
            RGBToHex(lowColor,highColor,highColor),
        ]
        let flagTypes = ['horitri', 'vertri', 'horibi', 'symbo']
        let flagtype = flagTypes[Math.floor(Math.random() * flagTypes.length)];
        if (flagtype == 'vertri') {
            //vertical tricolor
            super([
                `rzffffffz0z0z1z1`,
                `rz${colors[Math.floor(Math.random() * colors.length)]}z0z0z0.33z1`,
                `rz${colors[Math.floor(Math.random() * colors.length)]}z0.67z0z0.33z1`,
                `sz${Math.floor(Math.random() * 11)}z0.3z0.25z0.4z0.5`,
            ])
        } if (flagtype == 'horibi') {
            //vertical tricolor
            super([
                `rzffffffz0z0z1z1`,
                `rz${colors[Math.floor(Math.random() * colors.length)]}z0z${Math.floor(Math.random() * 2) / 2}z1z0.5`,
                `cz${colors[Math.floor(Math.random() * colors.length)]}z0.5z0.5z0.2`,
                `sz${Math.floor(Math.random() * 11)}z0.35z0.3z0.3z0.4`,
            ])
        } if (flagtype == 'horitri') {
            //vertical tricolor
            super([
                `rzffffffz0z0z1z1`,
                `rz${colors[Math.floor(Math.random() * colors.length)]}z0z0.67z1z0.33`,
                `rz${colors[Math.floor(Math.random() * colors.length)]}z0z0z1z0.33`,
                `sz${Math.floor(Math.random() * 11)}z0.3z0.25z0.4z0.5`,
            ])
        } if (flagtype == 'symbo') {
            //vertical tricolor
            let darkColors = ['000000', '300000', '003000', '000030', '303000', '003030', '300030']
            let lightColors = ['ffffff', 'ffff80', 'ff80ff', '80ffff', 'a0ffa0', 'a0a0ff', 'ffa0a0']
            super([
                `rz${darkColors[Math.floor(Math.random() * darkColors.length)]}z0z0z1z1`,
                `cz${lightColors[Math.floor(Math.random() * lightColors.length)]}z0.5z0.5z0.2`,
                `sz${Math.floor(Math.random() * 11)}z0.3z0.25z0.4z0.5`,
            ])
        }
    }
}

