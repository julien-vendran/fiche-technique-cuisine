import { RecipeOrStep } from "./recipe-or-step";
import { Denree } from "./denree";

export class Step extends RecipeOrStep {

  description: String = "";
  duration: String = "";
  denreeUsed: Denree[] = [];
  //listIngredient: Ingredient[]=[];

  constructor(
    name?: String,
    description?: String,
    duration?: String,
    denreeUsed?: Denree[],
    id?: number //Il n'est pas forcément nécessaire donc on le met en dernier
  ) {
    super(name, id);
    this.denreeUsed = denreeUsed ? denreeUsed : [];
    this.description = description ? description : "";
    this.duration = duration ? duration : "";
  }

  getSteps(): RecipeOrStep[] {
    return [this];
  }

  getListIngredients(): Denree[] {
    return this.denreeUsed;
  }

}
