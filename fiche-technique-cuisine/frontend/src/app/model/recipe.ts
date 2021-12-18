import { RecipeOrStep } from "./recipe-or-step";

export class Recipe extends RecipeOrStep {

    listOfSteps: RecipeOrStep[];
    responsable: String;
    nbOfCover: number;
    category: String;

    constructor(
        name: String, 
        listOfSteps: RecipeOrStep[], 
        responsable: String,
        nbOfCover: number, 
        category: String,  
        id?: number
    ) {
        super(name, id); 

        this.listOfSteps = listOfSteps; 
        this.responsable = responsable; 
        this.nbOfCover = nbOfCover; 
        this.category = category; 
    }
}
