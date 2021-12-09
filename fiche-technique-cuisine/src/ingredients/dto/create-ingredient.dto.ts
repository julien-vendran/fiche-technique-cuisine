import { Allergen } from "frontend/src/app/model/allergen";

export class CreateIngredientDto {
    name: String;
    unit: String; 
    availableQuantity: number; 
    unitPrice: number; 
    associatedAllergen: Allergen[]; 
}
