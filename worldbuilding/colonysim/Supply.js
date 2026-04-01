export default class Supply{

    //TODO maybe make more supply types

    supplyCount=0;

    constructor(){

    }

    getSupplyCount(){
        // if (this.supplyCount < 0) {
        //     console.log("Undefined Supply");
        //     console.log(this.supplyCount);
        // }
        return this.supplyCount;
    }

    increaseSupply(amount){
        this.supplyCount += amount;
    }

    decreaseSupply(amount){
        if (this.supplyCount - amount >0){
            this.supplyCount-=amount
        }else{
            this.supplyCount = 0;
        }
    }

}