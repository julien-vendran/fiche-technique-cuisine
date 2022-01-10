import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IngredientService } from '../../../service/ingredient.service';
import { Ingredient } from '../../../model/ingredient';

import { Router } from "@angular/router"


@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css']
})
export class ListIngredientsComponent implements OnInit {

  public ingredients_tab: Ingredient[] = [];
  constructor(
    private ingredientService: IngredientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.majIngredient();
  }

  majIngredient(): void {
    this.getIngredients().subscribe(
      i => {
        this.ingredients_tab = i;
        for (let index = 0; index < this.ingredients_tab.length; index++) {
          if (this.ingredients_tab[index].availableQuantity! <= 0) {//On en a plus
            const el = this.ingredients_tab[index];
            this.ingredients_tab.splice(index, 1);
            this.ingredients_tab.unshift(el);
          }
        }
      }
    );
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientService.getAllIngredients();
  }

  deleteIngredient(ingre: Ingredient): void {
    if (!ingre.id) {
      return;
    }
    this.ingredientService.deleteIngredient(ingre.id).subscribe(
      () => this.majIngredient()
    );
  }

  updateIngredient(id: number): void {
    this.router.navigate(["/ingredients/update/", id]);
  }
}
