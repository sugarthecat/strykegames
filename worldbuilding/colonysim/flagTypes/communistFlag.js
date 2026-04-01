import Flag from '../Flag.js'
import randomInRange from '../tools/randomInRange.js';
import RGBToHex from '../tools/rgbToHex.js';
/**
 * a Flag object with a constructor function that creates it with a "communist" look
 */
export default class CommunistFlag extends Flag{
    constructor(){
        let highColor = randomInRange(200,255);
        let mediumColor = randomInRange(100,150);
        let lowColor = randomInRange(0,40);
        
        
        let colors = [
            RGBToHex(highColor,lowColor,lowColor),
            RGBToHex(lowColor,highColor,lowColor),
            RGBToHex(lowColor,lowColor,highColor),
            RGBToHex(mediumColor,lowColor,lowColor),
            RGBToHex(lowColor,mediumColor,lowColor),
            RGBToHex(lowColor,lowColor,mediumColor),
            RGBToHex(lowColor,lowColor,lowColor),
        ]
        let sealcolors = ['000000','900000']
        let flagTypes = ['horitri','vertri','horibi','union']
        let flagtype = flagTypes[Math.floor(Math.random()*flagTypes.length)];
        if(flagtype == 'vertri'){
            //vertical tricolor
            super([
                `rzffffffz0z0z1z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0z0.33z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0.67z0z0.33z1`,
                `cz${sealcolors[Math.floor(Math.random()*sealcolors.length)]}z0.5z0.5z0.2`,
                `sz${Math.floor(Math.random()*16)+11}z0.3z0.25z0.4z0.5`,
            ])
        }if(flagtype == 'horibi'){
            //vertical tricolor
            super([
                `rzffffffz0z0z1z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z${Math.floor(Math.random()*2)/2}z1z0.5`,
                `cz${sealcolors[Math.floor(Math.random()*sealcolors.length)]}z0.5z0.5z0.2`,
                `sz${Math.floor(Math.random()*16)+11}z0.35z0.3z0.3z0.4`,
            ])
        }if(flagtype == 'horitri'){
            //vertical tricolor
            super([
                `rzffffffz0z0z1z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0.67z1z0.33`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0z1z0.33`,
                `cz${sealcolors[Math.floor(Math.random()*sealcolors.length)]}z0.5z0.5z0.2`,
                `sz${Math.floor(Math.random()*16)+11}z0.3z0.25z0.4z0.5`,
            ])
        }if(flagtype == 'union'){
            //USSR style flags
            let bar = `rz${colors[Math.floor(Math.random()*colors.length)]}z0.8z0z0.2z1`;
            if(Math.random()<0.5){
                bar = `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0.75z1z0.25`
            }
            super([
                `rza00000z0z0z1z1`,
                `sz${Math.floor(Math.random()*16)+11}z0.05z0.05z0.4z0.5`,
                bar,
            ])
        }
    }
}

