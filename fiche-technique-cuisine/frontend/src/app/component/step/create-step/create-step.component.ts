import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { Ingredient } from '../../../model/ingredient';

import * as M from 'materialize-css';
import { IngredientService } from '../../../service/ingredient.service';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.css']
})
export class CreateStepComponent implements OnInit,AfterViewInit {

  @Input() public stepGroup : FormGroup | null = null;
  @Input() public formIdEnd : number | null = null; 
  public ingredients_list : Ingredient[] = [];

  constructor (
    private ingredientService: IngredientService
  ) {}

 /*  validate(): void {
    let tab_ingredients: Ingredient[] = [];


    if (this.stepGroup) {
      console.log("On est la !!!!");
            

      let arr_ingredient: number[] = this.stepGroup.get('ingredients')?.value;


      if (this.stepGroup.get('ingredients')) {
        tab_ingredients=this.ingredients_list.filter(el => arr_ingredient.includes(el.id!))
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

      /* this.stepService.createStep(this.step).subscribe(
        () => this.router.navigate(['/steps'])
      ); 
    }
  } */

  ngOnInit (): void {

    this.ingredientService.getAllIngredients().subscribe(data => {
      this.ingredients_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });
  }

  //Gestion de materialize
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
