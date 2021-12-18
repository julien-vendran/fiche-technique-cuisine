import {CreateRecipeOrStepDto} from "../../recipe-or-step/dto/create-recipe-or-step.dto";

export class CreateRecipeDto extends CreateRecipeOrStepDto{

    listOfSteps: CreateRecipeOrStepDto[];

    responsable:String;

    nbOfCover: number;

    category: String;
}
