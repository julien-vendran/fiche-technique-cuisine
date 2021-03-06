import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IngredientService } from "../../../service/ingredient.service";
import * as M from "materialize-css";
import { Ingredient } from "../../../model/ingredient";

@Component({
  selector: 'app-create-denree',
  templateUrl: './create-denree.component.html',
  styleUrls: ['./create-denree.component.css']
})
export class CreateDenreeComponent implements OnInit {
  @Input() public denreeGroup: FormGroup | null = null;
  @Input() public formIdEnd: number | null = null;
  @Input() public ingredient_list: Ingredient[] | null = null; //On le met en INPUT pour éviter de faire 4000 requêtes à la BD

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
  ) { }
  ngOnInit(): void {
    if (this.denreeGroup == null) {
      this.denreeGroup = this.fb.group({
        quantity: [1],
        ingredient: []
      });
    }

    if (this.ingredient_list == null) {
      this.ingredientService.getAllIngredients().subscribe(data => {
        this.ingredient_list = data;
        setTimeout(this.initSelectMaterialize, 100);
      });
    }
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
