import { default as SupplyFactory } from "./SupplyFactory.js";

export default class FactoryDistrict{

    supplyFactory;

    constructor(){

        
    }

    createSetSupplyFactory(storage){
        this.supplyFactory = new SupplyFactory(storage);
    }

}
