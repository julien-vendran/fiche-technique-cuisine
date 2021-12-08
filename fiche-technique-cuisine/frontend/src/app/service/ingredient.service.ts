import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ingredient } from '../model/ingredient';

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
    //this.http.post<Ingredient>(this.ingredient_url, ingredient).subscribe();
  }
}