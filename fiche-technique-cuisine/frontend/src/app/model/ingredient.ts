export class Ingredient {
    name: String = "";
    unit: String = ""; 
    availableQuantity: number = 0; 
    unitPrice: number = 0; 
    isAllergenic: boolean = false; 

    constructor (
        name: String,
        unit: String, 
        availableQuantity: number, 
        unitPrice: number, 
        isAllergenic: boolean
    ) {
        this.name = name; 
        this.unit = unit; 
        this.availableQuantity = availableQuantity; 
        this.unitPrice = unitPrice; 
        this.isAllergenic = isAllergenic; 
    }

    toJSON (): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}
