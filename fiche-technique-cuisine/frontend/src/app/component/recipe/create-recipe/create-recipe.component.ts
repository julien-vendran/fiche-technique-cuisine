import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Step } from '../../../model/step';

import { Recipe } from '../../../model/recipe';
@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
//TODO : Faire une table pour les catégories
  
  public recipeGroup : FormGroup | null = null;
  protected recipe: Recipe = new Recipe("", [], "", 0, "");

  protected stepsGroup: FormGroup[] | null = null; 
  public steps: Step[] = [new Step(), new Step()]; 

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recipeGroup = this.fb.group({
      name: [this.recipe?.name],
      listOfSteps: [this.recipe?.listOfSteps],
      responsable: [this.recipe?.responsable],
      nbOfCover: [this.recipe?.nbOfCover],
      category: [this.recipe?.category]
    });
  }

  validate(): void {
    console.log("Création de la recette");
  }

  addStep(): void {
    console.log("Ajout d'une étapde");
    
    //Il faudrait enlever les trus facultatifs des Step non ? 
    this.steps.push(new Step("", "", "", [])); 
    
    this.stepsGroup?.push(
      this.fb.group({
        name: [this.steps[this.steps.length - 1].name], 
        description: [this.steps[this.steps.length - 1].description], 
        duration: [this.steps[this.steps.length - 1].duration], 
        listIngredient: [this.steps[this.steps.length - 1].listIngredient]
      })
    );
  }
}
