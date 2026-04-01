import Flag from '../Flag.js'
import randomInRange from '../tools/randomInRange.js';
import RGBToHex from '../tools/rgbToHex.js';
export default class DemocraticFlag extends Flag{
    constructor(){
        
        let highColor = randomInRange(210,255);
        let mediumColor = randomInRange(120,160);
        let lowColor = randomInRange(0,50);
        let colors = [
            RGBToHex(highColor,lowColor,lowColor),
            RGBToHex(lowColor,highColor,lowColor),
            RGBToHex(lowColor,lowColor,highColor),
            RGBToHex(mediumColor,mediumColor,mediumColor),
            RGBToHex(lowColor,lowColor,lowColor),
            RGBToHex(highColor,mediumColor,lowColor),
            RGBToHex(highColor,lowColor,mediumColor),
            RGBToHex(lowColor,mediumColor,highColor),
        ]
        let flagTypes = ['horitri','vertri','vertbi','circcenter','crossline','doublecross','nordcross',]
        let flagtype = flagTypes[Math.floor(Math.random()*flagTypes.length)];
        if(flagtype == 'vertri'){
            //vertical tricolor
            let upperColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(upperColor),1)
            super([
                `rz${upperColor}z0z0z1z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0z0.33z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0.67z0z0.33z1`,
            ])
        }else if(flagtype == 'horitri'){
            //horizontal tricolor
            let upperColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(upperColor),1)
            super([
                `rz${upperColor}z0z0z1z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0z1z0.33`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z0.67z1z0.33`,
            ])
        }else if(flagtype == 'vertbi'){
            //Vertical bicolor
            let upperColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(upperColor),1)
            super([
                `rz${upperColor}z0z0z1z1`,
                `rz${colors[Math.floor(Math.random()*colors.length)]}z0z${Math.floor(Math.random()*2)/2}z1z0.5`,
            ])
        }else if(flagtype == 'circcenter'){
            //Solid color with circle in center
            let outerColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(outerColor),1)
            let innerColor = colors[Math.floor(Math.random()*colors.length)];
            super([
                `rz${outerColor}z0z0z1z1`,
                `cz${innerColor}z0.5z0.5z0.2`,
            ])
        }else if(flagtype == 'crossline'){
            //singular line crossint topleft-bottomright or bottomleft-topright
            let outerColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(outerColor),1)
            let lineColor = colors[Math.floor(Math.random()*colors.length)];
            if(Math.random() < 0.5){
                super([
                    `rz${outerColor}z0z0z1z1`,
                    `lz${lineColor}z0.2z1z0z0z1`,
                ])
            }else{
                super([
                    `rz${outerColor}z0z0z1z1`,
                    `lz${lineColor}z0.2z0z0z1z1`,
                ])
            }
        }else if(flagtype == 'doublecross'){
            //singular line crossint topleft-bottomright or bottomleft-topright
            let outerColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(outerColor),1)
            let lineColor = colors[Math.floor(Math.random()*colors.length)];
            let linetype = Math.floor(Math.random()*2)
            let items = [
                `rz${outerColor}z0z0z1z1`,
                `lz${lineColor}z0.15z${linetype}z0z${1-linetype}z1`,
            ]
            if(Math.random()>0.5){
                items.push(
                    `cz${lineColor}z0.5z0.5z0.25`,)
            }
            super(items)
        }else if(flagtype == 'nordcross'){
            //nord style cross flag
            let outerColor = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(outerColor),1)
            let lineColor = colors[Math.floor(Math.random()*colors.length)];
            let setX = Math.floor(Math.random()*3)/5+0.3
            let setY = Math.floor(Math.random()*3)/5+0.3
            let linew = Math.floor(Math.random()*20)/100+0.1
            let items = [
                `rz${outerColor}z0z0z1z1`,
                `lz${lineColor}z${linew}z${setX}z0z${setX}z1`,
                `lz${lineColor}z${linew}z0z${setY}z1z${setY}`,
            ]
            super(items)
        }
    }
}