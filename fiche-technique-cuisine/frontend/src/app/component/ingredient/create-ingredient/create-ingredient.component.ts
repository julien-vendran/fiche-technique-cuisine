import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router"

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

  public isUpdate: boolean = false; //Pas défaut c'est en insert 
  public ingredientGroup : FormGroup | null = null;
  public ingredient: Ingredient = new Ingredient();
  public allergens_list : Allergen[] = [];

  constructor (
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private allergenService: AllergenService,
    private router: Router, 
    private route: ActivatedRoute) {}

  validate(): void {
    //On va créer un ingrédient avec les éléments qu'on a eu
    if (this.ingredientGroup) {

      
      //console.log("ids",arr_allergen);
      //console.log("tab",tab_allergens);
      this.setNewInfosForIngredient();
      //Envoie des données
      this.ingredientService.createIngredient(this.ingredient).subscribe(
        () => this.router.navigate(['/ingredients'])
      );
    }
  }

  ngOnInit (): void {

    let id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdate = true; 
      this.ingredientService.getIngredientById(Number(id)).subscribe(
        ingredient => {
          console.log("Ingrédient trouvé : ", ingredient);
          console.log("Voici l'identifiant de notre ingredients : ", ingredient.id);
          this.ingredient = ingredient; 
          console.log("Identifiant de notre ingrédient après passage : ", this.ingredient.id);
          //this.ingredient.id = Number(id);
          this.ingredientGroup?.patchValue({
            name: this.ingredient.name,
            unit: this.ingredient.unit,
            availableQuantity: this.ingredient.availableQuantity,
            unitPrice: this.ingredient.unitPrice,
            allergens: this.ingredient.associatedAllergen
          }); 
        } 
      ); 
    }
    this.ingredientGroup = this.fb.group({
      name: [this.ingredient?.name],
      unit: [this.ingredient?.unit],
      availableQuantity: [this.ingredient?.availableQuantity],
      unitPrice: [this.ingredient?.unitPrice],
      allergens: [this.ingredient?.associatedAllergen]
    });
    console.log(this.ingredient);

    this.allergenService.getAllAllergens().subscribe(data => {
      this.allergens_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });
  }

  updateIngredient(): void {
    console.log("Identifiant de notre PUTAIN d'ingrédient : ", this.ingredient.id);
    console.log("Mise à jour de notre ingrédient ...");
    this.setNewInfosForIngredient();
    console.log("Identifiant de notre PUTAIN d'ingrédient : ", this.ingredient.id);
    this.ingredientService.updateIngredient(this.ingredient?.id!, this.ingredient).subscribe(
      () => this.router.navigate(['/ingredients'])
      //() => console.log("FIN DE LA MAJ DE L INGREDIENT LA")
    );
  }

  setNewInfosForIngredient (): void {
    if (this.ingredientGroup) {
      let tab_allergens: Allergen[] = [];
      let arr_allergen: number[] = this.ingredientGroup.get('allergens')?.value;

      if (this.ingredientGroup.get('allergens')) {
       tab_allergens = this.allergens_list.filter(el => arr_allergen.includes(el.id_Allergen))
      }

      let id: number | undefined; 
      if (this.ingredient.id)
        id = this.ingredient.id; 

      this.ingredient = new Ingredient(
        this.ingredientGroup.get('name')?.value,
        this.ingredientGroup.get('unit')?.value,
        this.ingredientGroup.get('availableQuantity')?.value,
        this.ingredientGroup.get('unitPrice')?.value,
        tab_allergens, 
        id
      );
    }
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
