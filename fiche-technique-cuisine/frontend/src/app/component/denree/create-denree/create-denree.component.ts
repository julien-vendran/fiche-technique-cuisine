import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DenreeService} from "../../../service/denree.service";
import {IngredientService} from "../../../service/ingredient.service";
import {Denree} from "../../../model/denree";
import * as M from "materialize-css";
import {Ingredient} from "../../../model/ingredient";

@Component({
  selector: 'app-create-denree',
  templateUrl: './create-denree.component.html',
  styleUrls: ['./create-denree.component.css']
})
export class CreateDenreeComponent implements OnInit {
  public denreeGroup : FormGroup | null = null;
  public denree: Denree = new Denree();
  public ingredient_list:Ingredient[]=[];


  constructor(
    private fb:FormBuilder,
    private denreeService:DenreeService,
    private ingredientService: IngredientService,

  ) { }

  validate(): void {
    //On va créer un denree avec les éléments qu'on a eu
    if (this.denreeGroup) {
      this.denree = new Denree(
        this.denreeGroup.get('quantity')?.value,
        this.denreeGroup.get('ingredient')?.value,
      );
      //Envoie des données
      this.denreeService.createDenree(this.denree).subscribe();
    }
    //On remet à zéro notre denree
    this.denree = new Denree();
  }

  ngOnInit (): void {
    this.denreeGroup = this.fb.group({
      quantity: [this.denree?.quantity],
      ingredient:[this.denree?.ingredient]
    });

    this.ingredientService.getAllIngredients().subscribe(data=>{
      this.ingredient_list=data;
      setTimeout(this.initSelectMaterialize, 100);
    })
  }

  ngAfterViewInit (): void {
    this.initSelectMaterialize();
  }

  initSelectMaterialize (): void {
    let options:any = {isMultiple: true};
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  change($event: any): void {
    this.initSelectMaterialize();
  }
}
