import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RecipeOrStep} from "../model/recipe-or-step";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeOrStepService {

  private recipeOrStep_url : string = environment.apiUrl + "recipeOrStep";

  constructor(
    private http: HttpClient
  ) {}

}
