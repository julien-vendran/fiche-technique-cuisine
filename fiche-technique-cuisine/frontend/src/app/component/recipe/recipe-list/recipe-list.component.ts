import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {RecipeService} from "../../../service/recipe.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Observable<Recipe[]> = new Observable<Recipe[]>();
  constructor(
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.majRecipe();
  }

  majRecipe(): void {
    this.recipes = this.getRecipes();
  }

  getRecipes (): Observable<Recipe[]> {
    return this.recipeService.getAllRecipes();
  }


  deleteRecipe(recipe: Recipe): void {
    if (! recipe.id) {
      console.log("La recette demandé n'existe pas");
      return;
    }
    console.log("Mon identifiant : " + recipe.id);
    this.recipeService.deleteRecipe(recipe.id).subscribe(
      () => this.recipes = this.getRecipes()
    );
  }

}
