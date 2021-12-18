import {Ingredient} from "../../ingredients/entities/ingredient.entity";
import {CreateRecipeOrStepDto} from "../../recipe-or-step/dto/create-recipe-or-step.dto";

export class CreateStepDto extends CreateRecipeOrStepDto{
    listIngredient: Ingredient[];
    description: String;
    duration: String;
}
