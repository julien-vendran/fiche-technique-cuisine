import { Ingredient } from "./ingredient";
import { Step } from "./step";

export class Denree {
  id: number | null = null;
  quantity: number = 0;
  ingredient: Ingredient | null = null;
  step: Step | null = null;
  constructor(
    quantity?: number,
    ingredient?: Ingredient,
    step?: Step,
    id?: number
  ) {
    this.id = id ? id : null;
    this.quantity = quantity ? quantity : 0;
    this.ingredient = ingredient ? ingredient : null;
    this.step = step ? step : null;
  }
}
