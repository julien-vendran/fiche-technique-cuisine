import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ingredient } from '../../../model/ingredient';

import * as M from 'materialize-css';
import { IngredientService } from '../../../service/ingredient.service';
import { Denree } from '../../../model/denree';
import { Step } from '../../../model/step';

@Component({
  selector: 'app-create-step',
  templateUrl: './create-step.component.html',
  styleUrls: ['./create-step.component.css']
})
export class CreateStepComponent implements OnInit, AfterViewInit {

  @Input() public stepGroup: FormGroup | null = null;
  @Input() public formIdEnd: number | null = null;
  @Input() public step: Step | null = null;

  public ingredients_list: Ingredient[] = [];
  public denree_list: Denree[] = [];

  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) { }

  get denrees() {
    return this.stepGroup?.get('denrees') as FormArray;
  }

  ngOnInit(): void {
    console.log("L'étape qu'on vient de recevoir HEIN : ", this.step);

    if (this.step?.denreeUsed && this.step?.denreeUsed.length) { //Si notre tableau n'est pas vide
      this.step?.denreeUsed.forEach(
        den => this.denree_list.push(den)
      );
    }
    //On va s'en servir pour l'affichage des ingrédients 
    this.ingredientService.getAllIngredients().subscribe(data => {
      this.ingredients_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });
  }

  addDenree(): void {
    this.denree_list.push(new Denree());
    this.denrees.push(this.fb.group({
      quantity: ['', [Validators.required, Validators.min(0)]],
      ingredient: ['', [Validators.required]]
    }));
  }

  getDenreeGroup(i: number): FormGroup {
    return this.denrees.at(i) as FormGroup;
  }

  getIngredients_list(): Ingredient[] {
    return this.ingredients_list;
  }

  //Gestion de materialize
  ngAfterViewInit(): void {
    this.initSelectMaterialize();
  }

  initSelectMaterialize(): void {
    let options: any = { isMultiple: true };
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  change($event: any): void {
    this.initSelectMaterialize();
  }
}
