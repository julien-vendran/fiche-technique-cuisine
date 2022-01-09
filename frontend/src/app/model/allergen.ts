export class Allergen {
    id_Allergen: number = 0;
    allergen_name: string = "";

    constructor(
        id?: number,
        name?: string
    ) {
        this.id_Allergen = id ? id :0;
        this.allergen_name = name ? name :"";
    }
}
