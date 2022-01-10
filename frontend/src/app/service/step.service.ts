import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Step } from "../model/step";
import { map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { General } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class StepService extends General {


  private step_url: string = this.backend_general_url + "step";

  constructor(
    private http: HttpClient
  ) { super(); }

  createStep(step: Step): Observable<Step> {
    console.log("Création de notre ingrédient initiée");
    return this.http.post<Step>(this.step_url, step);
  }

  getAllSteps(): Observable<Step[]> {
    return this.http.get<Step[]>(this.step_url).pipe(
      map((arr: any) => arr.map(
        (json: any) => this.jsonToStep(json)
      ))
    );
  }

  getStep(id: number): Observable<Step> {
    return this.http.get<Step>(this.step_url + "/" + id).pipe(
      tap(result => {//au lieu de map quand on a qu'un objet
        return this.jsonToStep(result);
      }));
  }

  deleteStep(id: number) {
    console.log("------------ Delete Step Service Angular ---------------");
    console.log("url : " + this.step_url + '/' + id);

    return this.http.delete(this.step_url + '/' + id);
  }

  jsonToStep(json: any): Step {
    return new Step(
      json.name,
      json.description,
      json.duration,
      json.denreeUsed,
      json.id
    );
  }
}
