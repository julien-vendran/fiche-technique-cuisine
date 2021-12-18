import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RecipeOrStep} from "../model/recipe-or-step";

@Injectable({
  providedIn: 'root'
})
export class RecipeOrStepService {

  private recipeOrStep_url : string = "http://localhost:3000/recipeOrStep";

  constructor(
    private http: HttpClient
  ) {}

}
