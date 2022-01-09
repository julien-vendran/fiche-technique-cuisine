import { Allergen } from "./allergen";
import { Denree } from "./denree";

export class Ingredient {
    id: number | undefined;
    name: String = "";
    unit: String = "";
    availableQuantity: number | null = null;
    unitPrice: number | null = null;
    associatedAllergen: Allergen[] = [];
    denreeUsed: Denree | null = null;

    constructor(
        name?: String,
        unit?: String,
        availableQuantity?: number,
        unitPrice?: number,
        associatedAllergen?: Allergen[],
        denreeUsed?: Denree,
        id?: number //Il n'est pas forcément nécessaire donc on le met en dernier 
    ) {
        this.id = id;
        this.name = name ? name : "";
        this.unit = unit ? unit : "";
        this.availableQuantity = availableQuantity ? availableQuantity : null;
        this.unitPrice = unitPrice ? unitPrice : null;
        this.associatedAllergen = associatedAllergen ? associatedAllergen : [];
        this.denreeUsed = denreeUsed ? denreeUsed : null;
    }
}