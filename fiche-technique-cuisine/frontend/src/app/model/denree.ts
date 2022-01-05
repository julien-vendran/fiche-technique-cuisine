import {Ingredient} from "./ingredient";

export class Denree {
  id:number | undefined;
  quantity:number =0;
  ingredient:Ingredient | undefined;
  constructor(
    quantity?:number,
    ingredient?:Ingredient,
    id?:number
  ){
    this.id=id;
    this.quantity= quantity ? quantity:0;
    this.ingredient=ingredient ? ingredient: undefined;
  }
}
