import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { Ingredient } from '../../../model/ingredient'
import { Allergen } from '../../../model/allergen';

import * as M from 'materialize-css'; 
import { IngredientService } from '../../../service/ingredient.service';
import { AllergenService } from '../../../service/allergen.service';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit, AfterViewInit{

  public ingredientGroup : FormGroup | null = null; 
  public ingredient: Ingredient = new Ingredient();
  public allergens_list : Allergen[] = []; 

  constructor (
    private fb: FormBuilder,
    private ingredientService: IngredientService, 
    private allergenService: AllergenService) {}

  validate(): void {
    let tab_allergens: Allergen[] = [];

    //On va créer un ingrédient avec les éléments qu'on a eu
    if (this.ingredientGroup) {

      let arr_allergen: number[] = this.ingredientGroup.get('allergens')?.value;

      if (this.ingredientGroup.get('allergens')) { 
        for (const all_id in arr_allergen) {
          tab_allergens.push(this.allergens_list[all_id])
        }
      }
      
      this.ingredient = new Ingredient(
        this.ingredientGroup.get('name')?.value, 
        this.ingredientGroup.get('unit')?.value, 
        this.ingredientGroup.get('availableQuantity')?.value, 
        this.ingredientGroup.get('unitPrice')?.value,
        tab_allergens 
      );
      //Envoie des données
      this.ingredientService.createIngredient(this.ingredient);
    }
    //On remet à zéro notre ingrédient
    this.ingredient = new Ingredient();
  }

  ngOnInit (): void {
    this.ingredientGroup = this.fb.group({
      name: [this.ingredient?.name], 
      unit: [this.ingredient?.unit], 
      availableQuantity: [this.ingredient?.availableQuantity], 
      unitPrice: [this.ingredient?.unitPrice], 
      allergens: [this.ingredient?.associatedAllergen]
    });

    this.allergenService.getAllAlergen().subscribe(data => {
      this.allergens_list = data; 
      setTimeout(this.initSelectMaterialize, 100);
    });
  }

  ngAfterViewInit (): void {
    this.initSelectMaterialize();
  }

  initSelectMaterialize (): void {
    let options:any = {isMultiple: true}; 
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  change($event: any): void {
    this.initSelectMaterialize();
  }
}
