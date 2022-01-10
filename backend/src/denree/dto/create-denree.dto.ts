import { Step } from "src/step/entities/step.entity";
import {Ingredient} from "../../ingredients/entities/ingredient.entity";

export class CreateDenreeDto {
    quantity: number;
    ingredient: Ingredient;
    step: Step;
}
