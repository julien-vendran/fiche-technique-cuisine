import { Allergen } from "src/allergen/entities/allergen.entity";
import { Denree } from "src/denree/entities/denree.entity";
import { IngredientsCategorie } from "src/ingredients-categorie/entities/ingredients-categorie.entity";

export class CreateIngredientDto {
    name: String;
    unit: String; 
    availableQuantity: number; 
    unitPrice: number; 
    categorie: IngredientsCategorie;
    associatedAllergen: Allergen[];  
    denreeUsed: Denree[];
}