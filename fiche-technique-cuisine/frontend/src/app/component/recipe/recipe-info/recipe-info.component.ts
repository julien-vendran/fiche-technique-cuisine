import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {RecipeService} from "../../../service/recipe.service";
import {StepService} from "../../../service/step.service";
import {Observable} from "rxjs";
import {Step} from "../../../model/step";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit {

  public recipe : Recipe | undefined;
  public steps: Observable<Step>[]=[];

  constructor(
    private route: ActivatedRoute,
   // private location: Location,
    private recipeService: RecipeService,
    private stepService:StepService
  ) {}


  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe():void{
    const id= Number(this.route.snapshot.paramMap.get('id'));
    //console.log("Recette id: "+id);
    this.recipeService.getRecipe(id).subscribe(recipe=>{this.recipe=recipe; this.getSteps();});//TODO pas bo
  }

  getSteps():void{
    console.log("pre-boucle", this.recipe);
    for(let step of this.recipe!.listOfSteps){
      this.steps.push(this.stepService.getStep(step.id!))
    }
  }

}
