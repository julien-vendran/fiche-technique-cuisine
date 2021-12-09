import { Allergen } from "./allergen";

export class Ingredient {
    name: String = "";
    unit: String = ""; 
    availableQuantity: number | null = null; 
    unitPrice: number | null = null; 
    associatedAllergen: Allergen[] = []; 

    constructor (
        name?: String,
        unit?: String, 
        availableQuantity?: number, 
        unitPrice?: number, 
        associatedAllergen?: Allergen[]
    ) {
        this.name = name ? name : ""; 
        this.unit = unit ? unit : ""; 
        this.availableQuantity = availableQuantity ? availableQuantity : null; 
        this.unitPrice = unitPrice ? unitPrice : null; 
        this.associatedAllergen = associatedAllergen ? associatedAllergen : []; 
    }
}