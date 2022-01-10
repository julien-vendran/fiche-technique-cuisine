import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {RecipeService} from "../../../service/recipe.service";
import {StepService} from "../../../service/step.service";
import {Observable} from "rxjs";
import {Step} from "../../../model/step";
import {ActivatedRoute} from "@angular/router";
import {forkJoin} from "rxjs";
import {DenreeService} from "../../../service/denree.service";
import {RecipeOrStep} from "../../../model/recipe-or-step";
import {Denree} from "../../../model/denree";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit {

  public recipe: Recipe | null = null;
  public steps: Step[] = [];
  public recipeOrStep:(RecipeOrStep)[]=[];
  public denrees:Denree[]=[];
  public showCost: boolean = true; 

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private stepService: StepService,
    private denreeService: DenreeService
  ) {
  }


  ngOnInit(): void {
    this.getRecipe();

  }

  getRecipe(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
      this.getSteps();
    });
  }

  getRecipeById(nombre: number): Observable<Recipe> {
    return this.recipeService.getRecipeWithOut(nombre);
  }

  getSteps(): void {
    this.recursif(this.recipe!,0);
  }

  getAllDenree() {
    for (let step of this.steps) {
      for (let derenrefor of step.denreeUsed) {
        this.denreeService.getDenreeById(derenrefor.id!).subscribe(data =>{
          derenrefor.ingredient = data.ingredient;
          this.denrees.push(data);
        });
      }
    }

  }


  recursif(recip:Recipe,index:number){
    forkJoin(this.getStepFromRecipe(recip)).subscribe(rORs=>{

      this.recipeOrStep.splice(index,1,...rORs);
      let i=index;
      let keepGoing=true;
      while (keepGoing && i<this.recipeOrStep.length){
        let elem=this.recipeOrStep[i];
        if(this.isRecipe(elem)){
          const idsend=i;
          this.getRecipeById(elem.id!).subscribe(data=>this.recursif(data,idsend));
          keepGoing=false
        }else {
          i++;
        }
      }
      if(i==this.recipeOrStep.length){
       this.end()
      }

    })
  }

  end(){
    this.steps=this.recipeOrStep as Array<Step>;
    this.getAllDenree();
  }

  getStepFromRecipe(recip: Recipe): Observable<Step| Recipe>[] {
    let observer_arr: Observable<Step | Recipe>[] = [];
    let r: Recipe = recip;
    for (let next of r.listOfSteps) {
     if (this.isRecipe(next)){
        observer_arr.push(this.getRecipeById(next.id!));
      }else {
          observer_arr.push(this.stepService.getStep(next.id!));
      }
    }
      return  observer_arr;
    }


  isRecipe(elem: any) {
    return elem.hasOwnProperty("responsable");
  }

  contain(id: any): Step {
    return this.steps.filter(el => el.id == id)[0];
  }

  toggleShowCost() {
    this.showCost = ! this.showCost; 
  }

  @ViewChild('content') content!:ElementRef;
  generatePDF(){

    const div = document.getElementById('content');
    const options = {
      background: 'white',
      scale: 1
    };


    if(div !=null){
    html2canvas(div).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");//.replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
      var doc = new jsPDF('l', 'mm', 'a1', false);

      //window.location.href=img; // it will save locally


      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      doc.internal.pageSize.width=imgProps.width;
      doc.internal.pageSize.height=imgProps.height;
      const pdfWidth = imgProps.width; //doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight =  imgProps.height;//(imgProps.height * pdfWidth) / imgProps.width;
      //doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      console.log("properties",bufferX, bufferY, pdfWidth, pdfHeight,canvas,img);
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
      return doc;
    }).then((doc) => {
      doc.save('postres.pdf');
    });

    }

  }


}
