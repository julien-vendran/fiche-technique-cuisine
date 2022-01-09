import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Denree} from "../model/denree";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DenreeService {


  private denree_url : string = process.env['BACKEND_URL'] + "denree";

  constructor(
    private http: HttpClient
  ) {}

  createDenree (denree: Denree) {
    console.log("Création de notre denrée initiée");
    return this.http.post<Denree>(this.denree_url, denree);
  }

  getAllDenrees (): Observable<Denree[]> {
    return this.http.get<Denree[]>(this.denree_url).pipe(
      map((arr : any) => arr.map(
        (json: any) => this.jsonToDenree(json)
      ))
    );
  }

  deleteDenree (id: number) {
    console.log("------------ Delete Denree Service Angular ---------------");
    console.log("url : " + this.denree_url + '/' + id);

    return this.http.delete(this.denree_url + '/' + id);
  }

  getDenreeById(id: number) {
    return this.http.get<Denree>(this.denree_url + '/' + id);
  }

  updateDenree (id: number, newDenree: Denree) {
    return this.http.patch<Denree>(this.denree_url + '/' + id, newDenree);
  }

  jsonToDenree(json: any): Denree {
    return new Denree(
      json.quantity,
      json.ingredient,
      json.step, 
      json.id
    );
  }
}
