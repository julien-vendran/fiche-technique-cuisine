import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { Router } from "@angular/router"

import { Recipe } from '../../../model/recipe'
import { RecipeOrStep } from "../../../model/recipe-or-step";

import * as M from 'materialize-css';
import { RecipeService } from '../../../service/recipe.service';
import { Step } from "../../../model/step";
import { StepService } from "../../../service/step.service";
import { Ingredient } from '../../../model/ingredient';
import { IngredientService } from '../../../service/ingredient.service';
import { Denree } from '../../../model/denree';
import { DenreeService } from '../../../service/denree.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit, AfterViewInit {


  public recipeGroup: FormGroup | null = null;
  public recipe: Recipe = new Recipe();
  public recipe_list: Recipe[] = [];
  public step_list: Step[] = [];
  public stepOrRecipeToShow: RecipeOrStep[] = [];

  public ingredients_list: Ingredient[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private stepService: StepService,
    private ingredientService: IngredientService,
    private denreeService: DenreeService,
    private router: Router
  ) {
  }

  get steps() {
    return this.recipeGroup?.get('steps') as FormArray;
  }

  validate() {

    let obsStep_arr: Observable<Step>[] = [];
    let obsDenree_arr: Observable<Denree>[] = [];


    this.updateStepFromstepOrRecipeToShow();
    for (let i = 0; i < this.stepOrRecipeToShow.length; i++) {
      if (this.stepOrRecipeToShow[i] instanceof Step) { //Si on rencontre une étape
        obsStep_arr.push(this.stepService.createStep(this.stepOrRecipeToShow[i] as Step));
        //Pour chaque étape, on veut aussi mettre à jour ses denrées
        (this.stepOrRecipeToShow[i] as Step).denreeUsed.forEach(
          newDenree => obsDenree_arr.push(this.denreeService.createDenree(newDenree))
        );
      }
    }

    if (this.recipeGroup) {

      this.recipe = new Recipe(
        this.recipeGroup.get('name')?.value,
        this.recipeGroup.get('responsable')?.value,
        this.recipeGroup.get('nbOfCover')?.value,
        this.recipeGroup.get('category')?.value,
        this.stepOrRecipeToShow
      );

      let count: number = 0;
      forkJoin(obsDenree_arr).subscribe(
        arr_denree => {
          let compteD = 0;
          for (let i = 0; i < this.stepOrRecipeToShow.length; i++) {
            if (this.stepOrRecipeToShow[i] instanceof Step) {
              (this.stepOrRecipeToShow[i] as Step).denreeUsed.forEach(element => {
                element.id = arr_denree[compteD].id; //On met à jour les id de notre tableau
                compteD++;
              });
              count++;
            }
          }
        }, null, () => {
          forkJoin(obsStep_arr).subscribe(
            arr_step => {
              count = 0;
              for (let i = 0; i < this.stepOrRecipeToShow.length; i++) {
                if (this.stepOrRecipeToShow[i] instanceof Step) {
                  this.stepOrRecipeToShow[i].id = arr_step[count].id; //On met à jour les id de notre tableau
                  count++;
                }
              }
            }, null, () => {
              this.recipeService.createRecipe(this.recipe).subscribe(
                () => this.router.navigate(['/recipe'])
              );
            }
          );
        }
      );
    }
  }

  updateStepFromstepOrRecipeToShow() {

    let tab_denree: Denree[];
    let count: number = 0;
    let denreeControl: FormArray;

    for (let i = 0; i < this.stepOrRecipeToShow.length; i++) {
      tab_denree = []; //On met le tableau à 0

      if (this.stepOrRecipeToShow[i] instanceof Step) {
        if (this.steps.at(count).get('denrees')) { //Si notre recette à des ingrédients
          denreeControl = this.steps.at(count).get('denrees') as FormArray;

          for (let c of denreeControl.controls) { //On met à jour le tableau de denrée lié à notre élément
            tab_denree.push(new Denree(
              (c as FormGroup).get("quantity")?.value,
              (c as FormGroup).get("ingredient")?.value
            ));
          }
        }

        this.stepOrRecipeToShow[i] = new Step( //Création de notre étape et mise à jour dans le tableau
          this.steps.at(count).get('name')?.value,
          this.steps.at(count).get('description')?.value,
          this.steps.at(count).get('duration')?.value,
          tab_denree
        );
        count++;
      }
    }
  }

  ngOnInit(): void {
    this.recipeGroup = this.fb.group({
      name: [this.recipe?.name, Validators.required],
      responsable: [this.recipe?.responsable, Validators.required],
      nbOfCover: [this.recipe?.nbOfCover, [Validators.required, Validators.min(0)]],
      category: [this.recipe?.category, Validators.required],
      steps: this.fb.array([])
    });

    this.recipeService.getAllRecipes().subscribe(data => {
      this.recipe_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });
    this.ingredientService.getAllIngredients().subscribe(data => {
      this.ingredients_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });
  }


  addStep(): void {
    this.stepOrRecipeToShow.push(new Step()); //On se dit qu'on "garde une place" pour une étape à cet endroit
    console.log(this.stepOrRecipeToShow[this.stepOrRecipeToShow.length - 1] instanceof Step);

    let s: Step = this.stepOrRecipeToShow[this.stepOrRecipeToShow.length - 1] as Step;
    this.steps.push(
      this.fb.group({
        name: [s.name, Validators.required],
        description: [s.description, Validators.required],
        duration: [s.duration, [Validators.required, Validators.min(0)]],
        denrees: this.fb.array([])
      })
    );
  }

  isStep(r: RecipeOrStep): boolean {
    return r instanceof Step;
  }

  getStepGroup(index: number): FormGroup {
    return this.steps.at(this.getFormGroupIndexForStep(index)) as FormGroup;
  }

  getStep(index: number): Step {
    return this.stepOrRecipeToShow[index] as Step;
  }

  /**
   * Permet de trouver la position de la recette dans le FormGroup par rapport à sa position dans le tableau this.stepOrRecipeToShow
  */
  getFormGroupIndexForStep(index: number): number {
    let place: number = -1; //On commence à -1 car on veut anticiper le fait que va se croiser et que les tableaux commence à 0
    for (let i = 0; i <= index; i++) {
      if (this.stepOrRecipeToShow[i] instanceof Step) { //Si on croise une étape
        place++; //On se décale dans notre tableau de base
      }
    }
    return place;
  }

  getRecipeById(id: number): Recipe | null {
    let r: Recipe | null = null;
    for (let i = 0; i < this.recipe_list.length; i++) {
      if (this.recipe_list[i].id == id) {
        r = this.recipe_list[i];
      }
    }
    return r;
  }

  deleteStepOrRecipe(index: number): void {
    this.stepOrRecipeToShow.splice(index, 1);
  }

  adjustPosition(i: number, way: number): void {
    //Pour déplacer une étape, il faut la mettre à jour dans le tableau (Elles sont toutes vides)
    this.updateStepFromstepOrRecipeToShow();

    let toReplaceWith: number = i + way;

    //On le met à jour dans le tableau
    let recipeOrStep_arr: RecipeOrStep = this.stepOrRecipeToShow[i];
    this.stepOrRecipeToShow[i] = this.stepOrRecipeToShow[toReplaceWith];
    this.stepOrRecipeToShow[toReplaceWith] = recipeOrStep_arr;

    //On le met à jour dans le FormBuilder
    if (this.stepOrRecipeToShow[i] instanceof Step && this.stepOrRecipeToShow[toReplaceWith] instanceof Step) {
      let recipeOrStep_fa: AbstractControl = this.steps.at(i);
      this.steps.removeAt(i);
      this.steps.insert(toReplaceWith, recipeOrStep_fa);
    }
  }

  moveToRecipeById(id: number): void {
    this.router.navigate(['/recipe/info/' + id])
  }

  //Materialize
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

  changeSelect($event: any, value: any): void {
    let r: Recipe | null = this.getRecipeById(value as number);
    if (r) //Si on trouve bien notre recette
      this.stepOrRecipeToShow.push(r);
  }
}
