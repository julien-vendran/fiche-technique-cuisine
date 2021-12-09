import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    private ingredientService: IngredientService, 
    private router: Router
  ) {}

  ngOnInit(): void {
      this.ingredients = this.getIngredients();
  }

  getIngredients (): Observable<Ingredient[]> {
    return this.ingredientService.getAllIngredients();
  }

  addIngredientRedirect(): void {
    this.router.navigate(['/ingredients/add']);
  }
}
