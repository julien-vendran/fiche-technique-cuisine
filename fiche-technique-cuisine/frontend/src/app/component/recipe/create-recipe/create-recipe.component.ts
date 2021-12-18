import {AfterViewInit, Component, OnInit} from '@angular/core';

import {FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from "@angular/router"

import {Recipe} from '../../../model/recipe'
import {RecipeOrStep} from "../../../model/recipe-or-step";

import * as M from 'materialize-css';
import {RecipeService} from '../../../service/recipe.service';
import {Step} from "../../../model/step";
import {StepService} from "../../../service/step.service";

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
  public recipeOrSteps_list: RecipeOrStep[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private StepService: StepService,
    private router: Router) {
  }

  validate(): void {
    let tab_recipeOrSteps: RecipeOrStep[] = [];
    this.recipeOrSteps_list=[];
    for(let step of this.step_list){
      this.recipeOrSteps_list.push(step);
    }
    for (let recipe of this.recipe_list){
      this.recipeOrSteps_list.push(recipe);
    }
    this.recipeOrSteps_list.sort((a,b)=>{
       return a.id!-b.id!;
     });
    console.log("listStep",this.step_list);
    console.log("listRecipe",this.recipe_list);
    console.log("concat",this.recipeOrSteps_list);
    if (this.recipeGroup) {

      let arr_recipeOrStep: number[] = this.recipeGroup.get('recipeOrSteps')?.value;
      console.log("Id des etapes",arr_recipeOrStep);
      console.log("recipeOrStep",this.recipeOrSteps_list);
      if (this.recipeGroup.get('recipeOrSteps')) {
        for (const all_id in arr_recipeOrStep) {
          tab_recipeOrSteps.push(this.recipeOrSteps_list[all_id])
        }
      }
      console.log("idSteps",tab_recipeOrSteps);
      this.recipe = new Recipe(
        this.recipeGroup.get('name')?.value,
        this.recipeGroup.get('responsable')?.value,
        this.recipeGroup.get('nbOfCover')?.value,
        this.recipeGroup.get('category')?.value,
        tab_recipeOrSteps
      );
      //Envoie des données
      this.recipeService.createRecipe(this.recipe).subscribe(
        () => this.router.navigate(['/recipes'])
      );
    }
  }

  ngOnInit(): void {
    this.recipeGroup = this.fb.group({
      name: [this.recipe?.name],
      responsable: [this.recipe?.responsable],
      nbOfCover: [this.recipe?.nbOfCover],
      category: [this.recipe?.category],
      recipeOrSteps: [this.recipe?.listOfSteps]
    });

    this.recipeService.getAllRecipes().subscribe(data => {
      this.recipe_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });
    this.StepService.getAllSteps().subscribe(data => {
      this.step_list = data;
      setTimeout(this.initSelectMaterialize, 100);
    });

  }

  ngAfterViewInit(): void {
    this.initSelectMaterialize();


  }

  initSelectMaterialize(): void {
    let options: any = {isMultiple: true};
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  change($event: any): void {
    this.initSelectMaterialize();
  }

}
