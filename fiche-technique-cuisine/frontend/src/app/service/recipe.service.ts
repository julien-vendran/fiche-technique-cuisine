import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../model/recipe";
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipe_url : string = "http://localhost:3000/recipe";

  constructor(
    private http: HttpClient
  ) {}

  createRecipe (recipe: Recipe) {
    console.log("Création de notre ingrédient initiée");
    return this.http.post<Recipe>(this.recipe_url, recipe);
  }

  getAllRecipes (): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipe_url).pipe(
      map((arr : any) => arr.map(
        (json: any) => this.jsonToRecipe(json)
      ))
    );
  }

  deleteRecipe (id: number) {
    console.log("------------ Delete Recipe Service Angular ---------------");
    console.log("url : " + this.recipe_url + '/' + id);

    return this.http.delete(this.recipe_url + '/' + id);
  }

  jsonToRecipe(json: any): Recipe {
    return new Recipe(
      json.name,
      json.responsable,
      json.nbOfCover,
      json.category,
      json.recipeOrSteps,
      json.id
    );
  }
}
