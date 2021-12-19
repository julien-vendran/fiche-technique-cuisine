import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import {Router} from "@angular/router"

import { Step } from '../../../model/step'
import { Ingredient } from '../../../model/ingredient';

import * as M from 'materialize-css';
import { StepService } from '../../../service/step.service';
import { IngredientService } from '../../../service/ingredient.service';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.css']
})
export class CreateStepComponent implements OnInit,AfterViewInit {


  public stepGroup : FormGroup | null = null;
  public step: Step = new Step();
  public ingredients_list : Ingredient[] = [];

  constructor (
    private fb: FormBuilder,
    private stepService: StepService,
    private ingredientService: IngredientService,
    private router: Router) {}

  validate(): void {
    let tab_ingredients: Ingredient[] = [];


    if (this.stepGroup) {

      let arr_ingredient: number[] = this.stepGroup.get('ingredients')?.value;


      if (this.stepGroup.get('ingredients')) {
        for (const all_id in arr_ingredient) {
          tab_ingredients.push(this.ingredients_list[all_id])
        }
      }
      console.log("ingredient list",this.ingredients_list);
      console.log("id selected",arr_ingredient);
      console.log("ingredent push",tab_ingredients);

        this.step = new Step(
          this.stepGroup.get('name')?.value,
          this.stepGroup.get('description')?.value,
        this.stepGroup.get('duration')?.value,
        tab_ingredients
      );
      //Envoie des données
      this.stepService.createStep(this.step).subscribe(
        () => this.router.navigate(['/steps'])
      );
    }
  }

  ngOnInit (): void {
    this.stepGroup = this.fb.group({
      name: [this.step?.name],
      description: [this.step?.description],
      duration: [this.step?.duration],
      ingredients: [this.step?.listIngredient]
    });

    this.ingredientService.getAllIngredients().subscribe(data => {
      this.ingredients_list = data;
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
