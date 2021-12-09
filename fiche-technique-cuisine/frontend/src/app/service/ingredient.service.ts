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

  createIngredient (ingredient: Ingredient): void {
    console.log("Création de notre ingrédient initiée");
    this.http.post<Ingredient>(this.ingredient_url, ingredient).subscribe();
  }

  getAllIngredients (): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredient_url).pipe(
      map((arr : any) => arr.map(
        (json: any) => this.jsonToIngredient(json)
      ))
    ); 
  }

  jsonToIngredient(json: any): Ingredient {
    return new Ingredient(
      json.name, 
      json.unit, 
      json.availableQuantity,
      json.unitPrice,
      json.associatedAllergen
    );
  }
}