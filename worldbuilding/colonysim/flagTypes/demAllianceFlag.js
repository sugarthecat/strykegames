import Flag from '../Flag.js'
export default class demAllianceFlag extends Flag{
    constructor(){
        let lightColors = ['d00000','00d000','0000d0','ff8080','80ff80','8080ff','ff8000','d0d000','00d0d0','d000d0']

        let darkColor = Math.floor(Math.random()*255).toString(16)
        if(darkColor.length == 1){
            darkColor = "0"+darkColor
        }
        darkColor = darkColor + darkColor + darkColor
        let color1
        let color2
        if(Math.random()>0.5){
            color1 = lightColors[Math.floor(Math.random()*lightColors.length)]
            color2 = darkColor
        }else{
            color1 = darkColor
            color2 = lightColors[Math.floor(Math.random()*lightColors.length)]
        }
        
        let parts = [`rz${color1}z0z0z1z1`]

        let seal = Math.floor(Math.random()*6)
        if(seal == 0){
            parts.push(`stz${color2}z0.5z0.5z0.3z5`)
        }else if(seal == 1){
            parts.push(`cz${color2}z0.5z0.5z0.3`)
            parts.push(`stz${color1}z0.5z0.5z0.3z5`)
        }else if(seal == 2){
            parts.push(`cz${color2}z0.5z0.5z0.3`)
            parts.push(`cz${color1}z0.5z0.5z0.22`)
        }else if(seal == 3){
            parts.push(`cz${color2}z0.5z0.5z0.3`)
            parts.push(`cz${color1}z0.5z0.5z0.25`)
            parts.push(`cz${color2}z0.5z0.5z0.2`)
        }else if(seal == 4){
            parts.push(`rz${color2}z0.3z0.3z0.4z0.4`)
        }else if(seal == 5){
            parts.push(`stz${color2}z0.5z0.5z0.3z4`)
        }else if(seal == 6){
            parts.push(`cz${color2}z0.5z0.5z0.3`)
            parts.push(`stz${color1}z0.5z0.5z0.3z4`)
        }
        let deco = Math.floor(Math.random()*4)
        if(deco == 1){
            parts.push(`lz${color2}z0.2z0.5z0z0.5z0.25`)   
            parts.push(`lz${color2}z0.2z0.5z1z0.5z0.75`)    
        }else if(deco == 2){
            parts.push(`lz${color2}z0.2z0z0.5z0.15z0.5`)   
            parts.push(`lz${color2}z0.2z1z0.5z0.85z0.5`)    
        }else if(deco == 3){
            parts.push(`lz${color2}z0.2z0z0.5z0.15z0.5`)   
            parts.push(`lz${color2}z0.2z1z0.5z0.85z0.5`)    
            parts.push(`lz${color2}z0.2z0.5z0z0.5z0.25`)   
            parts.push(`lz${color2}z0.2z0.5z1z0.5z0.75`)      
        }
        super(parts)
    }
}