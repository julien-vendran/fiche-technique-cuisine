import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergen } from '../model/allergen';
import { map } from 'rxjs/operators';
import { General } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AllergenService extends General {

  private backend_url: string = this.backend_general_url + "allergen"

  constructor(
    private http: HttpClient
  ) { super(); }

  createAllergen(allergen: Allergen): void {
    console.log("Création allergen init");
    this.http.post<Allergen>(this.backend_url, allergen).subscribe();
  }

  getAllAllergens(): Observable<Allergen[]> {
    return this.http.get<Allergen[]>(this.backend_url).pipe(
      map((arr: any) => arr.map(
        (json: any) => this.jsonToAllergen(json)
      ))
    );
  }

  getAllergen(id: number): Observable<Allergen> {
    return this.http.get<Allergen>(this.backend_url + "/" + id);
  }

  deleteAllergen(id: number) {
    console.log("------------ Delete Allergen Service Angular ---------------");
    console.log("url : " + this.backend_url + '/' + id);

    return this.http.delete(this.backend_url + '/' + id);
  }

  jsonToAllergen(json: any): Allergen {
    let a: Allergen = new Allergen(
      json.id_Allergen,
      json.allergen_name
    );

    console.log("Allergen : " + JSON.stringify(a));
    return a;
  }
}
