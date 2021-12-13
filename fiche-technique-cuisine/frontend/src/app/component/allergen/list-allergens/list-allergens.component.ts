import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Allergen} from "../../../model/allergen";
import {AllergenService} from "../../../service/allergen.service";

@Component({
  selector: 'app-list-allergens',
  templateUrl: './list-allergens.component.html',
  styleUrls: ['./list-allergens.component.css']
})
export class ListAllergensComponent implements OnInit {

  public allergens: Observable<Allergen[]> = new Observable<Allergen[]>();
  constructor(
    private allergenService: AllergenService
  ) {}

  ngOnInit(): void {
    this.majAllergen();
  }

  majAllergen(): void {
    this.allergens = this.getAllergens();
  }

  getAllergens (): Observable<Allergen[]> {
    return this.allergenService.getAllAllergens();
  }

  deleteAllergen(all: Allergen): void {
    if (! all.id_Allergen) {
      console.log("L'Allergen demandé n'existe pas");
      return;
    }
    console.log("Mon identifiant : " + all.id_Allergen);
    this.allergenService.deleteAllergen(all.id_Allergen).subscribe(
      () => this.allergens = this.getAllergens()
    );
  }

}
