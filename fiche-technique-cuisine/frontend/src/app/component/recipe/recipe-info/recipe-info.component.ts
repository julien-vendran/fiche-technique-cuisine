import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {RecipeService} from "../../../service/recipe.service";
import {StepService} from "../../../service/step.service";
import {Observable} from "rxjs";
import {Step} from "../../../model/step";
import {ActivatedRoute} from "@angular/router";
import {forkJoin} from "rxjs";
import {Ingredient} from "../../../model/ingredient";
import {DenreeService} from "../../../service/denree.service";
import {Denree} from "../../../model/denree";

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit {

  public recipe : Recipe | null=null;
  public steps: Step[]=[];

  constructor(
    private route: ActivatedRoute,
   // private location: Location,
    private recipeService: RecipeService,
    private stepService:StepService,
    private denreeService:DenreeService
  ) {}


  ngOnInit(): void {
    this.getRecipe();

  }

  getRecipe():void{

    const id= Number(this.route.snapshot.paramMap.get('id'));
    //console.log("Recette id: "+id);
    this.getRecipeById(id).subscribe(recipe=>{this.recipe=recipe; this.getSteps();});//TODO pas bo
  }

  getRecipeById(nombre:number):Observable<Recipe>{
    return this.recipeService.getRecipe(nombre);
  }

  getSteps():void{

    let observer_arr:Observable<Step>[]= this.recursif(this.recipe);
    console.log("ON regarde les observer",observer_arr);
    forkJoin(observer_arr).subscribe(arr=>{ this.steps=arr; this.getAllDenree();});
  }

  getAllDenree(){
    for (let step of this.steps){
     // step.denreeUsed.map(denree=> this.getDenree(denree).subscribe())
      for(let derenrefor of step.denreeUsed){
       this.denreeService.getDenreeById(derenrefor.id!).subscribe(data=> derenrefor.ingredient=data.ingredient);
      }
    }
  }


  recursif(elem:any):Observable<Step>[]{
    let observer_arr:Observable<Step>[]= [];
    if (this.isRecipe(elem)){
      let r:Recipe = elem;
      for (let next of r.listOfSteps){
        if (this.isRecipe(next)){
          //this.getRecipeById(next.id).subscribe()
          observer_arr.push(...this.recursif(next)); //TODO pense pas que ça marche
        }else {
          observer_arr.push(...this.recursif(next));
        }
      }
    }else {
      observer_arr.push(this.stepService.getStep(elem.id));
    }
    return observer_arr;
  }


  isRecipe(elem:any){
    return (<Recipe>elem).responsable;
  }

  contain(id:any):Step{
    return this.steps.filter(el=> el.id==id)[0];
  }

}
