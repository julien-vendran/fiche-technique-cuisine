import {RecipeOrStep} from "./recipe-or-step";

export class Recipe extends RecipeOrStep {

  responsable: String = "";
  nbOfCover: number = 1;
  category: String = "";
  listOfSteps: RecipeOrStep[] = [];

  constructor(
    name?: String,
    responsable?: String,
    nbOfCover?: number,
    category?: String,
    listOfSteps?: RecipeOrStep[],
    id?: number //Il n'est pas forcément nécessaire donc on le met en dernier
  ) {
    super(name, id);
    this.responsable=responsable ? responsable : "";
    this.nbOfCover= nbOfCover ? nbOfCover : 1;
    this.category=category ? category : "";
    this.listOfSteps= listOfSteps ? listOfSteps : [];
  }

  getSteps(): RecipeOrStep[] {
    let out:RecipeOrStep[]=[];
    this.listOfSteps.forEach(function (steps:RecipeOrStep) {
      out.concat(steps.getSteps());
    });
    return out;
  }
}
