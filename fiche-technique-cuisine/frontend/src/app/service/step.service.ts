import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Step} from "../model/step";
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StepService {


  private step_url : string = "http://localhost:3000/step";

  constructor(
    private http: HttpClient
  ) {}

  createStep (step: Step) {
    console.log("Création de notre ingrédient initiée");
    return this.http.post<Step>(this.step_url, step);
  }

  getAllSteps (): Observable<Step[]> {
    return this.http.get<Step[]>(this.step_url).pipe(
      map((arr : any) => arr.map(
        (json: any) => this.jsonToStep(json)
      ))
    );
  }

  deleteStep (id: number) {
    console.log("------------ Delete Step Service Angular ---------------");
    console.log("url : " + this.step_url + '/' + id);

    return this.http.delete(this.step_url + '/' + id);
  }

  jsonToStep(json: any): Step {
    return new Step(
      json.name,
      json.description,
      json.duration,
      json.listIngredient,
      json.id
    );
  }
}
