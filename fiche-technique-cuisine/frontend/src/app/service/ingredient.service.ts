import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ingredient } from '../model/ingredient';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private ingredient_url : string = "http://localhost:3000/ingredients"; 

  constructor(
    private http: HttpClient
  ) {}

  createIngredient (ingredient: Ingredient) {
    console.log("Création de notre ingrédient initiée");
    return this.http.post<Ingredient>(this.ingredient_url, ingredient); 
  }

  getAllIngredients (): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredient_url).pipe(
      map((arr : any) => arr.map(
        (json: any) => this.jsonToIngredient(json)
      ))
    ); 
  }

  deleteIngredient (id: number) {
    console.log("------------ Delete Ingredient Service Angular ---------------");
    console.log("url : " + this.ingredient_url + '/' + id);
    
    return this.http.delete(this.ingredient_url + '/' + id); 
  }

  getIngredientById(id: number) {
    return this.http.get<Ingredient>(this.ingredient_url + '/' + id);
  }

  updateIngredient (id: number, newIngredient: Ingredient) {
    return this.http.patch<Ingredient>(this.ingredient_url + '/' + id, newIngredient);
  }

  jsonToIngredient(json: any): Ingredient {
    return new Ingredient(
      json.name, 
      json.unit, 
      json.availableQuantity,
      json.unitPrice,
      json.associatedAllergen,
      json.denreeUsed,  
      json.id
    );
  }
}