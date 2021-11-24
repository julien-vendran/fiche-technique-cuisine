import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  ingredients: any;
  backend_url = "http://localhost:3000/"

  constructor (private http: HttpClient) {}

  ngOnInit (): void {
    this.getAllIngredient();
    console.log(this.ingredients); 
  }

  getAllIngredient() : void {
    this.http.get<any>(this.backend_url + 'ingredients').subscribe(data => {
      this.ingredients = JSON.stringify(data);
    }); 
  }
}
