import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IngredientService } from '../../../service/ingredient.service';
import { Ingredient } from '../../../model/ingredient';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css']
})
export class ListIngredientsComponent implements OnInit {

  public ingredients: Observable<Ingredient[]> = new Observable<Ingredient[]>(); 
  constructor(
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.getIngredients();
  }

  getIngredients (): Observable<Ingredient[]> {
    return this.ingredientService.getAllIngredients();
  }

  deleteIngredient(ingre: Ingredient): void {
    console.log("Mon identifiant : " + ingre);
    
  }
}

//import { Router } from '@angular/router';
//private router: Router
//this.router.navigate(['/ingredients/add']);