export abstract class RecipeOrStep {

  id: number | undefined;
  name: String = "";

  constructor(
    name?: String, id?: number //Il n'est pas forcément nécessaire donc on le met en dernier
  ) {
    this.id = id;
    this.name = name ? name : "";
  }

  abstract getSteps(): RecipeOrStep[];

}
