import {CreateRecipeOrStepDto} from "../../recipe-or-step/dto/create-recipe-or-step.dto";
import {Ingredient} from "../../../frontend/src/app/model/ingredient";

export class CreateStepDto extends CreateRecipeOrStepDto{
    listIngredient: Ingredient[];
    description: String;
    duration: String;
}
