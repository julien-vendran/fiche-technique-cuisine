import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {RecipeService} from "../../../service/recipe.service";
import {StepService} from "../../../service/step.service";
import {Observable} from "rxjs";
import {Step} from "../../../model/step";

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit {

  @Input() recipe : Recipe |null=null;
  public steps:Observable<Step[]>=new Observable<Step[]>();
  constructor(
    private recipeService: RecipeService,
    private stepService:StepService
  ) {}


  ngOnInit(): void {
  }

}
