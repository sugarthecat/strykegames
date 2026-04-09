export default class Ship{

    health;
    strength;
    
    constructor(population,blockDir="a"){
        this.population = population;
        this.blockDir = blockDir
    }

    changeDirectionRandomly(){
        const directions = ["l","r","u","d"]
        this.blockDir = directions[Math.floor(Math.random()*directions.length)]
    }

    // set ship values to colonies
    setShipValuesFromColony(){
        //TODO setup colony for this,, using static for now
        this.health = 200;
        this.strength = 10;
    }

    getNewX(){
        if(this.blockDir.includes("l")){
            return Math.floor(Math.random()*2-1)
        }
        if(this.blockDir.includes("r")){
            return Math.floor(Math.random()*2)
        }
        return Math.floor(Math.random()*3-1)
    }
    getNewY(){
        if(this.blockDir.includes("u")){
            return Math.floor(Math.random()*2-1)
        }
        if(this.blockDir.includes("d")){
            return Math.floor(Math.random()*2)
        }
        return Math.floor(Math.random()*3-1)
    }


    checkIfSunk(){
        return this.health <= 0;
    }
}
