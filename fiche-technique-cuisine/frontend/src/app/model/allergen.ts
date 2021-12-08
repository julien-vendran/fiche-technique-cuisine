export class Allergen {
    id_Allergen: number = 0; 
    allergen_name: string = "";

    constructor(
        id: number, 
        name: string
    ) {
        this.id_Allergen = id; 
        this.allergen_name = name; 
    }
}
