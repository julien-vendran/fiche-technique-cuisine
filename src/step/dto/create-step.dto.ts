import {CreateRecipeOrStepDto} from "../../recipe-or-step/dto/create-recipe-or-step.dto";
import { Denree } from "src/denree/entities/denree.entity";

export class CreateStepDto extends CreateRecipeOrStepDto{
    description: String;
    duration: number;
    denreeUsed: Denree[];   
}
