import {AfterViewInit, Component, OnInit} from '@angular/core';

import {FormGroup, FormBuilder, FormArray, AbstractControl} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {Router} from "@angular/router"

import {Recipe} from '../../../model/recipe'
import {RecipeOrStep} from "../../../model/recipe-or-step";

import * as M from 'materialize-css';
import { RecipeService } from '../../../service/recipe.service';
import { Step } from "../../../model/step";
import { StepService } from "../../../service/step.service";
import { Ingredient } from '../../../model/ingredient';
import { IngredientService } from '../../../service/ingredient.service';

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
    private router: Router) {
  }

  get steps() {
    return this.recipeGroup?.get('steps') as FormArray;
  }

  validate() {   
    
    let obsStep_arr: Observable<Step>[] = []; 
    

    this.updateStepFromstepOrRecipeToShow();
    for (let i = 0; i < this.stepOrRecipeToShow.length; i ++) {
      if (this.stepOrRecipeToShow[i] instanceof Step) { //Si on rencontre une étape
        obsStep_arr.push(this.stepService.createStep(this.stepOrRecipeToShow[i] as Step));
      }
    }
    
    if (this.recipeGroup) {

      console.log("------------------------");
      console.log("stepOrRecipeToShow : ", this.stepOrRecipeToShow);
      console.log("------------------------");
      
      this.recipe = new Recipe(
        this.recipeGroup.get('name')?.value,
        this.recipeGroup.get('responsable')?.value,
        this.recipeGroup.get('nbOfCover')?.value,
        this.recipeGroup.get('category')?.value,
        this.stepOrRecipeToShow
      );

      console.log("-----------------------------");
      console.log("Notre recette : ", this.recipe);
      console.log("-----------------------------");

      let count: number = 0; 
      forkJoin(obsStep_arr).subscribe(
        arr_step => {          
          for (let i = 0; i < this.stepOrRecipeToShow.length; i ++) {
            if (this.stepOrRecipeToShow[i] instanceof Step) {
              this.stepOrRecipeToShow[i].id = arr_step[count].id; //On met à jour les id de notre tableau
              count ++;
            }
          }

          this.recipeService.createRecipe(this.recipe).subscribe(
            () => this.router.navigate(['/recipe'])
            //recipe => console.log(recipe)
          );
        }
      );
    }
  }

  updateStepFromstepOrRecipeToShow () {
    let tab_ingredients: Ingredient[] = [];
    let arr_ingredient: number[] = []; 
    let count: number = 0; 
    for (let i = 0; i < this.stepOrRecipeToShow.length; i ++) {
      if (this.stepOrRecipeToShow[i] instanceof Step) {
        if (this.steps.at(count).get('ingredients')) { //Si notre recette à des ingrédients
          arr_ingredient = this.steps.at(count).get('ingredients')?.value;
          tab_ingredients = this.ingredients_list.filter(el => arr_ingredient.includes(el.id!))
        }

        this.stepOrRecipeToShow[i] = new Step( //Création de notre étape et mise à jour dans le tableau
          this.steps.at(count).get('name')?.value, 
          this.steps.at(count).get('description')?.value, 
          this.steps.at(count).get('duration')?.value, 
          tab_ingredients
        );
        count ++;
      }
    }
  }

  ngOnInit(): void {
    this.recipeGroup = this.fb.group({
      name: [this.recipe?.name],
      responsable: [this.recipe?.responsable],
      nbOfCover: [this.recipe?.nbOfCover],
      category: [this.recipe?.category],     
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


  addStep (): void {
    this.stepOrRecipeToShow.push(new Step()); //On se dit qu'on "garde une place" pour une étape à cet endroit
    console.log(this.stepOrRecipeToShow[this.stepOrRecipeToShow.length - 1] instanceof Step);

    let s: Step = this.stepOrRecipeToShow[this.stepOrRecipeToShow.length - 1] as Step; 
    this.steps.push(
      this.fb.group({
        name: [s.name],
        description: [s.description],
        duration: [s.duration],
        ingredients: [s.listIngredient]
      })
    );
  }

  isStep(r: RecipeOrStep): boolean {
    return r instanceof Step;
  }

  getStepGroup(index: number): FormGroup {
    return this.steps.at(this.getFormGroupIndexForStep(index)) as FormGroup;
  }

  /** 
   * Permet de trouver la position de la recette dans le FormGroup par rapport à sa position dans le tableau this.stepOrRecipeToShow 
  */
  getFormGroupIndexForStep(index: number): number {
    let place: number = -1; //On commence à -1 car on veut anticiper le fait que va se croiser et que les tableaux commence à 0 
    for(let i = 0; i <= index; i++) {
      if (this.stepOrRecipeToShow[i] instanceof Step) { //Si on croise une étape
        place ++; //On se décale dans notre tableau de base 
      }
    }
    return place; 
  }
  
  getRecipeById (id: number) : Recipe | null {
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

    console.log("Notre tableau : ", this.stepOrRecipeToShow);
    console.log("i : ", i);
    
    let toReplaceWith: number = i + way;
    console.log("toReplaceWith", toReplaceWith);
    
    //On le met à jour dans le tableau 
    let recipeOrStep_arr: RecipeOrStep = this.stepOrRecipeToShow[i]; 
    this.stepOrRecipeToShow[i] = this.stepOrRecipeToShow[toReplaceWith]; 
    this.stepOrRecipeToShow[toReplaceWith] = recipeOrStep_arr;

    //On le met à jour dans le FormBuilder
    let recipeOrStep_fa: AbstractControl = this.steps.at(i); 
    this.steps.removeAt(i); 
    this.steps.insert(toReplaceWith, recipeOrStep_fa); 
  }

  //Materialize
  ngAfterViewInit(): void {
    this.initSelectMaterialize();
  }

  initSelectMaterialize(): void {
    let options: any = {isMultiple: true};
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  change($event: any): void {
    this.initSelectMaterialize();
    console.log("Changement détecté");
  }

  changeSelect($event: any, value: any): void {
    console.log(value);
    let r: Recipe | null = this.getRecipeById(value as number); 
    if (r) //Si on trouve bien notre recette
      this.stepOrRecipeToShow.push(r); 
  }
}
