import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { General } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeOrStepService extends General {

  private recipeOrStep_url: string = this.backend_general_url + "recipeOrStep";

  constructor(
    private http: HttpClient
  ) { super(); }

}
