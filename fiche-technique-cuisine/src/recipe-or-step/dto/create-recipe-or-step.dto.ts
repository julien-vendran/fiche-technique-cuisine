export class CreateRecipeOrStepDto {

    id: number;
    name: string;
    listOfSteps: CreateRecipeOrStepDto[];
    parents:CreateRecipeOrStepDto;


}
