import {RecipeOrStep} from "./recipe-or-step";
import {Ingredient} from "./ingredient";

export class Step extends RecipeOrStep{

  description: String="";
  duration: String="";
  listIngredient: Ingredient[]=[];

  constructor (
    name?: String,
    description?: String,
    duration?: String,
    listIngredient?: Ingredient[],
    id?: number //Il n'est pas forcément nécessaire donc on le met en dernier
  ) {
    super(name,id);
    this.listIngredient= listIngredient ? listIngredient:[];
    this.description= description ? description :"";
    this.duration=duration ? duration : "";
  }

}
