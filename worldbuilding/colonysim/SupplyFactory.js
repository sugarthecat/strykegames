export default class SupplyFactory{

    storage;

    PRODUCTION_PER_POP = .002

    constructor(storage){
        this.storage = storage;
    }

    addAmountSupplyToStorage(amount){

        // console.log(amount);
        // console.log(this.storage.supply.supplyCount);

        // console.log("AMOUNT: " + amount );
        this.storage.supply.supplyCount += amount;

        // console.log(this.storage.supply.supplyCount);
        // console.log("++++++++")

    }

    createNewSupply(thisPop){
        // console.log("=========");
        // console.log(`${thisPop.pop} * ${thisPop.colonyControl} * ${this.PRODUCTION_PER_POP} = ${thisPop.pop * thisPop.colonyControl * this.PRODUCTION_PER_POP} `);
        this.addAmountSupplyToStorage(thisPop.pop * thisPop.colonyControl * this.PRODUCTION_PER_POP);

    }


    

}
