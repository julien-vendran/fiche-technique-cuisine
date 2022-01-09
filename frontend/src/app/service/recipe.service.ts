import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../model/recipe";
import {map, tap} from "rxjs/operators";
import {Observable} from 'rxjs';
import { Cost } from '../model/cost';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipe_url: string = environment.apiUrl + "recipe";

  constructor(
    private http: HttpClient
  ) {
  }

  createRecipe(recipe: Recipe) {
    console.log("Création de notre ingrédient initiée", recipe);
    return this.http.post<Recipe>(this.recipe_url, recipe);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipe_url).pipe(
      map((arr: any) => arr.map(
        (json: any) => this.jsonToRecipe(json)
      ))
    );
  }

  getRecipe(id: Number): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipe_url + "/" + id).pipe(
      tap(result => {//au lieu de map quand on a qu'un objet
        return this.jsonToRecipe(result);
      }));
  }

  getRecipeWithOut(id: Number): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipe_url + "/withoutdenree/" + id).pipe(
      tap(result => {//au lieu de map quand on a qu'un objet
        return this.jsonToRecipe(result);
      }));
  }


  deleteRecipe(id: number) {
    console.log("------------ Delete Recipe Service Angular ---------------");
    console.log("url : " + this.recipe_url + '/' + id);

    return this.http.delete(this.recipe_url + '/' + id);
  }
  
  getCostByRecipeId (id: number) {
    return this.http.get<Cost>(this.recipe_url + '/cost/' + id);
  }

  sellRecipe (id: number) {
    return this.http.get(this.recipe_url + '/sellRecipe/' + id)
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
