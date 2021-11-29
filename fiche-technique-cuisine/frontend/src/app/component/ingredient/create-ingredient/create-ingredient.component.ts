import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {

  ingredients: any;
  backend_url = "http://localhost:3000/"

  constructor (private http: HttpClient) {}

  ngOnInit (): void {
    
  }

  // getAllIngredient() : void {
  //   this.http.get<any>(this.backend_url + 'ingredients').subscribe(data => {
  //     this.ingredients = JSON.stringify(data);
  //   }); 
  // }

}
