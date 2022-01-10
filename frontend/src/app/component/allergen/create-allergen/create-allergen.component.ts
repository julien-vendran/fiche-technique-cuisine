import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Allergen } from "../../../model/allergen";
import { AllergenService } from "../../../service/allergen.service";
import * as M from "materialize-css";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-allergen',
  templateUrl: './create-allergen.component.html',
  styleUrls: ['./create-allergen.component.css']
})
export class CreateAllergenComponent implements OnInit, AfterViewInit {

  public allergenGroup: FormGroup | null = null;
  public allergen: Allergen = new Allergen();

  constructor(
    private fb: FormBuilder,
    private allergenService: AllergenService,
    private route: Router
  ) { }

  validate(): void {
    //On va créer un allergen avec les éléments qu'on a eu
    if (this.allergenGroup) {
      this.allergen = new Allergen(
        undefined,
        this.allergenGroup.get('allergen_name')?.value,
      );
      //Envoie des données
      if (this.allergenGroup.valid) {
        this.allergenService.createAllergen(this.allergen);
        this.route.navigate(['/allergens'])
      }
    }
  }

  ngOnInit(): void {
    this.allergenGroup = this.fb.group({
      allergen_name: [this.allergen?.allergen_name, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.initSelectMaterialize();
  }

  initSelectMaterialize(): void {
    let options: any = { isMultiple: true };
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  change($event: any): void {
    this.initSelectMaterialize();
  }
}
