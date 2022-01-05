import {Ingredient} from "../../ingredients/entities/ingredient.entity";

export class CreateDenreeDto {

    id:number;
    quantity:number;
    ingredient:Ingredient;
}
