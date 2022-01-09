import {RecipeOrStep} from "./recipe-or-step";
import {Step} from "./step";

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

  getSteps(): Step[] {
    console.log("On appel getsteps");
    let out:Step[]=[];
    this.listOfSteps.forEach(el=>{
      out.push(...el.getSteps())
    });
    return out;
  }
}
