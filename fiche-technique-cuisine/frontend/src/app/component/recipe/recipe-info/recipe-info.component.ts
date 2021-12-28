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

  @Input() id : number | null=null;
  public recipe : Recipe | null=null;
  public steps: Step[]=[];

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

    const id= this.id ? this.id: Number(this.route.snapshot.paramMap.get('id'));
    //console.log("Recette id: "+id);
    this.getRecipeById(id).subscribe(recipe=>{this.recipe=recipe; this.getSteps();});//TODO pas bo
  }

  getRecipeById(id:number):Observable<Recipe>{
    console.log("recette demandé :",id);
    return this.recipeService.getRecipe(id);
  }

  getSteps():void{

    for(let step of this.recipe!.listOfSteps){
      if(this.isRecipe(step)){
       //C'est une recette
      console.log("c'est recette");
      }else {
        this.stepService.getStep(step.id!).subscribe(ste=>this.steps.push(ste));
      }
    }
  }
  isRecipe(elem:any){
    return (<Recipe>elem).responsable;
  }

  contain(id:any):Step{
    return this.steps.filter(el=> el.id==id)[0];
  }

}
