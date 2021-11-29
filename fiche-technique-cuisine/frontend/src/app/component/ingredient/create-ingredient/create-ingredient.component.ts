import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormBuilder } from '@angular/forms';

import { Ingredient } from '../../../model/ingredient'

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {

  ingredientGroup : FormGroup = new FormGroup({}); 
  private ingredient: Ingredient | null = null;
  private backend_url = "http://localhost:3000/ingredients"

  constructor (private http: HttpClient, private fb: FormBuilder) {
    this.ingredientGroup = this.fb.group({
      name: [this.ingredient?.name]
    }); 
  }

  validate(): void {
    console.log("Validation in progress ..."); 
    if (this.ingredient && this.ingredientGroup)
      this.ingredient.name = this.ingredientGroup.get('name')?.value;
      
    this.send();
  }

  send(): void {
    console.log("Send in progress ..."); 
    this.http.post<Ingredient>(
      this.backend_url, 
      this.ingredient?.toJSON
    );
  }

  ngOnInit (): void {
    console.log("Init in progress ..."); 
    this.ingredient = new Ingredient("", "litre", 200, 1.2, false); 
  }

  // getAllIngredient() : void {
  //   this.http.get<any>(this.backend_url + 'ingredients').subscribe(data => {
  //     this.ingredients = JSON.stringify(data);
  //   }); 
  // }

}
